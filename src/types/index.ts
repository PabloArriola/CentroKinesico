export interface Specialist {
  id: string;
  name: string;
  title: string;
  role: string;
  license: string; // e.g. "M.P. 706"
  specialties: string[];
  avatar: string;
  phone: string;
  whatsapp: string;
  email: string;
  rating: number;
  reviewsCount: number;
  availableShift: 'Mañana' | 'Tarde' | 'Completo';
  bio: string;
  education: string;
  experienceYears: number;
}

export interface Treatment {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: 'Columna' | 'SGA & Postura' | 'Deportiva' | 'Diagnóstico';
  durationMinutes: number;
  indications: string[];
  contraindications?: string[];
  benefits: string[];
  image: string;
  iconName: string;
  highlighted?: boolean;
}

export interface Appointment {
  id: string;
  specialistId: string;
  specialistName: string;
  specialistLicense: string;
  treatmentId: string;
  treatmentTitle: string;
  date: string; // "2026-11-14"
  time: string; // "10:30"
  shift: 'Mañana' | 'Tarde';
  status: 'confirmado' | 'pendiente' | 'completado' | 'cancelado';
  patientName: string;
  patientDni: string;
  patientPhone: string;
  patientInsurance: string; // "OSDE 310", "Swiss Medical", etc.
  initialPainLevel: number; // 1-10
  currentPainLevel: number; // 1-10
  roomNumber: string;
  notes?: string;
}

export interface ExerciseItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'SGA' | 'Descompresión' | 'Estabilidad Core' | 'Movilidad';
  targetSpineZone: 'Cervical' | 'Dorsal' | 'Lumbar' | 'Pélvico';
  durationSeconds: number;
  repsText: string;
  instructions: string[];
  clinicalCues: string[];
  warningNote: string;
  completed: boolean;
  image: string;
}

export interface SpineVertebra {
  id: string;
  code: string; // e.g. "L4-L5"
  name: string;
  region: 'Cervical' | 'Torácica' | 'Lumbar' | 'Sacro-Coxis';
  innervatedAreas: string[];
  commonPathologies: string[];
  symptoms: string[];
  recommendedTreatments: string[];
  exerciseRecommendation: string;
}

export interface PainLogEntry {
  date: string;
  dayLabel: string;
  painScore: number; // 1 to 10
  zone: string;
  notes: string;
}
