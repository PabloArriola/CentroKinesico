import React from 'react';
import { Specialist } from '../types/index.ts';
import { MessageCircle, Phone, Star, Calendar, Award } from 'lucide-react';

interface TherapistCardProps {
  specialist: Specialist;
  onBookWithTherapist: (specialist: Specialist) => void;
  onOpenProfile: (specialist: Specialist) => void;
}

export const TherapistCard: React.FC<TherapistCardProps> = ({
  specialist,
  onBookWithTherapist,
  onOpenProfile,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-[0_4px_20px_rgba(13,33,55,0.04)] hover:shadow-[0_8px_30px_rgba(13,33,55,0.08)] transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Top Image Section with 16px corner clip & credential overlay */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <img
            src={specialist.avatar}
            alt={specialist.name}
            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* License Badge Overlay (Dark navy #0D2137 with 10px uppercase tracking) */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0D2137] text-white border border-white/20 shadow-sm backdrop-blur-sm">
            <Award className="w-3 h-3 text-[#00A3E0]" />
            <span className="text-[10px] font-bold tracking-wider uppercase font-mono">
              {specialist.license}
            </span>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 text-slate-800 text-[11px] font-bold shadow-sm">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{specialist.rating.toFixed(1)}</span>
            <span className="text-slate-400 text-[10px]">({specialist.reviewsCount})</span>
          </div>

          {/* Bottom text inside image overlay */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <span className="text-xs text-white/90 font-medium">
              {specialist.title}
            </span>
            <h4 className="text-base font-bold text-white leading-tight">
              {specialist.name}
            </h4>
          </div>
        </div>

        {/* Details Body */}
        <div className="p-4 space-y-3">
          <p className="text-xs font-semibold text-[#00658D]">
            {specialist.role}
          </p>

          <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
            {specialist.bio}
          </p>

          {/* Specialism pills / tags */}
          <div className="flex flex-wrap gap-1 pt-1">
            {specialist.specialties.map((spec, i) => (
              <span
                key={i}
                className="text-[11px] px-2 py-0.5 rounded-full bg-[#F1F5F9] text-slate-700 font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Section: Phone / WhatsApp / Book */}
      <div className="p-4 pt-2 border-t border-slate-100 flex items-center gap-2">
        <a
          href={`https://wa.me/${specialist.whatsapp.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(specialist.name)},%20quisiera%20consultar%20por%20un%20turno%20en%20Kinetic%20Spine`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center justify-center transition-colors shadow-xs"
          title="Contactar por WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
        </a>

        <a
          href={`tel:${specialist.phone.replace(/[^0-9+]/g, '')}`}
          className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shadow-xs"
          title="Llamar a recepción"
        >
          <Phone className="w-4 h-4" />
        </a>

        <button
          onClick={() => onBookWithTherapist(specialist)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-xl bg-[#0D2137] hover:bg-[#112a45] text-white text-xs font-semibold transition-colors shadow-sm"
        >
          <Calendar className="w-3.5 h-3.5 text-[#00A3E0]" />
          <span>Agendar Turno</span>
        </button>
      </div>
    </div>
  );
};
