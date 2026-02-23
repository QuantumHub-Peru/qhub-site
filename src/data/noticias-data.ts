import { Calendar, Microscope, Users, Lightbulb, Trophy, Rocket, Star, Award, Zap, Globe } from "lucide-react";

export interface NewsItem {
  id: string;
  title: string;
  cat: string;
  date: string;
  desc: string;
  content: string[];
  readTime: string;
  featured?: boolean;
  image: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  tags: string[];
}

export interface Milestone {
  year: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  color: string;
}

export interface HallOfFameEntry {
  name: string;
  achievement: string;
  year: string;
  icon: React.ElementType;
  glow: string;
}

export const categories = ["Todos", "Eventos", "Investigación", "Comunidad", "Innovación"];

export const catIcons: Record<string, React.ElementType> = {
  Eventos: Calendar,
  Investigación: Microscope,
  Comunidad: Users,
  Innovación: Lightbulb,
};

export const catColors: Record<string, string> = {
  Eventos: "from-dept-relations/30 to-transparent",
  Investigación: "from-dept-research/30 to-transparent",
  Comunidad: "from-dept-community/30 to-transparent",
  Innovación: "from-dept-innovation/30 to-transparent",
};

export const milestones: Milestone[] = [
  { year: "2023", title: "Fundación de QuantumHub Peru", desc: "Nace la primera organización dedicada a computación cuántica en Perú, con la visión de democratizar el acceso al conocimiento cuántico en LATAM.", icon: Rocket, color: "quantum-purple" },
  { year: "2023", title: "Primer Meetup Cuántico en Lima", desc: "30 personas se reunieron en Lima para el primer encuentro presencial sobre computación cuántica, marcando el inicio de la comunidad.", icon: Users, color: "dept-community" },
  { year: "2024", title: "Lanzamiento del Curso CCI", desc: "El primer curso de Computación Cuántica e Información Cuántica gratuito y en español, con más de 200 inscritos en su primera cohorte.", icon: Star, color: "dept-academic" },
  { year: "2024", title: "Reconocimiento en Nature", desc: "Nature Quantum Information destaca a QuantumHub como modelo emergente de ecosistema cuántico en países en desarrollo.", icon: Award, color: "dept-research" },
  { year: "2024", title: "Primer Hackathon Qiskit LATAM", desc: "15 equipos de 5 países compitieron durante 48 horas creando soluciones cuánticas para problemas reales de la región.", icon: Zap, color: "dept-innovation" },
  { year: "2025", title: "Alianza Internacional en Fotónica", desc: "Firma de acuerdo de colaboración con universidad europea líder en hardware cuántico fotónico.", icon: Globe, color: "quantum-turquoise" },
  { year: "2025", title: "Quantum AI Summit 2025", desc: "El primer summit de IA Cuántica en Latinoamérica, reuniendo a 20+ speakers internacionales en Lima.", icon: Trophy, color: "quantum-yellow" },
];

export const hallOfFame: HallOfFameEntry[] = [
  { name: "Primera cohorte graduada", achievement: "50 pioneros completaron el primer curso CCI, formando la base del ecosistema cuántico peruano.", year: "2024", icon: Trophy, glow: "glow-yellow" },
  { name: "Paper en arXiv", achievement: "Primer paper de investigación publicado por el equipo, sobre algoritmos variacionales para optimización.", year: "2024", icon: Microscope, glow: "glow-blue" },
  { name: "Feature en Nature", achievement: "QuantumHub destacado internacionalmente como caso de estudio de innovación cuántica en países emergentes.", year: "2024", icon: Award, glow: "glow-purple" },
  { name: "100+ en Meetup #4", achievement: "Récord de asistencia en meetup presencial, consolidando la comunidad cuántica más grande de Perú.", year: "2025", icon: Users, glow: "glow-purple" },
  { name: "5 países en Hackathon", achievement: "El primer hackathon cuántico conectó a desarrolladores de Perú, Colombia, Chile, México y Argentina.", year: "2024", icon: Globe, glow: "glow-blue" },
  { name: "Quantum AI Summit", achievement: "Organización del primer evento internacional de IA cuántica en Latinoamérica.", year: "2025", icon: Rocket, glow: "glow-yellow" },
];

export const newsItems: NewsItem[] = [
  {
    id: "quantum-ai-summit-2025",
    title: "Quantum AI Summit 2025: El primer evento cuántico de LATAM",
    cat: "Eventos",
    date: "15 Mar 2025",
    desc: "QuantumHub Peru organiza el primer Quantum AI Summit en Lima, reuniendo expertos internacionales en computación cuántica e inteligencia artificial.",
    content: [
      "El Quantum AI Summit 2025 marcará un hito en la historia de la tecnología cuántica en Latinoamérica. Con más de 20 speakers internacionales, workshops prácticos y sesiones de networking, este evento conectará a la comunidad cuántica regional con líderes globales del sector.",
      "Entre los temas principales se encuentran Quantum Machine Learning, corrección de errores cuánticos, computación cuántica en la nube, y aplicaciones industriales. El summit contará con tracks dedicados a investigación, industria y educación.",
      "Lima se convertirá por primera vez en el epicentro de la innovación cuántica latinoamericana, con asistentes confirmados de más de 10 países. El evento incluirá un hackathon de 24 horas, poster sessions y un demo day de startups cuánticas.",
      "Las inscripciones están abiertas con becas disponibles para estudiantes universitarios de toda la región. QuantumHub busca que el acceso al conocimiento cuántico no tenga barreras geográficas ni económicas.",
    ],
    readTime: "5 min",
    featured: true,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80",
    author: "QuantumHub Team",
    authorRole: "Organizadores",
    authorAvatar: "https://ui-avatars.com/api/?name=QH&background=7c3aed&color=fff",
    tags: ["summit", "AI", "LATAM", "evento"],
  },
  {
    id: "variational-algorithms-paper",
    title: "Nuevo paper publicado: Algoritmos variacionales para optimización",
    cat: "Investigación",
    date: "28 Feb 2025",
    desc: "El equipo de investigación publica un paper sobre algoritmos cuánticos variacionales aplicados a problemas de optimización combinatoria.",
    content: [
      "Nuestro equipo de investigación ha publicado un nuevo paper en arXiv explorando la aplicación de algoritmos cuánticos variacionales (VQE/QAOA) para resolver problemas de optimización en logística y cadenas de suministro en el contexto latinoamericano.",
      "Los resultados muestran que para instancias de tamaño medio (50-100 variables), los algoritmos variacionales pueden encontrar soluciones competitivas con métodos clásicos, mientras que para problemas más grandes, los enfoques híbridos cuántico-clásicos ofrecen las mayores ventajas.",
      "El paper propone además un framework de benchmarking específico para problemas de optimización en la región, considerando las particularidades de la infraestructura logística latinoamericana.",
    ],
    readTime: "8 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200&q=80",
    author: "Dr. María González",
    authorRole: "Dept. Investigación",
    authorAvatar: "https://ui-avatars.com/api/?name=MG&background=3b82f6&color=fff",
    tags: ["paper", "VQE", "QAOA", "optimización"],
  },
  {
    id: "meetup-lima-3",
    title: "Meetup Lima #3: Quantum Machine Learning en acción",
    cat: "Comunidad",
    date: "10 Feb 2025",
    desc: "Tercer meetup presencial en Lima con más de 80 asistentes explorando aplicaciones de Quantum Machine Learning.",
    content: [
      "El tercer meetup de QuantumHub Peru en Lima superó todas las expectativas con 80+ asistentes. Se presentaron demos en vivo de clasificación cuántica, redes neuronales cuánticas y casos de uso en finanzas y medicina.",
      "Los asistentes pudieron experimentar con notebooks interactivos conectados a simuladores cuánticos, ejecutando sus propios circuitos de QML en tiempo real. La sesión de networking posterior se extendió por más de 2 horas.",
      "Este crecimiento constante en asistencia demuestra el hambre de la comunidad peruana por conocimiento cuántico accesible y práctico.",
    ],
    readTime: "4 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    author: "QuantumHub Community",
    authorRole: "Dept. Comunidad",
    authorAvatar: "https://ui-avatars.com/api/?name=QC&background=ec4899&color=fff",
    tags: ["meetup", "QML", "Lima", "comunidad"],
  },
  {
    id: "alianza-fotonica",
    title: "Alianza con universidad europea para investigación conjunta",
    cat: "Innovación",
    date: "25 Ene 2025",
    desc: "QuantumHub Peru firma un acuerdo de colaboración con una universidad líder en Europa para proyectos de investigación en fotónica cuántica.",
    content: [
      "Esta alianza estratégica permitirá a investigadores de QuantumHub acceder a laboratorios de última generación y colaborar en proyectos de hardware cuántico basados en fotónica integrada.",
      "El acuerdo incluye intercambio de investigadores, co-supervisión de tesis doctorales, y acceso a equipamiento de fabricación de chips fotónicos. Es un paso fundamental para posicionar al Perú en el mapa global de la investigación cuántica.",
      "Los primeros proyectos conjuntos se centrarán en fuentes de fotones entrelazados y circuitos fotónicos programables para computación cuántica.",
    ],
    readTime: "6 min",
    featured: true,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    author: "Dept. Innovación",
    authorRole: "Innovación & Alianzas",
    authorAvatar: "https://ui-avatars.com/api/?name=DI&background=14b8a6&color=fff",
    tags: ["alianza", "fotónica", "hardware", "Europa"],
  },
  {
    id: "primera-cohorte",
    title: "Primera cohorte graduada: 50 pioneros cuánticos",
    cat: "Comunidad",
    date: "15 Dic 2024",
    desc: "50 estudiantes completan exitosamente el primer curso de Computación Cuántica e Información Cuántica.",
    content: [
      "La primera generación de graduados de QuantumHub Peru marca un momento histórico. Estos 50 pioneros ahora forman parte activa del ecosistema cuántico.",
      "Varios de ellos se han integrado a los departamentos de investigación e innovación, contribuyendo a proyectos activos. Otros han iniciado sus propios grupos de estudio en universidades de Lima, Arequipa y Trujillo.",
      "La ceremonia de graduación incluyó presentaciones de proyectos finales que abarcaron desde simulación de moléculas hasta optimización de portafolios financieros usando algoritmos cuánticos.",
    ],
    readTime: "5 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&q=80",
    author: "QuantumHub Team",
    authorRole: "Dirección General",
    authorAvatar: "https://ui-avatars.com/api/?name=QH&background=7c3aed&color=fff",
    tags: ["graduación", "curso", "pioneros"],
  },
  {
    id: "hackathon-qiskit",
    title: "Hackathon Qiskit LATAM: Soluciones cuánticas reales",
    cat: "Innovación",
    date: "20 Nov 2024",
    desc: "Primer hackathon cuántico en LATAM con equipos de 5 países desarrollando soluciones usando Qiskit.",
    content: [
      "Durante 48 horas intensas, 15 equipos de 5 países latinoamericanos compitieron creando soluciones cuánticas para desafíos reales en logística, finanzas y salud.",
      "El equipo ganador desarrolló un optimizador cuántico para rutas de distribución que demostró mejoras del 15% sobre heurísticas clásicas en instancias específicas. El segundo lugar fue para un clasificador cuántico de imágenes médicas.",
      "IBM Quantum proporcionó acceso a hardware real durante el evento, permitiendo a los equipos ejecutar sus soluciones en procesadores cuánticos de última generación.",
    ],
    readTime: "7 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80",
    author: "Carlos Ruiz",
    authorRole: "Dept. Innovación",
    authorAvatar: "https://ui-avatars.com/api/?name=CR&background=14b8a6&color=fff",
    tags: ["hackathon", "Qiskit", "LATAM"],
  },
  {
    id: "nature-reconocimiento",
    title: "QuantumHub en Nature: Reconocimiento internacional",
    cat: "Investigación",
    date: "5 Nov 2024",
    desc: "La revista Nature destaca el trabajo de QuantumHub Peru como modelo de ecosistema cuántico en países emergentes.",
    content: [
      "Un artículo en Nature Quantum Information destaca a QuantumHub Peru como un caso de estudio único: una organización que está construyendo infraestructura cuántica donde prácticamente no existía.",
      "El artículo resalta cómo la combinación de educación gratuita, investigación aplicada y construcción de comunidad ha creado un modelo replicable para otros países de la región.",
      "Investigadores de MIT y Oxford citaron el trabajo de QuantumHub como ejemplo de que la innovación no requiere grandes presupuestos sino visión y comunidad organizada.",
    ],
    readTime: "6 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&q=80",
    author: "QuantumHub Research",
    authorRole: "Investigación",
    authorAvatar: "https://ui-avatars.com/api/?name=QR&background=3b82f6&color=fff",
    tags: ["Nature", "reconocimiento", "impacto"],
  },
  {
    id: "workshop-pennylane",
    title: "Workshop: Circuitos cuánticos con Pennylane",
    cat: "Eventos",
    date: "15 Oct 2024",
    desc: "Workshop práctico sobre diseño de circuitos cuánticos y diferenciación automática usando Pennylane.",
    content: [
      "Un workshop intensivo de 4 horas donde los participantes aprendieron a diseñar, simular y optimizar circuitos cuánticos usando Pennylane.",
      "Se exploraron aplicaciones en Quantum Machine Learning y optimización variacional, con ejercicios hands-on que los participantes pudieron completar en sus propios laptops.",
      "El workshop contó con la participación especial de un desarrollador del equipo de Xanadu, quienes crearon Pennylane, brindando insights directos sobre las mejores prácticas.",
    ],
    readTime: "3 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
    author: "Ana Torres",
    authorRole: "Dept. Académico",
    authorAvatar: "https://ui-avatars.com/api/?name=AT&background=8b5cf6&color=fff",
    tags: ["workshop", "Pennylane", "circuitos"],
  },
];
