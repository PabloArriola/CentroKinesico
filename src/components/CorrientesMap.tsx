import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Compass } from 'lucide-react';

interface CorrientesMapProps {
  onOpenGps?: () => void;
}

export const CorrientesMap: React.FC<CorrientesMapProps> = ({ onOpenGps }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Exact Google Maps directions destination URL
  const googleMapsDirectionsUrl =
    'https://www.google.com/maps/dir/?api=1&destination=Carlos+Pellegrini+627,+Corrientes,+Argentina';

  // Embed URL for real Google Maps street view centered on Carlos Pellegrini 627, Corrientes
  const googleMapsEmbedUrl =
    'https://maps.google.com/maps?q=Carlos%20Pellegrini%20627%2C%20Corrientes%20Capital%2C%20Argentina&t=&z=16&ie=UTF8&iwloc=&output=embed';

  return (
    <div className="relative w-full h-[320px] sm:h-[360px] lg:h-[390px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200/90 group bg-slate-100 flex flex-col">
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-100/90 backdrop-blur-xs text-slate-400 animate-pulse">
          <Compass className="w-8 h-8 text-[#00658D] animate-spin mb-2" />
          <p className="text-xs font-semibold text-slate-600">Cargando Google Maps...</p>
          <p className="text-[11px] text-slate-400">Carlos Pellegrini 627, Corrientes</p>
        </div>
      )}

      {/* Real Interactive Google Maps Iframe */}
      <iframe
        title="Ubicación de SinAlgia en Google Maps - Carlos Pellegrini 627, Corrientes"
        src={googleMapsEmbedUrl}
        className="w-full h-full border-0 absolute inset-0 z-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setIsLoaded(true)}
      />

      {/* Top Floating Glass Badge: Address & Direct Link to Google Maps */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-none">
        <div className="pointer-events-auto bg-slate-900/85 backdrop-blur-md text-white px-3 py-1.5 rounded-xl shadow-md border border-white/10 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <div className="text-left">
            <p className="text-[11px] font-bold tracking-tight text-white leading-tight">
              Carlos Pellegrini 627
            </p>
            <p className="text-[10px] text-slate-300 font-medium leading-tight">
              Corrientes Capital · Zona Centro
            </p>
          </div>
        </div>

        <a
          href={googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto bg-white/95 hover:bg-white active:scale-95 text-[#00658D] hover:text-[#004e6e] text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-md border border-slate-200/90 flex items-center gap-1.5 transition-all"
          title="Abrir en Google Maps"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ver en Maps</span>
        </a>
      </div>

      {/* Bottom Floating Quick GPS Bar */}
      <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none flex items-center justify-between">
        <a
          href={googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onOpenGps}
          className="pointer-events-auto inline-flex items-center gap-2 bg-[#00658D]/95 hover:bg-[#005172] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-lg backdrop-blur-md transition-all active:scale-95 hover:shadow-xl"
        >
          <Navigation className="w-4 h-4 text-[#41befd]" />
          <span>Iniciar navegación GPS</span>
        </a>

        <div className="hidden sm:flex pointer-events-auto items-center gap-1.5 bg-white/90 backdrop-blur-md text-slate-700 text-[10px] font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200/80 shadow-xs">
          <MapPin className="w-3 h-3 text-[#00658D]" />
          <span>Frente a Plaza / Zona Centro</span>
        </div>
      </div>
    </div>
  );
};
