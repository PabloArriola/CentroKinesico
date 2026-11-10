import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface CorrientesMapProps {
  onOpenGps: () => void;
}

export const CorrientesMap: React.FC<CorrientesMapProps> = ({ onOpenGps }) => {
  return (
    <div
      onClick={onOpenGps}
      className="relative w-full h-full min-h-[260px] sm:min-h-[300px] rounded-2xl overflow-hidden cursor-pointer group bg-[#E6F3EE] select-none border border-slate-200/80"
      title="Clic para abrir indicaciones en Google Maps"
    >
      {/* High fidelity stylized SVG Cartography of Corrientes & Río Paraná matching the screenshot */}
      <svg
        className="w-full h-full object-cover absolute inset-0"
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9E6F5" />
            <stop offset="100%" stopColor="#B3DCF2" />
          </linearGradient>
          <filter id="shadowGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#00658D" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Base Landmass (Soft beige-green tint) */}
        <rect width="600" height="400" fill="#EDF6EE" />

        {/* Chaco / Barranqueras Landmass on Left */}
        <path
          d="M 0,0 L 220,0 Q 200,90 230,160 Q 260,230 180,310 Q 140,360 110,400 L 0,400 Z"
          fill="#E7F2E8"
        />

        {/* Río Paraná Waterways */}
        <path
          d="M 220,0 Q 200,90 230,160 Q 260,230 180,310 Q 140,360 110,400 L 220,400 Q 260,340 310,270 Q 360,190 320,120 Q 300,50 330,0 Z"
          fill="url(#waterGrad)"
        />

        {/* Secondary River Branch / Riacho */}
        <path
          d="M 400,0 Q 420,40 460,90 L 440,95 Q 405,45 385,0 Z"
          fill="url(#waterGrad)"
          opacity="0.75"
        />

        {/* Island in Rio Parana: Barrio San Pedro Pescador */}
        <path
          d="M 245,180 Q 285,170 295,210 Q 280,240 250,230 Q 235,205 245,180 Z"
          fill="#D8EED8"
          stroke="#9CCCA0"
          strokeWidth="1"
        />

        {/* Puente General Manuel Belgrano (Bridge connecting Chaco and Corrientes) */}
        <line
          x1="180"
          y1="230"
          x2="320"
          y2="200"
          stroke="#94A3B8"
          strokeWidth="3.5"
          strokeDasharray="4 2"
        />
        <line
          x1="180"
          y1="230"
          x2="320"
          y2="200"
          stroke="#64748B"
          strokeWidth="1.5"
        />

        {/* Main Road Grid of Corrientes Capital */}
        <path
          d="M 310,200 Q 380,210 470,220 M 330,230 L 520,250 M 340,260 L 560,290 M 360,180 L 500,195 M 320,120 Q 380,150 440,170"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M 370,140 L 410,340 M 420,160 L 460,360 M 470,170 L 510,370 M 340,190 L 370,320"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* National Route 12 / 16 Shield Lines */}
        <path
          d="M 0,160 Q 100,180 180,230"
          stroke="#FCD34D"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M 320,200 Q 420,220 600,240"
          stroke="#FCD34D"
          strokeWidth="2.5"
          fill="none"
        />

        {/* Map Label Badges matching screenshot */}
        {/* Route 16 Shield */}
        <rect x="70" y="145" width="22" height="15" rx="3" fill="#15803D" />
        <text x="81" y="156" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">16</text>

        {/* Route 63 */}
        <rect x="255" y="100" width="22" height="15" rx="3" fill="#15803D" />
        <text x="266" y="111" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">63</text>

        {/* Route 12 */}
        <rect x="475" y="225" width="22" height="15" rx="3" fill="#15803D" />
        <text x="486" y="236" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">12</text>

        {/* Airport icon / badge */}
        <circle cx="455" cy="225" r="9" fill="#0284C7" />
        <path d="M 455,220 L 456,224 L 460,225 L 456,226 L 455,230 L 454,226 L 450,225 L 454,224 Z" fill="#FFFFFF" />

        {/* Map Landmark Place Names */}
        <text x="310" y="110" fill="#0369A1" fontSize="9" fontWeight="600" fontStyle="italic">Paraná River</text>
        <text x="280" y="90" fill="#334155" fontSize="9" fontWeight="bold">Puerto Antequera</text>

        <text x="270" y="195" fill="#1E293B" fontSize="8" fontWeight="600" textAnchor="middle">Barrio</text>
        <text x="270" y="205" fill="#1E293B" fontSize="8" fontWeight="600" textAnchor="middle">San Pedro</text>
        <text x="270" y="215" fill="#1E293B" fontSize="8" fontWeight="600" textAnchor="middle">Pescador</text>

        {/* Parque Mitre */}
        <circle cx="345" cy="155" r="4" fill="#10B981" />
        <text x="353" y="158" fill="#0F766E" fontSize="9" fontWeight="bold">Parque Mitre</text>

        {/* Centenario Shopping */}
        <circle cx="380" cy="222" r="4" fill="#0284C7" />
        <text x="388" y="225" fill="#0369A1" fontSize="9" fontWeight="bold">Centenario Shopping</text>

        {/* Corrientes City Name */}
        <text x="345" y="225" fill="#0F172A" fontSize="13" fontWeight="bold" letterSpacing="0.05em">
          Corrientes
        </text>

        {/* Surrounding Neighborhoods */}
        <text x="295" y="260" fill="#64748B" fontSize="8">ARAZATY</text>
        <text x="365" y="262" fill="#64748B" fontSize="8">SANTA TERESITA</text>
        <text x="300" y="295" fill="#0284C7" fontSize="9" fontWeight="bold">La Reina Corrientes</text>
        <text x="400" y="295" fill="#64748B" fontSize="8">17 DE AGOSTO</text>
        <text x="330" y="318" fill="#64748B" fontSize="8">QUILMES</text>
        <text x="390" y="325" fill="#64748B" fontSize="8">LA OLLA</text>
        <text x="400" y="345" fill="#64748B" fontSize="8">PIRAYUÍ</text>

        {/* Left side Chaco labels */}
        <text x="180" y="280" fill="#64748B" fontSize="8">Barranqueras</text>
        <text x="195" y="248" fill="#0F766E" fontSize="8">Club Náutico</text>
        <text x="195" y="256" fill="#0F766E" fontSize="8">Barranqueras</text>
        <text x="160" y="325" fill="#64748B" fontSize="7">VILLA FOREST</text>
        <text x="150" y="380" fill="#64748B" fontSize="8">Puerto Vilelas</text>

        {/* CLINIC LOCATION PIN ON CARLOS PELLEGRINI 627 */}
        <g transform="translate(340, 185)" filter="url(#shadowGlow)">
          {/* Animated ping ring */}
          <circle cx="0" cy="0" r="14" fill="#00658D" opacity="0.2" className="animate-ping" />
          <circle cx="0" cy="0" r="8" fill="#00658D" />
          <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
        </g>
      </svg>

      {/* Floating GPS Icon at Top Right */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-[#00658D] group-hover:bg-[#00658D] group-hover:text-white transition-colors">
        <Navigation className="w-4 h-4" />
      </div>

      {/* Street Address Marker Pill at Bottom Left matching screenshot */}
      <div className="absolute bottom-4 left-4 z-10 bg-slate-900/80 backdrop-blur-md text-white px-3.5 py-2 rounded-xl shadow-md border border-white/10 group-hover:bg-slate-900 transition-colors">
        <div className="flex items-center gap-1.5 text-xs font-bold leading-tight">
          <MapPin className="w-3.5 h-3.5 text-[#41befd] shrink-0" />
          <span>Carlos Pellegrini 627</span>
        </div>
        <div className="text-[11px] text-slate-300 font-medium pl-5 leading-tight mt-0.5">
          Corrientes Capital, Argentina
        </div>
      </div>
    </div>
  );
};
