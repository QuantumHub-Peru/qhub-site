import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Atom, BookOpen, Lightbulb, Users, ArrowRight, Clock, Calendar, X, Sparkles } from "lucide-react";

const categories = [
  { id: "all", label: "Todos", icon: Sparkles },
  { id: "education", label: "Quantum Education", icon: BookOpen },
  { id: "research", label: "Research Insights", icon: Atom },
  { id: "innovation", label: "Tech & Innovation", icon: Lightbulb },
  { id: "community", label: "Community", icon: Users },
];

const catAccent: Record<string, string> = {
  education: "dept-academic",
  research: "dept-research",
  innovation: "dept-innovation",
  community: "dept-community",
};

interface BlogPost {
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

const posts: BlogPost[] = [
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

const Blog = () => {
  const [filter, setFilter] = useState("all");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filtered = filter === "all" ? posts : posts.filter((p) => p.category === filter);
  const featured = filtered.filter((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 quantum-grid opacity-10 animate-grid-flow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-heading text-xs tracking-[0.3em] text-primary uppercase mb-4">Blog</p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Quantum <span className="text-gradient-quantum">Insights</span>
            </h1>
            <p className="font-body text-muted-foreground max-w-xl mx-auto">
              Exploraciones, descubrimientos y voces del ecosistema cuántico.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <div className="container mx-auto px-6 max-w-6xl mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => {
            const active = filter === cat.id;
            return (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setFilter(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-xs transition-all duration-300 ${
                  active
                    ? "btn-quantum !py-2.5 !px-5 !text-xs"
                    : "glass text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                <cat.icon className="w-3.5 h-3.5" />
                {cat.label}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <div className="container mx-auto px-6 max-w-6xl mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            {featured.map((post, i) => {
              const accent = catAccent[post.category] || "primary";
              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  onClick={() => setSelectedPost(post)}
                  className="group cursor-pointer relative rounded-2xl overflow-hidden border border-border/30 hover:border-primary/40 transition-all duration-500"
                  whileHover={{ y: -4 }}
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`glass px-3 py-1 rounded-full font-body text-[10px] text-${accent} border-${accent}/30`}>
                        {categories.find((c) => c.id === post.category)?.label}
                      </span>
                      <span className="glass px-3 py-1 rounded-full font-body text-[10px] text-accent">⭐ Destacado</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 relative">
                    <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                    <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground font-body">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                      <span>{post.author}</span>
                    </div>
                    <h3 className="font-heading text-sm md:text-base font-bold mb-2 group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.summary}</p>
                    <div className="mt-4 flex items-center gap-2 text-primary font-body text-xs font-medium group-hover:gap-3 transition-all">
                      Leer artículo <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none glow-purple" />
                </motion.article>
              );
            })}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="container mx-auto px-6 max-w-6xl pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {regular.map((post, i) => {
              const accent = catAccent[post.category] || "primary";
              return (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setSelectedPost(post)}
                  className="group cursor-pointer glass rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-500"
                  whileHover={{ y: -6 }}
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className={`glass px-2 py-0.5 rounded-full font-body text-[10px] text-${accent}`}>
                        {categories.find((c) => c.id === post.category)?.label}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground font-body">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    </div>
                    <h3 className="font-heading text-xs font-bold mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-2">{post.summary}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-body bg-primary/10 text-primary/70">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center gap-1 text-primary font-body text-xs font-medium group-hover:gap-2 transition-all">
                      Leer más <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          >
            <div className="absolute inset-0 bg-background/85 backdrop-blur-md" onClick={() => setSelectedPost(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative glass-strong rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto z-10"
            >
              {/* Modal image */}
              <div className="relative h-56 md:h-72 overflow-hidden rounded-t-2xl">
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent" />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="glass px-3 py-1 rounded-full font-body text-[10px] text-primary mb-2 inline-block">
                    {categories.find((c) => c.id === selectedPost.category)?.label}
                  </span>
                  <h2 className="font-heading text-lg md:text-xl font-bold leading-snug">{selectedPost.title}</h2>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6 text-xs text-muted-foreground font-body border-b border-border/30 pb-4">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {selectedPost.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {selectedPost.readTime} lectura</span>
                  <span>Por {selectedPost.author}</span>
                </div>

                <div className="space-y-4">
                  <p className="font-body text-sm text-foreground/80 leading-relaxed">{selectedPost.summary}</p>
                  <p className="font-body text-sm text-foreground/70 leading-relaxed">{selectedPost.content}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-border/30">
                  {selectedPost.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-body bg-primary/10 text-primary/70">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Blog;
