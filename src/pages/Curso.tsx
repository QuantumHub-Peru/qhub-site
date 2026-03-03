import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleNetwork from "@/components/ParticleNetwork";
import { motion, AnimatePresence } from "framer-motion";
import { Book, Clock, Users, ArrowRight, Download, GraduationCap, Target, Award, CheckCircle, ChevronRight, PlayCircle } from "lucide-react";
import { useState } from "react";
import aprendiendoImg from "@/gato/aprendiendo.png";

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
    prerrequisitos: "Ninguno específico. Disposición para aprender matemáticas."
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
      "Puertas cuánticas (X, Y, Z, H, CNOT, Fase) y operadores unitarios",
      "Postulado de medida, regla de Born, efectos de la medición",
      "Sistemas de dos qubits, productos tensoriales y entrelazamiento",
      "Prácticas con Qiskit en circuitos básicos"
    ],
    prerrequisitos: "Aprobar el Modulo 1 o el Examen de Ingreso del 25 de abril."
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
    prerrequisitos: "Módulo 2 aprobado de forma satisfactoria."
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

const Curso = () => {
  const [activeTab, setActiveTab] = useState("intro");
  const [activeModule, setActiveModule] = useState(modules[0].id);

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
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500 group relative overflow-hidden ${
                activeTab === tab.id ? "text-black font-bold bg-accent shadow-[0_0_20px_rgba(255,215,0,0.5)]" : "text-muted-foreground hover:bg-white/5"
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
    <div className="flex-1 z-10 glass rounded-2xl border border-border/50 bg-background/30 backdrop-blur-md overflow-hidden">
      <div className="h-full p-6 lg:p-10 relative overflow-y-auto lg:overflow-y-hidden custom-scrollbar">
        <AnimatePresence mode="wait">
          
          {/* 1. EL PROGRAMA - Intro con Mapa Latam */}
          {activeTab === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="h-full flex flex-col lg:flex-row gap-10 items-center">
              <div className="lg:w-1/2 space-y-6">
                <h2 className="text-3xl xl:text-5xl font-bold tracking-tighter text-gradient-quantum">Impacto en América Latina</h2>
                <p className="text-muted-foreground text-base xl:text-lg leading-relaxed">
                  Este programa democratiza el acceso a tecnologías de frontera para estudiantes de secundaria y universitarios, replicando modelos de éxito internacional.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-sm">
                    <p className="text-xs font-bold text-primary mb-2 uppercase tracking-widest text-center">Examen PUCP</p>
                    <p className="text-sm text-foreground/80 leading-snug text-center">25 de abril de 2026.</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-accent/10 border border-accent/20 backdrop-blur-sm">
                    <p className="text-xs font-bold text-accent mb-2 uppercase tracking-widest text-center">Admisión</p>
                    <p className="text-sm text-foreground/80 leading-snug text-center">Basada en motivación.</p>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 flex justify-center">
                {/* Mapa Latam Resaltado */}
                <div className="relative w-72 h-72">
                  <div className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20 animate-pulse" />
                  <Users className="w-full h-full text-accent opacity-30 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
                  <div className="absolute inset-0 flex items-center justify-center font-black text-accent text-sm tracking-widest">LATAM FOCUS</div>
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
                    className={`px-6 py-2 rounded-full text-xs font-bold transition-all border shrink-0 ${
                      activeModule === mod.id ? "bg-accent text-black border-accent" : "bg-white/5 text-muted-foreground border-white/10"
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
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/5 shadow-inner">
                    <h5 className="font-bold text-sm mb-4 flex items-center gap-2 text-foreground/90 uppercase tracking-widest">
                      <CheckCircle className="w-4 h-4 text-accent" /> Temas a cubrir
                    </h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {mod.temas.map((tema, idx) => (
                        <li key={idx} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          {tema}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* 3. EVALUACIÓN - Sistema de Calificación y Certificados */}
          {activeTab === "evaluacion" && (
            <motion.div key="evaluacion" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col justify-center space-y-8">
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                  { label: "Exámenes", val: "40%", desc: "Evaluaciones modulares", color: "text-primary" },
                  { label: "Tareas", val: "25%", desc: "Entregas semanales", color: "text-accent" },
                  { label: "Participación", val: "20%", desc: "Cuestionarios en clase", color: "text-emerald-400" },
                  { label: "Asistencia", val: "15%", desc: "Máx. 3 inasistencias", color: "text-amber-500" }
                ].map((item, i) => (
                  <div key={i} className="glass p-6 rounded-2xl text-center border border-white/5 bg-white/5 hover:border-primary/30 transition-all">
                    <p className={`text-3xl font-black ${item.color}`}>{item.val}</p>
                    <p className="text-xs font-bold uppercase mt-1">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="grid xl:grid-cols-2 gap-6">
                <div className="glass p-6 rounded-2xl border border-primary/20 bg-primary/5 flex items-center gap-6">
                  <Award className="w-12 h-12 text-primary shrink-0" />
                  <div>
                    <h5 className="font-bold text-lg">C1 - Certificado del Curso</h5>
                    <p className="text-sm text-muted-foreground">Otorgado con calificación final ≥ 70%.</p>
                  </div>
                </div>
                <div className="glass p-6 rounded-2xl border border-accent/20 bg-accent/5 flex items-center gap-6 shadow-[0_0_30px_rgba(255,215,0,0.1)]">
                  <Award className="w-12 h-12 text-accent shrink-0" />
                  <div>
                    <h5 className="font-bold text-accent text-lg">C2 - Certificado de Honor</h5>
                    <p className="text-sm text-muted-foreground">Otorgado con calificación final ≥ 90%.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 4. MODALIDAD - Frecuencia y Tabla */}
          {activeTab === "modalidad" && (
            <motion.div key="modalidad" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col justify-center space-y-8">
              <div className="grid grid-cols-3 gap-6">
                {[
                  { icon: <Book />, l: "Teoría", v: "24 ses.", c: "text-primary" },
                  { icon: <Target />, l: "Labs", v: "12 ses.", c: "text-quantum-blue" },
                  { icon: <Clock />, l: "Total", v: "74 hrs", c: "text-accent" }
                ].map((s, i) => (
                  <div key={i} className="glass p-6 rounded-2xl text-center border border-white/5">
                    <div className="w-10 h-10 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-3 text-xl">{s.icon}</div>
                    <p className={`text-2xl font-black ${s.c}`}>{s.v}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{s.l}</p>
                  </div>
                ))}
              </div>
              <div className="glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px] text-left">
                    <thead className="bg-white/5 text-muted-foreground text-[10px] uppercase tracking-[0.2em]">
                      <tr>
                        <th className="px-8 py-5">Fase Académica</th>
                        <th className="px-8 py-5">Horas Teóricas</th>
                        <th className="px-8 py-5">Horas Lab</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        { p: "Módulo 1 (Semanas 1-4)", t: "16 h", l: "10 h" },
                        { p: "Módulo 2 (Semanas 5-8)", t: "16 h", l: "08 h" },
                        { p: "Módulo 3 (Semanas 9-12)", t: "16 h", l: "08 h" }
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors group">
                          <td className="px-8 py-5 font-bold text-primary">{row.p}</td>
                          <td className="px-8 py-5 text-foreground/80">{row.t}</td>
                          <td className="px-8 py-5 text-foreground/80">{row.l}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
    </div>
  );
};

export default Curso;
