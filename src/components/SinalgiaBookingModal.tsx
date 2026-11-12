import React, { useState, useEffect } from 'react';
import { X, Calendar, User, CheckCircle2, Phone, MessageSquare } from 'lucide-react';

interface SinalgiaBookingModalProps {
  isOpen: boolean;
  initialProfessionalId?: string;
  onClose: () => void;
}

export const SinalgiaBookingModal: React.FC<SinalgiaBookingModalProps> = ({
  isOpen,
  initialProfessionalId,
  onClose,
}) => {
  const professionals = [
    {
      id: 'emilio-zalazar',
      name: 'Lic. Emilio Zalazar',
      license: 'M.P. 1217',
      role: 'Kinesiólogo y Fisiatra • Turno Mañana',
      specialty: 'Kinesiología Deportiva, Ortopedia y Postura',
      avatar: '/assets/aistudio/WhatsApp_Image_2026-10-29_at_18.35.58_7eb67b41.jpeg',
      avatarPosition: 'object-[center_18%]',
      phone: '+54 379 479-0988',
      whatsapp: '5493794790988',
      shifts: ['08:00', '08:45', '09:30', '10:15', '11:00', '11:45'],
    },
    {
      id: 'mario-vaz-torres',
      name: 'Lic. Mario E. Vaz Torres',
      license: 'M.P. 1227',
      role: 'Kinesiología y Fisioterapia • Turno Tarde',
      specialty: 'Rehabilitación Postural Global (RPG)',
      avatar: '/assets/aistudio/IMG-20261022-WA0009_9b1dfede.jpg',
      avatarPosition: 'object-[center_18%]',
      phone: '+54 351 599-1555',
      whatsapp: '5493515991555',
      shifts: ['15:30', '16:15', '17:00', '17:45', '18:30', '19:15', '20:00'],
    },
    {
      id: 'nazarena-zalazar',
      name: 'Lic. Nazarena Zalazar',
      license: 'M.P. 1795',
      role: 'Kinesióloga y Fisiatra • Turno Mañana / Tarde',
      specialty: 'Kinesiología Dermatofuncional',
      avatar: '/assets/aistudio/WhatsApp_Image_2026-10-19_at_11.48.03_1cda2771.jpeg',
      avatarPosition: 'object-[center_16%]',
      phone: '+54 379 479-1008',
      whatsapp: '5493794791008',
      shifts: ['14:00', '14:45', '15:30', '16:15', '17:00', '18:00'],
    },
    {
      id: 'constanza-schipani',
      name: 'Lic. Constanza Schipani',
      license: 'M.P. 1274 (Mnes) · M.P. 1564 (Ctes)',
      role: 'Psicología Clínica • Manejo de Dolor Crónico',
      specialty: 'Salud Mental, Crisis de Pánico y Dolor',
      avatar: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_16.13.41_81c6198f.jpeg',
      avatarPosition: 'object-[center_18%]',
      phone: '+54 362 470-7973',
      whatsapp: '5493624707973',
      shifts: ['10:00', '11:30', '16:00', '17:30', '19:00'],
    },
  ];

  const [selectedProfId, setSelectedProfId] = useState(
    initialProfessionalId || professionals[0].id
  );
  const [selectedDate, setSelectedDate] = useState('2026-11-12');
  const [selectedTime, setSelectedTime] = useState('09:30');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [consultReason, setConsultReason] = useState('Dolor de columna / Rehabilitación');
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (initialProfessionalId) {
      const match = professionals.find(
        (p) => p.id === initialProfessionalId || (initialProfessionalId === 'salazar-emilio' && p.id === 'emilio-zalazar')
      );
      if (match) setSelectedProfId(match.id);
    }
  }, [initialProfessionalId]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentProf =
    professionals.find((p) => p.id === selectedProfId) || professionals[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-gradient-to-r from-[#00658D] to-[#005172] text-white">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/images__2__d438bb47.png"
              alt="SinAlgia"
              className="w-9 h-9 rounded-full bg-white p-1 object-contain shadow-xs"
            />
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                {confirmed ? 'Turno Confirmado' : 'Reservar Turno en SinAlgia'}
              </h3>
              <p className="text-xs text-white/80">
                Consultorio Central · Carlos Pellegrini 627, Corrientes
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {!confirmed ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Select Professional */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Seleccionar Profesional
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {professionals.map((prof) => {
                    const isSelected = selectedProfId === prof.id;
                    return (
                      <div
                        key={prof.id}
                        onClick={() => {
                          setSelectedProfId(prof.id);
                          setSelectedTime(prof.shifts[0]);
                        }}
                        className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'border-[#00658D] bg-[#EFF6FF] ring-2 ring-[#00658D]/20 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-2xs border border-white">
                          <img
                            src={prof.avatar}
                            alt={prof.name}
                            className={`w-full h-full object-cover ${prof.avatarPosition}`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-[#0B1C30] truncate">
                            {prof.name}
                          </div>
                          <div className="text-[10px] font-bold text-[#00658D] truncate">
                            {prof.license}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate mt-0.5">
                            {prof.specialty}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Fecha Deseada
                  </label>
                  <input
                    type="date"
                    min="2026-11-10"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full h-11 px-3 text-xs font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00658D]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Horario de Turno
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full h-11 px-3 text-xs font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00658D] bg-white cursor-pointer"
                  >
                    {currentProf.shifts.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot} hs ({currentProf.name.split(' ')[1] || 'SinAlgia'})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Patient Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Nombre del Paciente
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Marcelo Fernández"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full h-11 px-3 text-xs font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00658D]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="Ej: 379 481 2290"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full h-11 px-3 text-xs font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00658D]"
                    required
                  />
                </div>
              </div>

              {/* Motivo de consulta */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Motivo de Consulta o Diagnóstico
                </label>
                <input
                  type="text"
                  placeholder="Ej: Dolor lumbar, hernia discal, post-quirúrgico, RPG..."
                  value={consultReason}
                  onChange={(e) => setConsultReason(e.target.value)}
                  className="w-full h-11 px-3 text-xs font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00658D]"
                />
              </div>

              {/* Action Button: tipografía limpia y sin desbordes */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-12 px-4 rounded-xl bg-gradient-to-r from-[#00658D] to-[#005172] hover:from-[#005172] hover:to-[#00405c] active:scale-[0.98] text-white text-[12px] sm:text-xs font-bold tracking-tight flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_4px_14px_rgba(0,101,141,0.25)]"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span className="truncate">Confirmar Solicitud de Turno</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-[#0B1C30]">
                  ¡Turno Solicitado Correctamente!
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                  Nos comunicaremos a la brevedad al{' '}
                  <span className="font-semibold text-[#0B1C30]">
                    {patientPhone || 'tu teléfono'}
                  </span>{' '}
                  para validar tu turno en SinAlgia.
                </p>
              </div>

              <div className="bg-[#EFF6FF] border border-[#BFDBFE]/60 rounded-2xl p-4 text-left text-xs space-y-2 text-slate-700">
                <div className="flex items-center gap-3 pb-2 border-b border-[#BFDBFE]/40">
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 shadow-xs">
                    <img
                      src={currentProf.avatar}
                      alt={currentProf.name}
                      className={`w-full h-full object-cover ${currentProf.avatarPosition}`}
                    />
                  </div>
                  <div>
                    <span className="font-bold text-[#0B1C30] block">{currentProf.name}</span>
                    <span className="text-[11px] text-[#00658D] font-medium">{currentProf.license}</span>
                  </div>
                </div>
                <div>
                  <span className="font-bold text-[#0B1C30]">Fecha y Hora:</span> {selectedDate} a las {selectedTime} hs
                </div>
                <div>
                  <span className="font-bold text-[#0B1C30]">Lugar:</span> Carlos Pellegrini 627, Corrientes Capital
                </div>
                {consultReason && (
                  <div>
                    <span className="font-bold text-[#0B1C30]">Motivo:</span> {consultReason}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <a
                  href={`https://wa.me/${currentProf.whatsapp}?text=Hola%20${encodeURIComponent(currentProf.name)},%20acabo%20de%20solicitar%20un%20turno%20para%20el%20${selectedDate}%20a%20las%20${selectedTime}%20hs.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-11 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] sm:text-xs font-bold tracking-tight inline-flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span className="whitespace-nowrap">Avisar por WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] sm:text-xs font-bold tracking-tight transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
