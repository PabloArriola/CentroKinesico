import React from 'react';
import { ExerciseItem } from '../types/index.ts';
import { Play, CheckCircle2, Circle, Clock, Flame, ChevronRight, Activity } from 'lucide-react';

interface ExerciseRoutineCardProps {
  exercises: ExerciseItem[];
  currentPainScore: number;
  onOpenPlayer: (exercise: ExerciseItem) => void;
  onToggleComplete: (id: string) => void;
  onOpenPainTracker: () => void;
}

export const ExerciseRoutineCard: React.FC<ExerciseRoutineCardProps> = ({
  exercises,
  currentPainScore,
  onOpenPlayer,
  onToggleComplete,
  onOpenPainTracker,
}) => {
  const completedCount = exercises.filter((e) => e.completed).length;
  const progressPercent = Math.round((completedCount / exercises.length) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_rgba(13,33,55,0.04)] p-6">
      {/* Header with Title and Pain Level Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Protocolo Domiciliario SGA
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#0D2137] tracking-tight mt-0.5">
            Rutina Activa de Hoy · Descompresión Lumbar
          </h3>
          <p className="text-xs text-slate-500">
            Prescripción de la Dra. Sofía Valenzuela (M.P. 842)
          </p>
        </div>

        {/* Pain Level interactive chip */}
        <button
          onClick={onOpenPainTracker}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF4FF] border border-slate-200 transition-colors text-left"
          title="Ver registro y actualizar escala de dolor"
        >
          <Activity className="w-4 h-4 text-[#00A3E0]" />
          <div>
            <div className="text-[10px] font-semibold text-slate-500 uppercase">
              Nivel de Dolor (EVA)
            </div>
            <div className="text-xs font-bold text-[#0D2137] flex items-center gap-1 font-mono">
              <span className="text-sm text-[#00A3E0]">{currentPainScore}/10</span>
              <span className="text-[10px] font-normal text-emerald-600 font-sans">
                (↓ 5 pts vs inicio)
              </span>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-5 bg-slate-50 p-3 rounded-xl border border-slate-100">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
          <span>Progreso de hoy: {completedCount} de {exercises.length} completados</span>
          <span className="font-mono text-[#00A3E0] font-bold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#00A3E0] transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* List of Exercises */}
      <div className="space-y-3">
        {exercises.map((ex) => (
          <div
            key={ex.id}
            className={`group flex items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl border transition-all ${
              ex.completed
                ? 'bg-emerald-50/50 border-emerald-200/70 text-slate-700'
                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Checkbox */}
              <button
                onClick={() => onToggleComplete(ex.id)}
                className="mt-0.5 sm:mt-0 focus-visible:outline-none"
                title={ex.completed ? 'Marcar como pendiente' : 'Marcar como completado'}
              >
                {ex.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 group-hover:text-slate-400" />
                )}
              </button>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4
                    className={`text-sm font-bold leading-tight ${
                      ex.completed ? 'line-through text-slate-500' : 'text-[#0D2137]'
                    }`}
                  >
                    {ex.title}
                  </h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {ex.category}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {ex.subtitle}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {ex.durationSeconds}s
                  </span>
                  <span>·</span>
                  <span className="font-sans text-slate-600">{ex.repsText}</span>
                </div>
              </div>
            </div>

            {/* Play Guide button */}
            <button
              onClick={() => onOpenPlayer(ex)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E0F2FE] hover:bg-[#00A3E0] text-[#00658D] hover:text-white text-xs font-semibold transition-colors shrink-0"
              title="Iniciar guía guiada con cronómetro"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">Iniciar</span>
            </button>
          </div>
        ))}
      </div>

      {/* Routine Footer tip */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1 text-slate-600">
          <Flame className="w-3.5 h-3.5 text-amber-500" />
          Racha de cumplimiento: 5 días consecutivos
        </span>
        <button
          onClick={onOpenPainTracker}
          className="text-xs font-semibold text-[#00658D] hover:underline"
        >
          Historial de Evolución →
        </button>
      </div>
    </div>
  );
};
