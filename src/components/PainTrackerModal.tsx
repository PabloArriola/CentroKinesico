import React, { useState, useEffect } from 'react';
import { PainLogEntry } from '../types/index.ts';
import { X, TrendingDown, Activity, CheckCircle2 } from 'lucide-react';

interface PainTrackerModalProps {
  isOpen: boolean;
  currentScore: number;
  painHistory: PainLogEntry[];
  onClose: () => void;
  onSavePainScore: (newScore: number, zone: string, notes: string) => void;
}

export const PainTrackerModal: React.FC<PainTrackerModalProps> = ({
  isOpen,
  currentScore,
  painHistory,
  onClose,
  onSavePainScore,
}) => {
  const [sliderValue, setSliderValue] = useState(currentScore);
  const [selectedZone, setSelectedZone] = useState('Lumbar L4-L5');
  const [userNotes, setUserNotes] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync state whenever opened with currentScore
  useEffect(() => {
    if (isOpen) {
      setSliderValue(currentScore);
      setSavedSuccess(false);
    }
  }, [isOpen, currentScore]);

  // Support closing with Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const zones = ['Cervical (C1-C7)', 'Dorsal / Torácica', 'Lumbar L4-L5', 'Sacroilíaco'];

  const getPainCategory = (val: number) => {
    if (val <= 3) return { label: 'Leve / Tolerable', color: 'text-emerald-600', bg: 'bg-emerald-500' };
    if (val <= 6) return { label: 'Moderado', color: 'text-amber-600', bg: 'bg-amber-500' };
    return { label: 'Severo / Punzante', color: 'text-rose-600', bg: 'bg-rose-500' };
  };

  const currentCat = getPainCategory(sliderValue);

  const handleSave = () => {
    onSavePainScore(sliderValue, selectedZone, userNotes);
    setSavedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pain-modal-title"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-[#0D2137] text-white">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#00A3E0]" />
            <div>
              <h3 id="pain-modal-title" className="text-base font-bold text-white">
                Escala Visual Analógica (EVA) de Dolor
              </h3>
              <p className="text-xs text-slate-300">
                Seguimiento clínico de descompresión vertebral
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Historical Trend Overview Card */}
          <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Evolución Últimos 7 Días
              </span>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>-62.5% de Dolor</span>
              </div>
            </div>

            {/* Custom SVG Bar Chart */}
            <div className="flex items-end justify-between gap-2 h-28 pt-4 pb-2 px-1">
              {painHistory.map((item, idx) => {
                const isToday = idx === painHistory.length - 1;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[11px] font-mono font-bold text-slate-700">
                      {isToday ? sliderValue : item.painScore}
                    </span>
                    <div className="w-full bg-slate-200 rounded-t-md h-full max-h-[75px] relative overflow-hidden flex items-end">
                      <div
                        className={`w-full transition-all duration-300 rounded-t-md ${
                          (isToday ? sliderValue : item.painScore) <= 3
                            ? 'bg-[#10B981]'
                            : (isToday ? sliderValue : item.painScore) <= 6
                            ? 'bg-[#F59E0B]'
                            : 'bg-[#EF4444]'
                        }`}
                        style={{ height: `${(isToday ? sliderValue : item.painScore) * 10}%` }}
                      />
                    </div>
                    <span className={`text-[10px] font-medium ${isToday ? 'font-bold text-[#0D2137]' : 'text-slate-400'}`}>
                      {item.dayLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Pain Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Nivel de Dolor Actual (1 a 10)
              </label>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-black font-mono ${currentCat.color}`}>
                  {sliderValue}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  / 10 · {currentCat.label}
                </span>
              </div>
            </div>

            <div className="relative px-1">
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={sliderValue}
                onChange={(e) => setSliderValue(parseInt(e.target.value, 10))}
                className="w-full h-3 bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 rounded-lg appearance-none cursor-pointer accent-[#0D2137]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1.5 px-0.5">
                <span>1 (Sin molestia)</span>
                <span>5 (Moderado)</span>
                <span>10 (Incapacitante)</span>
              </div>
            </div>
          </div>

          {/* Spine Zone Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Zona de Mayor Tensión o Dolor
            </label>
            <div className="grid grid-cols-2 gap-2">
              {zones.map((zone) => (
                <button
                  type="button"
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl border text-left transition-all cursor-pointer ${
                    selectedZone === zone
                      ? 'bg-[#0D2137] text-white border-[#0D2137]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {zone}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Notas Adicionales (Sensaciones, posturas desencadenantes)
            </label>
            <textarea
              rows={2}
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              placeholder="Ej: Menos molestia al caminar, leve rigidez al inclinarme..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00A3E0] resize-none"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={savedSuccess}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00A3E0] hover:bg-[#0284C7] active:bg-[#0089bd] text-white text-xs font-bold transition-colors shadow-sm disabled:opacity-75 cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>¡Actualizado!</span>
              </>
            ) : (
              <span>Guardar Registro Clínico</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
