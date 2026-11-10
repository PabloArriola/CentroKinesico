import React, { useState } from 'react';
import { Appointment } from '../types/index.ts';
import { MapPin, Clock, CheckCircle2, ChevronRight, Stethoscope, RefreshCw, FileText } from 'lucide-react';

interface HeroAppointmentCardProps {
  appointment: Appointment;
  onReschedule: (appointment: Appointment) => void;
  onViewPreparation: (appointment: Appointment) => void;
  onConfirmAttendance: (id: string) => void;
}

export const HeroAppointmentCard: React.FC<HeroAppointmentCardProps> = ({
  appointment,
  onReschedule,
  onViewPreparation,
  onConfirmAttendance,
}) => {
  const [confirmed, setConfirmed] = useState(appointment.status === 'confirmado');
  const [showToast, setShowToast] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    onConfirmAttendance(appointment.id);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0D2137] text-white p-6 sm:p-7 shadow-[0_12px_32px_rgba(13,33,55,0.25)] border border-white/10">
      {/* Decorative luminous cyan radial gradient accent in corner */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#00A3E0]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[#00658D]/20 blur-2xl" />

      {/* Top Header Row: Kicker & Status */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#00A3E0]">
            <Stethoscope className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#00A3E0]">
              Próxima Sesión Programada
            </span>
            <p className="text-xs text-slate-300">
              Protocolo Lumbosacro · Sesión 6 de 10
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{confirmed ? 'Asistencia Confirmada' : 'Turno Reservado'}</span>
        </div>
      </div>

      {/* Main Content Grid: Large Date Display & Details */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Left Column: Big Date Block */}
        <div className="md:col-span-4 bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-center items-center text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#00A3E0]">
            Martes
          </span>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-mono tabular-nums">
              14
            </span>
            <span className="text-xl font-bold text-slate-300 uppercase">
              Nov
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-white/90 font-mono mt-1">
            <Clock className="w-3.5 h-3.5 text-[#00A3E0]" />
            <span>10:30 hs</span>
            <span className="text-xs text-slate-400">· Turno Mañana</span>
          </div>
        </div>

        {/* Right Column: Treatment & Specialist Info */}
        <div className="md:col-span-8 space-y-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white text-balance">
              {appointment.treatmentTitle}
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Descompresión axial robótica, terapia miofascial profunda y tracción L4-L5.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Especialista:</span>
              <span className="font-semibold text-white">{appointment.specialistName}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#00A3E0]/20 text-[#00A3E0] border border-[#00A3E0]/30">
                {appointment.specialistLicense}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#00A3E0] shrink-0" />
              <span>Av. Libertador 4820 · {appointment.roomNumber}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          {!confirmed ? (
            <button
              onClick={handleConfirm}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00A3E0] hover:bg-[#0284C7] active:bg-[#0369A1] text-white text-xs sm:text-sm font-bold shadow-md transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirmar Asistencia</span>
            </button>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>¡Turno confirmado! Te esperamos 10 min antes.</span>
            </span>
          )}

          <button
            onClick={() => onReschedule(appointment)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-300" />
            <span>Reprogramar</span>
          </button>
        </div>

        <button
          onClick={() => onViewPreparation(appointment)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00A3E0] hover:text-[#41BEFD] transition-colors group"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Ver Indicaciones Previas</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {showToast && (
        <div className="absolute bottom-3 right-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>Asistencia registrada con éxito</span>
        </div>
      )}
    </div>
  );
};
