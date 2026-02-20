import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Microscope, Users, Lightbulb, ArrowRight, Clock } from "lucide-react";
import { useState } from "react";

const categories = ["Todos", "Eventos", "Investigación", "Comunidad", "Innovación"];
const catIcons: Record<string, React.ElementType> = { Eventos: Calendar, Investigación: Microscope, Comunidad: Users, Innovación: Lightbulb };
const catColors: Record<string, string> = {
  Eventos: "from-dept-relations/20 to-transparent",
  Investigación: "from-dept-research/20 to-transparent",
  Comunidad: "from-dept-community/20 to-transparent",
  Innovación: "from-dept-innovation/20 to-transparent",
};

interface NewsItem {
  title: string;
  cat: string;
  date: string;
  desc: string;
  content: string;
  readTime: string;
  featured?: boolean;
}

const newsItems: NewsItem[] = [
  {
    title: "Quantum AI Summit 2025: El primer evento cuántico de LATAM",
    cat: "Eventos",
    date: "15 Mar 2025",
    desc: "QuantumHub Peru organiza el primer Quantum AI Summit en Lima, reuniendo expertos internacionales en computación cuántica e inteligencia artificial.",
    content: "El Quantum AI Summit 2025 marcará un hito en la historia de la tecnología cuántica en Latinoamérica. Con más de 20 speakers internacionales, workshops prácticos y sesiones de networking, este evento conectará a la comunidad cuántica regional con líderes globales del sector.",
    readTime: "5 min",
    featured: true,
  },
  {
    title: "Nuevo paper publicado: Algoritmos variacionales para optimización",
    cat: "Investigación",
    date: "28 Feb 2025",
    desc: "El equipo de investigación publica un paper sobre algoritmos cuánticos variacionales aplicados a problemas de optimización combinatoria.",
    content: "Nuestro equipo de investigación ha publicado un nuevo paper en arXiv explorando la aplicación de algoritmos cuánticos variacionales (VQE/QAOA) para resolver problemas de optimización en logística y cadenas de suministro en el contexto latinoamericano.",
    readTime: "8 min",
  },
  {
    title: "Meetup Lima #3: Quantum Machine Learning en acción",
    cat: "Comunidad",
    date: "10 Feb 2025",
    desc: "Tercer meetup presencial en Lima con más de 80 asistentes explorando aplicaciones de Quantum Machine Learning.",
    content: "El tercer meetup de QuantumHub Peru en Lima superó todas las expectativas con 80+ asistentes. Se presentaron demos en vivo de clasificación cuántica, redes neuronales cuánticas y casos de uso en finanzas y medicina.",
    readTime: "4 min",
  },
  {
    title: "Alianza con universidad europea para investigación conjunta",
    cat: "Innovación",
    date: "25 Ene 2025",
    desc: "QuantumHub Peru firma un acuerdo de colaboración con una universidad líder en Europa para proyectos de investigación en fotónica cuántica.",
    content: "Esta alianza estratégica permitirá a investigadores de QuantumHub acceder a laboratorios de última generación y colaborar en proyectos de hardware cuántico basados en fotónica integrada, acelerando la producción científica del equipo.",
    readTime: "6 min",
  },
  {
    title: "Primera cohorte graduada: 50 pioneros cuánticos",
    cat: "Comunidad",
    date: "15 Dic 2024",
    desc: "50 estudiantes completan exitosamente el primer curso de Computación Cuántica e Información Cuántica de QuantumHub Peru.",
    content: "La primera generación de graduados de QuantumHub Peru marca un momento histórico. Estos 50 pioneros ahora forman parte activa del ecosistema cuántico, con varios de ellos integrándose a los departamentos de investigación e innovación.",
    readTime: "5 min",
    featured: true,
  },
  {
    title: "Hackathon Qiskit LATAM: Soluciones cuánticas reales",
    cat: "Innovación",
    date: "20 Nov 2024",
    desc: "Primer hackathon cuántico en LATAM con equipos de 5 países desarrollando soluciones usando Qiskit.",
    content: "Durante 48 horas intensas, 15 equipos de 5 países latinoamericanos compitieron creando soluciones cuánticas para desafíos reales en logística, finanzas y salud. El equipo ganador desarrolló un optimizador cuántico para rutas de distribución.",
    readTime: "7 min",
  },
  {
    title: "QuantumHub en Nature: Reconocimiento internacional",
    cat: "Investigación",
    date: "5 Nov 2024",
    desc: "La revista Nature destaca el trabajo de QuantumHub Peru como modelo de ecosistema cuántico en países emergentes.",
    content: "Un artículo en Nature Quantum Information destaca a QuantumHub Peru como un caso de estudio único: una organización que está construyendo infraestructura cuántica donde prácticamente no existía, demostrando que la innovación no requiere grandes presupuestos sino visión y comunidad.",
    readTime: "6 min",
  },
  {
    title: "Workshop: Circuitos cuánticos con Pennylane",
    cat: "Eventos",
    date: "15 Oct 2024",
    desc: "Workshop práctico sobre diseño de circuitos cuánticos y diferenciación automática usando Pennylane.",
    content: "Un workshop intensivo de 4 horas donde los participantes aprendieron a diseñar, simular y optimizar circuitos cuánticos usando Pennylane, explorando aplicaciones en Quantum Machine Learning y optimización variacional.",
    readTime: "3 min",
  },
];

const Noticias = () => {
  const [filter, setFilter] = useState("Todos");
  const [expanded, setExpanded] = useState<string | null>(null);
  const filtered = filter === "Todos" ? newsItems : newsItems.filter((n) => n.cat === filter);
  const featured = filtered.filter((n) => n.featured);
  const regular = filtered.filter((n) => !n.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <p className="font-heading text-xs tracking-[0.3em] text-primary uppercase mb-4">Noticias</p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Movimiento del <span className="text-gradient-quantum">Ecosistema</span>
            </h1>
            <p className="font-body text-muted-foreground max-w-xl mx-auto">
              Descubre las últimas novedades, investigaciones, eventos y logros de la comunidad cuántica.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setExpanded(null); }}
                className={`px-5 py-2 rounded-full font-body text-xs transition-all duration-300 ${
                  filter === cat ? "btn-quantum" : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured articles */}
          {featured.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {featured.map((n, i) => {
                const Icon = catIcons[n.cat] || Calendar;
                const isExpanded = expanded === n.title;
                return (
                  <motion.article
                    key={n.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`glass rounded-2xl overflow-hidden group cursor-pointer hover:glow-purple transition-all duration-300`}
                    onClick={() => setExpanded(isExpanded ? null : n.title)}
                  >
                    {/* Image placeholder with gradient */}
                    <div className={`h-48 bg-gradient-to-br ${catColors[n.cat] || "from-primary/10 to-transparent"} relative overflow-hidden`}>
                      <div className="absolute inset-0 quantum-grid opacity-20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="w-16 h-16 text-primary/20 group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="glass px-3 py-1 rounded-full font-body text-[10px] text-foreground">{n.cat}</span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="font-body text-[10px] text-muted-foreground bg-background/50 px-2 py-1 rounded-full backdrop-blur-sm">⭐ Destacado</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground font-body">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {n.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {n.readTime} lectura</span>
                      </div>
                      <h3 className="font-heading text-sm font-bold mb-2 group-hover:text-primary transition-colors">{n.title}</h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{n.desc}</p>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 border-t border-border/30 mt-4">
                              <p className="font-body text-sm text-foreground/70 leading-relaxed">{n.content}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="mt-4 flex items-center gap-1 text-primary font-body text-xs font-medium">
                        {isExpanded ? "Cerrar" : "Leer más"} <ArrowRight className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}

          {/* Regular articles */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {regular.map((n, i) => {
                const Icon = catIcons[n.cat] || Calendar;
                const isExpanded = expanded === n.title;
                return (
                  <motion.article
                    key={n.title}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.06 }}
                    className="glass rounded-2xl overflow-hidden group cursor-pointer hover:glow-purple transition-all duration-300"
                    onClick={() => setExpanded(isExpanded ? null : n.title)}
                  >
                    {/* Mini image header */}
                    <div className={`h-32 bg-gradient-to-br ${catColors[n.cat] || "from-primary/10 to-transparent"} relative overflow-hidden`}>
                      <div className="absolute inset-0 quantum-grid opacity-15" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="w-10 h-10 text-primary/20 group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className="glass px-2 py-0.5 rounded-full font-body text-[10px] text-foreground">{n.cat}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground font-body">
                        <span>{n.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {n.readTime}</span>
                      </div>
                      <h3 className="font-heading text-xs font-bold mb-2 group-hover:text-primary transition-colors leading-snug">{n.title}</h3>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed">{n.desc}</p>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-3 border-t border-border/30 mt-3">
                              <p className="font-body text-xs text-foreground/70 leading-relaxed">{n.content}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="mt-3 flex items-center gap-1 text-primary font-body text-xs font-medium">
                        {isExpanded ? "Cerrar" : "Leer más"} <ArrowRight className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Noticias;
