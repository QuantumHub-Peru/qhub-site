import { Atom, BookOpen, Lightbulb, Users, Sparkles, LucideIcon } from "lucide-react";

export interface Category {
    id: string;
    label: string;
    icon: LucideIcon;
}

export const categories: Category[] = [
    { id: "all", label: "Todos", icon: Sparkles },
    { id: "education", label: "Quantum Education", icon: BookOpen },
    { id: "research", label: "Research Insights", icon: Atom },
    { id: "innovation", label: "Tech & Innovation", icon: Lightbulb },
    { id: "community", label: "Community", icon: Users },
];

export const catAccent: Record<string, string> = {
    education: "dept-academic",
    research: "dept-research",
    innovation: "dept-innovation",
    community: "dept-community",
};

export interface BlogPost {
    id: string;
    title: string;
    category: string;
    date: string;
    readTime: string;
    summary: string;
    content: string;
    featured?: boolean;
    image: string;
    author: string;
    tags: string[];
}

export const posts: BlogPost[] = [
    {
        id: "quantum-ai-summit",
        title: "Quantum AI Summit 2025: El primer evento cuántico de LATAM",
        category: "community",
        date: "15 Mar 2025",
        readTime: "5 min",
        summary: "QuantumHub Peru organiza el primer Quantum AI Summit en Lima, reuniendo expertos internacionales.",
        content: "El Quantum AI Summit 2025 marcará un hito en la historia de la tecnología cuántica en Latinoamérica. Con más de 20 speakers internacionales, workshops prácticos y sesiones de networking, este evento conectará a la comunidad cuántica regional con líderes globales del sector. Temas como Quantum Machine Learning, corrección de errores cuánticos y computación cuántica en la nube serán parte de la agenda principal.",
        featured: true,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
        author: "QuantumHub Team",
        tags: ["evento", "AI", "summit"],
    },
    {
        id: "variational-algorithms",
        title: "Algoritmos variacionales: el puente entre lo clásico y lo cuántico",
        category: "research",
        date: "28 Feb 2025",
        readTime: "8 min",
        summary: "Nuevo paper sobre VQE/QAOA aplicado a optimización combinatoria en logística LATAM.",
        content: "Nuestro equipo de investigación ha publicado un nuevo paper en arXiv explorando la aplicación de algoritmos cuánticos variacionales (VQE/QAOA) para resolver problemas de optimización en logística y cadenas de suministro. Los resultados muestran mejoras significativas en convergencia comparado con métodos clásicos para instancias de tamaño medio.",
        image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
        author: "Dr. Maria Gonzales",
        tags: ["paper", "VQE", "optimización"],
    },
    {
        id: "qiskit-workshop",
        title: "Workshop: Construyendo circuitos cuánticos con Qiskit",
        category: "education",
        date: "20 Feb 2025",
        readTime: "4 min",
        summary: "Hands-on workshop para aprender a diseñar y ejecutar circuitos cuánticos desde cero.",
        content: "Un workshop intensivo de 4 horas donde los participantes aprenderán a diseñar, simular y ejecutar circuitos cuánticos usando Qiskit. Cubriremos desde las puertas cuánticas básicas hasta algoritmos como Grover y Shor. Ideal para personas con conocimiento básico de programación.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
        author: "Carlos Ruiz",
        tags: ["workshop", "Qiskit", "circuitos"],
    },
    {
        id: "nature-recognition",
        title: "QuantumHub en Nature: Reconocimiento como modelo emergente",
        category: "research",
        date: "10 Feb 2025",
        readTime: "6 min",
        summary: "Nature destaca a QuantumHub Peru como caso de estudio de ecosistema cuántico en países emergentes.",
        content: "Un artículo en Nature Quantum Information destaca a QuantumHub Peru como un caso de estudio único: una organización construyendo infraestructura cuántica donde no existía, demostrando que la innovación no requiere grandes presupuestos sino visión y comunidad.",
        featured: true,
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
        author: "QuantumHub Research",
        tags: ["Nature", "reconocimiento", "impacto"],
    },
    {
        id: "startup-quantum",
        title: "Cómo las startups están adoptando computación cuántica",
        category: "innovation",
        date: "1 Feb 2025",
        readTime: "7 min",
        summary: "Análisis del panorama de startups cuánticas en LATAM y oportunidades de innovación.",
        content: "El ecosistema de startups cuánticas en Latinoamérica está comenzando a tomar forma. Desde optimización logística hasta descubrimiento de fármacos, emprendedores están explorando cómo aprovechar las ventajas cuánticas para resolver problemas reales en la región.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
        author: "Ana Torres",
        tags: ["startups", "LATAM", "innovación"],
    },
    {
        id: "meetup-lima-4",
        title: "Meetup Lima #4: Quantum Error Correction explicado",
        category: "community",
        date: "20 Ene 2025",
        readTime: "4 min",
        summary: "100+ asistentes en el cuarto meetup explorando corrección de errores cuánticos.",
        content: "El cuarto meetup de QuantumHub Peru rompió récord con más de 100 asistentes. La sesión principal sobre corrección de errores cuánticos usando códigos de superficie fue seguida de un hands-on lab donde los participantes implementaron códigos de repetición en simuladores.",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
        author: "QuantumHub Community",
        tags: ["meetup", "QEC", "comunidad"],
    },
    {
        id: "quantum-ml-course",
        title: "Nuevo módulo: Quantum Machine Learning desde cero",
        category: "education",
        date: "10 Ene 2025",
        readTime: "5 min",
        summary: "Lanzamos un módulo gratuito sobre QML, desde kernels cuánticos hasta redes neuronales cuánticas.",
        content: "El nuevo módulo de Quantum Machine Learning cubre desde los fundamentos teóricos hasta implementaciones prácticas con Pennylane y Qiskit Machine Learning. Los estudiantes aprenderán sobre kernels cuánticos, clasificadores variacionales y redes neuronales cuánticas aplicadas a problemas reales.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
        author: "Dept. Académico",
        tags: ["QML", "curso", "Pennylane"],
    },
    {
        id: "photonic-alliance",
        title: "Alianza internacional para investigación en fotónica cuántica",
        category: "innovation",
        date: "28 Dic 2024",
        readTime: "6 min",
        summary: "Acuerdo con universidad europea para colaboración en hardware cuántico fotónico.",
        content: "Esta alianza estratégica permitirá a investigadores de QuantumHub acceder a laboratorios de última generación y colaborar en proyectos de hardware cuántico basados en fotónica integrada, acelerando la producción científica del equipo en esta área crítica.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        author: "Dept. Innovación",
        tags: ["fotónica", "alianza", "hardware"],
    },
];
