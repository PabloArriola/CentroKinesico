import React from 'react';
import { Treatment } from '../types/index.ts';
import { X, Clock, CheckCircle2, AlertCircle, Sparkles, Calendar } from 'lucide-react';

interface TreatmentDetailModalProps {
  treatment: Treatment | null;
  onClose: () => void;
  onBook: (treatment: Treatment) => void;
}

export const TreatmentDetailModal: React.FC<TreatmentDetailModalProps> = ({
  treatment,
  onClose,
  onBook,
}) => {
  React.useEffect(() => {
    if (!treatment) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [treatment, onClose]);

  if (!treatment) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image and close button */}
        <div className="relative h-48 sm:h-56 w-full bg-slate-900 overflow-hidden">
          <img
            src={treatment.image}
            alt={treatment.title}
            className="w-full h-full object-cover opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D2137] via-[#0D2137]/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title inside hero header */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-xs uppercase font-bold tracking-wider text-[#00A3E0] font-mono">
              PROTOCOLO CLÍNICO ESPECIALIZADO · {treatment.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
              {treatment.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Metadata bar */}
          <div className="flex items-center gap-4 text-xs text-slate-600 bg-[#F8FAFC] p-3 rounded-xl border border-slate-100">
            <span className="flex items-center gap-1.5 font-semibold text-slate-800">
              <Clock className="w-4 h-4 text-[#00A3E0]" />
              Duración: {treatment.durationMinutes} minutos
            </span>
            <span>·</span>
            <span>Área: Kinesiología & Columna</span>
            <span>·</span>
            <span className="text-emerald-700 font-semibold">Tecnología Certificada</span>
          </div>

          {/* Full description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Fundamentación Biomecánica & Procedimiento
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {treatment.fullDesc}
            </p>
          </div>

          {/* Benefits Grid */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#00A3E0]" />
              Beneficios Clínicos Comprobados
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {treatment.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-950">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Indications and Contraindications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-[#EFF4FF] border border-[#DCE9FF]">
              <h5 className="text-xs font-bold text-[#0D2137] uppercase tracking-wider mb-2">
                Indicaciones Principales
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {treatment.indications.map((ind, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0]" />
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
            </div>

            {treatment.contraindications && (
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
                <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  Contraindicaciones Relativas
                </h5>
                <ul className="space-y-1.5 text-xs text-amber-950">
                  {treatment.contraindications.map((c, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
          >
            Cerrar
          </button>
          <button
            onClick={() => {
              onClose();
              onBook(treatment);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00A3E0] hover:bg-[#0284C7] text-white text-xs sm:text-sm font-bold transition-colors shadow-sm"
          >
            <Calendar className="w-4 h-4" />
            <span>Reservar este Tratamiento</span>
          </button>
        </div>
      </div>
    </div>
  );
};
