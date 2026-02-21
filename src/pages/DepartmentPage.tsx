import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Atom, BookOpen, Lightbulb, Megaphone, Users, Cpu, Code, GraduationCap, Microscope, ArrowRight, ChevronDown, Zap } from "lucide-react";

interface Track {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface DeptPageData {
  name: string;
  subtitle: string;
  icon: React.ElementType;
  colorClass: string;
  borderColor: string;
  glowClass: string;
  bgAccent: string;
  hslColor: string;
  description: string;
  mission: string;
  tracks: Track[];
  projects: string[];
  howToJoin: string;
}

const deptData: Record<string, DeptPageData> = {
  investigacion: {
    name: "Departamento de Investigación",
    subtitle: "Proyectos técnicos en tecnologías cuánticas con enfoque aplicado",
    icon: Atom,
    colorClass: "text-dept-research",
    borderColor: "border-dept-research/30",
    glowClass: "shadow-[0_0_30px_hsl(210,100%,60%,0.2)]",
    bgAccent: "from-dept-research/10 to-transparent",
    hslColor: "210 100% 60%",
    description: "El Departamento de Investigación impulsa proyectos técnicos en tecnologías cuánticas con enfoque aplicado. Estamos integrados por egresados del curso de Computación Cuántica e Información Cuántica 2025 que continúan su formación científica con nosotros mediante investigación formal.",
    mission: "Producir investigación de impacto en computación cuántica y posicionar a Latinoamérica en el mapa cuántico global.",
    tracks: [
      { title: "Quantum Hardware Track", icon: Cpu, description: "Estudiamos cómo generar, controlar y medir estados cuánticos de luz. En particular, investigamos la física y arquitectura de sistemas de fotónica cuántica integrada y espacio libre. Trabajamos en circuitos ópticos, detección y modelado de componentes, estudiando cómo el diseño físico determina el desempeño y la escalabilidad de plataformas cuánticas." },
      { title: "Quantum Software Track", icon: Code, description: "Diseñamos y deployamos algoritmos cuánticos, modelos híbridos y sistemas de Quantum Machine Learning, con foco en su estructura matemática, dinámica bajo ruido y desempeño en simulación. Nuestro trabajo busca resolver problemas reales del mundo en la medicina, la industria petrolera, así como explorar nuevas avenidas en el arte y la música." },
      { title: "Quantum Education Track", icon: GraduationCap, description: "Tomamos el nuevo curso de Computación Cuántica 2026 como objeto de estudio desde su implementación. Aplicamos técnicas de Machine Learning y procesamiento de lenguaje natural (NLP) para analizar el rendimiento académico de los estudiantes correlacionándolos con variables socioeconómicas, geográficas y de género para producir evidencia cuantitativa rigurosa sobre formación pionera en tecnologías cuánticas." },
      { title: "Directed Reading Programs (DRP)", icon: Microscope, description: "Los DRP son espacios personalizados de formación técnica intensiva orientados a investigación. Cada programa profundiza en áreas específicas de hardware o software — desde fundamentos teóricos hasta herramientas computacionales — y prepara a los participantes para integrarse a proyectos activos del Departamento." },
    ],
    projects: ["Fotónica cuántica integrada", "Quantum Machine Learning para medicina", "Análisis educativo con NLP", "Simulación de circuitos cuánticos"],
    howToJoin: "Para unirte al departamento de investigación, completa el curso introductorio y postula a uno de nuestros tracks activos. Buscamos personas curiosas con ganas de explorar las fronteras de la computación cuántica."
  },
  academico: {
    name: "Departamento Académico",
    subtitle: "Diseño curricular y programas educativos en tecnologías cuánticas",
    icon: BookOpen,
    colorClass: "text-dept-academic",
    borderColor: "border-dept-academic/30",
    glowClass: "shadow-[0_0_30px_hsl(270,70%,55%,0.2)]",
    bgAccent: "from-dept-academic/10 to-transparent",
    hslColor: "270 70% 55%",
    description: "El Departamento Académico diseña y ejecuta programas educativos que hacen accesible la computación cuántica para todos los niveles, desde principiantes hasta investigadores avanzados.",
    mission: "Democratizar la educación cuántica en toda Latinoamérica, eliminando barreras de acceso.",
    tracks: [
      { title: "Diseño Curricular", icon: BookOpen, description: "Creamos programas de estudio rigurosos y accesibles, adaptados a las necesidades de estudiantes latinoamericanos. Nuestro currículo combina fundamentos teóricos con aplicaciones prácticas usando herramientas como Qiskit y Pennylane." },
      { title: "Formación Docente", icon: GraduationCap, description: "Capacitamos a profesores y facilitadores en metodologías de enseñanza para computación cuántica, asegurando que el conocimiento se transmita de manera efectiva y atractiva." },
      { title: "Evaluación y Mejora Continua", icon: Microscope, description: "Monitoreamos el impacto de nuestros programas mediante métricas educativas y feedback de estudiantes, iterando constantemente para mejorar la experiencia de aprendizaje." },
    ],
    projects: ["Curso Introductorio QC 2026", "Talleres de Qiskit", "Programa de certificación", "Material educativo abierto"],
    howToJoin: "Si tienes experiencia en educación o pasión por enseñar tecnologías emergentes, contáctanos para colaborar en el diseño de programas educativos cuánticos."
  },
  innovacion: {
    name: "Departamento de Innovación",
    subtitle: "Aplicaciones prácticas y startups cuánticas",
    icon: Lightbulb,
    colorClass: "text-dept-innovation",
    borderColor: "border-dept-innovation/30",
    glowClass: "shadow-[0_0_30px_hsl(175,80%,50%,0.2)]",
    bgAccent: "from-dept-innovation/10 to-transparent",
    hslColor: "175 80% 50%",
    description: "El Departamento de Innovación explora las aplicaciones prácticas de la computación cuántica en problemas reales de la región, conectando investigación con industria.",
    mission: "Conectar la investigación cuántica con soluciones que impacten a la sociedad latinoamericana.",
    tracks: [
      { title: "Quantum Startups", icon: Lightbulb, description: "Incubamos ideas y proyectos que aplican computación cuántica a problemas reales: optimización logística, descubrimiento de fármacos, finanzas cuánticas y más." },
      { title: "Hackathons Cuánticos", icon: Code, description: "Organizamos competencias intensivas donde equipos multidisciplinarios resuelven desafíos reales usando herramientas cuánticas." },
      { title: "Alianzas con Industria", icon: Cpu, description: "Construimos puentes entre la academia cuántica y el sector empresarial, identificando casos de uso donde la ventaja cuántica puede generar impacto medible." },
    ],
    projects: ["Hackathon Qiskit LATAM", "Quantum Finance Lab", "Optimización cuántica para logística", "Challenge de QML"],
    howToJoin: "Si tienes una idea que podría beneficiarse de computación cuántica o quieres participar en nuestros hackathons, únete a nuestra comunidad de innovadores."
  },
  "relaciones-publicas": {
    name: "Departamento de Relaciones Públicas",
    subtitle: "Comunicación, alianzas estratégicas y difusión",
    icon: Megaphone,
    colorClass: "text-dept-relations",
    borderColor: "border-dept-relations/30",
    glowClass: "shadow-[0_0_30px_hsl(45,100%,55%,0.2)]",
    bgAccent: "from-dept-relations/10 to-transparent",
    hslColor: "45 100% 55%",
    description: "Amplificamos la voz de la computación cuántica en LATAM y construimos alianzas estratégicas con instituciones, empresas y medios internacionales.",
    mission: "Posicionar a QuantumHub Peru como el referente cuántico de Latinoamérica.",
    tracks: [
      { title: "Comunicación Estratégica", icon: Megaphone, description: "Desarrollamos narrativas poderosas que conectan la computación cuántica con audiencias diversas." },
      { title: "Alianzas Institucionales", icon: Users, description: "Negociamos y gestionamos alianzas con universidades, centros de investigación, empresas tecnológicas y organismos gubernamentales." },
      { title: "Eventos y Conferencias", icon: GraduationCap, description: "Organizamos y participamos en eventos que visibilizan el trabajo de QuantumHub." },
    ],
    projects: ["Quantum AI Summit 2025", "Campaña LATAM Cuántico", "Newsletter mensual", "Podcast QuantumVoices"],
    howToJoin: "Si tienes habilidades en comunicación, marketing digital o relaciones públicas y quieres contribuir a la difusión de la tecnología cuántica, contáctanos."
  },
  comunidad: {
    name: "Departamento de Comunidad",
    subtitle: "Red de entusiastas y profesionales cuánticos",
    icon: Users,
    colorClass: "text-dept-community",
    borderColor: "border-dept-community/30",
    glowClass: "shadow-[0_0_30px_hsl(330,70%,60%,0.2)]",
    bgAccent: "from-dept-community/10 to-transparent",
    hslColor: "330 70% 60%",
    description: "Construimos la red más grande de entusiastas y profesionales cuánticos de Latinoamérica, creando espacios de conexión y crecimiento mutuo.",
    mission: "Crear una comunidad vibrante donde el conocimiento cuántico se comparte libremente y todos pueden crecer.",
    tracks: [
      { title: "Meetups y Networking", icon: Users, description: "Organizamos encuentros mensuales presenciales y virtuales donde miembros de la comunidad comparten conocimientos y construyen relaciones profesionales." },
      { title: "Mentorías Peer-to-Peer", icon: GraduationCap, description: "Conectamos estudiantes con profesionales experimentados en programas de mentoría estructurados." },
      { title: "Proyectos Comunitarios", icon: Code, description: "Facilitamos proyectos colaborativos donde miembros de distintos niveles contribuyen a iniciativas open-source." },
    ],
    projects: ["Discord activo (500+ miembros)", "Meetup Lima mensual", "Programa de mentorías", "Wiki cuántica colaborativa"],
    howToJoin: "Únete a nuestro Discord y participa en los meetups mensuales. La comunidad está abierta a todos los niveles."
  },
};

const DepartmentPage = ({ deptId }: { deptId: string }) => {
  const dept = deptData[deptId];
  const [expandedTrack, setExpandedTrack] = useState<number | null>(null);

  if (!dept) return null;
  const Icon = dept.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-b ${dept.bgAccent}`} />
        <div className="absolute inset-0 quantum-grid opacity-10 animate-grid-flow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: `radial-gradient(circle, hsl(${dept.hslColor} / 0.1), transparent 70%)` }}
        />

        <div className="relative z-10 container mx-auto px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <motion.div
              className="w-24 h-24 rounded-2xl glass mx-auto mb-6 flex items-center justify-center"
              style={{ boxShadow: `0 0 40px hsl(${dept.hslColor} / 0.3)` }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <Icon className={`w-12 h-12 ${dept.colorClass}`} />
            </motion.div>
            <h1 className="font-heading text-2xl md:text-4xl font-bold mb-3">{dept.name}</h1>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">{dept.subtitle}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass rounded-2xl p-8 mb-8 text-center max-w-3xl mx-auto">
            <p className="font-body text-foreground/80 leading-relaxed">{dept.description}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`glass rounded-2xl p-6 mb-16 ${dept.borderColor} border max-w-3xl mx-auto`}>
            <h3 className="font-heading text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
              <Zap className="w-3 h-3 text-primary" /> Misión
            </h3>
            <p className="font-body text-foreground/90 leading-relaxed">{dept.mission}</p>
          </motion.div>
        </div>
      </section>

      {/* Tracks — Quantum Timeline */}
      <section className="py-20 section-darker relative overflow-hidden">
        <div className="absolute inset-0 quantum-grid opacity-5" />

        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-heading text-xl md:text-2xl font-bold text-center mb-4"
          >
            Líneas de <span className="text-gradient-quantum">Acción</span>
          </motion.h2>
          <p className="font-body text-sm text-muted-foreground text-center mb-14 max-w-md mx-auto">
            Cada línea de acción es un estado activo del departamento. Haz clic para colapsar y observar.
          </p>

          {/* Vertical energy line */}
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5">
              <div className="w-full h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
              {/* Animated pulse */}
              <motion.div
                className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-primary/60 to-transparent rounded-full"
                animate={{ top: ["0%", "100%"] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              />
            </div>

            <div className="space-y-6">
              {dept.tracks.map((track, i) => {
                const isLeft = i % 2 === 0;
                const isExpanded = expandedTrack === i;
                const TrackIcon = track.icon;

                return (
                  <motion.div
                    key={track.title}
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative pl-16 md:pl-0 ${isLeft ? "md:pr-[calc(50%+2rem)] md:text-right" : "md:pl-[calc(50%+2rem)]"}`}
                  >
                    {/* Node on the timeline */}
                    <div className={`absolute left-4 md:left-1/2 md:-translate-x-1/2 top-4 z-10`}>
                      <motion.div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                          isExpanded ? "border-primary bg-primary" : "border-border/50 bg-secondary"
                        }`}
                        animate={isExpanded ? { scale: [1, 1.3, 1] } : {}}
                        transition={{ repeat: isExpanded ? Infinity : 0, duration: 2 }}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${isExpanded ? "bg-primary-foreground" : "bg-primary/50"}`} />
                      </motion.div>
                    </div>

                    {/* Card */}
                    <button
                      onClick={() => setExpandedTrack(isExpanded ? null : i)}
                      className={`w-full text-left glass rounded-xl transition-all duration-500 group overflow-hidden ${
                        isExpanded ? `border ${dept.borderColor}` : "border border-transparent hover:border-border/30"
                      }`}
                      style={{
                        boxShadow: isExpanded ? `0 0 30px hsl(${dept.hslColor} / 0.15)` : "none",
                      }}
                    >
                      {/* Header — always visible */}
                      <div className={`p-5 flex items-center gap-4 ${isLeft ? "md:flex-row-reverse md:text-right" : ""}`}>
                        <div
                          className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0 transition-all duration-300"
                          style={{
                            boxShadow: isExpanded ? `0 0 15px hsl(${dept.hslColor} / 0.3)` : "none",
                          }}
                        >
                          <TrackIcon className={`w-5 h-5 ${dept.colorClass}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading text-sm font-bold text-accent leading-tight">{track.title}</h3>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 shrink-0 ${isExpanded ? "rotate-180" : ""}`} />
                      </div>

                      {/* Expanded content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="overflow-hidden"
                          >
                            <div className={`px-5 pb-5 border-t border-border/20 pt-4 ${isLeft ? "md:text-right" : ""}`}>
                              <div className="flex items-center gap-2 mb-2 justify-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                <span className="font-heading text-[10px] uppercase tracking-wider text-muted-foreground">Estado activo</span>
                              </div>
                              <p className="font-body text-sm text-muted-foreground leading-relaxed text-left">{track.description}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Projects & How to Join */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8"
            >
              <h3 className="font-heading text-sm font-bold mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Proyectos Activos
              </h3>
              <ul className="space-y-4">
                {dept.projects.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 group"
                  >
                    <div
                      className="w-8 h-8 rounded-lg glass flex items-center justify-center shrink-0 group-hover:border-primary/30 transition-all"
                      style={{ boxShadow: `0 0 10px hsl(${dept.hslColor} / 0.1)` }}
                    >
                      <Zap className={`w-3.5 h-3.5 ${dept.colorClass}`} />
                    </div>
                    <span className="font-body text-sm text-muted-foreground group-hover:text-foreground transition-colors">{p}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`glass rounded-2xl p-8 ${dept.borderColor} border`}
            >
              <h3 className="font-heading text-sm font-bold mb-4">¿Cómo Participar?</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">{dept.howToJoin}</p>
              <a href="/nosotros" className="btn-quantum inline-flex items-center gap-2 text-xs">
                Únete al Ecosistema <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DepartmentPage;
