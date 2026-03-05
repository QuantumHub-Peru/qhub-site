import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleNetwork from "@/components/ParticleNetwork";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";
import { Book, Clock, Users, ArrowRight, Download, GraduationCap, Target, Award, CheckCircle, ChevronRight, ChevronLeft, PlayCircle, CalendarPlus, MapPin } from "lucide-react";
import { useState, useRef } from "react";
import aprendiendoImg from "@/gato/aprendiendo.png";
import LatamGlobe from "@/components/LatamGlobe";
import QuantumMolecule from '@/components/QuantumMolecule';
import modulo1Img from "@/gato/modelo1.png";
import modulo2Img from "@/gato/modulo2.png";
import modulo3Img from "@/gato/modulo3.png";
import teoriaImg from "@/gato/teoria.png";
import laboratorioImg from "@/gato/laboratorio.png";
import horasImg from "@/gato/74.png";
import teacherImg from "@/gato/teacher.png";

// Modules Data
const modules = [
  {
    id: "Módulo 1",
    title: "Álgebra Lineal y Pensamiento Computacional",
    period: "28 de marzo - 25 de abril",
    target: "Recomendado para escolares y universitarios en etapa temprana.",
    description: "La edición 2026-I no exige experiencia académica científica para iniciar este módulo, pero sí disposición a alcanzar una base matemática. Sirve como preparación al examen de ingreso al Módulo 2, siendo su participación también considerada en la calificación final.",
    tags: [
      { text: "🏫 Escolares y Universitarios", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
      { text: "4 Semanas", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
      { text: "Nivelatorio", color: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" }
    ],
    temas: [
      "Números complejos y matrices",
      "Espacios vectoriales, bases y cambio de base",
      "Autovalores, autovectores y diagonalización",
      "Pseudocódigo, estructura de datos y algoritmos en Python"
    ],
    prerrequisitos: "Ninguno específico. Disposición para aprender matemáticas.",
    image: modulo1Img
  },
  {
    id: "Módulo 2",
    title: "Fundamentos de Computación Cuántica",
    period: "4 de mayo - 6 de junio",
    target: "Basado en examen de ingreso del 25 de abril.",
    description: "Quienes consideren tener la base necesaria podrán tomar el examen de ingreso a este módulo directamente, sin llevar el Módulo 1. A través de redes sociales se publicarán exámenes pasados para el nivel propuesto.",
    tags: [
      { text: "Examen 25 de Abril", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
      { text: "5 Semanas", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
      { text: "Fundamentos", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" }
    ],
    temas: [
      "Qubits, superposición y representación en la esfera de Bloch",
      "Puertas cuánticas y operadores unitarios",
      "Postulado de medida, regla de Born, efectos de la medición",
      "Sistemas de dos qubits, productos tensoriales y entrelazamiento",
      "Prácticas con Qiskit en circuitos básicos"
    ],
    prerrequisitos: "Aprobar el Modulo 1 o el Examen de Ingreso del 25 de abril.",
    image: modulo2Img
  },
  {
    id: "Módulo 3",
    title: "Circuitos, Protocolos y Algoritmos",
    period: "8 de junio - 11 de julio",
    target: "Alumnos que aprobaron Módulo 2.",
    description: "Profundiza en los algoritmos más representativos de la computación cuántica, su ventaja comparativa con la computación clásica, y culmina en los principales protocolos y la transformada de Fourier.",
    tags: [
      { text: "Continuidad", color: "bg-primary/10 text-primary border-primary/20" },
      { text: "5 Semanas", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
      { text: "Avanzado", color: "bg-quantum-pink/10 text-quantum-pink border-quantum-pink/20" }
    ],
    temas: [
      "Circuitos cuánticos y compuertas cuánticas controladas",
      "Teleportación cuántica y Codificación superdensa",
      "Algoritmos de Deutsch y Grover: comparación clásica",
      "Transformada de Fourier Cuántica (QFT) y algoritmo de Shor"
    ],
    prerrequisitos: "Módulo 2 aprobado de forma satisfactoria.",
    image: modulo3Img
  }
];

const tabs = [
  { id: "intro", label: "El Programa", icon: <Target className="w-5 h-5" /> },
  { id: "modulos", label: "Plan Académico", icon: <Book className="w-5 h-5" /> },
  { id: "modalidad", label: "Modalidad", icon: <Clock className="w-5 h-5" /> },
  { id: "docentes", label: "Docentes", icon: <Users className="w-5 h-5" /> },
  { id: "evaluacion", label: "Evaluación", icon: <Award className="w-5 h-5" /> },
];

const createGoogleCalendarUrl = ({
  title,
  details,
  location,
  startDate,
  endDate,
}: {
  title: string;
  details: string;
  location: string;
  startDate: string;
  endDate: string;
}) => {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    details,
    location,
    dates: `${startDate}/${endDate}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

const examCalendarUrl = createGoogleCalendarUrl({
  title: "Examen Presencial PUCP | Quantum Hub Peru",
  details: "Examen presencial que sirve como evaluación final del Módulo 1 o vía de ingreso directo al Módulo 2.",
  location: "PUCP, Lima, Perú",
  startDate: "20260425",
  endDate: "20260426",
});

const admissionCalendarUrl = createGoogleCalendarUrl({
  title: "Recordatorio de Admisión | Curso de Computación Cuántica",
  details: "Recordatorio para completar la admisión del curso. Admisión basada en carta de motivación y revisión del perfil del postulante.",
  location: "Virtual",
  startDate: "20260303",
  endDate: "20260323",
});

// --- DOCENTES CORREGIDO ---
const DocentesContent = () => (
  <div className="w-full h-full flex flex-col justify-center overflow-hidden pb-4 lg:pb-0">

    {/* Título Grande y Llamativo */}
    <div className="w-full mb-4 lg:mb-5 shrink-0 mt-2">
      <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-black text-foreground tracking-tighter text-center lg:text-left">
        Nuestro <span className="text-gradient-quantum block md:inline">Equipo Docente</span>
      </h2>
    </div>

    {/* Contenedor Principal (Izquierda / Derecha) */}
    <div className="flex flex-col lg:flex-row flex-1 min-h-0 items-center justify-between gap-6 lg:gap-8">

      {/* Columna Izquierda: Texto Resumido + Anuncio */}
      <div className="w-full lg:w-1/2 flex flex-col h-full justify-center gap-4 lg:gap-5">

        {/* Texto con viñetas */}
        <div className="space-y-3 text-sm lg:text-[15px] text-muted-foreground leading-snug lg:leading-normal">
          <p className="font-medium text-foreground/90">
            Aprende con un equipo internacional apasionado por la docencia y comprometido con el ecosistema cuántico de América Latina:
          </p>
          <ul className="space-y-2.5">
            <li className="flex gap-3 items-start">
              <span className="text-primary mt-1 shrink-0"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4" /></span>
              <span><strong className="text-foreground">Especialistas globales:</strong> Módulos avanzados dictados por estudiantes de posgrado en física y computación cuántica.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-primary mt-1 shrink-0"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4" /></span>
              <span><strong className="text-foreground">Pipeline de talento:</strong> El Módulo 1 está a cargo de egresados destacados, evidenciando un modelo formativo sostenible.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-primary mt-1 shrink-0"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4" /></span>
              <span><strong className="text-foreground">Autonomía y respaldo:</strong> Cada instructor tiene libertad pedagógica, respaldado por una sólida coordinación académica.</span>
            </li>
          </ul>
        </div>

        {/* Anuncio "Próximamente" */}
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/10 via-background/60 to-background p-4 md:p-5 shadow-[0_0_30px_rgba(255,215,0,0.15)] group shrink-0 mt-1 lg:mt-2">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[40px] opacity-60 pointer-events-none" />

          <div className="relative z-10 flex flex-col space-y-1.5 md:space-y-2 text-center lg:text-left items-center lg:items-start">
            <div className="inline-flex items-center space-x-2 bg-accent/20 border border-accent/30 px-3 py-0.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-accent drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]">
                Anuncio Oficial
              </span>
            </div>
            <h4 className="text-lg md:text-xl lg:text-2xl font-black text-foreground tracking-tight">
              Próximamente <span className="text-gradient-quantum">Plana Docente</span>
            </h4>

          </div>
        </div>
      </div>

      {/* Columna Derecha: El Gato Flotando */}
      <div className="w-full lg:w-1/2 flex justify-center items-center h-40 md:h-56 lg:h-full shrink-0 relative">
        {/* Glow de fondo para destacar más al gato */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent/10 blur-[80px] rounded-full opacity-60 pointer-events-none" />

        <motion.div
          className="relative w-40 h-40 md:w-56 md:h-56 lg:w-[280px] lg:h-[280px] xl:w-[320px] xl:h-[320px] drop-shadow-[0_0_35px_rgba(255,215,0,0.4)] z-10"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={teacherImg}
            alt="Profesor Cuántico"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>

    </div>
  </div>
);

const IntroContent = () => (
  <div className="min-h-full flex flex-col lg:flex-row gap-8 lg:gap-12 pt-1">
    <div className="lg:w-1/2 flex flex-col gap-6">
      <div>
        <h2 className="text-xl md:text-2xl xl:text-3xl font-bold tracking-tighter text-gradient-quantum">
          Curso: Introducción a la Computación Cuántica
        </h2>
        <p className="text-muted-foreground text-xs xl:text-sm leading-relaxed mt-2">
          Este programa democratiza el acceso a tecnologías de frontera para estudiantes de secundaria y universitarios, replicando modelos de éxito internacional.
        </p>
      </div>
      <div className="flex justify-center flex-1 items-center py-4">
        <div className="relative w-48 h-48 md:w-64 md:h-64 drop-shadow-[0_0_40px_rgba(138,43,226,0.4)]">
          <LatamGlobe />
        </div>
      </div>
    </div>
    <div className="lg:w-1/2 flex flex-col gap-8">
      <div className="w-full flex flex-col sm:flex-row rounded-xl overflow-hidden shadow-[0_0_20px_rgba(138,43,226,0.15)] border border-primary/30 mt-2">
        <div className="bg-primary/20 backdrop-blur-md text-primary flex items-center justify-center p-4 sm:p-5 sm:w-2/5 shrink-0 gap-2 sm:gap-3 border-b sm:border-b-0 sm:border-r border-primary/30">
          <Users className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
          <span className="text-lg sm:text-xl font-black tracking-tighter uppercase text-center leading-tight">Público Objetivo</span>
        </div>
        <div className="bg-black/40 backdrop-blur-md p-4 sm:p-5 flex-1 flex flex-col justify-center">
          <p className="text-sm md:text-[15px] text-foreground/90 leading-relaxed">
            Estudiantes peruanos: <strong className="text-white">Escolares</strong> (4° y 5° de secundaria), <strong className="text-white">preuniversitarios, institutos técnicos y universitarios</strong>
          </p>
        </div>
      </div>
      <div className="pt-2">
        <h3 className="text-lg md:text-xl font-bold tracking-tighter text-foreground flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-primary" /> Rutas de Admisión
        </h3>
        <div className="flex flex-col gap-4 relative">
          <div className="absolute left-[16px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-accent/60 to-primary/60 hidden sm:block" />
          <div className="relative flex gap-3">
            <div className="hidden sm:flex flex-col items-center mt-1 z-10 shrink-0">
              <div className="w-8 h-8 rounded-full border-2 border-accent bg-background/90 flex items-center justify-center text-accent font-bold text-sm shadow-[0_0_15px_rgba(255,215,0,0.5)]">
                1
              </div>
            </div>
            <div className="flex-1 relative overflow-hidden rounded-xl border border-accent/40 bg-gradient-to-br from-[#20105a]/90 via-[#170b43]/85 to-[#11111f]/90 p-4 shadow-[0_0_20px_rgba(255,215,0,0.15)] hover:border-accent/60 transition-colors">
              <h4 className="text-sm md:text-base font-black uppercase tracking-wide text-foreground flex flex-wrap gap-x-2 items-center">
                Admisión al Módulo 1 <span className="text-accent/90 text-[10px] md:text-xs tracking-normal mt-0.5">(Opcional)</span>
              </h4>
              <p className="mt-1.5 text-xs text-foreground/80 leading-snug">
                Envía tu <strong className="text-foreground">carta de motivación</strong> para iniciar desde cero.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="text-[11px] md:text-xs inline-flex items-center gap-1.5 rounded-md border border-accent/60 bg-accent/20 px-2.5 py-1 text-accent font-extrabold shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Deadline: <span className="underline decoration-2 underline-offset-2">23 de marzo</span></span>
                </div>
                <a href={admissionCalendarUrl} target="_blank" rel="noreferrer" className="text-[11px] md:text-xs inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-white/5 hover:bg-white/10 px-2.5 py-1 text-foreground transition-all duration-300 hover:shadow-md">
                  <CalendarPlus className="w-3.5 h-3.5" /> Agregar a mi calendario
                </a>
              </div>
            </div>
          </div>
          <div className="relative flex gap-3">
            <div className="hidden sm:flex flex-col items-center mt-1 z-10 shrink-0">
              <div className="w-8 h-8 rounded-full border-2 border-primary bg-background/90 flex items-center justify-center text-primary font-bold text-sm shadow-[0_0_15px_rgba(138,43,226,0.5)]">
                2
              </div>
            </div>
            <div className="flex-1 relative overflow-hidden rounded-xl border border-primary/40 bg-gradient-to-br from-primary/10 via-background/70 to-background/80 p-4 hover:border-primary/60 transition-colors">
              <h4 className="text-sm md:text-base font-black uppercase tracking-wide text-foreground">
                Examen Presencial PUCP <span className="text-accent/90 text-[10px] md:text-xs tracking-normal mt-0.5">(Obligatorio)</span>
              </h4>
              <ul className="mt-1.5 space-y-1.5 text-xs text-foreground/85 leading-snug">
                <li className="flex gap-1.5 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0" />
                  <span><strong className="text-foreground">Si llevaste el Módulo 1:</strong> Esta es la evaluación final.</span>
                </li>
                <li className="flex gap-1.5 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0" />
                  <span><strong className="text-foreground">Si NO llevaste el Módulo 1:</strong> Admisión directa al Módulo 2.</span>
                </li>
              </ul>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="text-[11px] md:text-xs inline-flex items-center gap-1.5 text-primary/90 font-bold border border-primary/40 px-2.5 py-1 rounded-md bg-primary/10 shadow-[0_0_10px_rgba(138,43,226,0.2)]">
                  <Clock className="w-3.5 h-3.5" />
                  25 de abril de 2026
                </div>
                <a href={examCalendarUrl} target="_blank" rel="noreferrer" className="text-[11px] md:text-xs inline-flex items-center gap-1.5 rounded-md border border-primary/40 bg-primary/20 hover:bg-primary/30 px-2.5 py-1 text-white font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(138,43,226,0.4)]">
                  <CalendarPlus className="w-3.5 h-3.5" /> Agregar a mi calendario
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ModuloDetail = ({ mod }: { mod: any }) => (
  <div className="grid xl:grid-cols-2 gap-8 items-start h-full">
    <div className="space-y-4">
      <span className="text-primary font-bold text-xs tracking-widest uppercase">{mod.period}</span>
      <h3 className="text-2xl xl:text-4xl font-bold leading-tight">{mod.title}</h3>
      <p className="text-accent text-sm font-medium italic border-l-2 border-accent pl-4">{mod.target}</p>
      <p className="text-muted-foreground text-sm xl:text-base leading-relaxed">{mod.description}</p>
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
        <h5 className="font-bold text-xs mb-1 text-primary uppercase tracking-tighter">Prerrequisitos</h5>
        <p className="text-xs text-muted-foreground">{mod.prerrequisitos}</p>
      </div>
    </div>
    <div className="flex flex-col gap-3 lg:gap-4 h-full min-h-0">
      {mod.image && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="w-full flex items-center justify-center shrink-0">
          <img
            src={mod.image}
            alt={mod.title}
            className="w-full h-28 md:h-32 xl:h-40 object-contain drop-shadow-[0_0_25px_rgba(138,43,226,0.65)] hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
      )}
      <div className="p-3 md:p-4 lg:p-5 rounded-2xl bg-black/40 border border-white/5 shadow-inner flex-1 overflow-y-auto custom-scrollbar">
        <h5 className="font-bold text-xs lg:text-sm mb-2 lg:mb-3 flex items-center gap-2 text-foreground/90 uppercase tracking-widest sticky top-0 bg-black/40 backdrop-blur-md pb-2 -mx-2 px-2 z-10">
          <CheckCircle className="w-4 h-4 text-accent" /> Temas a cubrir
        </h5>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 xl:gap-3">
          {mod.temas.map((tema: string, idx: number) => (
            <li key={idx} className="flex gap-2 text-xs lg:text-sm text-muted-foreground leading-snug items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              <span>{tema}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const ModalidadContent = () => (
  <div className="h-full min-h-0 flex flex-col justify-start md:justify-center relative overflow-hidden rounded-3xl w-full">
    <div className="absolute inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen">
      <ParticleNetwork />
    </div>
    <motion.div aria-hidden className="pointer-events-none absolute -top-40 -right-16 w-96 h-96 rounded-full bg-gradient-to-br from-accent/10 via-quantum-blue/10 to-transparent blur-3xl opacity-50" animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -6, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} />
    <div className="flex flex-col gap-3 md:gap-4 lg:gap-4 w-full max-w-5xl mx-auto relative z-10 px-2 md:px-0 pt-2 pb-1 md:pt-4 md:pb-2 lg:pb-3">
      <div className="text-center space-y-1.5 md:space-y-2">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-primary/80">Modalidad del Programa</p>
        <h3 className="text-xl md:text-2xl xl:text-3xl font-black tracking-tighter text-gradient-quantum">Modalidad y Frecuencia</h3>
      </div>
      <div className="grid sm:grid-cols-2 gap-3 lg:gap-4 w-full">
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/10 via-background/60 to-background/80 p-3 md:p-4 flex flex-col items-center text-center shadow-[0_0_25px_rgba(138,43,226,0.15)] group hover:border-primary/60 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2.5 md:mb-3 border border-primary/30 text-primary shadow-inner">
            <PlayCircle className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <h4 className="text-lg md:text-xl font-black text-foreground mb-1.5 md:mb-2">Clases Virtuales</h4>
          <p className="text-[11px] md:text-xs text-foreground/80 leading-relaxed">Todo el desarrollo del programa de 12 semanas, con clases teóricas y sesiones prácticas de laboratorio, se imparte 100% de manera remota y en vivo.</p>
        </div>
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/10 via-background/60 to-background/80 p-3 md:p-4 flex flex-col items-center text-center shadow-[0_0_25px_rgba(255,215,0,0.15)] group hover:border-accent/60 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent/20 flex items-center justify-center mb-2.5 md:mb-3 border border-accent/30 text-accent shadow-inner">
            <MapPin className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <h4 className="text-lg md:text-xl font-black text-foreground mb-1.5 md:mb-2">Exámenes Presenciales</h4>
          <p className="text-[11px] md:text-xs text-foreground/80 leading-relaxed">Al finalizar cada módulo, asistirás a rendir tu examen presencialmente en el campus, para evaluar rigurosamente tus logros.</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start gap-6 sm:gap-8 lg:gap-8 xl:gap-14 my-6 sm:my-1.5 lg:my-1 xl:my-2">
        {[
          { img: teoriaImg, value: "24", label: "Clases Teóricas", delay: 0.1, color: "text-primary" },
          { img: laboratorioImg, value: "12", label: "Sesiones Lab", delay: 0.2, color: "text-accent" },
          { img: horasImg, value: "74h", label: "Carga Total", delay: 0.3, color: "text-quantum-pink" }
        ].map((item, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: item.delay, duration: 0.4 }} whileHover={{ y: -5, scale: 1.05 }} className="flex flex-col items-center group cursor-default">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-20 lg:h-20 xl:w-24 xl:h-24 mb-2 md:mb-2.5 flex justify-center items-center">              <div className="absolute inset-0 bg-accent/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img src={item.img} alt={item.label} className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,215,0,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(255,215,0,0.6)] transition-all duration-300" />
            </div>
            <div className="text-center max-w-[90px] sm:max-w-[100px] md:max-w-[110px]">
              <p className={`font-heading text-xs md:text-sm font-black ${item.color}`}>{item.value}</p>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.18em] font-semibold text-foreground/80">{item.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-2.5 lg:gap-3.5">
        {[
          { title: "Módulo 1", weeks: "Semanas 1–4", theory: "16h Teoría", lab: "10h Lab", delay: 0.4 },
          { title: "Módulo 2", weeks: "Semanas 5–8", theory: "16h Teoría", lab: "8h Lab", delay: 0.5 },
          { title: "Módulo 3", weeks: "Semanas 9–12", theory: "16h Teoría", lab: "8h Lab", delay: 0.6 }
        ].map((mod) => (
          <motion.div key={mod.title} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: mod.delay, duration: 0.4 }} whileHover={{ y: -2 }} className="rounded-xl border border-primary/40 bg-gradient-to-br from-[#20105a]/90 via-[#170b43]/85 to-[#11111f]/90 p-2.5 md:p-3.5 flex flex-col justify-between shadow-[0_0_20px_rgba(138,43,226,0.15)] relative overflow-hidden group">
            <div className="pointer-events-none absolute inset-0 opacity-20 bg-gradient-to-br from-primary/30 via-transparent to-transparent group-hover:opacity-40 transition-opacity" />
            <div className="relative z-10 flex items-center justify-between mb-2">
              <h4 className="text-sm md:text-base font-black uppercase tracking-wide text-foreground">{mod.title}</h4>
              <p className="text-[9px] md:text-[10px] uppercase tracking-wider text-muted-foreground">{mod.weeks}</p>
            </div>
            <div className="flex justify-between text-[11px] md:text-xs font-semibold relative z-10 pt-1 border-t border-white/5">
              <span className="text-primary">{mod.theory}</span>
              <span className="text-accent">{mod.lab}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const EvaluacionContent = () => (
  <div className="h-full flex flex-col relative overflow-hidden pr-0 w-full min-h-[500px]">
    <motion.div aria-hidden className="pointer-events-none absolute -top-40 -right-16 w-80 h-80 rounded-full bg-gradient-to-br from-accent/10 via-quantum-blue/25 to-transparent blur-3xl" animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -6, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />
    <motion.div aria-hidden className="pointer-events-none absolute -bottom-40 -left-24 w-72 h-72 rounded-full bg-gradient-to-tr from-primary/25 via-quantum-pink/30 to-transparent blur-3xl" animate={{ scale: [1, 1.18, 1], rotate: [0, -8, 4, 0] }} transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }} />
    <motion.div whileHover={{ scale: 1.005 }} transition={{ type: "spring", stiffness: 120, damping: 18 }} className="relative z-10 w-full h-full rounded-3xl border border-border/40 bg-background/40 px-6 py-6 md:px-10 md:py-8 lg:px-14 lg:py-10 shadow-[0_0_40px_rgba(15,23,42,0.75)] overflow-hidden flex flex-col">
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <div className="absolute -top-24 left-8 w-56 h-56 bg-gradient-to-br from-primary/40 via-quantum-blue/30 to-transparent blur-3xl" />
        <div className="absolute -bottom-24 right-8 w-64 h-64 bg-gradient-to-tl from-quantum-pink/40 via-accent/40 to-transparent blur-3xl" />
      </div>
      <div className="relative z-10 flex flex-col gap-6 h-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-[12px] md:text-xs uppercase tracking-[0.24em] text-primary/80">Sistema de evaluación</p>
            <h3 className="mt-1 text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground">Así se calcula tu nota final</h3>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] items-stretch flex-1 min-h-[320px] md:min-h-[360px]">
          <div className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Exámenes", val: "40%", desc: "Evaluaciones modulares", color: "from-primary/70 via-primary/30 to-transparent" },
                { label: "Tareas", val: "25%", desc: "Entregas semanales", color: "from-accent/80 via-accent/40 to-transparent" },
                { label: "Participación", val: "20%", desc: "Cuestionarios en clase", color: "from-primary/70 via-primary/30 to-transparent" },
                { label: "Asistencia", val: "15%", desc: "Máx. 3 inasistencias", color: "from-accent/70 via-accent/35 to-transparent" },
              ].map((item) => (
                <motion.div key={item.label} whileHover={{ y: -3, scale: 1.02 }} transition={{ type: "spring", stiffness: 200, damping: 18 }} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#27145c] via-[#1b1043] to-[#110825] border border-primary/40 px-4 py-4 text-left">
                  <div className={`pointer-events-none absolute inset-0 opacity-40 bg-gradient-to-br ${item.color}`} />
                  <div className="relative z-10">
                    <p className="text-[11px] md:text-xs uppercase tracking-[0.18em] text-white/70 font-semibold">{item.label}</p>
                    <p className="mt-1 text-2xl md:text-3xl font-black text-white">{item.val}</p>
                    <p className="mt-1 text-xs text-white/85 leading-snug">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-xs md:text-sm text-muted-foreground/85 leading-relaxed">
              Todos los componentes se suman para tu calificación final. Mantén un buen ritmo semanal y evita acumular tareas para potenciar tu desempeño en el examen presencial.
            </p>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-[12px] md:text-xs uppercase tracking-[0.24em] text-primary/80">Certificados</p>
                <h3 className="mt-1 text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground">Obtén tu certificado</h3>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-xs md:text-sm">
              <div className="rounded-2xl border border-primary/40 bg-primary/10 px-5 py-4 flex gap-3 items-start">
                <Award className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">C1 - Certificado del Curso</p>
                  <p className="text-muted-foreground mt-1 leading-snug">Se otorga con nota final <span className="font-semibold text-primary">≥ 70%</span> y asistencia mínima.</p>
                </div>
              </div>
              <div className="rounded-2xl border border-accent/60 bg-accent/10 px-5 py-4 flex gap-3 items-start shadow-[0_0_18px_rgba(250,204,21,0.3)]">
                <Award className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <p className="font-semibold text-accent">C2 - Certificado de Honor</p>
                  <p className="text-muted-foreground mt-1 leading-snug">Para desempeño sobresaliente con nota <span className="font-semibold text-accent">≥ 90%</span>.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <motion.div aria-hidden className="absolute -top-6 -left-6 w-40 h-40 rounded-full bg-gradient-to-tr from-quantum-pink/35 via-primary/35 to-amber-300/65 blur-3xl" animate={{ scale: [1, 1.06, 1], y: [0, -4, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
            <motion.img src="/certificado.png" alt="Gato Quantum sosteniendo certificado" className="relative z-10 w-full max-w-[340px] lg:max-w-[380px] object-contain drop-shadow-[0_0_40px_rgba(0,0,0,0.9)]" animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

// --- COMPONENTE PRINCIPAL ---

const Curso = () => {
  const [activeTab, setActiveTab] = useState("intro");
  const [activeModule, setActiveModule] = useState(modules[0].id);
  const navRef = useRef<HTMLElement>(null);
  const modulesRef = useRef<HTMLDivElement>(null);
  const activeModuleRef = useRef<HTMLButtonElement>(null);

  const scrollNav = (direction: 'left' | 'right') => {
    if (navRef.current) {
      navRef.current.scrollBy({ left: direction === 'left' ? -200 : 200, behavior: 'smooth' });
    }
  };

  const scrollModules = (direction: 'left' | 'right') => {
    if (modulesRef.current) {
      modulesRef.current.scrollBy({ left: direction === 'left' ? -200 : 200, behavior: 'smooth' });
    }
  };

  const handleModuleClick = (moduleId: string) => {
    setActiveModule(moduleId);
    setTimeout(() => {
      if (activeModuleRef.current && modulesRef.current) {
        const container = modulesRef.current;
        const element = activeModuleRef.current;
        const scrollLeft = element.offsetLeft - (container.offsetWidth / 2) + (element.offsetWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <Navbar />

      <main className="flex-1 w-full h-screen pt-20 lg:pt-24 snap-y snap-mandatory overflow-y-auto overflow-x-hidden scroll-smooth">
        <div className="fixed inset-0 pointer-events-none z-0 opacity-30 mt-20 lg:mt-24">
          <ParticleNetwork />
        </div>

        {/* Section 1: Hero Section */}
        <section className="w-full min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-6rem)] snap-start flex flex-col items-center justify-center relative z-10 lg:p-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-[1400px] flex-1 lg:glass-strong rounded-none lg:rounded-3xl px-6 sm:px-6 md:px-8 lg:px-10 xl:px-12 pb-6 sm:pb-6 md:pb-8 lg:pb-10 xl:pb-12 pt-1 relative overflow-hidden border-none lg:border lg:border-primary/20 bg-transparent lg:bg-card/60 backdrop-blur-none lg:backdrop-blur-xl shadow-none lg:shadow-[0_0_50px_rgba(138,43,226,0.15)] flex flex-col justify-center"
          >
            <div className="flex flex-col md:flex-row gap-8 lg:gap-10 xl:gap-12 items-center justify-between relative z-10 flex-1 py-4 lg:py-2">
              <div className="md:w-1/2 lg:w-3/5 space-y-5 lg:space-y-5 xl:space-y-6 flex flex-col justify-center">
                <div className="self-start px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-bold mb-1 lg:mb-2 shadow-sm">
                  Edición 2026 - I
                </div>

                {/* --- TÍTULO CON EFECTO DE CORRIENTE ELÉCTRICA --- */}
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-5xl xl:text-[3.5rem] 2xl:text-6xl font-black leading-[1.1] tracking-tight flex flex-col items-start">
                  <span>Curso de</span>
                  <motion.span
                    className="inline-block bg-clip-text text-transparent pb-1"
                    style={{
                      backgroundImage: "linear-gradient(90deg, hsl(270 80% 60%), hsl(330 80% 60%), hsl(175 80% 70%), hsl(330 80% 60%), hsl(270 80% 60%))",
                      backgroundSize: "200% auto",
                    }}
                    animate={{
                      backgroundPosition: ["0% center", "-200% center"],
                      filter: [
                        "drop-shadow(0 0 2px rgba(138,43,226,0.2))",
                        "drop-shadow(0 0 15px rgba(20,184,166,0.6))",
                        "drop-shadow(0 0 2px rgba(138,43,226,0.2))"
                      ]
                    }}
                    transition={{
                      backgroundPosition: { duration: 3.5, repeat: Infinity, ease: "linear" },
                      filter: { duration: 1.75, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    Introducción a la Computación Cuántica
                  </motion.span>
                </h1>

                <p className="text-base sm:text-lg lg:text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium">
                  Formación en computación cuántica para estudiantes de secundaria y universitarios. Desarrolla competencias en física, matemáticas y programación.
                </p>
                <div className="flex items-center gap-6 py-5 lg:py-4 xl:py-5 border-y border-border/50 w-full max-w-lg">
                  <div className="flex flex-col flex-1">
                    <span className="text-2xl lg:text-3xl xl:text-4xl font-black text-foreground">16+</span>
                    <span className="text-[10px] lg:text-[11px] text-muted-foreground uppercase tracking-widest font-bold mt-1">Semanas</span>
                  </div>
                  <div className="w-px h-12 bg-border/50" />
                  <div className="flex flex-col flex-1">
                    <span className="text-2xl lg:text-3xl xl:text-4xl font-black text-foreground">74</span>
                    <span className="text-[10px] lg:text-[11px] text-muted-foreground uppercase tracking-widest font-bold mt-1">Horas clase</span>
                  </div>
                  <div className="w-px h-12 bg-border/50" />
                  <div className="flex flex-col flex-1">
                    <span className="text-2xl lg:text-3xl xl:text-4xl font-black text-foreground">4</span>
                    <span className="text-[10px] lg:text-[11px] text-muted-foreground uppercase tracking-widest font-bold mt-1">Módulos</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full">
                  <a href="https://forms.gle/9EhQgzZmTXJRtp4Q6" target="_blank" className="btn-accent-cta flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-4 lg:px-8 lg:py-3.5 text-sm lg:text-sm font-black shadow-xl uppercase tracking-widest hover:scale-105 transition-transform">
                    ¡Inscríbete Ahora! <ArrowRight className="w-5 h-5" />
                  </a>
                  <a href="https://drive.google.com/file/d/1pfsNJQas2XYNtcwhCoyVu_QeqmXK_aWq/view?usp=sharing" target="_blank" className="btn-outline-quantum flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-4 lg:px-8 lg:py-3.5 text-sm lg:text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">
                    Más Info <Download className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <div className="hidden lg:flex md:w-1/2 lg:w-2/5 p-3 rounded-3xl bg-gradient-to-br from-primary/20 to-quantum-pink/20 border border-white/10 shadow-2xl overflow-hidden group relative items-center justify-center">
                <img
                  src={aprendiendoImg}
                  alt="Aprendiendo Computación Cuántica"
                  className="w-full h-auto max-h-[45vh] lg:max-h-[45vh] xl:max-h-[50vh] rounded-2xl object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center opacity-70">
              <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center p-1 xl:w-5 xl:h-8">
                <div className="w-1 h-2.5 bg-primary rounded-full animate-bounce xl:w-0.5 xl:h-2" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section 2: OMNI KINETIC Engine */}
        <section className="w-full min-h-screen lg:h-[calc(100vh-6rem)] snap-start flex items-center justify-center relative z-10 px-2 sm:px-4 lg:px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full max-w-[98%] 2xl:max-w-[1700px] h-auto lg:h-full lg:max-h-[85vh]">

            <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl opacity-20 pointer-events-none">
              <motion.div animate={{ rotate: 360, scale: [1, 1.4, 1] }} transition={{ duration: 30, repeat: Infinity }} className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/20 blur-[120px]" />
              <motion.div animate={{ rotate: -360, scale: [1, 1.2, 1] }} transition={{ duration: 35, repeat: Infinity }} className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-quantum-blue/20 blur-[120px]" />
            </div>

            {/* TAB NAV PARA ESCRITORIO */}
            <aside className="hidden lg:flex w-[220px] xl:w-[260px] shrink-0 flex-col z-10 mb-2 lg:mb-0">
              <div className="glass h-full rounded-2xl p-1.5 border border-border/50 bg-background/60 backdrop-blur-xl relative">
                <button onClick={() => scrollNav('left')} className="lg:hidden absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-background/90 backdrop-blur border border-white/20 rounded-full p-1.5 shadow-lg text-foreground/80 hover:text-foreground" aria-label="Scroll left">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <nav ref={navRef} className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-hidden scroll-smooth px-8 lg:px-0 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex shrink-0 items-center justify-center lg:justify-start gap-2.5 px-4 py-2.5 lg:py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${activeTab === tab.id ? "text-black font-bold bg-accent shadow-[0_0_15px_rgba(255,215,0,0.4)]" : "text-muted-foreground hover:bg-white/5"}`}
                    >
                      <span className="shrink-0">{tab.icon}</span>
                      <span className="text-sm tracking-tight whitespace-nowrap">{tab.label}</span>
                      {activeTab === tab.id && <ChevronRight className="ml-auto w-4 h-4 hidden lg:block" />}
                    </button>
                  ))}
                </nav>
                <button onClick={() => scrollNav('right')} className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-accent/90 backdrop-blur border border-accent rounded-full p-1.5 shadow-[0_0_15px_rgba(255,215,0,0.5)] text-black hover:bg-accent animate-pulse" aria-label="Scroll right">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </aside>

            {/* CONTENIDO PRINCIPAL */}
            <div className={`flex-1 z-10 w-full lg:overflow-hidden glass rounded-2xl lg:rounded-3xl border border-border/50 bg-background/30 backdrop-blur-md relative`}>

              {/* ----- VISTA ESCRITORIO (Sistema de Tabs con Framer Motion) ----- */}
              <div
                className={`hidden lg:block h-full relative ${activeTab === 'evaluacion'
                  ? 'p-0 overflow-hidden rounded-r-3xl'
                  : activeTab === 'modalidad'
                    ? 'p-6 lg:p-4 xl:p-8 overflow-y-auto [&::-webkit-scrollbar]:hidden rounded-r-3xl'
                    : 'p-6 lg:p-10 overflow-y-auto custom-scrollbar'
                  }`}
                style={{ scrollbarWidth: activeTab === 'modalidad' ? 'none' : 'auto' }}
              >
                <AnimatePresence mode="wait">
                  {activeTab === "intro" && (
                    <motion.div key="intro" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}>
                      <IntroContent />
                    </motion.div>
                  )}

                  {activeTab === "modulos" && (
                    <motion.div key="modulos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col gap-6">
                      <div className="relative flex items-center mb-1 lg:mb-0 mt-1 lg:mt-0">
                        <div ref={modulesRef} className="flex gap-2.5 overflow-x-auto pb-2 shrink-0 scroll-smooth w-full [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                          {modules.map((mod) => (
                            <button
                              key={mod.id}
                              ref={activeModule === mod.id ? activeModuleRef : null}
                              onClick={() => handleModuleClick(mod.id)}
                              className={`px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 border shrink-0 snap-center ${activeModule === mod.id ? "bg-accent text-black border-accent shadow-[0_0_15px_rgba(255,215,0,0.5)] scale-105" : "bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10"}`}
                            >
                              {mod.id}
                            </button>
                          ))}
                        </div>
                      </div>
                      <AnimatePresence mode="wait">
                        {modules.map((mod) => activeModule === mod.id && (
                          <motion.div key={mod.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="h-full">
                            <ModuloDetail mod={mod} />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {activeTab === "modalidad" && (
                    <motion.div key="modalidad" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                      <ModalidadContent />
                    </motion.div>
                  )}

                  {activeTab === "evaluacion" && (
                    <motion.div key="evaluacion" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: "easeOut" }} className="h-full">
                      <EvaluacionContent />
                    </motion.div>
                  )}

                  {activeTab === "docentes" && (
                    <motion.div key="docentes" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="h-full w-full">
                      <DocentesContent />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ----- VISTA MÓVIL (Contenido de corrido, sin tabs) ----- */}
              <div className="flex lg:hidden flex-col w-full h-auto p-4 sm:p-6 gap-14 pb-12">

                {/* 1. El Programa */}
                <section className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-b border-primary/20 pb-2">
                    <Target className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-black text-gradient-quantum">El Programa</h2>
                  </div>
                  <IntroContent />
                </section>

                <div className="w-full h-px bg-border/40" />

                {/* 2. Plan Académico */}
                <section className="flex flex-col gap-6">
                  <div className="flex items-center gap-2 border-b border-primary/20 pb-2">
                    <Book className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-black text-gradient-quantum">Plan Académico</h2>
                  </div>
                  <div className="flex flex-col gap-12">
                    {modules.map((mod) => (
                      <div key={mod.id} className="flex flex-col gap-4 relative">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent font-bold text-sm w-fit shadow-sm">
                          {mod.id}
                        </div>
                        <ModuloDetail mod={mod} />
                      </div>
                    ))}
                  </div>
                </section>

                <div className="w-full h-px bg-border/40" />

                {/* 3. Modalidad */}
                <section className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-b border-primary/20 pb-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-black text-gradient-quantum">Modalidad</h2>
                  </div>
                  <ModalidadContent />
                </section>

                <div className="w-full h-px bg-border/40" />

                {/* 5. Docentes */}
                <section className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-b border-accent/20 pb-2">
                    <Users className="w-5 h-5 text-accent" />
                    <h2 className="text-xl font-black text-gradient-quantum">Docentes</h2>
                  </div>
                  <DocentesContent />
                </section>

                {/* 4. Evaluación */}
                <section className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-b border-primary/20 pb-2">
                    <Award className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-black text-gradient-quantum">Evaluación</h2>
                  </div>
                  <EvaluacionContent />
                </section>

                <div className="w-full h-px bg-border/40" />



              </div>

            </div>
          </div>
        </section>

        {/* Section 3: Final CTA */}
        <section className="w-full min-h-[50vh] flex flex-col items-center justify-center relative z-10 px-4 py-20 lg:py-32 overflow-hidden snap-start">

          <div className="absolute inset-0 z-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen"
            >
              <source src="/video-bg.mp4" type="video/mp4" />
              Tu navegador no soporta videos HTML5.
            </video>
            <div className="absolute inset-0 bg-background/60" />
          </div>

          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 mix-blend-screen opacity-50">
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary/20 blur-[100px] rounded-full"
            />
            <motion.div
              animate={{ rotate: -360, scale: [1, 1.3, 1] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-quantum-pink/20 blur-[100px] rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-accent/10 blur-[80px] rounded-full"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="w-full max-w-5xl relative z-10 flex flex-col items-center text-center space-y-6 md:space-y-8 glass-strong rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 lg:p-20 border border-primary/30 shadow-[0_0_50px_rgba(138,43,226,0.3)] bg-black/40 backdrop-blur-xl"
          >

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]"
            >
              ¿Listo para dar el <br className="hidden sm:block" />

              <motion.span
                className="text-gradient-quantum inline-block mt-2 origin-bottom"
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1],
                  filter: ["hue-rotate(0deg)", "hue-rotate(60deg)", "hue-rotate(0deg)"]
                }}
                transition={{
                  duration: 0.35,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1.5
                }}
              >
                salto cuántico
              </motion.span>?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-white/80 text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl font-medium leading-relaxed"
            >
              Únete a la próxima generación de innovadores tecnológicos. Los cupos son limitados y las inscripciones cierran pronto.
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6, type: "spring", stiffness: 100 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-6 md:pt-8 w-full sm:w-auto"
            >
              <motion.a
                href="https://forms.gle/9EhQgzZmTXJRtp4Q6"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: ["0px 0px 20px rgba(255,215,0,0.4)", "0px 0px 40px rgba(255,215,0,0.8)", "0px 0px 20px rgba(255,215,0,0.4)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="btn-accent-cta flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-8 py-5 md:px-12 md:py-6 text-base md:text-lg font-black shadow-xl uppercase tracking-widest relative overflow-hidden group rounded-2xl"
              >
                <motion.div
                  animate={{ x: ["-300%", "300%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                  className="absolute top-0 bottom-0 left-[-20%] w-[50%] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
                />
                <span className="relative z-10 flex items-center gap-2 md:gap-3">
                  ¡Inscríbete Ahora! <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </motion.a>

              <motion.a
                href="https://drive.google.com/file/d/1pfsNJQas2XYNtcwhCoyVu_QeqmXK_aWq/view?usp=sharing"
                target="_blank"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline-quantum flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-8 py-5 md:px-12 md:py-6 text-base md:text-lg font-bold uppercase tracking-widest transition-colors rounded-2xl"
              >
                Más Info <Download className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-y-1 transition-transform" />
              </motion.a>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Curso;