import React from 'react';
import { Appointment } from '../types/index.ts';
import { X, Calendar, Clock, MapPin, User, FileText, CheckCircle2, ShieldCheck, Download, MessageSquare } from 'lucide-react';

interface AppointmentDetailsModalProps {
  appointment: Appointment | null;
  onClose: () => void;
  onReschedule: (appointment: Appointment) => void;
}

export const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
  appointment,
  onClose,
  onReschedule,
}) => {
  React.useEffect(() => {
    if (!appointment) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [appointment, onClose]);

  if (!appointment) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-[#0D2137] text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#00A3E0]">
              DETALLE DE CITA CLÍNICA · ID #{appointment.id}
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              {appointment.treatmentTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Appointment Timing Card */}
          <div className="p-4 rounded-2xl bg-[#EFF4FF] border border-[#DCE9FF] flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#00658D] uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Fecha & Horario
              </span>
              <div className="text-sm font-bold text-[#0D2137]">
                {appointment.date} · {appointment.time} hs ({appointment.shift})
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                <CheckCircle2 className="w-3 h-3" />
                Confirmado
              </span>
            </div>
          </div>

          {/* Specialist and Location */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <User className="w-5 h-5 text-[#00A3E0] mt-0.5 shrink-0" />
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold">Profesional Asignado</span>
                <p className="text-sm font-bold text-[#0D2137]">{appointment.specialistName}</p>
                <p className="text-xs text-slate-500 font-mono">Matrícula: {appointment.specialistLicense}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <MapPin className="w-5 h-5 text-[#00A3E0] mt-0.5 shrink-0" />
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold">Ubicación de Atención</span>
                <p className="text-sm font-bold text-[#0D2137]">Sede Belgrano · Av. del Libertador 4820, Piso 4</p>
                <p className="text-xs text-slate-500">{appointment.roomNumber}</p>
              </div>
            </div>
          </div>

          {/* Clinical Preparation Instructions */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2 text-xs text-amber-950">
            <div className="font-bold text-amber-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              Recomendaciones para tu Sesión
            </div>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>Llegar 10 minutos antes para completar la verificación biomecánica inicial.</li>
              <li>Asistir con vestimenta cómoda deportiva (calza o jogging suave) para facilitar la descompresión.</li>
              <li>Traer estudios de imagen recientes (Resonancia Magnética o Radiografías de columna).</li>
              <li>Evitar ingestas abundantes hasta 1 hora antes del tratamiento.</li>
            </ul>
          </div>

          {/* Clinical Notes */}
          {appointment.notes && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <span className="font-bold text-slate-700 block mb-1">Notas del Terapeuta:</span>
              <p className="text-slate-600">{appointment.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onReschedule(appointment);
            }}
            className="px-4 py-2 text-xs font-bold text-[#00658D] hover:underline"
          >
            Reprogramar Turno
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#0D2137] text-white text-xs font-bold hover:bg-[#1a334e]"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
