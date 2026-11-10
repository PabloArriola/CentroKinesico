import React, { useState } from 'react';
import { SPECIALISTS, TREATMENTS } from '../data/mockData.ts';
import { Specialist, Treatment, Appointment } from '../types/index.ts';
import { X, Calendar, Clock, ChevronRight, User, Shield, CheckCircle2, ArrowLeft, QrCode, Download, MessageSquare } from 'lucide-react';

interface BookingModalProps {
  initialTreatment?: Treatment | null;
  initialSpecialist?: Specialist | null;
  isOpen: boolean;
  onClose: () => void;
  onAppointmentBooked: (newAppt: Appointment) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  initialTreatment,
  initialSpecialist,
  isOpen,
  onClose,
  onAppointmentBooked,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment>(
    initialTreatment || TREATMENTS[0]
  );
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist>(
    initialSpecialist || SPECIALISTS[0]
  );
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-18');
  const [selectedShift, setSelectedShift] = useState<'Mañana' | 'Tarde'>('Mañana');
  const [selectedTime, setSelectedTime] = useState<string>('10:30');

  // Patient Info
  const [patientName, setPatientName] = useState('Mateo Rossi');
  const [patientDni, setPatientDni] = useState('38.491.205');
  const [patientPhone, setPatientPhone] = useState('+54 9 11 5521-4490');
  const [patientInsurance, setPatientInsurance] = useState('OSDE 310');
  const [painLevel, setPainLevel] = useState<number>(3);
  const [notes, setNotes] = useState('Tratamiento de hernia discal L4-L5');

  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);

  const morningSlots = ['08:30', '09:15', '10:00', '10:45', '11:30', '12:15'];
  const afternoonSlots = ['14:00', '14:45', '15:30', '16:15', '17:00', '18:30'];

  const handleConfirmBooking = () => {
    const newAppt: Appointment = {
      id: `app-${Math.floor(10000 + Math.random() * 90000)}`,
      specialistId: selectedSpecialist.id,
      specialistName: selectedSpecialist.name,
      specialistLicense: selectedSpecialist.license,
      treatmentId: selectedTreatment.id,
      treatmentTitle: selectedTreatment.title,
      date: selectedDate,
      time: selectedTime,
      shift: selectedShift,
      status: 'confirmado',
      patientName,
      patientDni,
      patientPhone,
      patientInsurance,
      initialPainLevel: 8,
      currentPainLevel: painLevel,
      roomNumber: selectedSpecialist.license === 'M.P. 706' ? 'Box 04 - Descompresión' : 'Sala 02 - SGA',
      notes,
    };

    setCreatedAppointment(newAppt);
    onAppointmentBooked(newAppt);
    setStep(5);
  };

  const handleDownloadCalendar = () => {
    if (!createdAppointment) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Kinetic Spine & Health//Cita Medica//ES
BEGIN:VEVENT
SUMMARY:${createdAppointment.treatmentTitle} - Kinetic Spine
DESCRIPTION:Turno con ${createdAppointment.specialistName} (${createdAppointment.specialistLicense}). ${createdAppointment.roomNumber}.
LOCATION:Av. del Libertador 4820, Piso 4, CABA
DTSTART:20261118T133000Z
DTEND:20261118T143000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Turno-KineticSpine-${createdAppointment.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-[#0D2137] text-white">
          <div className="flex items-center gap-2">
            {step > 1 && step < 5 && (
              <button
                onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3 | 4)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white mr-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            )}
            <div>
              <h3 className="text-base font-bold text-white">
                {step === 5 ? '¡Turno Confirmado con Éxito!' : 'Reserva de Turno Kinesiológico'}
              </h3>
              {step < 5 && (
                <p className="text-xs text-slate-300">
                  Paso {step} de 4 · Kinetic Spine & Health System
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Multi-Step Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* STEP 1: Select Treatment */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#0D2137]">
                  1. Selecciona la Especialidad o Tratamiento
                </h4>
                <p className="text-xs text-slate-500">
                  Protocolos personalizados para patología de columna y biomecánica postural.
                </p>
              </div>

              <div className="space-y-2.5">
                {TREATMENTS.map((t) => {
                  const isSelected = selectedTreatment.id === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTreatment(t)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#00A3E0] bg-[#EFF4FF] ring-2 ring-[#00A3E0]/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-[#00A3E0] bg-[#00A3E0]' : 'border-slate-300'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                          <span className="text-sm font-bold text-[#0D2137]">{t.title}</span>
                        </div>
                        <span className="text-xs font-semibold text-slate-500">{t.durationMinutes} min</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 pl-6 line-clamp-2">
                        {t.shortDesc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full h-[52px] rounded-xl bg-[#00A3E0] hover:bg-[#0284C7] text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors mt-4"
              >
                <span>Continuar a Selección de Especialista</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Select Specialist */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#0D2137]">
                  2. Selecciona el Profesional Kinesiólogo
                </h4>
                <p className="text-xs text-slate-500">
                  Profesionales matriculados con dedicación exclusiva en columna y SGA.
                </p>
              </div>

              <div className="space-y-3">
                {SPECIALISTS.map((s) => {
                  const isSelected = selectedSpecialist.id === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setSelectedSpecialist(s)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                        isSelected
                          ? 'border-[#00A3E0] bg-[#EFF4FF] ring-2 ring-[#00A3E0]/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <img
                        src={s.avatar}
                        alt={s.name}
                        className="w-14 h-14 rounded-xl object-cover object-top border border-slate-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-bold text-[#0D2137] truncate">{s.name}</h5>
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#0D2137] text-white">
                            {s.license}
                          </span>
                        </div>
                        <p className="text-xs text-[#00658D] font-medium truncate mt-0.5">{s.role}</p>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          Turno: {s.availableShift} · {s.experienceYears} años de experiencia
                        </p>
                      </div>
                      <span
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-[#00A3E0] bg-[#00A3E0]' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                      </span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setStep(3)}
                className="w-full h-[52px] rounded-xl bg-[#00A3E0] hover:bg-[#0284C7] text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors mt-4"
              >
                <span>Continuar a Fecha y Horario</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 3: Select Date & Time */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#0D2137]">
                  3. Selecciona Fecha y Franja Horaria
                </h4>
                <p className="text-xs text-slate-500">
                  Atención personalizada con intervalos de 45 a 60 minutos por paciente.
                </p>
              </div>

              {/* Date Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">
                  Fecha de la Sesión
                </label>
                <div className="relative">
                  <input
                    type="date"
                    min="2026-11-11"
                    max="2026-12-31"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full h-[52px] px-4 rounded-xl border-[1.5px] border-[#E2E8F0] focus:outline-none focus:border-[#00A3E0] focus:ring-4 focus:ring-[#00A3E0]/15 text-sm font-semibold text-[#0D2137]"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Shift Switcher */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">
                  Franja de Atención
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                  <button
                    onClick={() => setSelectedShift('Mañana')}
                    className={`py-2 text-xs font-bold rounded-lg transition-colors ${
                      selectedShift === 'Mañana'
                        ? 'bg-white text-[#0D2137] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Turno Mañana (08:30 - 13:00)
                  </button>
                  <button
                    onClick={() => setSelectedShift('Tarde')}
                    className={`py-2 text-xs font-bold rounded-lg transition-colors ${
                      selectedShift === 'Tarde'
                        ? 'bg-white text-[#0D2137] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Turno Tarde (14:00 - 19:30)
                  </button>
                </div>
              </div>

              {/* Available Time Slots */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#00A3E0]" />
                  Horarios Disponibles para {selectedShift}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(selectedShift === 'Mañana' ? morningSlots : afternoonSlots).map((slot) => {
                    const isTimeActive = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`h-11 rounded-xl text-xs font-mono font-bold border transition-all ${
                          isTimeActive
                            ? 'bg-[#0D2137] text-white border-[#0D2137] shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                        }`}
                      >
                        {slot} hs
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => setStep(4)}
                className="w-full h-[52px] rounded-xl bg-[#00A3E0] hover:bg-[#0284C7] text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors mt-4"
              >
                <span>Continuar a Datos del Paciente</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 4: Patient Info & Confirmation */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#0D2137]">
                  4. Datos del Paciente y Cobertura
                </h4>
                <p className="text-xs text-slate-500">
                  Convenio con las principales obras sociales y prepagas de primer nivel.
                </p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">
                    Nombre y Apellido
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full h-[52px] px-4 rounded-xl border-[1.5px] border-[#E2E8F0] focus:outline-none focus:border-[#00A3E0] focus:ring-4 focus:ring-[#00A3E0]/15 text-sm font-medium"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">
                      DNI / Documento
                    </label>
                    <input
                      type="text"
                      value={patientDni}
                      onChange={(e) => setPatientDni(e.target.value)}
                      className="w-full h-[52px] px-4 rounded-xl border-[1.5px] border-[#E2E8F0] focus:outline-none focus:border-[#00A3E0] focus:ring-4 focus:ring-[#00A3E0]/15 text-sm font-medium font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">
                      Teléfono Móvil
                    </label>
                    <input
                      type="tel"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full h-[52px] px-4 rounded-xl border-[1.5px] border-[#E2E8F0] focus:outline-none focus:border-[#00A3E0] focus:ring-4 focus:ring-[#00A3E0]/15 text-sm font-medium font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">
                    Cobertura Médica / Prepaga
                  </label>
                  <div className="relative">
                    <select
                      value={patientInsurance}
                      onChange={(e) => setPatientInsurance(e.target.value)}
                      className="w-full h-[52px] px-4 rounded-xl border-[1.5px] border-[#E2E8F0] focus:outline-none focus:border-[#00A3E0] focus:ring-4 focus:ring-[#00A3E0]/15 text-sm font-medium bg-white appearance-none"
                    >
                      <option value="OSDE (210, 310, 410, 450, 510)">OSDE (Convenio Directo sin Coseguro)</option>
                      <option value="Swiss Medical (SMG02, SMG20, SMG50)">Swiss Medical</option>
                      <option value="Galeno (Plata, Oro, Azul)">Galeno</option>
                      <option value="Medifé / Omint">Medifé / Omint</option>
                      <option value="Particular / Reintegro">Particular (Con emisión de Factura para Reintegro)</option>
                    </select>
                    <Shield className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Brief Pain Assessment Slider */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-[#475569] uppercase tracking-wider">
                      Nivel de Dolor Actual (EVA)
                    </label>
                    <span className="font-mono font-bold text-[#00A3E0]">{painLevel} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={painLevel}
                    onChange={(e) => setPainLevel(parseInt(e.target.value, 10))}
                    className="w-full accent-[#0D2137]"
                  />
                </div>
              </div>

              {/* Summary of reservation */}
              <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-slate-200 text-xs space-y-1.5">
                <div className="font-bold text-[#0D2137] text-sm mb-1">Resumen del Turno:</div>
                <div className="text-slate-600">
                  <span className="font-semibold text-slate-800">Tratamiento:</span> {selectedTreatment.title}
                </div>
                <div className="text-slate-600">
                  <span className="font-semibold text-slate-800">Especialista:</span> {selectedSpecialist.name} ({selectedSpecialist.license})
                </div>
                <div className="text-slate-600">
                  <span className="font-semibold text-slate-800">Fecha y Horario:</span> {selectedDate} a las {selectedTime} hs ({selectedShift})
                </div>
              </div>

              <button
                onClick={handleConfirmBooking}
                className="w-full h-[52px] rounded-xl bg-[#00A3E0] hover:bg-[#0284C7] text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors mt-4 shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirmar Reserva de Turno</span>
              </button>
            </div>
          )}

          {/* STEP 5: Success & Booking Pass */}
          {step === 5 && createdAppointment && (
            <div className="space-y-5 text-center py-2 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#00A3E0]">
                  Turno Confirmado
                </span>
                <h4 className="text-xl font-bold text-[#0D2137] tracking-tight mt-1">
                  ¡Reserva completada con éxito!
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Hemos enviado la confirmación y las indicaciones previas a tu teléfono vía WhatsApp y SMS.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="bg-[#0D2137] text-white rounded-2xl p-5 text-left border border-white/10 shadow-lg space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#00A3E0]">
                      PASE DE ATENCIÓN KINÉTICA
                    </span>
                    <h5 className="text-sm font-bold text-white">{createdAppointment.treatmentTitle}</h5>
                  </div>
                  <QrCode className="w-8 h-8 text-white/80" />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">PROFESIONAL</span>
                    <span className="font-bold text-white">{createdAppointment.specialistName}</span>
                    <span className="text-[10px] text-[#00A3E0] block font-mono">{createdAppointment.specialistLicense}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">FECHA Y HORA</span>
                    <span className="font-bold text-white">{createdAppointment.date}</span>
                    <span className="text-slate-300 block font-mono">{createdAppointment.time} hs</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">PACIENTE</span>
                    <span className="font-semibold text-white">{createdAppointment.patientName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">UBICACIÓN</span>
                    <span className="text-white text-[11px]">Av. Libertador 4820 · Piso 4</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
                <button
                  onClick={handleDownloadCalendar}
                  className="w-full sm:flex-1 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4 text-slate-500" />
                  <span>Guardar en Calendario (.ics)</span>
                </button>

                <a
                  href={`https://wa.me/5491138407712?text=Hola,%20acabo%20de%20reservar%20el%20turno%20${createdAppointment.id}%20para%20${encodeURIComponent(createdAppointment.patientName)}%20el%20día%20${createdAppointment.date}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Confirmación por WhatsApp</span>
                </a>
              </div>

              <button
                onClick={onClose}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors pt-1"
              >
                Cerrar ventana y volver
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
