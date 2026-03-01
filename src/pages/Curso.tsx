import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Book, Clock, Users, ArrowRight, Download, GraduationCap, Target, Award, CheckCircle } from "lucide-react";

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

const Curso = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 quantum-grid opacity-20" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />

        <div className="container relative z-10 mx-auto px-6 max-w-5xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-heading text-xs tracking-[0.3em] text-accent uppercase mb-4"
          >
            2026 - 1 <span className="mx-2 text-muted-foreground">|</span> @quantumhub.pe
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-6xl font-bold mb-6"
          >
            Curso de <br className="hidden md:block" /> <span className="text-gradient-quantum uppercase">Introducción a la <br /> Computación Cuántica</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground font-body max-w-4xl mx-auto mb-10 leading-relaxed"
          >
            Formación estructurada en computación cuántica para estudiantes de secundaria, preuniversitarios y universitarios de cualquier ciclo. Desarrolla competencias en física, matemáticas y programación con un equipo internacional.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="https://forms.gle/9EhQgzZmTXJRtp4Q6" target="_blank" rel="noopener noreferrer" className="btn-accent-cta inline-flex items-center justify-center gap-2 px-8 py-4">
              ¡Inscríbete Ahora! <ArrowRight className="w-5 h-5" />
            </a>
            <a href="https://drive.google.com/drive/folders/1nx3Z5mxqG4li_buFuObRSXhdvqdSpmLo" target="_blank" rel="noopener noreferrer" className="btn-outline-quantum inline-flex items-center justify-center gap-2 px-8 py-4">
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

          {/* 1. Descripción */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl border border-primary/30 h-full"
            >
              <h3 className="font-heading text-2xl font-bold mb-4 text-primary w-fit border-b-2 border-primary/50 pb-2">Descripción</h3>
              <p className="text-muted-foreground leading-relaxed">
                En América Latina, el acceso a una formación formal en computación cuántica está limitado a niveles superiores del posgrado. Este programa representa una oportunidad única para introducir este campo a estudiantes en etapas tempranas de su trayectoria académica, con un equipo internacional comprometido.
              </p>
            </motion.div>

            {/* 2. Público Objetivo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl border border-quantum-blue/30 h-full"
            >
              <h3 className="font-heading text-2xl font-bold mb-4 text-quantum-blue w-fit border-b-2 border-quantum-blue/50 pb-2">Público Objetivo</h3>
              <p className="text-muted-foreground leading-relaxed">
                El curso fue inicialmente diseñado para estudiantes avanzados de últimos años de secundaria y universitarios de primeros ciclos. Sin embargo, esta edición es abierta a <strong>estudiantes de secundaria, preuniversitarios y universitarios de cualquier ciclo</strong>. Aunque no se requiera experiencia previa, el perfil ideal demanda una base matemática preuniversitaria establecida, constancia y curiosidad científica.
              </p>
            </motion.div>
          </div>

          {/* 3. Requisitos y Admisión */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-2xl border border-accent/20 mb-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-heading text-xl font-bold mb-4 flex items-center gap-2 text-accent">
                  <Target className="w-5 h-5" /> Requisitos y Admisión
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  La inscripción al Módulo 1 es virtual y basada en un ensayo de motivación. No se exige experiencia previa para este módulo.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Se recomienda el Módulo 1 como preparación. Quienes tengan la base necesaria pueden tomar directamente el examen de ingreso al Módulo 2.
                </p>
              </div>
              <div className="flex flex-col justify-center gap-4">
                 <div className="bg-accent/5 p-4 rounded-lg border border-accent/10">
                  <p className="text-xs font-bold text-accent mb-1 uppercase">Examen Universal (Módulo 2):</p>
                  <p className="text-sm text-foreground/80">Presencial en la PUCP el <strong>25 de abril de 2026</strong>. Obligatorio para pasar al Módulo 2.</p>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                   <p className="text-xs font-bold text-primary mb-1 uppercase">Selección:</p>
                   <p className="text-sm text-foreground/80">Basada únicamente en la motivación del postulante.</p>
                </div>
              </div>
            </div>
          </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl font-bold mb-4">Plan Académico</h2>
        </motion.div>

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
                  <h4 className="text-primary font-heading font-bold text-sm tracking-wider uppercase mb-2">{mod.period}</h4>
                  <h3 className="font-heading text-2xl font-bold mb-4">{mod.id}: {mod.title}</h3>
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
{/* 👇 AGREGA ESTAS DOS ETIQUETAS DE CIERRE AQUÍ 👇 */}
      </div>
    </section>
      {/* Metodología y Evaluación */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl font-bold mb-4">Metodología y Sistema de Evaluación</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              El curso comprende 24 clases teóricas y 12 sesiones de laboratorio, sumando un total de 74 horas.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left max-w-4xl mx-auto mt-8">
              <div className="glass p-6 rounded-xl border border-white/5">
                <h4 className="font-bold text-primary mb-2 flex items-center gap-2"><Book className="w-4 h-4" /> Clases Teóricas</h4>
                <p className="text-sm text-muted-foreground">Desde el módulo 2 se abordarán conceptos de computación cuántica, matemáticas y física cuántica. En el módulo 1 se establecen las bases y conexiones.</p>
              </div>
              <div className="glass p-6 rounded-xl border border-white/5">
                <h4 className="font-bold text-quantum-blue mb-2 flex items-center gap-2"><Target className="w-4 h-4" /> Laboratorios</h4>
                <p className="text-sm text-muted-foreground">Aplicación práctica de los conceptos desarrollados en las clases teóricas, utilizando Python y Qiskit.</p>
              </div>
              <div className="glass p-6 rounded-xl border border-white/5">
                <h4 className="font-bold text-amber-500 mb-2 flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Tareas Semanales</h4>
                <p className="text-sm text-muted-foreground">Ejercicios individuales orientados a reforzar contenidos. Incluyen problemas "challenge" demostrativos de nivel superior y mayor ponderación.</p>
              </div>
              <div className="glass p-6 rounded-xl border border-white/5">
                <h4 className="font-bold text-quantum-pink mb-2 flex items-center gap-2"><Award className="w-4 h-4" /> Exámenes Mensuales</h4>
                <p className="text-sm text-muted-foreground">3 evaluaciones al cierre de cada módulo para medir el progreso y comprensión. Su realización es obligatoria.</p>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-heading text-2xl font-bold mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-primary" /> Modalidad y Frecuencia
              </h3>
              <div className="glass rounded-xl overflow-hidden border border-white/10">
                <table className="w-full text-sm text-left">
                  <thead className="bg-primary/10 border-b border-primary/20">
                    <tr>
                      <th className="px-4 py-3 font-heading text-primary">Semanas</th>
                      <th className="px-4 py-3 font-heading text-primary">Teóricas (h)</th>
                      <th className="px-4 py-3 font-heading text-primary">Lab (h)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3">1 - 4</td>
                      <td className="px-4 py-3">16 h</td>
                      <td className="px-4 py-3">10 h</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3">5 - 8</td>
                      <td className="px-4 py-3">16 h</td>
                      <td className="px-4 py-3">8 h</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3">9 - 12</td>
                      <td className="px-4 py-3">16 h</td>
                      <td className="px-4 py-3">8 h</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-heading text-2xl font-bold mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-quantum-pink" /> Sistema de Evaluación
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Asistencia", desc: "Máximo de 3 inasistencias por módulo.", weight: "15%", color: "bg-blue-500/10 text-blue-400" },
                  { label: "Participación Académica", desc: "Cuestionarios breves al final de cada clase.", weight: "20%", color: "bg-emerald-500/10 text-emerald-400" },
                  { label: "Tareas", desc: "Actividades semanales y problemas 'challenge'.", weight: "25%", color: "bg-amber-500/10 text-amber-400" },
                  { label: "Exámenes", desc: "Evaluaciones al cierre de cada módulo.", weight: "40%", color: "bg-quantum-pink/10 text-quantum-pink" },
                ].map((item, i) => (
                  <div key={item.label} className="flex items-center justify-between glass p-4 rounded-xl hover:bg-white/5 transition-colors">
                    <div>
                      <h4 className="font-heading font-bold text-foreground">{item.label}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.color}`}>
                      {item.weight}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl border-l-[4px] border-l-primary"
            >
              <h3 className="font-heading text-xl font-bold mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" /> Certificación
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Al finalizar el curso, se otorgarán dos tipos de certificación:
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-accent shrink-0" /> <strong>C1 - Certificado del Curso:</strong> Nota final {'>='} 70%.</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-accent shrink-0" /> <strong>C2 - Certificado de Honor:</strong> Nota final {'>='} 90%.</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass p-8 rounded-2xl border-l-[4px] border-l-quantum-blue"
            >
              <h3 className="font-heading text-xl font-bold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-quantum-blue" /> Docentes
              </h3>
              <p className="text-sm text-foreground/90 leading-relaxed mb-3">
                Impartido por un equipo internacional de instructores compuesto por estudiantes de maestría y doctorado en física y computación cuántica.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                El Módulo 1 está a cargo íntegramente de egresados destacados de la edición 2025, evidenciando el pipeline de talento y sostenibilidad de QuantumHub Perú.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-2xl border border-white/10 max-w-4xl mx-auto"
          >
            <h3 className="font-heading text-xl font-bold mb-6 text-center text-white">Resumen</h3>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-center">
              <li><span className="block font-bold text-primary mb-1">Público:</span> <span className="text-muted-foreground">Escolares (4° y 5°), preuniversitarios y universitarios</span></li>
              <li><span className="block font-bold text-quantum-blue mb-1">Modalidad:</span> <span className="text-muted-foreground">Virtual (Zoom)</span></li>
              <li><span className="block font-bold text-quantum-pink mb-1">Compromiso:</span> <span className="text-muted-foreground">8 - 10 horas semanales</span></li>
              <li><span className="block font-bold text-accent mb-1">Certificados:</span> <span className="text-muted-foreground">2 Opciones oficiales</span></li>
            </ul>
          </motion.div>
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
              Inscríbete ahora y forma parte de la próxima generación de expertos. Las vacantes son limitadas y se asignarán en base a tu ensayo de motivación.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="https://forms.gle/9EhQgzZmTXJRtp4Q6" target="_blank" rel="noopener noreferrer" className="btn-accent-cta w-full sm:w-auto inline-flex items-center justify-center gap-2 text-lg px-10 py-4">
                ¡Inscríbete Ahora! <ArrowRight className="w-5 h-5" />
              </a>
              <a href="/equipo" className="btn-outline-quantum w-full sm:w-auto inline-flex items-center justify-center gap-2 text-lg px-10 py-4">
                Conoce a nuestro equipo
              </a>
            </div>
            <div className="mt-6">
              <a href="https://drive.google.com/drive/folders/1nx3Z5mxqG4li_buFuObRSXhdvqdSpmLo" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 underline underline-offset-4">
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
