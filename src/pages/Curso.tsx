import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Book, Clock, Users, ArrowRight, Download, GraduationCap, Target, Award, CheckCircle } from "lucide-react";

// Modules Data
const modules = [
  {
    id: "QC101",
    title: "Matemáticas y Computación Científica",
    module: "Módulo 1",
    description: "Este módulo intensivo está diseñado exclusivamente para estudiantes de secundaria admitidos tras examen de ingreso. Nivelará en fundamentos matemáticos y computacionales necesarios para abordar la computación cuántica. No cubre física cuántica ni algoritmos cuánticos.",
    tags: [
      { text: "⚠️ Solo escolares", color: "bg-red-500/10 text-red-500 border-red-500/20" },
      { text: "4 semanas (25 Ago - 20 Sep)", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
      { text: "Introductorio", color: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" }
    ],
    temas: [
      "Números complejos: forma polar, módulo, argumento, fórmula de Euler",
      "Vectores y matrices: producto escalar, ortogonalidad, matrices hermíticas",
      "Espacios vectoriales y operadores lineales",
      "Autovalores, autovectores y notación de Dirac",
      "Probabilidad clásica y cuántica (regla de Born)",
      "Fundamentos de Python, NumPy y matplotlib",
      "Simulación básica de operadores y mediciones cuánticas"
    ],
    prerrequisitos: "Álgebra, geometría, trigonometría y probabilidad preuniversitaria"
  },
  {
    id: "QC201",
    title: "Fundamentos de Computación Cuántica",
    module: "Módulo 2",
    description: "Introducción formal al modelo de qubit, compuertas cuánticas de uno y dos qubits, esfera de Bloch, entrelazamiento y medición. Clases con prácticas en simuladores cuánticos con Qiskit.",
    tags: [
      { text: "⚠️ Inicio de universitarios", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
      { text: "4 semanas (22 Sep - 19 Oct)", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
      { text: "Intermedio", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" }
    ],
    temas: [
      "Qubits y superposición de estados",
      "Esfera de Bloch y fases relativas",
      "Compuertas cuánticas (X, Y, Z, Hadamard, CNOT)",
      "Sistemas compuestos y producto tensorial",
      "Entrelazamiento cuántico y estados de Bell",
      "Postulado de medición y colapso del estado",
      "Introducción al modelo de circuitos cuánticos"
    ],
    prerrequisitos: "Álgebra lineal básica y conocimientos de Python"
  },
  {
    id: "QC301",
    title: "Protocolos y Algoritmos Cuánticos",
    module: "Módulo 3",
    description: "Profundiza en algoritmos cuánticos y protocolos de información cuántica como teleportación y codificación superdensa. Incluye Deutsch–Jozsa y Grover. Teoría y simulación en Qiskit.",
    tags: [
      { text: "Estudiantes de Quantum Hub", color: "bg-primary/10 text-primary border-primary/20" },
      { text: "4 semanas (27 Oct - 23 Nov)", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
      { text: "Avanzado", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" }
    ],
    temas: [
      "Teleportación cuántica",
      "Codificación superdensa",
      "Algoritmo de Deutsch–Jozsa",
      "Algoritmo de Grover",
      "Comparación de estrategias clásicas y cuánticas",
      "Construcción e interpretación de circuitos avanzados en Qiskit"
    ],
    prerrequisitos: "QC201 aprobado"
  },
  {
    id: "QC401",
    title: "Proyecto de Investigación (Capstone)",
    module: "Módulo 4",
    description: "Proyecto de investigación guiado por mentores para aplicar conocimientos en optimización, QML, simulación de sistemas físicos o análisis de hardware real. Culmina con póster de investigación.",
    tags: [
      { text: "Estudiantes de Quantum Hub", color: "bg-primary/10 text-primary border-primary/20" },
      { text: "3 semanas (01 Dic - 21 Dic)", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
      { text: "Aplicado", color: "bg-quantum-pink/10 text-quantum-pink border-quantum-pink/20" }
    ],
    temas: [
      "Algoritmo de Optimización Cuántica Aproximada (QAOA)",
      "Quantum Machine Learning (QML)",
      "Estimación de fase cuántica y Transformada cuántica de Fourier (QFT)",
      "Simulación variacional de Hamiltonianos",
      "Comparación entre simuladores y hardware real"
    ],
    prerrequisitos: "QC301 aprobado"
  }
];

const Curso = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 quantum-grid opacity-20" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />

        <div className="container relative z-10 mx-auto px-6 max-w-5xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-6xl font-bold mb-6"
          >
            Nuestro <span className="text-gradient-quantum">Curso</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground font-body max-w-2xl mx-auto mb-10"
          >
            Un programa educativo completo diseñado para llevarte desde los fundamentos básicos hasta las aplicaciones más avanzadas de la computación cuántica.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="/postulacion" className="btn-accent-cta inline-flex items-center justify-center gap-2">
              ¡Inscríbete Ahora! <ArrowRight className="w-5 h-5" />
            </a>
            <a href="https://drive.google.com/file/d/150Yq_1kVkldriLvVhFzkCn3hp1WceaqM/view" target="_blank" rel="noopener noreferrer" className="btn-outline-quantum inline-flex items-center justify-center gap-2">
              Descargar Brochure <Download className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Estructura del Programa */}
      <section className="py-20 bg-card/50 relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="font-heading text-3xl font-bold mb-4">Estructura del Programa</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nuestro programa está dividido en 4 módulos especializados, diseñados para diferentes niveles de conocimiento y experiencia académica.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl hover:glow-blue transition-all"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 text-blue-400">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">Estudiantes de Secundaria</h3>
              <p className="text-muted-foreground mb-4">
                Pueden postular únicamente desde el Módulo 1, diseñado específicamente para introducir los conceptos fundamentales de manera accesible y avanzar hasta el Módulo 3 según su progreso.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium">
                Módulos 1, 2, 3 y 4
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl hover:glow-purple transition-all"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 text-primary">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">Estudiantes Universitarios</h3>
              <p className="text-muted-foreground mb-4">
                Pueden postular únicamente a partir del Módulo 2, con la opción de avanzar hasta el Módulo 4 según su nivel de conocimiento.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mt-6">
                Módulos 2, 3 y 4
              </div>
            </motion.div>
          </div>

          {/* Modules List */}
          <div className="space-y-12">
            {modules.map((mod, i) => (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="glass rounded-2xl p-8 border hover:border-primary/50 transition-colors relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary to-quantum-pink" />

                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <h4 className="text-primary font-heading font-bold text-sm tracking-wider uppercase mb-2">{mod.id} - {mod.module}</h4>
                    <h3 className="font-heading text-2xl font-bold mb-4">{mod.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {mod.tags.map((tag, i) => (
                        <span key={i} className={`text-xs px-3 py-1 rounded-full border font-medium ${tag.color}`}>
                          {tag.text}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="md:w-2/3">
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {mod.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-8">
                      <div>
                        <h5 className="font-heading text-sm font-semibold mb-3 flex items-center gap-2">
                          <Book className="w-4 h-4 text-primary" /> Temas a cubrir:
                        </h5>
                        <ul className="space-y-2">
                          {mod.temas.map((tema, idx) => (
                            <li key={idx} className="flex gap-2 text-sm text-foreground/80">
                              <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                              <span>{tema}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-heading text-sm font-semibold mb-3 flex items-center gap-2">
                          <Target className="w-4 h-4 text-quantum-pink" /> Prerrequisitos:
                        </h5>
                        <div className="bg-background/50 rounded-lg p-4 border border-border/50">
                          <p className="text-sm font-medium text-foreground/90">{mod.prerrequisitos}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué elegir nuestro curso */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero mix-blend-overlay" />
        <div className="container relative z-10 mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl font-bold mb-4">¿Por qué elegir nuestro curso?</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass p-6 rounded-xl text-center group hover:-translate-y-2 transition-transform"
            >
              <Award className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-heading font-semibold mb-2">Contenido Actualizado</h3>
              <p className="text-sm text-muted-foreground">Currículo diseñado con las últimas investigaciones en computación cuántica</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass p-6 rounded-xl text-center group hover:-translate-y-2 transition-transform"
            >
              <Users className="w-10 h-10 text-quantum-pink mx-auto mb-4" />
              <h3 className="font-heading font-semibold mb-2">Docentes especializados</h3>
              <p className="text-sm text-muted-foreground">Instructores internacionales con maestrías y doctorados en el área</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass p-6 rounded-xl text-center group hover:-translate-y-2 transition-transform"
            >
              <Target className="w-10 h-10 text-quantum-blue mx-auto mb-4" />
              <h3 className="font-heading font-semibold mb-2">Enfoque Práctico</h3>
              <p className="text-sm text-muted-foreground">Laboratorios virtuales y proyectos reales con tecnología cuántica</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass p-6 rounded-xl text-center group hover:-translate-y-2 transition-transform"
            >
              <Clock className="w-10 h-10 text-accent mx-auto mb-4" />
              <h3 className="font-heading font-semibold mb-2">Horarios Flexibles</h3>
              <p className="text-sm text-muted-foreground">Clases virtuales<br />Martes y Jueves | 6:00 - 8:00 pm<br />Sábados | 11:30 - 1:30 pm</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="inscripcion" className="py-24 relative overflow-hidden bg-card/80">
        <div className="absolute inset-0 circuit-lines opacity-10" />
        <div className="container relative z-10 mx-auto px-6 max-w-4xl text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="glass-strong p-12 rounded-3xl border-primary/30 glow-purple"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para comenzar tu aventura cuántica?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Inscríbete ahora y forma parte de la próxima generación de expertos en computación cuántica.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/postulacion" className="btn-accent-cta w-full sm:w-auto inline-flex items-center justify-center gap-2 text-lg px-10 py-4">
                ¡Inscríbete Ahora! <ArrowRight className="w-5 h-5" />
              </a>
              <a href="/equipo" className="btn-outline-quantum w-full sm:w-auto inline-flex items-center justify-center gap-2 text-lg px-10 py-4">
                Conoce a nuestro equipo
              </a>
            </div>
            <div className="mt-6">
              <a href="https://drive.google.com/file/d/150Yq_1kVkldriLvVhFzkCn3hp1WceaqM/view" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 underline underline-offset-4">
                Descargar Brochure <Download className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Curso;
