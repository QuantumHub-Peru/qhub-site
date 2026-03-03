import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleNetwork from "@/components/ParticleNetwork";
import { motion, AnimatePresence } from "framer-motion";
import { Book, Clock, Users, ArrowRight, Download, GraduationCap, Target, Award, CheckCircle, ChevronRight, ChevronLeft, PlayCircle, CalendarPlus } from "lucide-react";
import { useState } from "react";
import aprendiendoImg from "@/gato/aprendiendo.png";
import LatamGlobe from "@/components/LatamGlobe";
import QuantumMolecule from '@/components/QuantumMolecule'; // Ajusta la ruta según dónde guardaste el archivo
import modulo1Img from "@/gato/modelo1.png";
import modulo2Img from "@/gato/modulo2.png";
import modulo3Img from "@/gato/modulo3.png";

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
  },
  {
    id: "Winter School",
    title: "Investigación en Tecnologías Cuánticas",
    period: "13 de julio - 18 de julio",
    target: "Basado en desempeño.",
    description: "Introducción a líneas de investigación en tecnologías cuánticas. Etapa final de inmersión.",
    tags: [
      { text: "Investigación", color: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" },
      { text: "1 Semana", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
      { text: "Por Confirmar", color: "bg-quantum-pink/10 text-quantum-pink border-quantum-pink/20" }
    ],
    temas: [
      "Líneas de investigación actuales",
      "Oportunidades académicas",
      "*Contenido por confirmar"
    ],
    prerrequisitos: "Selección basada en desempeño y motivación."
  }
];

const tabs = [
  { id: "intro", label: "El Programa", icon: <Target className="w-5 h-5" /> },
  { id: "modulos", label: "Plan Académico", icon: <Book className="w-5 h-5" /> },
  { id: "evaluacion", label: "Evaluación", icon: <Award className="w-5 h-5" /> },
  { id: "modalidad", label: "Modalidad", icon: <Clock className="w-5 h-5" /> },
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
  title: "Examen Presencial PUCP | Quantum Nexus",
  details: "Examen presencial que sirve como evaluación final del Módulo 1 y vía de ingreso directo al Módulo 2.",
  location: "PUCP, Lima, Perú",
  startDate: "20260425",
  endDate: "20260426",
});

const admissionCalendarUrl = createGoogleCalendarUrl({
  title: "Recordatorio de Admisión | Curso de Computación Cuántica",
  details: "Recordatorio para completar la admisión del curso. Admisión basada en motivación y revisión del perfil del postulante.",
  location: "Virtual",
  startDate: "20260420",
  endDate: "20260421",
});

const Curso = () => {
  const [activeTab, setActiveTab] = useState("intro");
  const [activeModule, setActiveModule] = useState(modules[0].id);
  const [activeHighlight, setActiveHighlight] = useState<"examen" | "admision">("examen");

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <Navbar />

      <main className="flex-1 w-full h-screen pt-20 lg:pt-24 snap-y snap-mandatory overflow-y-auto overflow-x-hidden scroll-smooth">
        <div className="fixed inset-0 pointer-events-none z-0 opacity-30 mt-20 lg:mt-24">
          <ParticleNetwork />
        </div>

        {/* Section 1: Hero Section - Ajuste de altura y paddings */}
        <section className="w-full min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-6rem)] snap-start flex items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8 py-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-7xl min-h-[500px] h-full max-h-[750px] glass-strong rounded-3xl p-6 md:p-8 lg:p-10 relative overflow-hidden border border-primary/20 bg-card/60 backdrop-blur-xl shadow-[0_0_50px_rgba(138,43,226,0.15)] flex flex-col justify-center"
          >
            {/* ... (Blobs de fondo se mantienen igual) ... */}

            <div className="flex flex-col md:flex-row gap-4 lg:gap-10 items-center justify-between relative z-10 flex-1">
              <div className="md:w-1/2 lg:w-3/5 space-y-3 lg:space-y-5">
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[12px] font-medium mb-1">
                  Edición 2026 - I
                </div>
                <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                  Curso de <span className="text-gradient-quantum">Introducción a la Computación Cuántica</span>
                </h1>

                <p className="text-xs md:text-sm lg:text-base text-muted-foreground leading-relaxed max-w-xl">
                  Formación en computación cuántica para estudiantes de secundaria y universitarios. Desarrolla competencias en física, matemáticas y programación.
                </p>

                {/* Stats reducidos ligeramente para ahorrar espacio vertical */}
                <div className="flex items-center gap-4 py-2 lg:py-3 border-y border-border/50">
                  <div className="flex flex-col">
                    <span className="text-lg lg:text-xl font-bold text-foreground">16+</span>
                    <span className="text-[9px] lg:text-[10px] text-muted-foreground uppercase tracking-wider">Semanas</span>
                  </div>
                  <div className="w-px h-6 lg:h-8 bg-border/50" />
                  <div className="flex flex-col">
                    <span className="text-lg lg:text-xl font-bold text-foreground">74</span>
                    <span className="text-[9px] lg:text-[10px] text-muted-foreground uppercase tracking-wider">Horas clase</span>
                  </div>
                  <div className="w-px h-6 lg:h-8 bg-border/50" />
                  <div className="flex flex-col">
                    <span className="text-lg lg:text-xl font-bold text-foreground">4</span>
                    <span className="text-[9px] lg:text-[10px] text-muted-foreground uppercase tracking-wider">Módulos</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a href="https://forms.gle/9EhQgzZmTXJRtp4Q6" target="_blank" className="btn-accent-cta inline-flex items-center justify-center gap-2 px-5 py-2.5 lg:px-7 lg:py-3.5 text-xs lg:text-sm font-bold shadow-lg uppercase tracking-wide">
                    ¡Inscríbete Ahora! <ArrowRight className="w-4 h-4" />
                  </a>
                  <a href="https://drive.google.com/drive/folders/1nx3Z5mxqG4li_buFuObRSXhdvqdSpmLo" target="_blank" className="btn-outline-quantum inline-flex items-center justify-center gap-2 px-5 py-2.5 lg:px-7 lg:py-3.5 text-xs lg:text-sm font-medium uppercase tracking-wider">
                    Brochure <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Imagen con tamaño más controlado */}
              <div className="md:w-1/2 lg:w-2/5 p-2 rounded-2xl bg-gradient-to-br from-primary/20 to-quantum-pink/20 border border-white/10 shadow-xl overflow-hidden group relative flex items-center justify-center">
                <img
                  src={aprendiendoImg}
                  alt="Aprendiendo Computación Cuántica"
                  className="w-full max-h-[25vh] md:max-h-[40vh] h-auto rounded-xl object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Indicador de scroll - bajado para que no choque */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center opacity-50">
              <div className="w-4 h-6 rounded-full border border-primary/50 flex justify-center p-0.5">
                <div className="w-0.5 h-1.5 bg-primary rounded-full animate-bounce" />
              </div>
            </div>
          </motion.div>
        </section>
        {/* Section 2: OMNI KINETIC Engine - Versión Final Corregida con Evaluación */}
        <section className="w-full min-h-screen lg:h-[calc(100vh-6rem)] snap-start flex items-center justify-center relative z-10 px-2 sm:px-4 lg:px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full max-w-[98%] 2xl:max-w-[1700px] h-full lg:max-h-[85vh] rounded-3xl overflow-hidden glass-strong border border-primary/20 bg-card/40 backdrop-blur-3xl p-4 lg:p-6 shadow-2xl relative">

            {/* Fondo Animado Quantum */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl opacity-20 pointer-events-none">
              <motion.div animate={{ rotate: 360, scale: [1, 1.4, 1] }} transition={{ duration: 30, repeat: Infinity }} className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/20 blur-[120px]" />
              <motion.div animate={{ rotate: -360, scale: [1, 1.2, 1] }} transition={{ duration: 35, repeat: Infinity }} className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-quantum-blue/20 blur-[120px]" />
            </div>

            {/* Sidebar - Navegación Principal */}
            <aside className="lg:w-[220px] xl:w-[260px] shrink-0 flex flex-col z-10">
              <div className="glass h-full rounded-2xl p-2 border border-border/50 bg-background/60 backdrop-blur-xl">
                <nav className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-hidden">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500 group relative overflow-hidden ${activeTab === tab.id ? "text-black font-bold bg-accent shadow-[0_0_20px_rgba(255,215,0,0.5)]" : "text-muted-foreground hover:bg-white/5"
                        }`}
                    >
                      <span className="shrink-0">{tab.icon}</span>
                      <span className="text-sm xl:text-base tracking-tight">{tab.label}</span>
                      {activeTab === tab.id && <ChevronRight className="ml-auto w-4 h-4 hidden lg:block" />}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Área de Contenido Principal */}
            <div
              className={`flex-1 z-10 overflow-hidden ${activeTab === "evaluacion"
                ? "rounded-3xl"
                : "glass rounded-2xl border border-border/50 bg-background/30 backdrop-blur-md"
                }`}
            >
              <div
                className={`h-full relative ${activeTab === "evaluacion"
                  ? "overflow-hidden p-0"
                  : "overflow-y-auto custom-scrollbar p-6 lg:p-10"
                  }`}
              >
                <AnimatePresence mode="wait">

                  {/* 1. EL PROGRAMA - Intro con Mapa Latam */}
                  {activeTab === "intro" && (
                    <motion.div
                      key="intro"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      className="min-h-full flex flex-col lg:flex-row gap-6 lg:gap-10 pt-2 lg:items-center"
                    >
                      <div className="lg:w-1/2 space-y-4 md:space-y-5">
                        <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold tracking-tighter text-gradient-quantum">
                          Impacto en América Latina
                        </h2>
                        <p className="text-muted-foreground text-sm xl:text-base leading-relaxed">
                          Este programa democratiza el acceso a tecnologías de frontera para estudiantes de secundaria y universitarios, replicando modelos de éxito internacional.
                        </p>

                        <div className="space-y-3 mt-2">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                              Explora hitos clave
                            </p>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() =>
                                  setActiveHighlight((prev) => (prev === "examen" ? "admision" : "examen"))
                                }
                                className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-white/10 bg-black/40 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <ChevronLeft className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setActiveHighlight((prev) => (prev === "examen" ? "admision" : "examen"))
                                }
                                className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-white/10 bg-black/40 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          <div className="inline-flex items-center gap-1 rounded-full bg-black/50 border border-white/10 p-1 text-[11px] font-semibold uppercase tracking-wide">
                            <button
                              type="button"
                              onClick={() => setActiveHighlight("examen")}
                              className={`px-3 py-1 rounded-full transition-all ${activeHighlight === "examen"
                                ? "bg-accent text-black shadow-[0_0_18px_rgba(255,215,0,0.55)]"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                              Examen
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveHighlight("admision")}
                              className={`px-3 py-1 rounded-full transition-all ${activeHighlight === "admision"
                                ? "bg-accent text-black shadow-[0_0_18px_rgba(255,215,0,0.55)]"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                              Admisión
                            </button>
                          </div>

                          {activeHighlight === "examen" ? (
                            <div className="relative overflow-hidden rounded-2xl border border-primary/40 bg-gradient-to-br from-[#20105a]/90 via-[#170b43]/85 to-[#11111f]/90 p-4 md:p-5 shadow-[0_0_30px_rgba(138,43,226,0.25)] flex flex-col">
                              <h3 className="text-lg md:text-xl font-black uppercase leading-tight tracking-wide text-foreground">
                                Examen Presencial PUCP
                              </h3>
                              <div className="mt-2 inline-flex self-start items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-3 py-1.5 text-accent font-bold text-sm md:text-base">
                                <CalendarPlus className="w-4 h-4 md:w-5 md:h-5" />
                                25 de abril de 2026
                              </div>
                              <p className="mt-2.5 text-xs md:text-sm text-foreground/85 leading-snug">
                                ¡Ponte a prueba! Este examen presencial sirve como evaluación final del Módulo 1 y como vía de ingreso directo para el Módulo 2.
                              </p>
                              <div className="mt-auto pt-4">
                                <a
                                  href={examCalendarUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-black font-extrabold text-sm uppercase tracking-wide shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:brightness-105 transition-all"
                                >
                                  <CalendarPlus className="w-4 h-4" />
                                  Agregar al calendario
                                </a>
                              </div>
                            </div>
                          ) : (
                            <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-background/70 to-background/80 p-4 md:p-5 flex flex-col">
                              <h3 className="text-lg md:text-xl font-black uppercase tracking-wide text-foreground">
                                Admisión
                              </h3>
                              <div className="mt-2 inline-flex self-start items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-3 py-1.5 text-accent font-bold text-xs uppercase">
                                Basada en Carta de Motivación
                              </div>
                              <p className="mt-2.5 text-xs md:text-sm text-foreground/80 leading-snug">
                                Programa un recordatorio para no perder el proceso de postulación y presentar tu perfil a tiempo.
                              </p>
                              <div className="mt-auto pt-4">
                                <a
                                  href={admissionCalendarUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-accent/40 bg-accent/90 px-4 py-2.5 text-black font-bold text-sm uppercase tracking-wide hover:bg-accent transition-colors"
                                >
                                  <CalendarPlus className="w-4 h-4" />
                                  Agendar admisión
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="lg:w-1/2 flex justify-center py-6 lg:py-2">
                        {/* Latam Globe 3D */}
                        <div className="relative w-64 h-64 md:w-80 md:h-80 drop-shadow-[0_0_40px_rgba(138,43,226,0.4)]">
                          <LatamGlobe />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* 2. PLAN ACADÉMICO - Módulos */}
                  {activeTab === "modulos" && (
                    <motion.div key="modulos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col gap-6">
                      <div className="flex gap-2 overflow-x-auto pb-2 shrink-0">
                        {modules.map((mod) => (
                          <button
                            key={mod.id}
                            onClick={() => setActiveModule(mod.id)}
                            className={`px-6 py-2 rounded-full text-xs font-bold transition-all border shrink-0 ${activeModule === mod.id ? "bg-accent text-black border-accent" : "bg-white/5 text-muted-foreground border-white/10"
                              }`}
                          >
                            {mod.id}
                          </button>
                        ))}
                      </div>
                      {modules.map((mod) => mod.id === activeModule && (
                        <div key={mod.id} className="grid xl:grid-cols-2 gap-8 items-start h-full">
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
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full flex items-center justify-center shrink-0"
                              >
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
                                {mod.temas.map((tema, idx) => (
                                  <li key={idx} className="flex gap-2 text-xs lg:text-sm text-muted-foreground leading-snug items-start">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                    <span>{tema}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* 3. EVALUACIÓN - Sistema de Calificación y Certificados (layout tipo mockup) */}
                  {activeTab === "evaluacion" && (
                    <motion.div
                      key="evaluacion"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="h-full flex flex-col relative overflow-hidden pr-0"
                    >
                      {/* Halo suave de fondo */}
                      <motion.div
                        aria-hidden
                        className="pointer-events-none absolute -top-40 -right-16 w-80 h-80 rounded-full bg-gradient-to-br from-accent/10 via-quantum-blue/25 to-transparent blur-3xl"
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -6, 0] }}
                        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.div
                        aria-hidden
                        className="pointer-events-none absolute -bottom-40 -left-24 w-72 h-72 rounded-full bg-gradient-to-tr from-primary/25 via-quantum-pink/30 to-transparent blur-3xl"
                        animate={{ scale: [1, 1.18, 1], rotate: [0, -8, 4, 0] }}
                        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
                      />

                      <motion.div
                        whileHover={{ scale: 1.005 }}
                        transition={{ type: "spring", stiffness: 120, damping: 18 }}
                        className="relative z-10 w-full h-full rounded-3xl border border-border/40 bg-background/40 px-6 py-6 md:px-10 md:py-8 lg:px-14 lg:py-10 shadow-[0_0_40px_rgba(15,23,42,0.75)] overflow-hidden flex flex-col"
                      >
                        {/* Brillos internos */}
                        <div className="pointer-events-none absolute inset-0 opacity-35">
                          <div className="absolute -top-24 left-8 w-56 h-56 bg-gradient-to-br from-primary/40 via-quantum-blue/30 to-transparent blur-3xl" />
                          <div className="absolute -bottom-24 right-8 w-64 h-64 bg-gradient-to-tl from-quantum-pink/40 via-accent/40 to-transparent blur-3xl" />
                        </div>

                        <div className="relative z-10 flex flex-col gap-6 h-full">
                          {/* encabezado */}
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                              <p className="text-[12px] md:text-xs uppercase tracking-[0.24em] text-primary/80">
                                Sistema de evaluación
                              </p>
                              <h3 className="mt-1 text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
                                Así se calcula tu nota final
                              </h3>
                            </div>
                            <motion.div
                              className="relative flex items-center justify-center shrink-0"
                              animate={{ rotate: [0, 6, -6, 0] }}
                              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            >
                              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-300/70 via-accent/80 to-primary/70 flex items-center justify-center shadow-[0_0_40px_rgba(250,204,21,0.85)]">
                                <div className="w-20 h-20 rounded-full border-2 border-dashed border-black/40 bg-black/10 flex items-center justify-center">
                                  <span className="text-[10px] font-semibold text-black/80 uppercase tracking-[0.22em] text-center leading-tight">
                                    100%<br />Esfuerzo
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          </div>

                          {/* contenido principal: tarjetas + gato */}
                          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] items-stretch flex-1 min-h-[320px] md:min-h-[360px]">
                            {/* lado izquierdo: porcentajes + texto + certificados */}
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                  { label: "Exámenes", val: "40%", desc: "Evaluaciones modulares", color: "from-primary/70 via-primary/30 to-transparent" },
                                  { label: "Tareas", val: "25%", desc: "Entregas semanales", color: "from-accent/80 via-accent/40 to-transparent" },
                                  { label: "Participación", val: "20%", desc: "Cuestionarios en clase", color: "from-primary/70 via-primary/30 to-transparent" },
                                  { label: "Asistencia", val: "15%", desc: "Máx. 3 inasistencias", color: "from-accent/70 via-accent/35 to-transparent" },
                                ].map((item) => (
                                  <motion.div
                                    key={item.label}
                                    whileHover={{ y: -3, scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#27145c] via-[#1b1043] to-[#110825] border border-primary/40 px-4 py-4 text-left"
                                  >
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
                                Todos los componentes se suman para tu calificación final. Mantén un buen ritmo semanal y evita acumular
                                tareas para potenciar tu desempeño en el examen presencial.
                              </p>

                              <div className="grid sm:grid-cols-2 gap-4 text-xs md:text-sm">
                                <div className="rounded-2xl border border-primary/40 bg-primary/10 px-5 py-4 flex gap-3 items-start">
                                  <Award className="w-5 h-5 text-primary mt-0.5" />
                                  <div>
                                    <p className="font-semibold text-foreground">C1 - Certificado del Curso</p>
                                    <p className="text-muted-foreground mt-1 leading-snug">
                                      Se otorga con nota final <span className="font-semibold text-primary">≥ 70%</span> y asistencia mínima.
                                    </p>
                                  </div>
                                </div>
                                <div className="rounded-2xl border border-accent/60 bg-accent/10 px-5 py-4 flex gap-3 items-start shadow-[0_0_18px_rgba(250,204,21,0.3)]">
                                  <Award className="w-5 h-5 text-accent mt-0.5" />
                                  <div>
                                    <p className="font-semibold text-accent">C2 - Certificado de Honor</p>
                                    <p className="text-muted-foreground mt-1 leading-snug">
                                      Para desempeño sobresaliente con nota <span className="font-semibold text-accent">≥ 90%</span>.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* lado derecho: gato con certificado dentro de la tarjeta */}
                            <div className="relative flex items-center justify-center">
                              <motion.div
                                aria-hidden
                                className="absolute -top-6 -left-6 w-40 h-40 rounded-full bg-gradient-to-tr from-quantum-pink/35 via-primary/35 to-amber-300/65 blur-3xl"
                                animate={{ scale: [1, 1.06, 1], y: [0, -4, 0] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                              />
                              <motion.img
                                src="/certificado.png"
                                alt="Gato Quantum sosteniendo certificado"
                                className="relative z-10 w-full max-w-[340px] lg:max-w-[380px] object-contain drop-shadow-[0_0_40px_rgba(0,0,0,0.9)]"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}

                  {activeTab === "modalidad" && (
                    <motion.div
                      key="modalidad"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="h-full flex flex-col justify-center relative overflow-hidden rounded-3xl"
                    >
                      {/* Fondo con partículas para esta sección */}
                      <div className="absolute inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen">
                        <ParticleNetwork />
                      </div>

                      {/* Halo suave de fondo para complementar las partículas */}
                      <motion.div
                        aria-hidden
                        className="pointer-events-none absolute -top-40 -right-16 w-96 h-96 rounded-full bg-gradient-to-br from-accent/10 via-quantum-blue/10 to-transparent blur-3xl opacity-50"
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -6, 0] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                      />

                      <div className="flex flex-col gap-6 lg:gap-8 w-full max-w-5xl mx-auto relative z-10 px-4 md:px-0">

                        {/* HEADER */}
                        <div className="text-center space-y-2 md:space-y-4">
                          <p className="text-xs uppercase tracking-[0.25em] text-primary/80">
                            Modalidad del Programa
                          </p>

                          <h3 className="text-2xl md:text-3xl xl:text-4xl font-black tracking-tighter text-gradient-quantum">
                            Modalidad y Frecuencia
                          </h3>

                          <p className="text-muted-foreground text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
                            Programa virtual de <span className="text-foreground font-semibold">12 semanas</span>
                            {' '}organizado en <span className="text-foreground font-semibold">3 módulos</span>
                            {' '}con sesiones teóricas y laboratorio aplicado.
                          </p>
                        </div>

                        {/* RESUMEN NUMÉRICO - Estilo Amarillo Iluminado */}
                        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">

                          {[
                            { value: "24", label: "Clases Teóricas", delay: 0.1 },
                            { value: "12", label: "Sesiones de Laboratorio", delay: 0.2 },
                            { value: "74h", label: "Carga Total", delay: 0.3 }
                          ].map((item) => (
                            <motion.div
                              key={item.label}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: item.delay, duration: 0.4 }}
                              whileHover={{ y: -4, scale: 1.02 }}
                              className="relative overflow-hidden rounded-2xl border border-accent/40 bg-accent/10 px-4 py-6 md:py-8 text-center shadow-[0_0_30px_rgba(255,215,0,0.2)] group"
                            >
                              <div className="pointer-events-none absolute inset-0 opacity-40 bg-gradient-to-br from-accent/20 via-transparent to-transparent group-hover:opacity-60 transition-opacity" />
                              <div className="relative z-10">
                                <p className="text-4xl md:text-5xl font-black text-accent drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
                                  {item.value}
                                </p>
                                <p className="mt-2 text-xs uppercase tracking-[0.2em] font-bold text-foreground/90">
                                  {item.label}
                                </p>
                              </div>
                            </motion.div>
                          ))}

                        </div>

                        {/* MÓDULOS */}
                        <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">

                          {[
                            {
                              title: "Módulo 1",
                              weeks: "Semanas 1–4",
                              theory: "16h Teoría",
                              lab: "10h Lab",
                              delay: 0.4
                            },
                            {
                              title: "Módulo 2",
                              weeks: "Semanas 5–8",
                              theory: "16h Teoría",
                              lab: "8h Lab",
                              delay: 0.5
                            },
                            {
                              title: "Módulo 3",
                              weeks: "Semanas 9–12",
                              theory: "16h Teoría",
                              lab: "8h Lab",
                              delay: 0.6
                            }
                          ].map((mod) => (
                            <motion.div
                              key={mod.title}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: mod.delay, duration: 0.4 }}
                              whileHover={{ y: -3 }}
                              className="rounded-2xl border border-primary/40 bg-gradient-to-br from-[#20105a]/90 via-[#170b43]/85 to-[#11111f]/90 p-5 md:p-6 flex flex-col justify-between shadow-[0_0_30px_rgba(138,43,226,0.15)] relative overflow-hidden group"
                            >
                              <div className="pointer-events-none absolute inset-0 opacity-20 bg-gradient-to-br from-primary/30 via-transparent to-transparent group-hover:opacity-40 transition-opacity" />
                              <div className="relative z-10">
                                <h4 className="text-lg font-black uppercase tracking-wide text-foreground">
                                  {mod.title}
                                </h4>

                                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-2">
                                  {mod.weeks}
                                </p>
                              </div>

                              <div className="flex justify-between mt-5 md:mt-6 text-sm font-semibold relative z-10">
                                <span className="text-primary">
                                  {mod.theory}
                                </span>
                                <span className="text-accent">
                                  {mod.lab}
                                </span>
                              </div>
                            </motion.div>
                          ))}

                        </div>

                        {/* FOOTER TOTAL */}
                        <div className="text-center pt-2">
                          <p className="text-xs md:text-sm text-foreground/80 font-medium tracking-wide">
                            48h Teoría + 26h Laboratorio ={" "}
                            <span className="text-accent font-bold drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
                              74 horas totales
                            </span>
                          </p>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div >
  );
};

export default Curso;
