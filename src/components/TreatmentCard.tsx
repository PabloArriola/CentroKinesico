import React from 'react';
import { Treatment } from '../types/index.ts';
import { ArrowUpRight, Activity, UserCheck, ScanLine, HandMetal, ShieldAlert, Clock } from 'lucide-react';

interface TreatmentCardProps {
  treatment: Treatment;
  onSelect: (treatment: Treatment) => void;
  onBook: (treatment: Treatment) => void;
}

export const TreatmentCard: React.FC<TreatmentCardProps> = ({ treatment, onSelect, onBook }) => {
  const getIcon = () => {
    switch (treatment.iconName) {
      case 'Activity':
        return <Activity className="w-5 h-5 text-[#00A3E0]" />;
      case 'UserCheck':
        return <UserCheck className="w-5 h-5 text-[#00A3E0]" />;
      case 'ScanLine':
        return <ScanLine className="w-5 h-5 text-[#00A3E0]" />;
      case 'HandMetal':
        return <HandMetal className="w-5 h-5 text-[#00A3E0]" />;
      default:
        return <ShieldAlert className="w-5 h-5 text-[#00A3E0]" />;
    }
  };

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-2xl p-5 border border-slate-200/90 shadow-[0_4px_20px_rgba(13,33,55,0.04)] hover:shadow-[0_8px_30px_rgba(13,33,55,0.08)] transition-all duration-200">
      <div>
        {/* Top bar with icon tile & duration metadata */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-11 h-11 rounded-xl bg-[#F8FAFC] border border-slate-100 flex items-center justify-center text-[#00A3E0] group-hover:scale-105 transition-transform">
            {getIcon()}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{treatment.durationMinutes} min</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#00658D] font-semibold">{treatment.category}</span>
          </div>
        </div>

        {/* Title & Short Description */}
        <h3 className="text-base sm:text-lg font-bold text-[#0D2137] tracking-tight group-hover:text-[#00A3E0] transition-colors leading-snug">
          {treatment.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#64748B] mt-2 line-clamp-3 leading-relaxed">
          {treatment.shortDesc}
        </p>

        {/* Key indications snippet */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Indicado para:
          </div>
          <div className="flex flex-wrap gap-1 text-[11px] text-slate-600">
            {treatment.indications.slice(0, 2).map((ind, i) => (
              <span key={i} className="inline-flex items-center gap-1 bg-[#F1F5F9] px-2 py-0.5 rounded-md">
                <span className="w-1 h-1 rounded-full bg-[#00A3E0]" />
                {ind}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
        <button
          onClick={() => onSelect(treatment)}
          className="text-xs font-semibold text-slate-600 hover:text-[#0D2137] transition-colors inline-flex items-center gap-1"
        >
          <span>Ver Protocolo Clínico</span>
        </button>

        <button
          onClick={() => onBook(treatment)}
          className="w-9 h-9 rounded-xl bg-[#E0F2FE] hover:bg-[#00A3E0] text-[#00658D] hover:text-white flex items-center justify-center transition-all duration-150 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0]"
          title="Reservar este tratamiento"
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
