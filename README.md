# SinAlgia - Kinetic Spine & Health System

Plataforma web integral para el centro de rehabilitación kinesiológica, fisioterapia y readaptación postural y deportiva de columna vertebral en Corrientes Capital.

---

## 🌟 Características Principales

- **Cartilla de Profesionales Médicos y Kinesiólogos:** Información detallada de matrículas provinciales (M.P.), especialidades, turnos de atención y vías de contacto directo por WhatsApp y llamada.
- **Sistema de Gestión de Turnos y Consultas:** Modales interactivos para solicitar turnos, seleccionar profesional y tipo de tratamiento.
- **Visualizador Interactivo de Columna Vertebral:** Módulo biomecánico interactivo para identificar áreas de dolor o lesión (cervical, dorsal, lumbar, sacra).
- **Módulo de Ejercicios y Rehabilitación:** Tarjetas y reproductor guiado de rutinas terapéuticas y de fortalecimiento.
- **Seguimiento y Registro de Dolor (Pain Tracker):** Registro de escala de dolor y evolución sintomática para el paciente.
- **Geolocalización y Ubicación:** Mapa interactivo de consultorios en Corrientes Capital con acceso directo a Google Maps e instrucciones de llegada.
- **Contacto Directo:** Enlace rápido a WhatsApp, llamadas telefónicas y formulario de contacto vía correo electrónico.

---

## 🛠️ Stack Tecnológico

- **Frontend:** React 19, TypeScript
- **Estilos:** Tailwind CSS v4
- **Herramienta de Construcción:** Vite
- **Iconografía y Animaciones:** Lucide React, Motion
- **Inteligencia Artificial:** Google Gen AI SDK

---

## 🚀 Instalación y Ejecución Local

### Prerrequisitos
- Node.js (v18 o superior)
- Git

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd kinetic-spine-health-system
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

### 4. Compilar para producción
```bash
npm run build
```
Los archivos estáticos optimizados se generarán en la carpeta `dist/`.

---

## 📁 Estructura del Proyecto

```text
kinetic-spine-health-system/
├── public/                 # Recursos públicos y multimedia
├── src/
│   ├── assets/             # Imágenes clínicas y de profesionales
│   ├── components/         # Componentes modulares de la interfaz
│   │   ├── AppointmentDetailsModal.tsx
│   │   ├── BookingModal.tsx
│   │   ├── BottomNav.tsx
│   │   ├── CorrientesMap.tsx
│   │   ├── EmailContactModal.tsx
│   │   ├── ExercisePlayerModal.tsx
│   │   ├── ExerciseRoutineCard.tsx
│   │   ├── HeroAppointmentCard.tsx
│   │   ├── Navbar.tsx
│   │   ├── PainTrackerModal.tsx
│   │   ├── SinalgiaBookingModal.tsx
│   │   ├── SpineVisualizer.tsx
│   │   ├── TherapistCard.tsx
│   │   ├── TreatmentCard.tsx
│   │   └── TreatmentDetailModal.tsx
│   ├── data/               # Datos simulados y catálogo de tratamientos
│   ├── types/              # Definiciones TypeScript
│   ├── App.tsx             # Componente raíz y navegación
│   ├── index.css           # Estilos globales y Tailwind CSS
│   └── main.tsx            # Punto de entrada de la aplicación
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
