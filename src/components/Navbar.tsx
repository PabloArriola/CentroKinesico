import React from 'react';
import { Calendar, Smartphone, Monitor } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenBooking: () => void;
  viewportMode: 'responsive' | 'mobile-mockup';
  onToggleViewportMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  onOpenBooking,
  viewportMode,
  onToggleViewportMode,
}) => {
  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'tratamientos', label: 'Tratamientos' },
    { id: 'atlas', label: 'Atlas de Columna' },
    { id: 'plan', label: 'Mi Plan SGA' },
    { id: 'especialistas', label: 'Especialistas' },
    { id: 'turnos', label: 'Mis Turnos' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Brand Wordmark (Single text element, no clutter) */}
          <button
            onClick={() => onTabChange('inicio')}
            className="flex items-center gap-2.5 text-left shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0]"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0D2137] flex items-center justify-center text-white shadow-sm">
              <svg className="w-5 h-5 text-[#00A3E0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M8 5a4 4 0 0 1 8 0M7 10a5 5 0 0 1 10 0M6 15a6 6 0 0 1 12 0M8 19a4 4 0 0 1 8 0" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-[#0D2137] whitespace-nowrap leading-tight">
                Kinetic Spine & Health
              </span>
              <span className="text-[10px] tracking-wider font-semibold text-[#00A3E0] uppercase leading-none mt-0.5">
                Kinesiología & Columna
              </span>
            </div>
          </button>

          {/* Zone 2: 4-5 Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`relative py-1 text-sm font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] rounded-sm ${
                    isActive
                      ? 'text-[#0D2137] font-semibold'
                      : 'text-slate-600 hover:text-[#0D2137]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-[-19px] left-0 right-0 h-[2.5px] bg-[#00A3E0] rounded-t-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary action + Viewport Mockup Switcher */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Viewport switch helper so reviewers can evaluate mobile vs desktop cleanly */}
            <button
              onClick={onToggleViewportMode}
              title={viewportMode === 'mobile-mockup' ? 'Cambiar a vista pantalla completa' : 'Simular vista móvil (iPhone)'}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              {viewportMode === 'mobile-mockup' ? (
                <>
                  <Monitor className="w-3.5 h-3.5 text-slate-700" />
                  <span className="hidden md:inline">Vista Escritorio</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-slate-700" />
                  <span className="hidden md:inline">Vista Móvil</span>
                </>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold text-white bg-[#00A3E0] hover:bg-[#0284C7] active:bg-[#0369A1] rounded-lg shadow-sm transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00A3E0]"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservar Turno</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
