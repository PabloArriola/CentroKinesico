import React, { useState, useEffect } from 'react';
import { ExerciseItem } from '../types/index.ts';
import { X, Play, Pause, RotateCcw, CheckCircle2, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';

interface ExercisePlayerModalProps {
  exercise: ExerciseItem | null;
  onClose: () => void;
  onMarkComplete: (id: string) => void;
}

export const ExercisePlayerModal: React.FC<ExercisePlayerModalProps> = ({
  exercise,
  onClose,
  onMarkComplete,
}) => {
  if (!exercise) return null;

  const [timeLeft, setTimeLeft] = useState(exercise.durationSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(exercise.completed);

  // Sync state if exercise changes
  useEffect(() => {
    setTimeLeft(exercise.durationSeconds);
    setIsRunning(false);
    setCompleted(exercise.completed);
  }, [exercise]);

  // Timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setCompleted(true);
            onMarkComplete(exercise.id);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, exercise.id, onMarkComplete]);

  const togglePlay = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(exercise.durationSeconds);
  };

  const handleManualComplete = () => {
    setCompleted(true);
    setIsRunning(false);
    onMarkComplete(exercise.id);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.round(
    ((exercise.durationSeconds - timeLeft) / exercise.durationSeconds) * 100
  );

  useEffect(() => {
    if (!exercise) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [exercise, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-[#0D2137] text-white">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#00A3E0] text-white">
              {exercise.category}
            </span>
            <span className="text-xs text-slate-300">Zona {exercise.targetSpineZone}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Title & Subtitle */}
          <div>
            <h3 className="text-xl font-bold text-[#0D2137] tracking-tight">
              {exercise.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {exercise.subtitle}
            </p>
          </div>

          {/* Timer Display Box */}
          <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Tiempo de Permanencia Guiada
            </span>
            <div className="text-5xl sm:text-6xl font-black text-[#0D2137] font-mono tracking-tight my-2">
              {formatTime(timeLeft)}
            </div>

            {/* Micro Progress Bar */}
            <div className="w-full max-w-xs h-2 bg-slate-200 rounded-full overflow-hidden mt-1 mb-4">
              <div
                className="h-full bg-[#00A3E0] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Timer Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={resetTimer}
                className="w-10 h-10 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
                title="Reiniciar cronómetro"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00A3E0] hover:bg-[#0284C7] text-white font-bold text-sm shadow-md transition-all active:scale-95"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Pausar</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>{timeLeft === 0 ? 'Repetir' : 'Iniciar Conteo'}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleManualComplete}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  completed
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200/80 hover:bg-emerald-100 text-slate-700 hover:text-emerald-700'
                }`}
                title="Marcar como completado"
              >
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Clinical Posture Checkpoints */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00A3E0]" />
              Claves Biomecánicas del Ejercicio
            </h4>
            <div className="space-y-2">
              {exercise.clinicalCues.map((cue, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#EFF4FF] border border-[#DCE9FF] text-xs text-[#0D2137]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0] mt-1.5 shrink-0" />
                  <span className="font-medium">{cue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Instrucciones Paso a Paso
            </h4>
            <ol className="space-y-2 text-xs text-slate-700">
              {exercise.instructions.map((inst, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-100 font-mono text-[11px] font-bold text-slate-600 flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="mt-0.5 leading-relaxed">{inst}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Safety Warning */}
          {exercise.warningNote && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Advertencia Clínica: </span>
                {exercise.warningNote}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            {completed ? '✓ Registrado en tu historial' : 'Pendiente de registrar'}
          </span>
          <button
            onClick={() => {
              if (!completed) handleManualComplete();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-[#0D2137] hover:bg-[#1a334e] text-white text-xs font-bold transition-colors"
          >
            {completed ? 'Cerrar Guía' : 'Listo, Completado'}
          </button>
        </div>
      </div>
    </div>
  );
};
