import React from 'react';
import { Home, Stethoscope, Compass, Activity, CalendarCheck } from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const tabs = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'tratamientos', label: 'Servicios', icon: Stethoscope },
    { id: 'atlas', label: 'Columna 3D', icon: Compass },
    { id: 'plan', label: 'Mi Plan', icon: Activity },
    { id: 'turnos', label: 'Turnos', icon: CalendarCheck },
  ];

  return (
    <nav
      aria-label="Navegación principal inferior"
      className="lg:hidden fixed bottom-3 left-3 right-3 z-40 h-16 bg-white/92 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-[0_8px_30px_rgba(13,33,55,0.12)] max-w-md mx-auto"
    >
      <div className="grid grid-cols-5 h-full items-center px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center h-full w-full py-1 focus-visible:outline-none"
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-150 ${
                    isActive
                      ? 'text-[#0D2137] scale-110 stroke-[2.4]'
                      : 'text-slate-400 hover:text-slate-600 stroke-[1.8]'
                  }`}
                />
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#00A3E0]" />
                )}
              </div>
              <span
                className={`text-[10px] tracking-tight mt-1 transition-colors duration-150 ${
                  isActive ? 'font-bold text-[#0D2137]' : 'font-medium text-slate-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
