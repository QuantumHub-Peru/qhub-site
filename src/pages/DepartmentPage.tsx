import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BulletRoulette from "@/components/BulletRoulette";
import AchievementsCarousel from "@/components/AchievementsCarousel";
import AlliancesCarousel from "@/components/AlliancesCarousel";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Atom, BookOpen, Lightbulb, Megaphone, Users, Calendar, ArrowRight, Zap, Trophy, BrainCircuit, Rocket, Award } from "lucide-react";

interface Initiative {
  title: string;
  description: string;
  icon: React.ElementType;
  date?: string;
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
  heroImage: string;
  description: string;
  mission: string;
  initiatives: Initiative[];
  projects: string[];
  howToJoin: string;
  bullets: { title: string; description: string; extended?: string }[];
  achievements: { title: string; description?: string; photo?: string }[];
  alliances: { name: string; logo?: string; isUpcoming?: boolean }[];
}

const deptData: Record<string, DeptPageData> = {
  investigacion: {
    name: "Departamento de Investigación",
    subtitle: "Proyectos técnicos en tecnologías cuánticas con enfoque aplicado",
    icon: Atom,
    colorClass: "text-[#3399FF]", // dept-research
    borderColor: "border-[#3399FF]/30",
    glowClass: "shadow-[0_0_30px_hsl(210,100%,60%,0.2)]",
    bgAccent: "from-[#3399FF]/10 to-transparent",
    hslColor: "210 100% 60%",
    heroImage: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=2670&auto=format&fit=crop", // laboratory
    description: "El Departamento de Investigación impulsa proyectos técnicos en tecnologías cuánticas con enfoque aplicado. Estamos integrados por egresados del curso de Computación Cuántica e Información Cuántica 2025 que continúan su formación científica con nosotros mediante investigación formal.",
    mission: "Producir investigación de impacto en computación cuántica y posicionar a Latinoamérica en el mapa cuántico global.",
    initiatives: [
      { title: "Publicación en arXiv: Fotónica Integrada", date: "Q3 2025", icon: BrainCircuit, description: "Desarrollo y modelado de componentes para plataformas cuánticas de fotónica integrada, documentando hallazgos sobre la eficiencia de acoplamiento." },
      { title: "Quantum Machine Learning aplicado a la Salud", date: "Activo", icon: Atom, description: "Despliegue de modelos híbridos cuánticos/clásicos enfocados en predicción de estructuras proteicas." },
      { title: "Directed Reading Programs (DRP)", date: "Continuo", icon: BookOpen, description: "Espacios de formación técnica intensiva orientados a investigación. Profundizamos en fundamentos teóricos y herramientas antes de integrarnos a proyectos activos." },
    ],
    projects: ["Fotónica cuántica integrada", "Quantum Machine Learning para medicina", "Análisis educativo con NLP", "Simulación de circuitos cuánticos"],
    howToJoin: "Para unirte al departamento de investigación, completa el curso introductorio y postula a uno de nuestros proyectos activos presentando tu perfil en Discord.",
    bullets: [
      { title: "Publicaciones Científicas", description: "Fomentamos la publicación de artículos en revistas indexadas y arXiv.", extended: "Nuestro objetivo es que cada proyecto de investigación culmine en un paper o pre-print. Te brindamos asesoría constante en la redacción científica y revisión por pares." },
      { title: "Hardware Cuántico", description: "Acceso y experimentación con procesadores cuánticos reales.", extended: "Mediante nuestras alianzas educacionales, tendrás la oportunidad de correr tus scripts sobre hardware real de IBM Q, en lugar de depender únicamente de simuladores." },
      { title: "Algoritmos Variacionales", description: "Desarrollo de VQEs y QAOA aplicados a problemas.", extended: "Profundizamos en el estado del arte del Quantum Machine Learning, diseñando algoritmos híbridos que aprovechan recursos cuánticos a corto plazo (NISQ)." },
      { title: "Colaboración Global", description: "Alianzas con centros de investigación de todo el mundo.", extended: "Participarás activamente en discusiones abiertas con investigadores asociados, nutriendo tus investigaciones con perspectiva internacional." }
    ],
    achievements: [{ title: "Mención Honrosa Q-Hack 2024" }, { title: "Paper Publicado en ArXiv" }, { title: "Patrocinio QBrazil" }],
    alliances: [
      { name: "IBM Quantum", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
      { name: "Qiskit", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Qiskit_Logo.svg" }
    ]
  },
  academico: {
    name: "Departamento Académico",
    subtitle: "Diseño curricular y programas educativos en tecnologías cuánticas",
    icon: BookOpen,
    colorClass: "text-[#AF52DE]", // dept-academic
    borderColor: "border-[#AF52DE]/30",
    glowClass: "shadow-[0_0_30px_hsl(270,70%,55%,0.2)]",
    bgAccent: "from-[#AF52DE]/10 to-transparent",
    hslColor: "270 70% 55%",
    heroImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2670&auto=format&fit=crop", // students/learning
    description: "El Departamento Académico diseña y ejecuta programas educativos que hacen accesible la computación cuántica para todos los niveles, desde principiantes hasta investigadores avanzados.",
    mission: "Democratizar la educación cuántica en toda Latinoamérica, eliminando barreras de acceso técnico y de lenguaje.",
    initiatives: [
      { title: "Curso Completo QC 2025", date: "Finalizado", icon: Trophy, description: "Culminación exitosa de la primera promoción de más de 300 estudiantes en fundamentos de información y computación cuántica." },
      { title: "Nueva Malla Curricular 2026", date: "En Desarrollo", icon: BookOpen, description: "Rediseño completo del material educativo integrando Pennylane y Qiskit 1.0, enfocado en aprendizaje interactivo." },
      { title: "Formación de Facilitadores", date: "Q2 2025", icon: Users, description: "Programa intensivo de 'train the trainers' para graduados del curso anterior, preparándolos para ser los profesores de la siguiente generación." },
    ],
    projects: ["Curso Introductorio QC 2026", "Talleres Presenciales", "Programa de certificación", "Libro de texto colaborativo"],
    howToJoin: "Buscamos constantemente profesores, mentores y creadores de contenido técnico. Envíanos un correo a academico@quantumhub.pe.",
    bullets: [
      { title: "Curriculum Abierto", description: "Material educativo de libre acceso y actualizado.", extended: "Todo nuestro sylabus y materiales interactivos están en repositorios públicos. Creemos fielmente en el movimiento open-source para la academia." },
      { title: "Clases Interactivas", description: "Sesiones en vivo con expertos enfocadas en la participación.", extended: "No solo te brindamos pre-grabados, cada semana contamos con sesiones síncronas para resolver dudas algorítmicas de manera conversacional." },
      { title: "Certificación Rigurosa", description: "Validación de conocimientos para el mercado.", extended: "Al culminar nuestros programas, serás acreedor de un reconocimiento avalado que demuestra un entendimiento matemático sólido respaldado por nuestra red." },
      { title: "Mentoría 1:1", description: "Acompañamiento personalizado para cada estudiante.", extended: "Asignamos a cada alumno un Alumni del grupo de investigación que le guiará técnica y profesionalmente a través de sesiones cerradas dedicadas." }
    ],
    achievements: [{ title: "+300 Graduados" }, { title: "Certificación Qiskit Global" }],
    alliances: [
      { name: "Universidad Nacional de Ingeniería", logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Uni_logo.png" },
      { name: "IEEE UNI", logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/IEEE_logo.svg" }
    ]
  },
  innovacion: {
    name: "Departamento de Innovación",
    subtitle: "Aplicaciones prácticas y startups cuánticas",
    icon: Lightbulb,
    colorClass: "text-[#10E8D9]", // dept-innovation
    borderColor: "border-[#10E8D9]/30",
    glowClass: "shadow-[0_0_30px_hsl(175,80%,50%,0.2)]",
    bgAccent: "from-[#10E8D9]/10 to-transparent",
    hslColor: "175 80% 50%",
    heroImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop", // tech/cyber space
    description: "Nuestro producto principal es una plataforma web abierta y beginner-friendly para enseñar computación cuántica en español. A través de 4 módulos de aprendizaje, simulaciones como la esfera de Bloch y el experimento de la doble rendija y retos gamificados, estructuramos un aprendizaje dinámico y progresivo.",
    mission: "Traducir la ventaja cuántica teórica en soluciones tangibles para problemas industriales contemporáneos en Latinoamérica.",
    initiatives: [
      { title: "Quantum LATAM Hackathon", date: "Octubre 2025", icon: Rocket, description: "Competencia de fin de semana resolviendo problemas de optimización logística y portafolios financieros de empresas locales usando solvers híbridos." },
      { title: "Incubadora Q-Startups", date: "Fase Piloto", icon: Lightbulb, description: "Primera cohorte piloto apoyando a 3 equipos de estudiantes en el diseño de su modelo de negocio (spin-off) basado en tecnologías cuánticas." },
      { title: "Alianzas Estratégicas B2B", date: "Continuo", icon: BrainCircuit, description: "Conversaciones abiertas con los sectores bancarios y de agro-industria locales para explicar y explorar pilotos POC cuánticos." },
    ],
    projects: ["Hackathon Quantum Series", "Quantum Finance Simulator", "Optimización agrologística QAA", "Reportes de Industria"],
    howToJoin: "Desarrolladores, emprendedores, PMs de producto son bienvenidos. Postula tus ideas innovadoras a nuestro repositorio central de pitch.",
    bullets: [
      {
        title: "Divulgación Científica Accesible",
        description: "Transformamos conceptos técnicos en mensajes comprensibles para audiencias diversas, reduciendo barreras de acceso al conocimiento cuántico. Desarrollamos contenido divulgativo enfocado en explicar principios y aplicaciones de la computación cuántica de manera dinámica, visual y cercana, despertando curiosidad e interés incluso en personas sin formación previa en el área. ",
        extended: "Desarrollamos tecnología educativa sin restricciones geográficas, económicas ni académicas. Este modelo es respaldado por el equipo pedagógico de QuantumHub, conformado por egresados, asegurando coherencia y claridad conceptual."
      },
      {
        title: "Estrategia de Contenido y Presencia Digital",
        description: "Actuamos como el puente que conecta a los miembros del ecosistema QuantumHub, promoviendo interacción, reconocimiento y sentido de pertenencia. A través de contenido que visibiliza logros, experiencias, actividades y procesos internos, fortalecemos la identidad colectiva y motivamos la participación activa dentro de la comunidad.",
        extended: "Diseñamos y ejecutamos contenido para plataformas como LinkedIn e Instagram con una visión estratégica orientada a visibilidad, posicionamiento y engagement. Creamos publicaciones, reels, campañas y materiales visuales alineados con los objetivos institucionales, asegurando coherencia de marca y continuidad comunicacional. Cada contenido se planifica considerando impacto, audiencia y valor educativo."
      },
      {
        title: "Conexión y Sentido de Comunidad",
        description: "Actuamos como el puente que conecta a los miembros del ecosistema QuantumHub, promoviendo interacción, reconocimiento y sentido de pertenencia. A través de contenido que visibiliza logros, experiencias, actividades y procesos internos, fortalecemos la identidad colectiva y motivamos la participación activa dentro de la comunidad.",
        extended: "Actuamos como el puente que conecta a los miembros del ecosistema QuantumHub, promoviendo interacción, reconocimiento y sentido de pertenencia. A través de contenido que visibiliza logros, experiencias, actividades y procesos internos, fortalecemos la identidad colectiva y motivamos la participación activa dentro de la comunidad."
      },
      {
        title: "Creación Colaborativa e Innovación Creativa",
        description: "El contenido del departamento se desarrolla a partir del trabajo colaborativo del equipo de Comunidad, integrando creatividad, iniciativa y aprendizaje continuo en cada proyecto. Utilizamos herramientas digitales contemporáneas para crear contenido visual dinámico que combina diseño, comunicación y ciencia, con el objetivo de acercar la computación cuántica a más personas de manera clara y atractiva.",
        extended: "Diseñamos una interfaz UX/UI intuitiva con simulaciones en tiempo real para manipular fases y circuitos cuánticos. Incluye rotaciones en la esfera de Bloch, el experimento de doble rendija y un constructor de circuitos drag-and-drop."
      }
    ],
    achievements: [{
      title: "QREATE Challenge Finalist",
      description: "Nuestra plataforma QHub Learning Platform fue seleccionada como finalista en el QREATE Challenge, parte de la Q3 Initiative organizada por el Center for Quantum Networks (CQN) en colaboración con la University of Maryland (UMD). Esta iniciativa reconoce proyectos diseñados para enseñar conceptos de Quantum Information Science and Engineering (QISE) a audiencias no técnicas y semi-técnicas, integrando aplicaciones reales y fundamentos pedagógicos sólidos.",
      photo: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop"
    }],
    alliances: [{ name: "Wayra (Próximamente)", isUpcoming: true }]
  },
  "relaciones-publicas": {
    name: "Relaciones Públicas",
    subtitle: "Comunicación, alianzas estratégicas y difusión",
    icon: Megaphone,
    colorClass: "text-[#FFCC00]", // dept-relations
    borderColor: "border-[#FFCC00]/30",
    glowClass: "shadow-[0_0_30px_hsl(45,100%,55%,0.2)]",
    bgAccent: "from-[#FFCC00]/10 to-transparent",
    hslColor: "45 100% 55%",
    heroImage: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2670&auto=format&fit=crop", // networking / people
    description: "Amplificamos la voz de la computación cuántica en LATAM mediante relaciones internacionales e institucionales. Construimos y mantenemos vínculos clave con universidades, patrocinadores y la prensa especializada.",
    mission: "Convertir a QuantumHub Peru en el representante principal del continente ante las grandes esferas cuánticas de IBM, Google, AWS y startups líderes mundiales.",
    initiatives: [
      { title: "Sponsorship Q-Summit", date: "Agosto 2025", icon: Award, description: "Campaña central levantando fondos y alianzas con los mayores provedores de hardware del mundo para subvencionar el gran evento Quantum AI." },
      { title: "Lanzamiento del Podcast 'Superposición'", date: "Q1 2026", icon: Megaphone, description: "Programa de entrevistas en español con científicos latinoamericanos trabajando en corporaciones de primera línea en todo el globo." },
      { title: "Expansión Universitaria", date: "Continuo", icon: Users, description: "Firma sistemática de Memorándums de Entendimiento (MoUs) con universidades en todo LATAM para convalidar créditos." },
    ],
    projects: ["Quantum AI Summit 2025", "Plan de Branding Internacional", "Podcast Superposición", "Programa Ambassadors"],
    howToJoin: "Relacionistas públicos, marketers, abogados, diseñadores gráficos y comunicadores. ¡Ayúdanos a hacer que la cuántica sea pop y formal a la vez en LATAM!",
    bullets: [
      { title: "Presencia en Medios", description: "Artículos, entrevistas y reportajes sobre ecosistema.", extended: "Redactamos piezas de divulgación y opinión que terminan siendo publicadas en medios locales y prensa de nicho para asegurar visibilidad constante." },
      { title: "Alianzas Estratégicas", description: "Creación de lazos con empresas líderes mundiales.", extended: "Conversamos directamente con corporaciones clave y representantes globales para formalizar patrocinios y Memorándums de Entendimiento formales." },
      { title: "Eventos Top", description: "Organización de conferencias de alto impacto.", extended: "Planeamos la logística macro, la marca y convocamos a exponentes internacionales para nuestras cumbres presenciales magnas." },
      { title: "Contenido Audiovisual", description: "Producción de podcasts y material difusivo.", extended: "Coordinamos series de entrevistas, como 'Superposición', charlando con expertos que hoy impulsan tecnologías disruptivas para que la audiencia conecte directamente con ellos." }
    ],
    achievements: [{ title: "Cierre Sponsor IBM" }, { title: "Entrevista a VQE Creator" }],
    alliances: [{ name: "AWS Quantum", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" }]
  },
  comunidad: {
    name: "Departamento de Comunidad",
    subtitle: "La base humana, red de entusiastas y profesionales",
    icon: Users,
    colorClass: "text-[#FF3399]", // dept-community
    borderColor: "border-[#FF3399]/30",
    glowClass: "shadow-[0_0_30px_hsl(330,70%,60%,0.2)]",
    bgAccent: "from-[#FF3399]/10 to-transparent",
    hslColor: "330 70% 60%",
    heroImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2670&auto=format&fit=crop", // energetic group of people
    description: "Nosotros somos los constructores de comunidad. Nos encargamos de que la red más grande de entusiastas cuánticos en Latinoamérica sea saludable, integradora y sinérgica. Mantenemos vivos los engranajes sociales de toda la organización.",
    mission: "Crear una comunidad vibrante asíncrona y presencial donde el conocimiento se distribuye democráticamente mediante pares (peer-to-peer).",
    initiatives: [
      { title: "Reestructuración Discord 2.0", date: "Febrero 2025", icon: BrainCircuit, description: "Apertura de nuevos canales de estudio, foros de papers orientados, gamificación (puntos Q) y sistema de roles automáticos para nuestros más de 600 miembros." },
      { title: "Meetup Presencial Lima #1", date: "Verano 2025", icon: Calendar, description: "El primer gran reencuentro offline. Cerveza, pizzas, networking de primer nivel y chárla introductoria sobre el ecosistema." },
      { title: "Sistema de Mentorías Estructuradas", date: "Plataforma Beta", icon: Users, description: "Emparejamiento de alumnos ingresantes 2026 con Egresados 2025 (Alumni) para asesoría técnica, emocional y metodológica 1-a-1." },
    ],
    projects: ["Plataforma Discord Q-Hub", "Eventos Offline Meetups", "Programa de Mentorías", "Wiki colaborativa LATAM"],
    howToJoin: "Community Builders, moderadores de comunidades, gente muy empática y social. Ingresa al discord general, conócenos y pide acceso al squad organizador.",
    bullets: [
      {
        title: "Divulgación Científica Accesible",
        description: "Transformamos conceptos técnicos en mensajes comprensibles para audiencias diversas, reduciendo barreras de acceso al conocimiento cuántico. Desarrollamos contenido divulgativo enfocado en explicar principios y aplicaciones de la computación cuántica de manera dinámica, visual y cercana, despertando curiosidad e interés incluso en personas sin formación previa en el área.",
        extended: "Nuestro enfoque combina claridad conceptual, narrativa visual y rigor científico para demostrar que estas tecnologías, aunque avanzadas, pueden entenderse más fácilmente de lo que se percibe cuando se presentan con las herramientas pedagógicas adecuadas. Esta labor permite acercar la computación cuántica a estudiantes en etapas tempranas y ampliar la participación en el ecosistema."
      },
      {
        title: "Estrategia de Contenido y Presencia Digital",
        description: "Diseñamos y ejecutamos contenido para plataformas como LinkedIn e Instagram con una visión estratégica orientada a visibilidad, posicionamiento y engagement. Creamos publicaciones, reels, campañas y materiales visuales alineados con los objetivos institucionales.",
        extended: "Cada contenido se planifica considerando impacto, audiencia y valor educativo. Además, desarrollamos contenido para apoyar al departamento académico en la difusión de cursos, eventos y actividades formativas, contribuyendo a ampliar el alcance y la participación de la comunidad. También compartimos logros de estudiantes, profesionales y de la organización, fortaleciendo el reconocimiento institucional."
      },
      {
        title: "Conexión y Sentido de Comunidad",
        description: "Actuamos como el puente que conecta a los miembros del ecosistema QuantumHub, promoviendo interacción, reconocimiento y sentido de pertenencia. A través de contenido que visibiliza logros, experiencias, actividades y procesos internos, fortalecemos la identidad colectiva.",
        extended: "Nuestro enfoque busca no solo informar, sino también inspirar, mostrando el crecimiento de las personas, el impacto de las iniciativas y las oportunidades disponibles. Esto contribuye a construir una comunidad sostenible basada en colaboración, aprendizaje continuo y desarrollo compartido dentro del ecosistema de computación cuántica."
      },
      {
        title: "Creación Colaborativa e Innovación Creativa",
        description: "El contenido del departamento se desarrolla a partir del trabajo colaborativo del equipo de Comunidad, integrando creatividad, iniciativa y aprendizaje continuo en cada proyecto. Utilizamos herramientas digitales contemporáneas para crear contenido visual dinámico que combina diseño, comunicación y ciencia.",
        extended: "Este proceso no solo fortalece la presencia institucional de QuantumHub, sino que también impulsa el desarrollo de habilidades en diseño, comunicación y divulgación científica dentro del equipo, promoviendo un entorno de crecimiento, experimentación e innovación constante."
      }
    ],
    achievements: [{ title: "+600 Miembros en Discord" }],
    alliances: []
  },
};

const DepartmentPage = ({ deptId }: { deptId: string }) => {
  const dept = deptData[deptId];
  const [hoveredInit, setHoveredInit] = useState<number | null>(null);

  if (!dept) return null;
  const Icon = dept.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-grow">

        {/* OVERLAPPING HERO SECTION */}
        <section className="relative pt-24 pb-8 lg:pt-32 lg:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full min-h-[85vh] flex items-center">

          <div className="flex flex-col lg:flex-row w-full gap-8 lg:gap-0 lg:items-stretch relative">

            {/* The Image Side (Right side on desktop, top on mobile) */}
            <div className="w-full lg:w-3/5 lg:absolute lg:top-0 lg:bottom-0 lg:right-0 h-64 sm:h-80 lg:h-auto rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl z-0">
              <div
                className="absolute inset-0 z-10 mix-blend-color"
                style={{ backgroundColor: `hsl(${dept.hslColor} / 0.4)` }}
              />
              <div
                className="absolute inset-0 z-20 opacity-60 mix-blend-multiply"
                style={{ backgroundColor: `hsl(${dept.hslColor} / 0.3)` }}
              />
              {/* Subtle dynamic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-30 lg:bg-gradient-to-l" />
              <img
                src={dept.heroImage}
                alt={dept.name}
                className="w-full h-full object-cover transform scale-105 transition-transform duration-1000"
              />
            </div>

            {/* The Overlapping Info Card (Left side on desktop, bottoms on mobile) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-[55%] relative z-40 mt-[-4rem] sm:mt-[-6rem] lg:mt-0 lg:py-12"
            >
              <div
                className="glass-strong bg-background/60 backdrop-blur-2xl rounded-[2rem] lg:rounded-[3rem] p-8 sm:p-10 lg:p-14 border border-white/5"
                style={{
                  boxShadow: `0 30px 60px -15px rgba(0,0,0,0.8), 0 0 100px -20px hsl(${dept.hslColor} / 0.2), inset 0 0 0 1px hsl(${dept.hslColor} / 0.15)`
                }}
              >
                {/* Icon badge */}
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-8 relative group"
                  style={{ backgroundColor: `hsl(${dept.hslColor} / 0.1)` }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl opacity-50 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ backgroundColor: `hsl(${dept.hslColor})` }}
                  />
                  <Icon
                    className="w-8 h-8 sm:w-10 sm:h-10 relative z-10"
                    style={{ color: `hsl(${dept.hslColor})` }}
                  />
                </div>

                <div
                  className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-5"
                  style={{
                    backgroundColor: `hsl(${dept.hslColor} / 0.15)`,
                    color: `hsl(${dept.hslColor})`,
                    border: `1px solid hsl(${dept.hslColor} / 0.3)`
                  }}
                >
                  <Zap className="w-3 h-3 mr-2" />
                  {dept.subtitle}
                </div>

                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white tracking-tight mb-8">
                  {dept.name}
                </h1>

                <p className="font-body text-lg sm:text-xl text-white/70 leading-relaxed font-light mb-10">
                  {dept.description}
                </p>

                <div
                  className="pl-6 border-l-4 py-2"
                  style={{ borderColor: `hsl(${dept.hslColor})` }}
                >
                  <h4 className="font-heading text-xs uppercase tracking-[0.2em] font-bold text-white/50 mb-2">
                    Misión del Departamento
                  </h4>
                  <p className="font-body text-[17px] text-white/90 font-medium italic leading-relaxed">
                    "{dept.mission}"
                  </p>
                </div>

              </div>
            </motion.div>

          </div>
        </section>

        {/* KEY HIGHLIGHTS SECTION */}
        <section className="relative z-10 w-full overflow-hidden">
          <BulletRoulette bullets={dept.bullets} hslColor={dept.hslColor} />
        </section>



        {/* ACHIEVEMENTS CAROUSEL */}
        <AchievementsCarousel achievements={dept.achievements} hslColor={dept.hslColor} />

        {/* ALLIANCES CAROUSEL */}
        <AlliancesCarousel alliances={dept.alliances} hslColor={dept.hslColor} />



      </main>
      <Footer />
    </div>
  );
};

export default DepartmentPage;
