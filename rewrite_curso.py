import re

with open("c:/Users/Jat/Desktop/quantum-nexus/src/pages/Curso.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace Imports
imports_replacement = """import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Book, Clock, Users, ArrowRight, Download, Target, Award, CheckCircle, Atom, Network, Star, BrainCircuit, Sparkles } from "lucide-react";
import aprendiendoImg from "../gato/aprendiendo.png";"""

content = re.sub(r'import Navbar from "@/components/Navbar";[\s\S]*?import {.*?lucide-react";', imports_replacement, content)

# Replace the component body
component_replacement = """const Curso = () => {
  const [activeTab, setActiveTab] = useState("contexto");

  const tabs = [
    { id: "contexto", label: "Contexto y Requisitos", icon: Target },
    { id: "estructura", label: "Plan Académico", icon: Network },
    { id: "metodologia", label: "Metodología", icon: Book },
    { id: "certificacion", label: "Certificación", icon: Award },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "contexto":
        return (
          <motion.div
            key="contexto"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-strong p-8 rounded-3xl border border-primary/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="font-heading text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                  <Atom className="w-6 h-6" /> Descripción
                </h3>
                <p className="text-muted-foreground leading-relaxed relative z-10">
                  En América Latina, el acceso a una formación formal en computación cuántica está limitado a niveles superiores del posgrado. Este programa representa una oportunidad única para introducir este campo a estudiantes en etapas tempranas de su trayectoria académica, con un equipo internacional comprometido.
                </p>
              </div>

              <div className="glass-strong p-8 rounded-3xl border border-quantum-blue/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-quantum-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="font-heading text-2xl font-bold mb-4 text-quantum-blue flex items-center gap-2">
                  <Users className="w-6 h-6" /> Público Objetivo
                </h3>
                <p className="text-muted-foreground leading-relaxed relative z-10">
                  Abierta a <strong>estudiantes de secundaria, preuniversitarios y universitarios de cualquier ciclo</strong>. Aunque no se requiera experiencia previa, el perfil ideal demanda una base matemática preuniversitaria establecida, constancia y curiosidad científica.
                </p>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl border border-accent/20 relative overflow-hidden group">
               <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent/5 rounded-full blur-[50px] group-hover:bg-accent/10 transition-colors duration-500" />
               <h3 className="font-heading text-2xl font-bold mb-6 flex items-center gap-2 text-accent relative z-10">
                 <Target className="w-6 h-6" /> Requisitos y Admisión
               </h3>
               <div className="grid md:grid-cols-2 gap-8 relative z-10">
                 <div className="space-y-4">
                   <p className="text-sm text-foreground/90 leading-relaxed">
                     La inscripción al Módulo 1 es virtual y basada en un ensayo de motivación. No se exige experiencia previa para este módulo.
                   </p>
                   <p className="text-sm text-muted-foreground leading-relaxed">
                     Se recomienda el Módulo 1 como preparación. Quienes tengan la base necesaria pueden tomar directamente el examen de ingreso al Módulo 2.
                   </p>
                 </div>
                 <div className="flex flex-col gap-4">
                    <div className="bg-accent/10 p-5 rounded-2xl border border-accent/20 backdrop-blur-sm">
                     <p className="text-xs font-bold text-accent mb-2 uppercase tracking-wider flex items-center gap-2"><Sparkles className="w-3 h-3"/> Examen Universal (Mód 2)</p>
                     <p className="text-sm text-foreground/90">Presencial en la PUCP el <strong>25 de abril de 2026</strong>. Obligatorio para pasar al Módulo 2.</p>
                   </div>
                   <div className="bg-primary/10 p-5 rounded-2xl border border-primary/20 backdrop-blur-sm">
                      <p className="text-xs font-bold text-primary mb-2 uppercase tracking-wider flex items-center gap-2"><Sparkles className="w-3 h-3"/> Selección Módulo 1</p>
                      <p className="text-sm text-foreground/90">Basada únicamente en la motivación del postulante plasmada en el ensayo.</p>
                   </div>
                 </div>
               </div>
            </div>
          </motion.div>
        );
      case "estructura":
        return (
          <motion.div
            key="estructura"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {modules.map((mod, i) => (
              <div key={mod.id} className="glass-strong rounded-3xl p-8 border border-white/10 hover:border-primary/50 transition-all duration-500 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary to-quantum-pink opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-[60px] group-hover:bg-primary/10 transition-colors" />
                
                <div className="flex flex-col lg:flex-row gap-8 relative z-10">
                  <div className="lg:w-1/3">
                    <h4 className="text-primary font-heading font-bold text-sm tracking-wider uppercase mb-3 flex items-center gap-2">
                       <Clock className="w-4 h-4"/> {mod.period}
                    </h4>
                    <h3 className="font-heading text-2xl font-bold mb-4">{mod.id}:<br/><span className="text-xl text-foreground/90">{mod.title}</span></h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {mod.tags.map((tag, i) => (
                        <span key={i} className={`text-xs px-3 py-1.5 rounded-full border border-current font-medium ${tag.color}`}>
                          {tag.text}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:w-2/3">
                    <p className="text-muted-foreground mb-8 text-base leading-relaxed bg-black/20 p-4 rounded-2xl border border-white/5">
                      {mod.description}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div>
                        <h5 className="font-heading text-sm font-bold mb-4 flex items-center gap-2 text-foreground/90">
                          <BrainCircuit className="w-4 h-4 text-primary" /> Temas a cubrir
                        </h5>
                        <ul className="space-y-3">
                          {mod.temas.map((tema, idx) => (
                            <li key={idx} className="flex gap-3 text-sm text-foreground/80 items-start">
                              <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                              <span className="leading-tight">{tema}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-heading text-sm font-bold mb-4 flex items-center gap-2 text-foreground/90">
                          <Target className="w-4 h-4 text-quantum-pink" /> Prerrequisitos
                        </h5>
                        <div className="bg-quantum-pink/5 rounded-2xl p-5 border border-quantum-pink/20">
                          <p className="text-sm font-medium text-quantum-pink/90">{mod.prerrequisitos}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        );
      case "metodologia":
        return (
          <motion.div
            key="metodologia"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-strong p-8 rounded-3xl border border-primary/20 hover:scale-[1.02] transition-transform duration-300">
                <div className="p-4 bg-primary/10 rounded-2xl w-fit mb-6 border border-primary/20">
                   <Book className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-heading text-xl font-bold mb-3 text-foreground">Clases Teóricas</h4>
                <p className="text-muted-foreground leading-relaxed">Desde el módulo 2 se abordarán conceptos de computación cuántica, matemáticas y física cuántica. En el módulo 1 se establecen las bases y conexiones.</p>
              </div>
              <div className="glass-strong p-8 rounded-3xl border border-quantum-blue/20 hover:scale-[1.02] transition-transform duration-300">
                <div className="p-4 bg-quantum-blue/10 rounded-2xl w-fit mb-6 border border-quantum-blue/20">
                   <Target className="w-8 h-8 text-quantum-blue" />
                </div>
                <h4 className="font-heading text-xl font-bold mb-3 text-foreground">Laboratorios</h4>
                <p className="text-muted-foreground leading-relaxed">Aplicación práctica de los conceptos desarrollados en las clases teóricas, utilizando Python y Qiskit.</p>
              </div>
              <div className="glass-strong p-8 rounded-3xl border border-accent/20 hover:scale-[1.02] transition-transform duration-300">
                <div className="p-4 bg-accent/10 rounded-2xl w-fit mb-6 border border-accent/20">
                   <CheckCircle className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-heading text-xl font-bold mb-3 text-foreground">Tareas Semanales</h4>
                <p className="text-muted-foreground leading-relaxed">Ejercicios individuales orientados a reforzar contenidos. Incluyen problemas "challenge" demostrativos de nivel superior.</p>
              </div>
              <div className="glass-strong p-8 rounded-3xl border border-quantum-pink/20 hover:scale-[1.02] transition-transform duration-300">
                <div className="p-4 bg-quantum-pink/10 rounded-2xl w-fit mb-6 border border-quantum-pink/20">
                   <Award className="w-8 h-8 text-quantum-pink" />
                </div>
                <h4 className="font-heading text-xl font-bold mb-3 text-foreground">Exámenes Mensuales</h4>
                <p className="text-muted-foreground leading-relaxed">3 evaluaciones al cierre de cada módulo para medir el progreso y comprensión. Su realización es obligatoria.</p>
              </div>
            </div>

            <div className="glass-strong p-8 rounded-3xl border border-white/10 mt-8">
               <h3 className="font-heading text-2xl font-bold mb-8 flex items-center gap-3 text-foreground border-b border-white/10 pb-4">
                 <Network className="w-6 h-6 text-quantum-blue" /> Sistema de Evaluación
               </h3>
               <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[
                   { label: "Asistencia", desc: "Máx. 3 faltas/módulo", weight: "15%", color: "text-blue-400 border-blue-400/30 bg-blue-400/10" },
                   { label: "Participación", desc: "Test breves por clase", weight: "20%", color: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10" },
                   { label: "Tareas", desc: "Actividades semanales", weight: "25%", color: "text-amber-400 border-amber-400/30 bg-amber-400/10" },
                   { label: "Exámenes", desc: "Cierre de cada módulo", weight: "40%", color: "text-quantum-pink border-quantum-pink/30 bg-quantum-pink/10" },
                 ].map((item) => (
                   <div key={item.label} className="flex flex-col items-center justify-center p-6 glass rounded-2xl text-center border border-white/5 hover:bg-white/5 transition-colors">
                     <div className={`w-16 h-16 rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4 border-2 ${item.color}`}>
                       {item.weight}
                     </div>
                     <h4 className="font-bold text-foreground mb-2">{item.label}</h4>
                     <p className="text-xs text-muted-foreground">{item.desc}</p>
                   </div>
                 ))}
               </div>
            </div>
          </motion.div>
        );
      case "certificacion":
        return (
          <motion.div
            key="certificacion"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="glass-strong p-10 rounded-3xl border border-primary/20 relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
              <h3 className="font-heading text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8 text-primary" /> Certificación
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl">
                Al finalizar el curso de forma satisfactoria, se otorgarán dos tipos de certificación dependiendo del rendimiento:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-primary/50 transition-colors">
                   <div className="flex items-center gap-4 mb-4">
                     <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                       C1
                     </div>
                     <h4 className="font-heading font-bold text-xl">Certificado<br/>del Curso</h4>
                   </div>
                   <p className="text-muted-foreground">Otorgado a estudiantes que culminen con una <strong>Nota final {'>='} 70%</strong>.</p>
                 </div>
                 
                 <div className="bg-accent/5 border border-accent/20 p-6 rounded-2xl hover:border-accent/50 transition-colors shadow-[0_0_30px_rgba(255,183,0,0.1)]">
                   <div className="flex items-center gap-4 mb-4">
                     <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xl">
                       C2
                     </div>
                     <h4 className="font-heading font-bold text-xl text-accent">Certificado<br/>de Honor</h4>
                   </div>
                   <p className="text-muted-foreground">Exclusivo para estudiantes de rendimiento destacado con una <strong>Nota final {'>='} 90%</strong>.</p>
                 </div>
              </div>
            </div>

            <div className="glass-strong p-10 rounded-3xl border border-quantum-blue/20">
              <h3 className="font-heading text-3xl font-bold mb-6 flex items-center gap-3">
                <Users className="w-8 h-8 text-quantum-blue" /> Plana Docente
              </h3>
              <div className="bg-black/20 p-6 rounded-2xl border border-white/5 space-y-4">
                <p className="text-base text-foreground/90 leading-relaxed flex items-start gap-4">
                  <span className="p-2 bg-quantum-blue/10 text-quantum-blue rounded-xl shrink-0"><CheckCircle className="w-5 h-5"/></span>
                  Impartido por un equipo internacional de instructores compuesto por estudiantes de maestría y doctorado en física y computación cuántica.
                </p>
                <div className="h-px w-full bg-white/10 my-2" />
                <p className="text-sm text-muted-foreground leading-relaxed flex items-start gap-4">
                 <span className="p-2 bg-white/5 rounded-xl shrink-0"><Sparkles className="w-5 h-5 text-muted-foreground"/></span>
                  El Módulo 1 está a cargo íntegramente de egresados destacados de la edición 2025, evidenciando el pipeline de talento y sostenibilidad académica de QuantumHub Perú.
                </p>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />

      {/* Hero Section Rediseñado */}
      <section className="relative pt-32 pb-20 overflow-hidden px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 quantum-grid opacity-20" />
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-quantum-pink/10 rounded-full blur-[100px]" />
        
        {/* Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-primary/40 rounded-full shadow-[0_0_10px_rgba(var(--primary),0.8)]"
                animate={{
                  y: [Math.random() * 1000, -100],
                  x: [Math.random() * 1000, Math.random() * 1000],
                  opacity: [0, 1, 0],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: Math.random() * 10 + 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
           ))}
        </div>

        <div className="w-full max-w-[1400px] mx-auto relative z-10 bg-card/40 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-16 items-center lg:items-center border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
          {/* Left Column (Text & CTA) */}
          <div className="flex-1 text-left space-y-8 w-full z-10">
             <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-heading tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(var(--primary),0.2)]"
              >
                <Atom className="w-4 h-4 animate-spin-slow" /> Edición 2026-I
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-heading text-4xl md:text-5xl lg:text-[4rem] font-bold leading-[1.1]"
              >
                Curso de <br />
                <span className="text-gradient-quantum">Introducción a la <br className="hidden lg:block"/>Computación Cuántica</span>
              </motion.h1>
             </div>
             
             <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground font-body leading-relaxed max-w-2xl"
             >
                Formación estructurada en computación cuántica para estudiantes de secundaria, preuniversitarios y universitarios de cualquier ciclo. Desarrolla competencias en física, matemáticas y programación con un equipo internacional.
             </motion.p>
             
             {/* Stats Row */}
             <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-x-12 gap-y-6 pt-6 pb-2"
             >
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-3xl text-foreground flex items-center pl-1">
                     <Star className="w-5 h-5 text-accent fill-accent mr-2 -ml-1" /> 4.9
                  </span>
                  <span className="text-xs text-muted-foreground mt-2 uppercase tracking-wide font-medium">Calificación curso</span>
                </div>
                <div className="w-px bg-white/10" />
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-3xl text-foreground flex items-center">
                    24 <span className="text-base font-normal text-muted-foreground mt-1.5 ml-2 font-body">Clases</span>
                  </span>
                  <span className="text-xs text-muted-foreground mt-2 uppercase tracking-wide font-medium">Teóricas y Lab</span>
                </div>
                <div className="w-px bg-white/10 hidden sm:block" />
                <div className="flex-col hidden sm:flex">
                  <span className="font-heading font-bold text-3xl text-foreground flex items-center">
                    74 <span className="text-base font-normal text-muted-foreground mt-1.5 ml-2 font-body">Horas</span>
                  </span>
                  <span className="text-xs text-muted-foreground mt-2 uppercase tracking-wide font-medium">De contenido Total</span>
                </div>
             </motion.div>

             {/* Buttons */}
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-6 pt-4 items-center sm:items-start"
             >
               <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
                 <a href="https://forms.gle/9EhQgzZmTXJRtp4Q6" target="_blank" rel="noopener noreferrer" className="btn-accent-cta w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 text-base shadow-[0_0_30px_rgba(255,183,0,0.3)] hover:shadow-[0_0_40px_rgba(255,183,0,0.5)]">
                   ¡Inscríbete Ahora! <ArrowRight className="w-5 h-5" />
                 </a>
                 <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-400"/> Participación Gratuita</p>
               </div>
               
               <a href="https://drive.google.com/drive/folders/1nx3Z5mxqG4li_buFuObRSXhdvqdSpmLo" target="_blank" rel="noopener noreferrer" className="btn-outline-quantum w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base border-white/10 bg-white/5 hover:bg-white/10">
                 <Download className="w-4 h-4" /> Brochure PDF
               </a>
             </motion.div>
          </div>

          {/* Right Column (Image container) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-1 w-full max-w-lg lg:max-w-none ml-auto justify-end flex relative"
          >
             <div className="relative w-[110%] md:w-full aspect-square md:aspect-auto md:h-[600px] rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#FFB800]/20 to-[#6B00FF]/20 border border-white/10 flex items-center justify-center p-8 lg:p-12 group shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 quantum-grid opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
                
                {/* Orbiting Elements */}
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-white/20 rounded-full m-12 lg:m-24 opacity-50"
                />
                <motion.div 
                  animate={{ rotate: -360 }} 
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-white/20 rounded-full m-16 lg:m-36 opacity-30"
                />
                
                <img 
                  src={aprendiendoImg} 
                  alt="Aprendiendo Cuántica" 
                  className="w-[120%] lg:w-[130%] h-[120%] lg:h-[130%] max-w-none object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-quantum-float group-hover:scale-105 transition-transform duration-700" 
                  style={{ transformOrigin: "center bottom" }}
                />
             </div>
          </motion.div>

        </div>
      </section>

      {/* Menú Lateral y Contenido Dinámico */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="absolute inset-0 circuit-lines opacity-10" />
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-quantum-blue/10 rounded-full blur-[100px]" />
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-[1400px]">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            {/* Sidebar Menu */}
            <div className="lg:w-[300px] shrink-0">
               <div className="sticky top-32 space-y-2 relative z-10 glass p-6 rounded-3xl border border-white/10 shadow-2xl">
                 <h2 className="font-heading text-2xl font-bold mb-8 px-2 flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                     <Atom className="w-5 h-5 text-primary" />
                   </div>
                   El Programa
                 </h2>
                 <div className="space-y-3">
                   {tabs.map((tab) => {
                     const Icon = tab.icon;
                     const isActive = activeTab === tab.id;
                     return (
                       <button
                         key={tab.id}
                         onClick={() => setActiveTab(tab.id)}
                         className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-heading text-sm font-bold text-left group relative overflow-hidden ${
                           isActive 
                             ? "bg-gradient-to-r from-primary/20 to-transparent text-primary border border-primary/30 shadow-[0_0_20px_rgba(var(--primary),0.1)]" 
                             : "hover:bg-white/5 text-muted-foreground hover:text-foreground border border-transparent"
                         }`}
                       >
                         {isActive && (
                           <motion.div 
                             layoutId="activeTabSidebar" 
                             className="absolute left-0 top-0 w-1 h-full bg-primary"
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             transition={{ duration: 0.3 }}
                           />
                         )}
                         <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110 opacity-70 group-hover:opacity-100"}`} />
                         <span className="relative z-10">{tab.label}</span>
                         {isActive && <motion.div layoutId="arrowActive" className="ml-auto"><ArrowRight className="w-4 h-4 opacity-70" /></motion.div>}
                       </button>
                     );
                   })}
                 </div>
               </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 w-full relative min-h-[600px] z-10">
               <AnimatePresence mode="wait">
                 {renderTabContent()}
               </AnimatePresence>
            </div>

          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Curso;"""

content = re.sub(r'const Curso = \(\) => \{[\s\S]*export default Curso;', component_replacement + "\n\nexport default Curso;", content)

with open("c:/Users/Jat/Desktop/quantum-nexus/src/pages/Curso.tsx", "w", encoding="utf-8") as f:
    f.write(content)
