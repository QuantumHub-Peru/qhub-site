import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Atom, BookOpen, Lightbulb, Megaphone, Users, Cpu, Code, GraduationCap, Microscope, ArrowRight } from "lucide-react";

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
    description: "El Departamento de Innovación explora las aplicaciones prácticas de la computación cuántica en problemas reales de la región, conectando investigación con industria.",
    mission: "Conectar la investigación cuántica con soluciones que impacten a la sociedad latinoamericana.",
    tracks: [
      { title: "Quantum Startups", icon: Lightbulb, description: "Incubamos ideas y proyectos que aplican computación cuántica a problemas reales: optimización logística, descubrimiento de fármacos, finanzas cuánticas y más. Apoyamos a emprendedores con mentoría técnica y conexiones con la industria." },
      { title: "Hackathons Cuánticos", icon: Code, description: "Organizamos competencias intensivas donde equipos multidisciplinarios resuelven desafíos reales usando herramientas cuánticas. Nuestros hackathons conectan talento emergente con empresas y organizaciones interesadas en el potencial cuántico." },
      { title: "Alianzas con Industria", icon: Cpu, description: "Construimos puentes entre la academia cuántica y el sector empresarial, identificando casos de uso donde la ventaja cuántica puede generar impacto medible en industrias clave de Latinoamérica." },
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
    description: "Amplificamos la voz de la computación cuántica en LATAM y construimos alianzas estratégicas con instituciones, empresas y medios internacionales.",
    mission: "Posicionar a QuantumHub Peru como el referente cuántico de Latinoamérica.",
    tracks: [
      { title: "Comunicación Estratégica", icon: Megaphone, description: "Desarrollamos narrativas poderosas que conectan la computación cuántica con audiencias diversas. Desde comunicados de prensa hasta campañas en redes sociales, cada mensaje refuerza la visión de un ecosistema cuántico latinoamericano." },
      { title: "Alianzas Institucionales", icon: Users, description: "Negociamos y gestionamos alianzas con universidades, centros de investigación, empresas tecnológicas y organismos gubernamentales para fortalecer el ecosistema cuántico regional." },
      { title: "Eventos y Conferencias", icon: GraduationCap, description: "Organizamos y participamos en eventos que visibilizan el trabajo de QuantumHub, desde el Quantum AI Summit hasta charlas en conferencias internacionales de computación cuántica." },
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
    description: "Construimos la red más grande de entusiastas y profesionales cuánticos de Latinoamérica, creando espacios de conexión y crecimiento mutuo.",
    mission: "Crear una comunidad vibrante donde el conocimiento cuántico se comparte libremente y todos pueden crecer.",
    tracks: [
      { title: "Meetups y Networking", icon: Users, description: "Organizamos encuentros mensuales presenciales y virtuales donde miembros de la comunidad comparten conocimientos, presentan proyectos y construyen relaciones profesionales en el espacio cuántico." },
      { title: "Mentorías Peer-to-Peer", icon: GraduationCap, description: "Conectamos estudiantes con profesionales experimentados en programas de mentoría estructurados que aceleran el aprendizaje y abren puertas a oportunidades en el ecosistema cuántico global." },
      { title: "Proyectos Comunitarios", icon: Code, description: "Facilitamos proyectos colaborativos donde miembros de distintos niveles contribuyen a iniciativas open-source, tutoriales y recursos educativos que benefician a toda la comunidad." },
    ],
    projects: ["Discord activo (500+ miembros)", "Meetup Lima mensual", "Programa de mentorías", "Wiki cuántica colaborativa"],
    howToJoin: "Únete a nuestro Discord y participa en los meetups mensuales. La comunidad está abierta a todos los niveles, desde curiosos hasta expertos en computación cuántica."
  },
};

const DepartmentPage = ({ deptId }: { deptId: string }) => {
  const dept = deptData[deptId];
  if (!dept) return null;
  const Icon = dept.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-b ${dept.bgAccent}`} />
        <div className="absolute inset-0 quantum-grid opacity-10" />
        <div className="relative z-10 container mx-auto px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className={`w-20 h-20 rounded-2xl glass mx-auto mb-6 flex items-center justify-center ${dept.glowClass}`}>
              <Icon className={`w-10 h-10 ${dept.colorClass}`} />
            </div>
            <h1 className="font-heading text-2xl md:text-4xl font-bold mb-3">{dept.name}</h1>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">{dept.subtitle}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass rounded-2xl p-8 mb-8 text-center">
            <p className="font-body text-foreground/80 leading-relaxed max-w-3xl mx-auto">{dept.description}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`glass rounded-2xl p-6 mb-16 ${dept.borderColor} border`}>
            <h3 className="font-heading text-xs uppercase tracking-wider text-muted-foreground mb-2">Misión</h3>
            <p className="font-body text-foreground/90 leading-relaxed">{dept.mission}</p>
          </motion.div>
        </div>
      </section>

      {/* Tracks - creative layout like reference */}
      <section className="py-16 section-darker">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-heading text-xl md:text-2xl font-bold text-center mb-12"
          >
            Líneas de <span className="text-gradient-quantum">Acción</span>
          </motion.h2>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden md:block" />

            {dept.tracks.map((track, i) => {
              const isLeft = i % 2 === 0;
              const TrackIcon = track.icon;
              return (
                <motion.div
                  key={track.title}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative md:w-[45%] mb-10 ${isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}
                >
                  {/* Connector dot */}
                  <div className={`hidden md:block absolute top-6 w-3 h-3 rounded-full bg-primary ${isLeft ? "-right-1.5" : "-left-1.5"}`} />

                  <div className={`glass rounded-2xl p-6 group hover:${dept.glowClass.replace("shadow-", "shadow-")} transition-all duration-300 ${dept.borderColor} border hover:border-opacity-60`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <TrackIcon className={`w-5 h-5 ${dept.colorClass}`} />
                      </div>
                      <h3 className="font-heading text-sm font-bold text-accent">{track.title}</h3>
                    </div>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{track.description}</p>
                  </div>
                </motion.div>
              );
            })}
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
              <h3 className="font-heading text-sm font-bold mb-4">Proyectos Activos</h3>
              <ul className="space-y-3">
                {dept.projects.map((p) => (
                  <li key={p} className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                    <span className="font-body text-sm text-muted-foreground group-hover:text-foreground transition-colors">{p}</span>
                  </li>
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
