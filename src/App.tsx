import { useState } from 'react';
import { CorrientesMap } from './components/CorrientesMap.tsx';
import { SinalgiaBookingModal } from './components/SinalgiaBookingModal.tsx';
import { EmailContactModal } from './components/EmailContactModal.tsx';
import {
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  Building2,
  Navigation,
  CheckCircle2,
  Clock,
  User,
  Copy,
  Check,
  Award,
  X,
  ExternalLink,
} from 'lucide-react';

interface Professional {
  id: string;
  name: string;
  badge: string;
  badgeType: 'license' | 'specialty';
  title: string;
  specialty: string;
  avatar: string;
  avatarPosition: string;
  statusDot: string;
  statusText: string;
  statusIcon: 'dot' | 'clock' | 'none';
  isLiveAvailable: boolean;
  hours: string;
  phone: string;
  whatsapp: string;
  email: string;
  hasScheduleInterview: boolean;
  bio: string;
  certifications: string[];
}

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedProfIdForBooking, setSelectedProfIdForBooking] = useState<string | undefined>(undefined);

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState({
    name: 'Consultorio Central SinAlgia',
    email: 'contacto@sinalgia.com',
  });

  const [copiedAddress, setCopiedAddress] = useState(false);
  const [selectedProfileModal, setSelectedProfileModal] = useState<Professional | null>(null);

  const professionals: Professional[] = [
    {
      id: 'salazar-emilio',
      name: 'Lic. Salazar Emilio',
      badge: 'M.P. 705',
      badgeType: 'license',
      title: 'Kinesiólogo y Fisiatra • Turno Mañana',
      specialty: 'Columna Vertebral y Deportiva',
      avatar: '/assets/aistudio/WhatsApp_Image_2026-10-29_at_18.35.58_7eb67b41.jpeg',
      avatarPosition: 'object-[center_18%]',
      statusDot: 'bg-emerald-500',
      statusText: 'Disponible ahora',
      statusIcon: 'dot',
      isLiveAvailable: true,
      hours: '08:00 - 12:30 hs',
      phone: '+54 379 481-2290',
      whatsapp: '5493794812290',
      email: 'salazar.emilio@sinalgia.com',
      hasScheduleInterview: false,
      bio: 'Especialista en descompresión axial vertebral, cadenas musculares y rehabilitación kinésica intensiva de lesiones deportivas complejas.',
      certifications: [
        'Diplomatura Superior en Reeducación Postural (UNNE)',
        'Especialista en Ortopedia y Traumatología',
        'Director del Área de Columna Vertebral',
      ],
    },
    {
      id: 'mario-vaz-torres',
      name: 'Lic. Mario E. Vaz Torres',
      badge: 'M.P. 1227',
      badgeType: 'license',
      title: 'Kinesiólogo y Fisiatra • Turno Tarde',
      specialty: 'Traumatología y Readaptación Funcional',
      avatar: '/assets/aistudio/IMG-20261022-WA0009_9b1dfede.jpg',
      avatarPosition: 'object-[center_18%]',
      statusDot: 'bg-[#00658D]',
      statusText: 'En consultorio desde las 15:30 hs',
      statusIcon: 'clock',
      isLiveAvailable: false,
      hours: '15:30 - 20:30 hs',
      phone: '+54 379 482-1140',
      whatsapp: '5493794821140',
      email: 'vaztorres.mario@sinalgia.com',
      hasScheduleInterview: false,
      bio: 'Enfocado en biomecánica articular, recuperación acelerada de cirugías traumatológicas y reinserción al movimiento cotidiano y deportivo.',
      certifications: [
        'Fisioterapia y Kinefilaxia Avanzada',
        'Readaptación Funcional Post-quirúrgica',
        'Terapia Manual Neuromusculoesquelética',
      ],
    },
    {
      id: 'nazarena-zalazar',
      name: 'Lic. Nazarena Zalazar',
      badge: 'M.P. 1795',
      badgeType: 'license',
      title: 'Kinesióloga y Fisiatra • Turno Mañana / Tarde',
      specialty: 'RPG, Columna y Reeducación Postural',
      avatar: '/assets/aistudio/WhatsApp_Image_2026-10-19_at_11.48.03_1cda2771.jpeg',
      avatarPosition: 'object-[center_16%]',
      statusDot: 'bg-emerald-500',
      statusText: 'En consultorio desde las 14:00 hs',
      statusIcon: 'clock',
      isLiveAvailable: true,
      hours: '14:00 - 19:00 hs',
      phone: '+54 379 483-3370',
      whatsapp: '5493794833370',
      email: 'zalazar.nazarena@sinalgia.com',
      hasScheduleInterview: false,
      bio: 'Especialista en corrección global de la postura (RPG), alivio de cervicalgias, escoliosis y dolores posturales crónicos derivados del trabajo o estrés.',
      certifications: [
        'Formación Superior en RPG y Cadenas Miofasciales',
        'Tratamiento Integral de Patologías de Columna',
        'Kinesiología Preventiva y Ergonomía',
      ],
    },
    {
      id: 'constanza-schipani',
      name: 'Lic. Constanza Schipani',
      badge: 'Psicología',
      badgeType: 'specialty',
      title: 'Soporte Interdisciplinario • Manejo de Dolor Crónico',
      specialty: 'Abordaje biopsicosocial del dolor y recuperación',
      avatar: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_16.13.41_81c6198f.jpeg',
      avatarPosition: 'object-[center_18%]',
      statusDot: 'bg-sky-400',
      statusText: 'Atención personalizada',
      statusIcon: 'none',
      isLiveAvailable: false,
      hours: 'Turnos coordinados',
      phone: '+54 379 484-9910',
      whatsapp: '5493794849910',
      email: 'schipani.constanza@sinalgia.com',
      hasScheduleInterview: true,
      bio: 'Acompañamiento psicológico especializado en la modulación del dolor persistente, manejo del estrés, ansiedad somática y adherencia terapéutica.',
      certifications: [
        'Licenciada en Psicología Clínica',
        'Abordaje Cognitivo Conductual del Dolor Crónico',
        'Coordinación Interdisciplinaria SinAlgia',
      ],
    },
  ];

  const handleOpenGps = () => {
    window.open(
      'https://www.google.com/maps/dir/?api=1&destination=Carlos+Pellegrini+627,+Corrientes,+Argentina',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleOpenEmail = (name: string, email: string) => {
    setEmailRecipient({ name, email });
    setIsEmailModalOpen(true);
  };

  const handleBookWith = (profId?: string) => {
    setSelectedProfIdForBooking(profId);
    setIsBookingOpen(true);
  };

  const handleCopyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText('Carlos Pellegrini 627, Corrientes, Argentina');
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7FAFD] via-[#F4F8FB] to-[#EEF5FA] text-[#0B1C30] font-sans antialiased flex flex-col selection:bg-[#00658D]/15 selection:text-[#00658D]">
      {/* Top Header / Official Logo Section */}
      <header className="pt-8 pb-4 text-center px-4 relative">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Official SinAlgia Logo */}
          <div className="flex items-center justify-center gap-3 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-200/90 shadow-[0_4px_16px_rgba(0,101,141,0.06)] hover:shadow-md transition-all">
            <img
              src="/assets/aistudio/images__2__d438bb47.png"
              alt="Logo SinAlgia"
              className="h-10 sm:h-11 w-auto object-contain"
            />
            <div className="h-6 w-px bg-slate-200 mx-1" />
            <div className="flex flex-col text-left">
              <span className="text-[12px] font-black tracking-[0.22em] text-[#00658D] uppercase leading-none">
                SINALGIA
              </span>
              <span className="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase leading-tight mt-0.5">
                TURNOS
              </span>
            </div>
          </div>

          {/* Page Title CONTACTOS en Negrita Destacada */}
          <h1 className="text-4xl sm:text-5xl md:text-[52px] font-black text-[#0B1C30] tracking-tight mt-6 leading-none uppercase">
            CONTACTOS
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2.5 max-w-xl mx-auto px-4 leading-relaxed font-normal">
            Estamos a tu disposición en nuestro consultorio central y vías directas de atención personalizada.
          </p>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6 space-y-8">
        {/* Section 1: 4 Profesionales (Sección Profesionales a Cargo y Equipo Directo ELIMINADA por solicitud) */}
        <section aria-label="Tarjetas de contacto de profesionales">
          {/* 2x2 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {professionals.map((prof) => (
              <div
                key={prof.id}
                className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-[0_4px_24px_rgba(13,33,55,0.04)] hover:shadow-[0_12px_32px_rgba(0,101,141,0.10)] hover:border-[#00658D]/30 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Subtle top brand hairline accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00658D]/20 to-transparent group-hover:via-[#00658D] transition-all duration-500" />

                <div>
                  {/* Avatar + Info Header */}
                  <div className="flex items-start gap-4 sm:gap-5">
                    {/* Real Avatar Photo with status dot and click-to-preview */}
                    <div
                      onClick={() => setSelectedProfileModal(prof)}
                      className="relative shrink-0 cursor-pointer group/avatar"
                      title="Ver ficha del profesional"
                    >
                      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden shadow-md ring-2 ring-white ring-offset-2 ring-offset-[#00658D]/20 group-hover/avatar:ring-offset-[#00658D]/50 transition-all duration-300 bg-slate-100">
                        <img
                          src={prof.avatar}
                          alt={prof.name}
                          className={`w-full h-full object-cover ${prof.avatarPosition} group-hover/avatar:scale-110 transition-transform duration-500`}
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Online Status Live Dot */}
                      <span
                        className="absolute -bottom-1 -right-1 flex h-4 w-4"
                        title={prof.statusText || 'Estado'}
                      >
                        {prof.isLiveAvailable && (
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        )}
                        <span
                          className={`relative inline-flex rounded-full h-4 w-4 border-2 border-white ${prof.statusDot} shadow-xs`}
                        />
                      </span>
                    </div>

                    {/* Names, Title & Specialism */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3
                          onClick={() => setSelectedProfileModal(prof)}
                          className="text-base sm:text-lg font-bold text-[#0B1C30] hover:text-[#00658D] transition-colors truncate cursor-pointer"
                        >
                          {prof.name}
                        </h3>
                        <span
                          className={`text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full shrink-0 border ${
                            prof.badgeType === 'license'
                              ? 'bg-[#E0F2FE] text-[#00658D] border-[#BAE6FD] font-mono'
                              : 'bg-[#F0FDF4] text-emerald-700 border-emerald-200'
                          }`}
                        >
                          {prof.badge}
                        </span>
                      </div>

                      <p className="text-xs text-[#00658D] font-semibold mt-0.5 truncate">
                        {prof.title}
                      </p>

                      <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1.5">
                        {prof.hasScheduleInterview ? (
                          <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        )}
                        <span className="truncate">
                          {prof.hasScheduleInterview ? '' : 'Espec: '}{prof.specialty}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status & Schedule Bar (for Kinesiologists) */}
                  {!prof.hasScheduleInterview && (
                    <div className="bg-[#F1F6F9] border border-slate-200/60 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs my-4 shadow-2xs">
                      <div className="flex items-center gap-2 text-slate-800 font-medium">
                        {prof.statusIcon === 'clock' ? (
                          <Clock className="w-3.5 h-3.5 text-[#00658D] shrink-0" />
                        ) : (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                          </span>
                        )}
                        <span className="text-[11px] sm:text-xs">{prof.statusText}</span>
                      </div>
                      <span className="text-[11px] sm:text-xs text-slate-600 font-mono font-bold bg-white px-2 py-0.5 rounded-md border border-slate-200/80">
                        {prof.hours}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons Row: Mejorada la tipografía, espaciado y márgenes para que ningún texto quede afuera */}
                <div
                  className={`flex items-center gap-2 sm:gap-2.5 ${
                    prof.hasScheduleInterview ? 'mt-6 sm:mt-8' : 'mt-2'
                  }`}
                >
                  {!prof.hasScheduleInterview ? (
                    <>
                      {/* WhatsApp Button */}
                      <a
                        href={`https://wa.me/${prof.whatsapp}?text=Hola%20${encodeURIComponent(prof.name)},%20quisiera%20consultar%20por%20un%20turno%20en%20SinAlgia`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-0 h-11 px-2.5 sm:px-3 rounded-xl bg-gradient-to-r from-[#00658D] to-[#005273] hover:from-[#005172] hover:to-[#00405c] active:scale-[0.98] text-white text-[11px] sm:text-xs font-bold tracking-tight flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer shadow-[0_4px_14px_rgba(0,101,141,0.25)] hover:shadow-[0_6px_20px_rgba(0,101,141,0.35)]"
                      >
                        <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                        <span className="truncate">Consulta WhatsApp</span>
                      </a>

                      {/* Call Button */}
                      <a
                        href={`tel:${prof.phone.replace(/[^0-9+]/g, '')}`}
                        className="h-11 px-3 sm:px-4 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] active:scale-95 text-[#00658D] border border-[#BFDBFE]/70 text-[11px] sm:text-xs font-bold tracking-tight flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer shadow-2xs shrink-0"
                      >
                        <Phone className="w-3.5 h-3.5 shrink-0" />
                        <span className="whitespace-nowrap">Llamar</span>
                      </a>

                      {/* Email Button */}
                      <button
                        type="button"
                        onClick={() => handleOpenEmail(prof.name, prof.email)}
                        className="h-11 w-11 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] active:scale-95 text-[#00658D] border border-[#BFDBFE]/70 flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-2xs"
                        title="Enviar correo"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Psicología: Consulta WhatsApp */}
                      <a
                        href={`https://wa.me/${prof.whatsapp}?text=Hola%20${encodeURIComponent(prof.name)},%20quisiera%20consultar%20por%20atención%20psicológica%20del%20dolor%20en%20SinAlgia`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-0 h-11 px-2.5 sm:px-3 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] active:scale-95 text-[#00658D] border border-[#BFDBFE]/70 text-[11px] sm:text-xs font-bold tracking-tight flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer shadow-2xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                        <span className="truncate">Consulta WhatsApp</span>
                      </a>

                      {/* Psicología: Agendar Entrevista */}
                      <button
                        type="button"
                        onClick={() => handleBookWith(prof.id)}
                        className="flex-1 min-w-0 h-11 px-2.5 sm:px-3 rounded-xl bg-gradient-to-r from-[#00658D] to-[#005273] hover:from-[#005172] hover:to-[#00405c] active:scale-[0.98] text-white text-[11px] sm:text-xs font-bold tracking-tight flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer shadow-[0_4px_14px_rgba(0,101,141,0.25)] hover:shadow-[0_6px_20px_rgba(0,101,141,0.35)]"
                      >
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                        <span className="truncate">Agendar Entrevista</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Ubicación & Consultorio */}
        <section aria-labelledby="ubicacion-title" className="pt-2">
          <div className="flex items-center gap-2 mb-4 px-1">
            <div className="w-2.5 h-2.5 rounded-full bg-[#00658D]" />
            <h2 id="ubicacion-title" className="text-lg sm:text-xl font-bold text-[#0B1C30] tracking-tight">
              Ubicación & Consultorio
            </h2>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-[0_4px_24px_rgba(13,33,55,0.06)] p-4 sm:p-6 lg:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left side: Real Interactive Google Map */}
            <div className="lg:col-span-6 w-full">
              <CorrientesMap onOpenGps={handleOpenGps} />
            </div>

            {/* Right side: Clinic description and Action buttons */}
            <div className="lg:col-span-6 space-y-4 lg:pl-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#00658D] flex items-center justify-center border border-[#BFDBFE]/60 shadow-xs">
                    <Building2 className="w-5 h-5 text-[#00658D]" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0B1C30] leading-tight">
                      Consultorio Central SinAlgia
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">Carlos Pellegrini 627, Corrientes</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#E0F2FE] text-[#00658D] border border-[#BAE6FD]">
                    Zona Centro
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Centro de kinesiología y rehabilitación de alta complejidad. Espacios diseñados para tu recuperación integral, confort y privacidad durante cada sesión terapéutica.
              </p>

              {/* Highlights pills */}
              <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-600 font-medium">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Rampa de acceso adaptado
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-200/70">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                  Boxes individuales climatizados
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
                  Descompresión axial vertebral
                </span>
              </div>

              {/* Quick details chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 pt-1">
                <div
                  onClick={handleCopyAddress}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer group"
                  title="Copiar dirección exacta"
                >
                  <span className="text-[11px] font-semibold text-slate-600">Carlos Pellegrini 627</span>
                  <span className="text-[11px] font-bold text-[#00658D] inline-flex items-center gap-1">
                    {copiedAddress ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                        <span>Copiar</span>
                      </>
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-600">Horario de Atención</span>
                  <span className="text-[11px] font-bold text-slate-800 font-mono">08:00 - 20:30 hs</span>
                </div>
              </div>

              {/* Action Buttons: Direct GPS navigation anchor, WhatsApp and Email */}
              <div className="pt-2 flex items-center gap-2.5 flex-wrap">
                {/* Cómo llegar (GPS) direct anchor tag - Never blocked by popup blockers */}
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Carlos+Pellegrini+627,+Corrientes,+Argentina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-4 sm:px-5 rounded-xl bg-gradient-to-r from-[#00658D] to-[#005273] hover:from-[#005172] hover:to-[#00405c] active:scale-[0.98] text-white text-[11px] sm:text-xs font-bold tracking-tight inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_4px_14px_rgba(0,101,141,0.25)] flex-1 sm:flex-initial"
                  title="Abrir indicaciones en Google Maps"
                >
                  <Navigation className="w-4 h-4 shrink-0 text-[#7dd3fc]" />
                  <span className="whitespace-nowrap">Cómo llegar (GPS)</span>
                </a>

                {/* WhatsApp button */}
                <a
                  href="https://wa.me/5493794812290?text=Hola%20SinAlgia,%20quisiera%20hacer%20una%20consulta%20sobre%20atenci%C3%B3n%20y%20ubicaci%C3%B3n."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 active:scale-95 text-emerald-700 border border-emerald-200 text-[11px] sm:text-xs font-bold tracking-tight inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
                  title="Consultar por WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span className="whitespace-nowrap">WhatsApp</span>
                </a>

                {/* Email button */}
                <button
                  type="button"
                  onClick={() => handleOpenEmail('Consultorio Central SinAlgia', 'contacto@sinalgia.com')}
                  className="h-11 px-4 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] active:scale-95 text-[#00658D] border border-[#BFDBFE]/70 text-[11px] sm:text-xs font-bold tracking-tight inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
                  title="Enviar consulta por correo electrónico"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span className="whitespace-nowrap">Email</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Text matching brand specification */}
        <footer className="text-center pt-8 pb-24 space-y-2">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <img
              src="/assets/aistudio/images__2__d438bb47.png"
              alt="SinAlgia"
              className="h-6 w-auto opacity-70"
            />
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider leading-relaxed max-w-2xl mx-auto">
            SINALGIA – CENTRO DE REHABILITACIÓN ESPECIALIZADO EN
            <br />
            COLUMNA Y TRAUMATOLOGÍA DEPORTIVA CON
            <br />
            ACOMPAÑAMIENTO PSICOLÓGICO.
          </p>
          <p className="text-[10px] text-slate-400">
            Carlos Pellegrini 627 · Corrientes Capital · Argentina
          </p>
        </footer>
      </main>

      {/* Floating Bottom Button: Reservar */}
      <aside
        aria-label="Acceso rápido a reservas"
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center group cursor-pointer"
        onClick={() => handleBookWith()}
      >
        <div className="relative">
          <span className="absolute -inset-1 rounded-full bg-[#00658D] opacity-30 group-hover:opacity-60 blur-xs animate-pulse transition-opacity" />
          <button
            type="button"
            className="relative w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-gradient-to-tr from-[#00658D] to-[#0284C7] group-hover:from-[#005172] group-hover:to-[#0369A1] active:scale-95 text-white shadow-[0_10px_30px_rgba(0,101,141,0.40)] flex items-center justify-center transition-all cursor-pointer ring-4 ring-white"
            title="Reservar Turno en SinAlgia"
          >
            <Calendar className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>
        <span className="text-[11px] font-black text-[#0B1C30] tracking-wide mt-1.5 drop-shadow-xs bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-slate-200/80 shadow-2xs">
          Reservar
        </span>
      </aside>

      {/* Professional Bio Lightbox Modal */}
      {selectedProfileModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedProfileModal(null)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with photo cover */}
            <div className="relative bg-gradient-to-r from-[#00658D] to-[#004e6e] p-6 text-white">
              <button
                type="button"
                onClick={() => setSelectedProfileModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-white/30 shadow-lg bg-white shrink-0">
                  <img
                    src={selectedProfileModal.avatar}
                    alt={selectedProfileModal.name}
                    className={`w-full h-full object-cover ${selectedProfileModal.avatarPosition}`}
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white font-mono">
                    {selectedProfileModal.badge}
                  </span>
                  <h3 className="text-lg font-bold text-white leading-tight mt-1">
                    {selectedProfileModal.name}
                  </h3>
                  <p className="text-xs text-white/80 mt-0.5">
                    {selectedProfileModal.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Sobre el Profesional
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedProfileModal.bio}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Especializaciones y Avales
                </h4>
                <div className="space-y-1.5">
                  {selectedProfileModal.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Award className="w-3.5 h-3.5 text-[#00658D] shrink-0 mt-0.5" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex items-center gap-2">
                <a
                  href={`https://wa.me/${selectedProfileModal.whatsapp}?text=Hola%20${encodeURIComponent(selectedProfileModal.name)},%20quisiera%20consultar%20por%20un%20turno%20en%20SinAlgia`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-11 px-3 rounded-xl bg-gradient-to-r from-[#00658D] to-[#005273] hover:from-[#005172] hover:to-[#00405c] text-white text-[11px] sm:text-xs font-bold tracking-tight flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span className="whitespace-nowrap">WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const profId = selectedProfileModal.id;
                    setSelectedProfileModal(null);
                    handleBookWith(profId);
                  }}
                  className="flex-1 h-11 px-3 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#00658D] border border-[#BFDBFE]/70 text-[11px] sm:text-xs font-bold tracking-tight flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span className="whitespace-nowrap">Solicitar Turno</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <SinalgiaBookingModal
        isOpen={isBookingOpen}
        initialProfessionalId={selectedProfIdForBooking}
        onClose={() => setIsBookingOpen(false)}
      />

      <EmailContactModal
        isOpen={isEmailModalOpen}
        recipientName={emailRecipient.name}
        recipientEmail={emailRecipient.email}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </div>
  );
}
