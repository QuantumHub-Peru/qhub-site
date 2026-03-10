import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BulletRoulette from "@/components/BulletRoulette";
import AchievementsCarousel from "@/components/AchievementsCarousel";
import AlliancesCarousel from "@/components/AlliancesCarousel";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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
  heroImages: string[];
  description: string;
  mission: string;
  initiatives: Initiative[];
  projects: string[];
  howToJoin: string;
  bullets: { title: string; shortTitle?: string; description: string; keyPoints?: string[]; images?: string[] }[];
  achievements: { title: string; description?: string; photo?: string; link?: string }[];
  alliances: { name: string; logo?: string; isUpcoming?: boolean; country?: string }[];
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
    heroImages: [
      "/images/investigacion/hero1.jpg",
      "/images/investigacion/hero2.jpg",
      "/images/investigacion/hero3.jpg"
    ],
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
      {
        title: "Quantum Hardware Track",
        shortTitle: "Hardware Track",
        description: "Desde la nanofotónica integrada hasta las comunicaciones cuánticas, exploramos cómo las propiedades de la luz pueden encodificar y transmitir información. Diseñamos plataformas fotónicas para metrología, computación y redes cuánticas.",
        keyPoints: ["Integrated Quantum Photonics (CIO, Mexico)", "Diamond Quantum Memories (ULB, Belgium)", "Nonlinear Optical Device Engineering (ULB, Belgium)"],
        images: ["/images/investigacion/hardware01.png", "/images/investigacion/hardware02.png"]
      },
      {
        title: "Quantum Software Track",
        shortTitle: "Software Track",
        description: "Explotamos recursos híbridos en supercomputadoras de punta y utilizamos QML para procesar datos complejos. Aplicaciones desde medicina con resonancia magnética hasta la industria petrolera y música cuántica.",
        keyPoints: ["Sonification & Visualization of Quantum Algorithms", "Brain Matter Classification with Quantum ML", "Deep-Water Image Segmentation with Quantum ML"],
        images: ["/images/investigacion/software01.png", "/images/investigacion/software02.png"]
      },
      {
        title: "Quantum Education Track",
        shortTitle: "Education Track",
        description: "Analizamos el rendimiento académico de nuestros cursos mediante ML y NLP. Correlacionamos variables socioeconómicas y de género para generar evidencia cuantitativa sobre la formación cuántica en LATAM.",
        keyPoints: ["Ecosistema cuántico en LATAM: Gobierno, Academia e Industria", "Integración curricular de computación cuántica", "QuantumHub Perú: Capital humano sostenible"],
        images: ["/images/investigacion/education01.jpg", "/images/investigacion/education02.png"]
      },
      {
        title: "Directed Reading Programs (DRPs)",
        shortTitle: "DRPs",
        description: "Espacio de formación técnica intensiva previa a la investigación. Cada DRP profundiza en áreas específicas de hardware o software, preparando a los estudiantes para colaboraciones activas del Departamento.",
        keyPoints: ["Quantum Mechanics & Quantum Optics", "Nonlinear Optics & Digital Signal Processing", "Quantum Machine Learning & Visualization with Fractals"],
        images: ["/images/investigacion/drp01.png", "/images/investigacion/drp02.png"]
      }
    ],
    achievements: [
      {
        title: "IEEE Paper Publication",
        description: "Publicación del paper “Curiosity Over Hype: Modeling Motivation Language to Understand Early Outcomes in a Selective Quantum Track” en IEEE Xplore (2025). El estudio analiza si las respuestas motivacionales escritas por estudiantes durante el proceso de admisión al curso de Computación Cuántica de QuantumHub Perú contienen señales latentes relacionadas con su compromiso y desempeño académico posterior. A partir de 241 aplicaciones revisadas, el trabajo aplica técnicas de procesamiento de lenguaje natural como Latent Dirichlet Allocation (LDA) y representaciones semánticas mediante small language models para identificar patrones entre distintos tipos de motivación, desde motivaciones intrínsecas basadas en curiosidad genuina hasta motivaciones instrumentales orientadas a intereses tecnológicos o profesionales. Los resultados muestran tendencias que asocian motivaciones intrínsecas con mayores niveles de asistencia y rendimiento académico, proponiendo además una metodología híbrida para analizar motivación estudiantil en programas emergentes de educación cuántica.",
        photo: "/images/investigacion/logro1.png",
        link: "https://ieeexplore.ieee.org/document/11355072"
      },
      {
        title: "arXiv Research Publication",
        description: "Publicación del paper “Quantum Readiness in Latin American High Schools: Curriculum Compatibility and Enabling Conditions” como preprint en arXiv (2025). Este trabajo introduce un marco comparativo para evaluar el nivel de preparación de los sistemas de educación secundaria en América Latina para incorporar contenidos de computación cuántica. El análisis examina la compatibilidad curricular en matemáticas, física y computación, junto con condiciones habilitantes como formación docente, infraestructura tecnológica e instituciones científicas en seis países: Perú, Bolivia, Chile, Argentina, Brasil y Colombia. Los resultados revelan importantes asimetrías regionales en términos de preparación institucional y ecosistemas educativos, identificando a Chile como el país con mayor nivel de preparación. A partir de este diagnóstico se propone una hoja de ruta regional para la integración progresiva de educación cuántica en el nivel secundario.",
        photo: "/images/investigacion/logro2.png",
        link: "https://arxiv.org/abs/2512.16257"
      }
    ],
    alliances: [
      { name: "QuMatrix", logo: "/images/investigacion/alianza2.png", country: "Estados Unidos" },
      { name: "Universidad Politécnica de Valencia", logo: "/images/investigacion/alianza4.png", country: "España" },
      { name: "Université Libre de Bruxelle", logo: "/images/investigacion/alianza1.png", country: "Bélgica" },
      { name: "Universidad Libre", logo: "/images/investigacion/alianza3.png", country: "Colombia" }
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
    heroImages: ["https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2670&auto=format&fit=crop"],
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
      {
        title: "Curriculum Abierto",
        description: "Todo nuestro syllabus y materiales interactivos están en repositorios públicos. Creemos fielmente en el movimiento open-source para acelerar el aprendizaje cuántico en la región.",
        keyPoints: ["Material de libre acceso", "Actualizado con Qiskit 1.0/Pennylane", "Repositorios colaborativos"],
        images: ["https://images.unsplash.com/photo-1544648105-0219ca708705?q=80&w=2670&auto=format&fit=crop"]
      },
      {
        title: "Clases Interactivas",
        description: "No solo te brindamos pre-grabados; cada semana contamos con sesiones síncronas para resolver dudas algorítmicas de manera conversacional y directa.",
        keyPoints: ["Sesiones en vivo con expertos", "Resolución de dudas en tiempo real", "Dinámicas grupales de programación"],
        images: ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop"]
      },
      {
        title: "Certificación Rigurosa",
        description: "Al culminar nuestros programas, obtendrás un reconocimiento avalado que demuestra un entendimiento matemático sólido y habilidades prácticas verificadas.",
        keyPoints: ["Validación de conocimientos técnicos", "Proyectos finales supervisados", "Aval de nuestra red de partners"],
        images: ["https://images.unsplash.com/photo-1589330694653-718227092305?q=80&w=2670&auto=format&fit=crop"]
      },
      {
        title: "Mentoría 1:1",
        description: "Asignamos a cada alumno un mentor Alumni del grupo de investigación que le guiará técnica y profesionalmente a través de sesiones cerradas dedicadas.",
        keyPoints: ["Acompañamiento personalizado", "Guía técnica específica", "Networking con investigadores"],
        images: ["https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2670&auto=format&fit=crop"]
      }
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
    heroImages: ["https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"],
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
        description: "Transformamos conceptos técnicos en mensajes comprensibles para audiencias diversas, reduciendo barreras de acceso al conocimiento cuántico de manera dinámica y visual.",
        keyPoints: ["Contenido para audiencias no técnicas", "Narrativa visual pedagógica", "Reducción de brechas de lenguaje"],
        images: ["https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=2574&auto=format&fit=crop"]
      },
      {
        title: "Estrategia de Contenido Digital",
        description: "Diseñamos y ejecutamos contenido para LinkedIn e Instagram con visión estratégica, orientada a visibilidad, posicionamiento y engagement institucional.",
        keyPoints: ["Gestión de presencia en redes", "Campañas de impacto educativo", "Posicionamiento de marca QHub"],
        images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"]
      },
      {
        title: "Conexión y Comunidad",
        description: "Actuamos como el puente que conecta a los miembros del ecosistema QuantumHub, promoviendo interacción, reconocimiento y sentido de pertenencia.",
        keyPoints: ["Visibilidad de logros internos", "Fomento de interacción peer-to-peer", "Identidad colectiva sólida"],
        images: ["https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2684&auto=format&fit=crop"]
      },
      {
        title: "Innovación Creativa",
        description: "Integramos creatividad, iniciativa y aprendizaje continuo para acercar la computación cuántica a más personas a través de herramientas digitales contemporáneas.",
        keyPoints: ["Diseño UX/UI para simuladores", "Desarrollo de herramientas interactivas", "Procesos de co-creación"],
        images: ["https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2564&auto=format&fit=crop"]
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
    heroImages: ["https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2670&auto=format&fit=crop"],
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
      {
        title: "Presencia en Medios",
        description: "Redactamos piezas de divulgación y opinión publicadas en medios locales y prensa especializada para asegurar visibilidad constante del ecosistema.",
        keyPoints: ["Artículos en prensa local", "Reportajes en medios de nicho", "Piezas de opinión experta"],
        images: ["https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2670&auto=format&fit=crop"]
      },
      {
        title: "Alianzas Estratégicas",
        description: "Conversamos directamente con corporaciones clave y representantes globales para formalizar patrocinios y Memorándums de Entendimiento (MoUs).",
        keyPoints: ["Lazos con Big Tech (IBM, AWS)", "Gestión de patrocinios", "Acuerdos institucionales"],
        images: ["https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop"]
      },
      {
        title: "Eventos de Alto Impacto",
        description: "Planeamos la logística, marca y convocamos a exponentes internacionales para nuestras cumbres presenciales y conferencias magnas.",
        keyPoints: ["Organización de cumbres (Q-Summit)", "Networking internacional", "Gestión de marca de evento"],
        images: ["https://images.unsplash.com/photo-1475721027785-f74dea327912?q=80&w=2670&auto=format&fit=crop"]
      },
      {
        title: "Contenido Audiovisual",
        description: "Coordinamos series de entrevistas y podcasts como 'Superposición', charlando con expertos que hoy impulsan tecnologías disruptivas globales.",
        keyPoints: ["Podcast 'Superposición'", "Entrevistas con científicos", "Material difusivo variado"],
        images: ["https://images.unsplash.com/photo-1590602847861-f350a9339567?q=80&w=2574&auto=format&fit=crop"]
      }
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
    heroImages: ["https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2670&auto=format&fit=crop"],
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
        title: "Cultura y Comunidad",
        description: "Mantenemos una red saludable, integradora y sinérgica donde el conocimiento se distribuye democráticamente mediante procesos peer-to-peer.",
        keyPoints: ["Cultura de colaboración", "Distribución democrática del saber", "Sinergia entre miembros"],
        images: ["https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop"]
      },
      {
        title: "Gestión de Ecosistemas",
        description: "Administramos plataformas como Discord, integrando gamificación y foros de discusión técnica para mantener el compromiso de más de 600 miembros.",
        keyPoints: ["Moderación de Discord 2.0", "Gamificación (Puntos Q)", "Foros de discusión técnica"],
        images: ["https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=2574&auto=format&fit=crop"]
      },
      {
        title: "Networking Offline",
        description: "Organizamos meetups presenciales para fortalecer los vínculos humanos más allá de la pantalla, fomentando el networking de primer nivel.",
        keyPoints: ["Meetups presenciales", "Networking presencial", "Cultura offline QHub"],
        images: ["https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2670&auto=format&fit=crop"]
      },
      {
        title: "Programas de Mentoría",
        description: "Emparejamos a nuevos miembros con egresados (Alumni) para asesoría técnica y emocional, asegurando una curva de aprendizaje óptima.",
        keyPoints: ["Mentorías Alumni", "Soporte emocional y técnico", "Continuidad de aprendizaje"],
        images: ["https://images.unsplash.com/photo-1521791136064-7986c295944b?q=80&w=2670&auto=format&fit=crop"]
      }
    ],
    achievements: [{ title: "+600 Miembros en Discord" }],
    alliances: []
  },
};

const DepartmentPage = ({ deptId }: { deptId: string }) => {
  const dept = deptData[deptId];
  const [hoveredInit, setHoveredInit] = useState<number | null>(null);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    if (!dept || dept.heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % dept.heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [dept]);

  if (!dept) return null;
  const Icon = dept.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-grow">

        {/* --- MOBILE HERO (Overlay Layout based on Reference) --- */}
        <section className="lg:hidden relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 text-center overflow-hidden">
          {/* Full-screen background carousel */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence>
              <motion.img
                key={currentHeroIndex}
                src={dept.heroImages[currentHeroIndex]}
                alt={dept.name}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1.05 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            {/* Blue-ish tint and dark overlay to make text readable */}
            <div
              className="absolute inset-0 z-10 mix-blend-color opacity-70"
              style={{ backgroundColor: `hsl(${dept.hslColor})` }}
            />
            <div className="absolute inset-0 bg-black/60 z-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background z-30" />
          </div>

          {/* Centered Content Container */}
          <div className="relative z-30 flex flex-col items-center max-w-sm">
            {/* Icon badge with glow */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 relative group"
              style={{ backgroundColor: `hsl(${dept.hslColor} / 0.15)`, backdropFilter: 'blur(10px)' }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-40 blur-xl shadow-[0_0_30px_hsl(var(--primary))]"
                style={{ backgroundColor: `hsl(${dept.hslColor})` }}
              />
              <Icon
                className="w-10 h-10 relative z-10"
                style={{ color: `hsl(${dept.hslColor})` }}
              />
            </div>

            {/* Subtitle Badge */}
            <div
              className="inline-flex items-center px-6 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase mb-8 border"
              style={{
                backgroundColor: `hsl(${dept.hslColor} / 0.1)`,
                color: `white`,
                borderColor: `hsl(${dept.hslColor} / 0.4)`,
                backdropFilter: 'blur(8px)'
              }}
            >
              {dept.subtitle}
            </div>

            {/* Title */}
            <h1 className="font-heading text-5xl font-bold leading-[1.1] text-white tracking-tight mb-8 drop-shadow-2xl uppercase">
              {dept.name}
            </h1>

            {/* Description */}
            <p className="font-body text-[17px] text-white/90 leading-relaxed font-light mb-10 text-justify">
              {dept.description}
            </p>

            {/* Mission Section */}
            <div className="w-full flex flex-col items-start text-left mt-2">
              <span className="font-heading text-xs font-black tracking-[0.2em] text-white/60 mb-3 uppercase">
                MISIÓN
              </span>
              <div
                className="pl-5 border-l-2 py-1"
                style={{ borderColor: `hsl(${dept.hslColor})` }}
              >
                <p className="font-body text-base text-white/90 font-medium italic leading-relaxed">
                  "{dept.mission}"
                </p>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-16 animate-bounce opacity-40">
              <div className="w-6 h-6 border-b-2 border-r-2 border-white rotate-45" />
            </div>
          </div>
        </section>

        {/* --- DESKTOP HERO (Overlapping Layout) --- */}
        <section className="hidden lg:flex relative pt-32 pb-12 px-8 max-w-7xl mx-auto w-full min-h-[85vh] items-center">
          <div className="flex flex-row w-full lg:items-stretch relative">

            {/* The Image Side (Right side on desktop) */}
            <div className="w-full lg:w-3/5 lg:absolute lg:top-0 lg:bottom-0 lg:right-0 h-auto rounded-[3rem] overflow-hidden shadow-2xl z-0">
              <div
                className="absolute inset-0 z-10 mix-blend-color"
                style={{ backgroundColor: `hsl(${dept.hslColor} / 0.4)` }}
              />
              <div
                className="absolute inset-0 z-20 opacity-60 mix-blend-multiply"
                style={{ backgroundColor: `hsl(${dept.hslColor} / 0.3)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-background to-transparent z-30" />
              <AnimatePresence>
                <motion.img
                  key={currentHeroIndex}
                  src={dept.heroImages[currentHeroIndex]}
                  alt={dept.name}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1.05 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* The Overlapping Info Card (Left side on desktop) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-[55%] relative z-40 lg:py-12"
            >
              <div
                className="glass-strong bg-background/60 backdrop-blur-2xl rounded-[3rem] p-14 border border-white/5"
                style={{
                  boxShadow: `0 30px 60px -15px rgba(0,0,0,0.8), 0 0 100px -20px hsl(${dept.hslColor} / 0.2), inset 0 0 0 1px hsl(${dept.hslColor} / 0.15)`
                }}
              >
                {/* Icon badge */}
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 relative group"
                  style={{ backgroundColor: `hsl(${dept.hslColor} / 0.1)` }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl opacity-50 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ backgroundColor: `hsl(${dept.hslColor})` }}
                  />
                  <Icon
                    className="w-10 h-10 relative z-10"
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

                <h1 className="font-heading text-6xl font-bold leading-[1.1] text-white tracking-tight mb-8">
                  {dept.name}
                </h1>

                <p className="font-body text-xl text-white/70 leading-relaxed font-light mb-10">
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
