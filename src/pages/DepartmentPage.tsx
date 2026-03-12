import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BulletRoulette from "@/components/BulletRoulette";
import AchievementsCarousel from "@/components/AchievementsCarousel";
import AlliancesCarousel from "@/components/AlliancesCarousel";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Atom, BookOpen, Lightbulb, Megaphone, Users, Zap } from "lucide-react";

interface DeptPageData {
  name: string;
  subtitle: string;
  icon: React.ElementType;
  hslColor: string;
  heroImages: string[];
  heroVideo?: string;
  description: string;
  mission: string;
  bullets: { title: string; shortTitle?: string; description: string; keyPoints?: string[]; images?: string[] }[];
  achievements: {
    title: string;
    subtitle?: string;
    titlePreview?: string;
    description?: string;
    photo?: string;
    video?: string;
    extraPhotos?: string[];
    link?: string
  }[];
  alliances: { name: string; logo?: string; isUpcoming?: boolean; country?: string }[];
}

const deptData: Record<string, DeptPageData> = {
  investigacion: {
    name: "Departamento de Investigación",
    subtitle: "",
    icon: Atom,
    hslColor: "210 100% 60%",
    heroImages: [
      "/images/investigacion/hero1.jpg",
      "/images/investigacion/hero2.jpg",
      "/images/investigacion/hero3.jpg"
    ],
    description: "¿Completaste nuestro curso insignia de computación cuántica y buscas dar el primer paso en tu carrera científica? No busques más. El Departamento de Investigación es el lugar para ti. Bajo la dirección de investigadores formados en ecosistemas de élite, impulsamos proyectos técnicos, pioneros y publicables en colaboración con laboratorios, centros de investigación y empresas internacionales. La computación cuántica te trajo hasta aquí: nosotros te llevamos al siguiente nivel explorando todo el espectro de las ciencias y las tecnologías cuánticas.",
    mission: "Producir investigación de impacto en computación cuántica y posicionar a Latinoamérica en el mapa cuántico global.",
    bullets: [
      {
        title: "Quantum Hardware Track",
        shortTitle: "Hardware Track",
        description: "Desde la nanofotónica integrada hasta las comunicaciones cuánticas en espacio libre, exploramos cómo propiedades fundamentales de la luz, como la polarización, la frecuencia y las correlaciones energía-tiempo, pueden encodificar, almacenar y transmitir información cuántica. Ingeniamos, diseñamos y simulamos plataformas fotónicas para aplicaciones que van desde la metrología cuántica hasta la computación y redes cuánticas. Nuestras materias fundamentales: mecánica cuántica, óptica no lineal y óptica cuántica, entre otras.",
        keyPoints: ["Integrated Quantum Photonics (CIO, Mexico)", "Diamond Quantum Memories (ULB, Belgium)", "Nonlinear Optical Device Engineering (ULB, Belgium)"],
        images: ["/images/investigacion/hardware01.png", "/images/investigacion/hardware02.png"]
      },
      {
        title: "Quantum Software Track",
        shortTitle: "Software Track",
        description: "Explotamos recursos de información clásica y cuántica para resolver problemas del mundo real. Mejoramos algoritmos cuánticos actuales, desplegamos modelos computacionales híbridos en supercomputadoras de punta y utilizamos quantum machine learning (QML) para procesar datos complejos y de alta dimensión. Desde el análisis de escáneres de resonancia magnética nuclear para la medicina, estudiando las aguas profundas para la industria petrolera, hasta la generación de música cuántica, desplegamos todo el potencial de la información cuántica.",
        keyPoints: ["Sonification & Visualization of Quantum Algorithms", "Brain Matter Classification with Quantum ML", "Deep-Water Image Segmentation with Quantum ML"],
        images: ["/images/investigacion/software01.png", "/images/investigacion/software02.png"]
      },
      {
        title: "Quantum Education Track",
        shortTitle: "Education Track",
        description: "El mundo de la investigación gira en torno a los datos. En este track, tomamos la data intencionalmente adquirida en nuestros cursos de Computación Cuántica 2025-2 y 2026-1 como objeto de estudio. Aplicamos técnicas de machine learning (ML) y procesamiento de lenguaje natural (NLP) para analizar el rendimiento académico de nuestros estudiantes, correlacionándolo con variables socioeconómicas, geográficas y de género para producir evidencia cuantitativa sobre formación pionera en tecnologías cuánticas en América Latina.",
        keyPoints: ["Ecosistema cuántico en LATAM: Gobierno, Academia e Industria", "Integración curricular de computación cuántica", "QuantumHub Perú: Capital humano sostenible"],
        images: ["/images/investigacion/education01.jpg", "/images/investigacion/education02.png"]
      },
      {
        title: "Directed Reading Programs (DRPs)",
        shortTitle: "DRPs",
        description: "Aprendiste computación cuántica, pero ¿será eso suficiente para adentrarte en investigación de ciencias y tecnologías cuánticas? En la mayoría de casos, la respuesta es no. Por eso, los DRP son nuestro espacio personalizado de formación técnica intensiva previa a la incorporación de nuestros estudiantes a proyectos de su interés. Cada DRP profundiza en áreas específicas de hardware o software cuántico, desde fundamentos teóricos hasta simulación e implementación, y prepara a los participantes para integrarse a colaboraciones activas del Departamento.",
        keyPoints: ["Quantum Mechanics & Quantum Optics", "Nonlinear Optics & Digital Signal Processing", "Quantum Machine Learning & Visualization with Fractals"],
        images: ["/images/investigacion/drp01.png", "/images/investigacion/drp02.png"]
      }
    ],
    achievements: [
      {
        titlePreview: "Curiosity Over Hype: Modeling Motivation Language to Understand Early Outcomes in a Selective Quantum Track",
        title: "IEEE Paper Publication",
        subtitle: "Curiosity Over Hype: Modeling Motivation Language to Understand Early Outcomes in a Selective Quantum Track",
        description: "Publicación del paper “Curiosity Over Hype: Modeling Motivation Language to Understand Early Outcomes in a Selective Quantum Track” en IEEE Xplore (2025). El estudio analiza si las respuestas motivacionales escritas por estudiantes durante el proceso de admisión al curso de Computación Cuántica de QuantumHub Perú contienen señales latentes relacionadas con su compromiso y desempeño académico posterior. A partir de 241 aplicaciones revisadas, el trabajo aplica técnicas de procesamiento de lenguaje natural como Latent Dirichlet Allocation (LDA) y representaciones semánticas mediante small language models para identificar patrones entre distintos tipos de motivación, desde motivaciones intrínsecas basadas en curiosidad genuina hasta motivaciones instrumentales orientadas a intereses tecnológicos o profesionales. Los resultados muestran tendencias que asocian motivaciones intrínsecas con mayores niveles de asistencia y rendimiento académico, proponiendo además una metodología híbrida para analizar motivación estudiantil en programas emergentes de educación cuántica.",
        photo: "/images/investigacion/logro1.png",
        link: "https://ieeexplore.ieee.org/document/11355072"
      },
      {
        titlePreview: "Quantum Readiness in Latin American High Schools: Curriculum Compatibility and Enabling Conditions",
        title: "Quantum Education Paper",
        subtitle: "Quantum Readiness in Latin American High Schools: Curriculum Compatibility and Enabling Conditions",
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
    subtitle: "",
    icon: BookOpen,
    hslColor: "270 70% 55%",
    heroImages: [
      "/images/academico/hero1.png",
      "/images/academico/hero2.png"
    ],
    description: "¿Te interesa la computación cuántica y quieres formar parte de la próxima generación de talento científico en este campo? El Departamento Académico te ayuda a dar tu primer paso. Aquí diseñamos y ejecutamos el programa formativo insignia de la organización: una ruta rigurosa que introduce a estudiantes de secundaria, preuniversitarios y universitarios a los fundamentos de la computación cuántica, permitiéndoles después integrarse progresivamente a iniciativas de investigación, desarrollo e innovación dentro de la organización. De esta manera, el Departamento Académico no solo imparte formación especializada, sino también activa el pipeline de talento que alimenta y sostiene el crecimiento del ecosistema cuántico que QuantumHub está construyendo en el Perú.",
    mission: "",
    bullets: [
      {
        title: "Formación temprana con estándares de excelencia",
        shortTitle: "Formación temprana",
        description: "El curso desarrolla una base robusta en matemática, física y pensamiento computacional para preparar a sus estudiantes frente a una disciplina altamente demandante y profundamente interdisciplinaria. Esta etapa fundacional no opera como un simple curso de nivelación: funciona como un filtro formativo y una plataforma de despegue, permitiendo que jóvenes con alto potencial académico accedan a contenidos que normalmente se encuentran en últimos ciclos de la carrera o incluso en cursos de maestría. La formación temprana es entendida aquí como una decisión estratégica. QuantumHub no espera a que el talento llegue completamente formado: lo identifica, lo acompaña y lo fortalece desde etapas iniciales, reduciendo brechas de acceso y abriendo la posibilidad de una participación temprana en ciencia de frontera.",
        keyPoints: [],
        images: ["/images/academico/bullet1.png"]
      },
      {
        title: "Divulgación y Accesibilidad a la Computación Cuántica",
        shortTitle: "Divulgación y Accesibilidad",
        description: "El curso bandera de nuestro departamento ofrece una formación teórico-práctica en computación cuántica que conecta fundamentos con herramientas reales del campo. A lo largo de sus módulos, los estudiantes trabajan conceptos vinculados a modelos de cómputo cuántico, circuitos, algoritmos y simulaciones en la nube, desarrollando tanto comprensión conceptual como criterio técnico. La propuesta pedagógica está diseñada para evitar dos errores comunes: la simplificación vacía y el elitismo inaccesible. En lugar de ello, construye una curva de aprendizaje minuciosa, progresiva y cuidadosamente acompañada, capaz de traducir conceptos complejos en procesos formativos comprensibles, estimulantes e intelectualmente honestos. El resultado es una experiencia académica seria, moderna y en sintonía con la evolución real del sector.",
        keyPoints: [],
        images: ["/images/academico/bullet2.png"]
      },
      {
        title: "Visión y Sustentabilidad Académica",
        description: "El Departamento Académico no concibe la educación como un punto de llegada, sino como el inicio de una trayectoria. Los estudiantes con desempeño sobresaliente tienen la posibilidad de continuar su desarrollo dentro de QuantumHub, integrándose a espacios de investigación, desarrollo, pedagogía, innovación, divulgación y liderazgo institucional. Este modelo convierte al curso en un verdadero pipeline de talento. La formación no queda aislada del resto de la organización: alimenta activamente sus siguientes capas de crecimiento. De esta manera, varios de los egresados más destacados continúan hoy su proceso en el Departamento de Investigación, fortaleciendo una base científica sólida junto a mentores, colaboradores y referentes vinculados a la vanguardia del sector cuántico internacional.",
        keyPoints: [],
        images: ["/images/academico/bullet3.jpg"]
      },
      {
        title: "Creación de capital humano para el ecosistema cuántico",
        shortTitle: "Capital humano",
        description: "El valor del Departamento Académico trasciende la formación individual de cada estudiante. Su diseño responde a una visión mayor: consolidar una comunidad capaz de renovarse desde adentro, crecer con consistencia y generar impacto real en el país. Cada cohorte no solo recibe conocimientos; también amplía la capacidad instalada de QuantumHub y fortalece un ecosistema emergente que necesita talento preparado, comprometido y con visión de largo plazo. Así, el departamento opera como una infraestructura de futuro. Forma estudiantes, sí, pero también forma mentores, investigadores en desarrollo, líderes de comunidad y agentes de cambio capaces de contribuir a la construcción de un Perú más conectado con la ciencia y la tecnología de frontera.",
        keyPoints: [],
        images: ["/images/academico/bullet4.jpg"]
      }
    ],
    achievements: [
      {
        title: "Lanzamiento de la primera edición del curso insignia en 2025",
        description: "En agosto de 2025, QuantumHub Perú lanzó la primera edición de su curso de Computación Cuántica, marcando un hito en la formación temprana de talento cuántico en el país. Esta cohorte inaugural reunió a estudiantes de alto rendimiento de los últimos años de secundaria y a estudiantes destacados de los primeros años de universidad, consolidando una propuesta educativa selectiva, exigente y orientada a construir capital humano con proyección real.",
        photo: "/images/academico/logro1.png"
      },
      {
        title: "Graduación de la primera cohorte en una ceremonia de alto valor institucional",
        description: "La culminación de esta primera edición se celebró en el Salón de los Espejos, gracias al respaldo de la Municipalidad de Lima, en una ceremonia que reunió al Colegio de Ingenieros, CEDDITEC, representantes del sector, líderes de transformación digital y panelistas invitados provenientes de empresas y academia. Más que un acto de cierre, esta graduación visibilizó públicamente la capacidad de QuantumHub para articular excelencia académica, legitimidad institucional y proyección nacional alrededor de la educación cuántica.",
        photo: "/images/academico/logro2.jpg"
      },

    ],
    alliances: [
      { name: "LEAD PUCP", logo: "/images/academico/alianza1.png" },
      { name: "Universidad de Ingeniería y Tecnología (UTEC)", logo: "/images/academico/alianza3.png" },
      { name: "IEEE Computer Society PUCP", logo: "/images/academico/alianza4.png" },
      { name: "Universidad de Ciencias y Humanidades (UCH)", logo: "/images/academico/alianza5.jpg" }
    ]
  },
  innovacion: {
    name: "Departamento de Innovación",
    subtitle: "",
    icon: Lightbulb,
    hslColor: "175 80% 50%",
    heroImages: ["/images/innovación/hero1.png"],
    description: "¿Te intrigan términos como qubits, esfera de Bloch o entrelazamiento cuántico, pero no encuentras herramientas amigables para empezar tu formación en computación cuántica? El Departamento de Innovación de QuantumHub Perú trabaja para cerrar esa brecha. A través del desarrollo de productos EdTech, nuestro equipo de senior full-stack developers egresados de nuestro propio programa diseña y construye software y plataformas digitales de alta calidad pedagógica, pensadas para integrar a más entusiastas hispanohablantes al ecosistema cuántico.",
    mission: "",
    bullets: [
      {
        title: "QHub Learning Platform",
        description: "La QHub Learning Platform es el principal producto desarrollado por el Departamento de Innovación. Se trata de una plataforma web abierta, que introduce estructuradamente a estudiantes y autodidactas al mundo de la computación cuántica en español. A través de cuatro módulos progresivos, los usuarios aprenden desde matemática esencial como operaciones con vectores y matrices hasta conceptos fundamentales de la computación cuántica, incluyendo la normalización y la representación gráfica de los estados de un qubit en la esfera de Bloch. Buscamos marcar la diferencia promoviendo un aprendizaje dinámico y experimental; por ello, la plataforma incluye simulaciones como la esfera de Bloch, laboratorio de circuitos cuánticos, el experimento de la doble rendija y retos gamificados.",
        keyPoints: [],
        images: ["/images/innovación/bullet1_1.png"]
      },
      {
        title: "Democratización del Acceso con Rigor Académico",
        shortTitle: "Democratización del Acceso",
        description: "En QuantumHub creemos que la educación en computación cuántica debe ser accesible para todos, sin barreras geográficas, económicas, técnicas o académicas. Nuestra Qhub Learning Platform ofrece acceso libre y flexible, respaldada por un equipo pedagógico formado por egresados de nuestra primera cohorte, que asegura que cada concepto, desde lo más básico hasta lo avanzado, se presente con coherencia académica y claridad conceptual.",
        keyPoints: [],
        images: ["/images/innovación/bullet2_1.png"]
      },
      {
        title: "Sistema de Interfaz Dinámica",
        shortTitle: "Interfaz Dinámica",
        description: "¿Y si pudieras tocar la computación cuántica con tus propios ojos? En la QHub Learning Platform, dejamos atrás los libros estáticos; nuestra interfaz UX/UI construida con React y Tailwind CSS combina claridad y dinamismo, guiando a los usuarios en un aprendizaje autónomo y visual. Simulaciones en tiempo real permiten manipular fases, puertas y circuitos cuánticos con retroalimentación inmediata, incluyendo rotaciones en la esfera de Bloch, el experimento de doble rendija y un constructor de circuitos drag-and-drop, haciendo que explorar la computación cuántica sea tan interactivo como formativo.",
        keyPoints: [],
        images: ["/images/innovación/bullet3_1.png"]
      },
      {
        title: "Software para Educación Cuántica",
        description: "A medida que las tecnologías cuánticas avanzan, ¿cómo pueden universidades, colegios y centros de formación integrar la computación cuántica en sus programas? Más allá de nuestra plataforma abierta, el Departamento de Innovación proyecta el desarrollo de software educativo capaz de guiar grupos de estudiantes y apoyar a docentes en la planificación, seguimiento y evaluación del aprendizaje en computación cuántica, ofreciendo desde lecciones teóricas hasta simulaciones de circuitos cuánticos, con la opción de ejecutarlas en procesadores cuánticos reales en la nube, como los de IBM.",
        images: ["/images/innovación/bullet4.png"]
      }
    ],
    achievements: [{
      title: "QHub Learning Platform reconocida internacionalmente en el QREATE Challenge (NSF Center for Quantum Networks)",
      titlePreview: "QREATE Challenge Finalist",
      description: "Nuestra plataforma QHub Learning Platform fue seleccionada como finalista en el QREATE Challenge, parte de la Q3 Initiative (Quantum, Art, Ethics) organizada por el NSF Center for Quantum Networks (CQN) de los Estados Unidos.  El desafío convoca a equipos de todo el mundo a desarrollar herramientas pedagógicas capaces de introducir conceptos de Quantum Information Science and Engineering (QISE) a audiencias no técnicas y semitécnicas, buscando enfoques y propuestas que combinen rigor conceptual con una experiencia de aprendizaje interactiva. El reconocimiento destaca el enfoque innovador y accesible de la plataforma, que permite a un público amplio explorar conceptos de computación cuántica a través de simulaciones y experiencias prácticas, incluso sin conocimientos previos.",
      photo: "/images/innovación/logro1_2.png",
      video: "/images/innovación/logro1.mp4",
      extraPhotos: ["/images/innovación/logro1_2.png"]
    }],
    alliances: []
  },
  "relaciones-publicas": {
    name: "Relaciones Públicas",
    subtitle: "",
    icon: Megaphone,
    hslColor: "45 100% 55%",
    heroImages: ["/images/rrpp/hero1.png"],
    description: "¿Te apasiona ser el puente entre la computación cuántica y el ecosistema global? El Departamento de Relaciones Públicas es el corazón de nuestra proyección externa. Gestionamos alianzas de alto valor con instituciones como UTEC y el CIP de Lima, para potenciar el ecosistema cuántico del Perú. Nosotros te brindamos la oportunidad de liderar la narrativa del futuro.",
    mission: "Construir y proteger la reputación de QuantumHub ante aliados estratégicos.",
    bullets: [
      {
        title: "Alianzas Estratégicas",
        description: "Establecemos y gestionamos relaciones con organizaciones académicas, comunidades e instituciones universitarias que comparten la visión de impulsar el desarrollo científico en el país. Estas alianzas permiten ampliar el alcance de nuestras iniciativas, generar colaboraciones de alto valor y consolidar una red institucional sólida y sostenible.",
        keyPoints: [],
        images: ["/images/rrpp/bullet1.png"]
      },
      {
        title: "Posicionamiento Institucional",
        description: "Diseñamos e implementamos estrategias que fortalecen la identidad y reputación de QuantumHub Perú dentro del entorno académico y tecnológico. El objetivo es proyectar liderazgo, innovación y rigor académico para ampliar una red de aliados estratégicos.",
        keyPoints: [],
        images: ["/images/rrpp/bullet2_1.jpg", "/images/rrpp/bullet2_2.png"]
      },
      {
        title: "Representación del equipo",
        description: "El departamento representa a QuantumHub en espacios académicos, eventos y colaboraciones, asegurando coherencia en el mensaje y alineación con la visión organizacional. Actuamos como canal formal de comunicación con aliados y actores clave del ecosistema.",
        keyPoints: [],
        images: ["/images/rrpp/bullet3_1.png", "/images/rrpp/bullet3_2.png"]
      },
      {
        title: "Expansión y Proyección",
        description: "Impulsamos la expansión estratégica de QuantumHub mediante la identificación de nuevas oportunidades de colaboración, divulgación y participación en eventos académicos que fortalezcan la presencia de QuantumHub en distintos entornos universitarios y tecnológicos.",
        keyPoints: [],
        images: ["/images/rrpp/bullet4_1.jpg", "/images/rrpp/bullet4_2.png"]
      }
    ],
    achievements: [
      {
        title: "Quantum AI Summit 2025",
        description: "El Quantum AI Summit 2025 se estableció como un punto de encuentro importante para la exploración de tecnologías de vanguardia. Celebrado en el Palacio Municipal gracias al auspicio de la Mesa de Jóvenes del Congreso de la República, el evento reunió a una comunidad multidisciplinaria de investigadores, ingenieros y líderes tecnológicos quienes ofrecieron su ponencia magistral con un objetivo claro: democratizar el acceso al conocimiento cuántico. El evento fue organizado por QuantumHub Perú y Cedditec, bajo el liderazgo del departamento de Relaciones Públicas y con una visión clara de fomentar un ecosistema científico sólido en Latinoamérica.",
        photo: "/images/rrpp/logro1.jpg"
      },
      {
        title: "Webinars Noviembre Cuántico",
        description: "Los Webinars fueron charlas virtuales celebradas por el Año Internacional de la Ciencia y Tecnologías Cuánticas organizadas por el Colegio de Ingenieros del Perú (CIP) La Libertad. En estas cuatro sesiones cada jueves de Noviembre los experimentados profesores del curso profundizaron con sus conocimientos técnicos en el ecosistema, software y hardware cuántico dirigidos a profesionales, estudiantes y público interesado en comprender el impacto de las tecnologías cuánticas en la ciencia, la ingeniería y la innovación tecnológica. Este evento fue preparatorio y de introducción previo al Quantum AI Summit 2025.",
        photo: "/images/rrpp/logro2.png"
      },
      {
        title: "Alianzas Estratégicas",
        description: "El departamento ha establecido alianzas estratégicas con Universidad de Ingeniería y Tecnología (UTEC) y UCH que ofrecieron su campus para la sede del examen de universitarios del curso de 2025, CEDDITEC que fue un aliado estratégico para el Quantum AI Summit. Y recientemente con IEEE Computer Society PUCP y LEAD PUCP, fortaleciendo la red institucional universitaria que respalda el crecimiento y la proyección de la organización.",
        photo: "/images/rrpp/logro3.png"
      },
      {
        titlePreview: "Adriana Alvarado nos representa en el II Congreso Internacional de Investigación Científica Federico Villarreal",
        title: "Representación y alcance en espacios académicos",
        description: "El estudio “Quantum Readiness in Latin American High Schools: Curriculum Compatibility and Enabling Conditions” fue presentado durante el II Congreso Internacional de Investigación Científica Federico Villarreal, realizado en el Colegio de Ingenieros del Perú (CIP), uno de los espacios profesionales más importantes para la comunidad de ingeniería del país. La investigación fue desarrollada por Adriana Alvarado, Osmar Herrera, Rosario Morales, Daniella Vargas y Freddy Herrera, y presentada durante el congreso por nuestra fundadora, Adriana Alvarado, ante investigadores, docentes y estudiantes interesados en los desafíos del futuro de la educación científica. El trabajo analiza el nivel de preparación de los sistemas educativos de América Latina para integrar computación cuántica en la educación secundaria, un tema que ha comenzado a ganar relevancia a nivel global ante el crecimiento de las tecnologías cuánticas y la necesidad de formar nuevas generaciones de científicos y profesionales en este campo.",
        photo: "/images/rrpp/logro4.png"
      }
    ],
    alliances: [
      { name: "Universidad de Ingeniería y Tecnología (UTEC)", logo: "/images/rrpp/alianza3.png" },
      { name: "Universidad de Ciencias y Humanidades (UCH)", logo: "/images/rrpp/alianza5.jpg" },
      { name: "IEEE Computer Society PUCP", logo: "/images/rrpp/alianza4.png" },
      { name: "LEAD PUCP", logo: "/images/rrpp/alianza1.png" },
      { name: "CIP Lima", logo: "/images/rrpp/alianza2.jpg" },
    ]
  },
  comunidad: {
    name: "Departamento de Comunidad",
    subtitle: "",
    icon: Users,
    hslColor: "330 70% 60%",
    heroImages: ["/images/comunidad/hero1.png"],
    description: "¿Cómo acercamos la computación cuántica a más personas? El Departamento de Comunidad impulsa la visibilidad y el crecimiento del ecosistema cuántica a través de redes sociales y de la divulgación científica accesible. Nuestro objetivo es transformar conceptos complejos en contenidos claros, visuales y comprensibles, permitiendo que estudiantes, aliados y público general descubran el impacto de las tecnologías cuánticas. A través de publicaciones estratégicas, campañas digitales y contenidos educativos, fortalecemos la identidad institucional de QuantumHub y contribuimos a la construcción de un ecosistema cuántico en el Perú. Buscamos que estas tecnologías se perciban de forma más cercana y entendible, demostrando que es posible aprenderlas cuando se explican con claridad y con herramientas accesibles.",
    mission: "",
    bullets: [
      {
        title: "Divulgación Científica Accesible",
        description: "¿Cómo explicar la computación cuántica a personas que nunca han estudiado física o matemáticas avanzadas? El departamento trabaja para reducir las barreras de acceso al conocimiento cuántico, transformando conceptos técnicos en mensajes claros y comprensibles para audiencias diversas. Desarrollamos contenido divulgativo que explica los principios y aplicaciones de la computación cuántica de forma dinámica, visual y cercana. Nuestro enfoque combina claridad conceptual, recursos visuales y rigor científico, demostrando que estas tecnologías, aunque avanzadas, pueden entenderse cuando se comunican con herramientas pedagógicas adecuadas. De esta manera, buscamos despertar curiosidad científica y acercar la computación cuántica a estudiantes y personas interesadas incluso sin formación previa en el área.",
        shortTitle: "Divulgación Científica",
        keyPoints: [],
        images: ["/images/comunidad/bullet1_1.png", "/images/comunidad/bullet1_2.png"]
      },
      {
        title: "Estrategia de Contenido y Presencia Digital",
        description: "Diseñamos y gestionamos contenido para plataformas como LinkedIn e Instagram con el objetivo de fortalecer la visibilidad y presencia digital de QuantumHub. A través de publicaciones, campañas y reels, buscamos comunicar de forma clara y atractiva las iniciativas, actividades y oportunidades dentro del ecosistema cuántico. Cada contenido se crea considerando a la audiencia, el valor educativo y el impacto que puede generar, manteniendo coherencia con la identidad y los objetivos de la organización. Además, trabajamos en conjunto con el Departamento Académico y el Departamento de Relaciones Públicas para difundir nuestros cursos y eventos, ayudando a que más estudiantes e interesados conozcan y participen en las oportunidades que ofrecemos a la comunidad.",
        shortTitle: "Estrategia de Contenido",
        keyPoints: [],
        images: ["/images/comunidad/bullet2_1.png", "/images/comunidad/bullet2_2.png"]
      },
      {
        title: "Conexión y Sentido de Comunidad",
        description: "El Departamento de Comunidad actúa como un puente entre los miembros del ecosistema QuantumHub, promoviendo la interacción, el reconocimiento y el sentido de pertenencia dentro de la comunidad. A través de contenido que visibiliza logros, experiencias, proyectos y actividades del equipo, buscamos fortalecer la identidad colectiva y motivar la participación activa. Nuestro objetivo no es solo informar, sino también inspirar, mostrando el crecimiento de las personas, el impacto de las iniciativas y las oportunidades que existen dentro del ecosistema. De esta manera, contribuimos a construir una comunidad basada en la colaboración, el aprendizaje continuo y el desarrollo compartido dentro del ámbito de la computación cuántica",
        shortTitle: "Conexión y Comunidad",
        keyPoints: [],
        images: ["/images/comunidad/bullet3_1.png", "/images/comunidad/bullet3_2.png"]
      },
      {
        title: "Creación Colaborativa e Innovación Creativa",
        shortTitle: "Creación e Innovación",
        description: "El contenido del departamento se desarrolla mediante un proceso de creación colaborativa, donde los miembros del equipo aportan creatividad, iniciativa y nuevas perspectivas en cada post. Utilizamos herramientas de diseño como Canva para crear contenido visual dinámico que combina diseño, comunicación y divulgación científica, con el objetivo de acercar la computación cuántica a más personas de forma clara y atractiva. Este proceso no solo fortalece la presencia institucional de QuantumHub, sino que también permite que los miembros del equipo desarrollen habilidades en comunicación científica, diseño digital y creación de contenido educativo, aprendiendo a divulgar y explicar conceptos complejos de manera más entendible para todo tipo de público",
        keyPoints: [],
        images: ["/images/comunidad/bullet4_1.png", "/images/comunidad/bullet4_2.png"]
      }
    ],
    achievements: [],
    alliances: []
  },
};

const DepartmentPage = ({ deptId }: { deptId: string }) => {
  const dept = deptData[deptId];
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    // Reset index and scroll on navigation
    setCurrentHeroIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (!dept || dept.heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % dept.heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [deptId, dept?.heroImages.length]);

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
            {dept.heroVideo ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={dept.heroVideo} type="video/mp4" />
              </video>
            ) : (
              <AnimatePresence>
                <motion.img
                  key={`${deptId}-${currentHeroIndex}`}
                  src={dept.heroImages[currentHeroIndex] || dept.heroImages[0]}
                  alt={dept.name}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1.05 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            )}
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
            {dept.subtitle && dept.subtitle.trim() !== "" && (
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
            )}

            {/* Title */}
            <h1 className="font-heading text-5xl font-bold leading-[1.1] text-white tracking-tight mb-8 drop-shadow-2xl uppercase">
              {dept.name}
            </h1>

            {/* Description Card/Question */}
            {dept.description.includes('?') ? (
              <>
                <div
                  className="w-full p-6 rounded-2xl mb-8 text-center border relative overflow-hidden"
                  style={{
                    backgroundColor: `hsl(${dept.hslColor} / 0.1)`,
                    borderColor: `hsl(${dept.hslColor} / 0.3)`,
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <p className="font-heading text-lg font-semibold relative z-10 leading-snug" style={{ color: `hsl(${dept.hslColor})` }}>
                    {dept.description.split('?')[0]}?
                  </p>
                </div>
                <p className="font-body text-[17px] text-white/80 leading-relaxed font-light mb-10 text-justify">
                  {dept.description.split('?').slice(1).join('?').trim()}
                </p>
              </>
            ) : (
              <p className="font-body text-[17px] text-white/90 leading-relaxed font-light mb-10 text-justify">
                {dept.description}
              </p>
            )}

            {/* Mission Section */}
            {dept.mission && dept.mission.trim() !== "" && (
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
            )}

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
              {dept.heroVideo ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={dept.heroVideo} type="video/mp4" />
                </video>
              ) : (
                <AnimatePresence>
                  <motion.img
                    key={`${deptId}-${currentHeroIndex}`}
                    src={dept.heroImages[currentHeroIndex] || dept.heroImages[0]}
                    alt={dept.name}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1.05 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              )}
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

                {dept.subtitle && dept.subtitle.trim() !== "" && (
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
                )}

                <h1 className="font-heading text-6xl font-bold leading-[1.1] text-white tracking-tight mb-8">
                  {dept.name}
                </h1>

                {/* Description Card/Question */}
                {dept.description.includes('?') ? (
                  <>
                    <div
                      className="p-8 rounded-[2rem] mb-10 border-l-4 relative overflow-hidden shadow-lg"
                      style={{
                        backgroundColor: `hsl(${dept.hslColor} / 0.08)`,
                        borderColor: `hsl(${dept.hslColor})`,
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <p className="font-heading text-2xl font-bold leading-tight" style={{ color: `hsl(${dept.hslColor})` }}>
                        {dept.description.split('?')[0]}?
                      </p>
                    </div>
                    <p className="font-body text-xl text-white/70 leading-relaxed font-light mb-10 text-justify">
                      {dept.description.split('?').slice(1).join('?').trim()}
                    </p>
                  </>
                ) : (
                  <p className="font-body text-xl text-white/70 leading-relaxed font-light mb-10 text-justify">
                    {dept.description}
                  </p>
                )}

                {dept.mission && dept.mission.trim() !== "" && (
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
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* KEY HIGHLIGHTS SECTION */}
        <section className="relative z-10 w-full overflow-hidden">
          <BulletRoulette bullets={dept.bullets} hslColor={dept.hslColor} />
        </section>



        {/* ACHIEVEMENTS CAROUSEL */}
        {dept.achievements && dept.achievements.length > 0 && (
          <AchievementsCarousel achievements={dept.achievements} hslColor={dept.hslColor} />
        )}

        {/* ALLIANCES CAROUSEL */}
        <AlliancesCarousel alliances={dept.alliances} hslColor={dept.hslColor} />



      </main>
      <Footer />
    </div>
  );
};

export default DepartmentPage;
