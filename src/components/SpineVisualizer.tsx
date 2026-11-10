import React, { useState } from 'react';
import { SPINE_VERTEBRAE } from '../data/mockData.ts';
import { SpineVertebra } from '../types/index.ts';
import { Check, ShieldCheck, ArrowRight, Zap, AlertCircle } from 'lucide-react';

interface SpineVisualizerProps {
  onSelectTreatmentForSpine: (treatmentName: string) => void;
  onOpenBooking: () => void;
}

export const SpineVisualizer: React.FC<SpineVisualizerProps> = ({
  onSelectTreatmentForSpine,
  onOpenBooking,
}) => {
  const [selectedVertebra, setSelectedVertebra] = useState<SpineVertebra>(
    SPINE_VERTEBRAE[2] // Default to Lumbar L1-L5
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_rgba(13,33,55,0.04)] overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00A3E0]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#00658D]">
              Atlas Biomecánico & Mapa Neurológico
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0D2137] tracking-tight mt-1">
            Explorador Interactivo de Columna Vertebral
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Selecciona un segmento para visualizar las raíces nerviosas comprometidas y el abordaje kinesiológico sugerido.
          </p>
        </div>

        {/* Segment selection buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          {SPINE_VERTEBRAE.map((v) => {
            const isSelected = selectedVertebra.id === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setSelectedVertebra(v)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 ${
                  isSelected
                    ? 'bg-[#0D2137] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                {v.region}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Visual Area: 3D Spine Graphic with Interactive Pins */}
        <div className="lg:col-span-5 relative bg-[#091523] p-6 flex flex-col justify-between min-h-[380px] overflow-hidden">
          {/* High-res 3D medical visual background */}
          <img
            src="/src/assets/images/spine_biomechanics_lumbar_1794320056372.jpg"
            alt="Biomedical 3D Lumbar Spine Visualization"
            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#091523] via-[#091523]/40 to-transparent pointer-events-none" />

          {/* Spine anatomical level indicators on left edge */}
          <div className="relative z-10 flex flex-col gap-2">
            <span className="text-[10px] font-mono tracking-widest text-[#00A3E0] uppercase">
              // BIOMECHANICS 3D VIEW
            </span>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white w-fit">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00A3E0] animate-pulse" />
              <span className="text-xs font-mono font-bold">{selectedVertebra.code}</span>
              <span className="text-xs text-slate-300">· {selectedVertebra.region}</span>
            </div>
          </div>

          {/* Interactive Vertebrae Markers */}
          <div className="relative z-10 py-12 flex flex-col items-center justify-center gap-4">
            <div className="w-full max-w-xs space-y-2">
              {SPINE_VERTEBRAE.map((vert) => {
                const active = vert.id === selectedVertebra.id;
                return (
                  <button
                    key={vert.id}
                    onClick={() => setSelectedVertebra(vert)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                      active
                        ? 'bg-[#00A3E0]/25 border-[#00A3E0] text-white backdrop-blur-md shadow-lg shadow-[#00A3E0]/10'
                        : 'bg-black/40 border-white/10 text-slate-300 hover:bg-black/60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${active ? 'bg-[#00A3E0]' : 'bg-slate-500'}`} />
                      <span className="font-bold font-mono">{vert.code}</span>
                      <span className="text-slate-300">{vert.region}</span>
                    </div>
                    {active && <span className="text-[10px] uppercase font-bold text-[#41BEFD]">Activo</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom badge */}
          <div className="relative z-10 bg-black/50 backdrop-blur-md rounded-xl p-3 border border-white/10 text-[11px] text-slate-300">
            <span className="text-[#00A3E0] font-bold">Tecnología de Descompresión:</span> Monitoreo computarizado de distracción axial con feedback neuromuscular continuo.
          </div>
        </div>

        {/* Right Details Panel: Pathologies, Symptoms, and Therapy Protocol */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-[#00A3E0] uppercase tracking-wider font-mono">
                  {selectedVertebra.code}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0D2137]">
                  {selectedVertebra.name}
                </h3>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-[#E0F2FE] text-[#00658D] font-bold">
                {selectedVertebra.region}
              </span>
            </div>

            {/* Innervation & Anatomical Context */}
            <div className="mt-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Zonas Inervadas & Irradiación
              </h4>
              <p className="text-sm font-medium text-slate-800 mt-1">
                {selectedVertebra.innervatedAreas.join(' · ')}
              </p>
            </div>

            {/* Symptoms & Pathologies 2-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
              <div className="bg-[#F8FAFC] rounded-xl p-4 border border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0D2137] mb-2">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                  <span>Síntomas Habituales</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {selectedVertebra.symptoms.map((sym, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#F8FAFC] rounded-xl p-4 border border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0D2137] mb-2">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Patologías Clínicas</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {selectedVertebra.commonPathologies.map((patho, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{patho}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommended Treatments & Exercise Prescription */}
            <div className="mt-5 space-y-3">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Abordaje Kinesiológico Recomendado
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedVertebra.recommendedTreatments.map((treat, i) => (
                    <button
                      key={i}
                      onClick={() => onSelectTreatmentForSpine(treat)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#E0F2FE] hover:bg-[#00A3E0] text-[#00658D] hover:text-white transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{treat}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-xl p-3.5 text-xs text-emerald-900">
                <span className="font-bold flex items-center gap-1 mb-1 text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Pauta Activa Domiciliaria:
                </span>
                {selectedVertebra.exerciseRecommendation}
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              ¿Presentas molestias en el segmento {selectedVertebra.code}?
            </span>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00A3E0] hover:bg-[#0284C7] text-white text-xs sm:text-sm font-bold transition-colors shadow-xs"
            >
              <span>Agendar Evaluación de {selectedVertebra.region}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
