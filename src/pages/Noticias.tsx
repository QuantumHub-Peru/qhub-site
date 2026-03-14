import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Trophy, Rocket, Crown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Importamos la data generada
import { hallOfFameItems } from "@/data/hallOfFame.generated";
// A FUTURO: Cuando generes hitos, descomenta esto:
// import { hitosItems } from "@/data/hitos.generated";

// Definimos las categorías locales
const categories = ["Todos", "Hall of Fame", "Hitos"];
const catIcons: Record<string, any> = {
  "Hall of Fame": Crown,
  "Hitos": Rocket,
};

// Paleta de colores para que los tags se vean más diversos y vibrantes
const tagColors = [
  "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "bg-pink-500/10 text-pink-400 border-pink-500/20",
  "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "bg-amber-500/10 text-amber-400 border-amber-500/20",
];

const Noticias = () => {
  const [filter, setFilter] = useState("Todos");

  // 1. Unificamos toda la data autogenerada.
  const allItems = [
    ...hallOfFameItems,
    // ...hitosItems 
  ];

  // 2. Filtramos según la selección del usuario
  const filtered = filter === "Todos" ? allItems : allItems.filter((n) => n.cat === filter);

  // 3. Separamos por tipo de sección para el renderizado
  const hitos = filtered.filter((n) => n.cat === "Hitos");
  const hallOfFame = filtered.filter((n) => n.cat === "Hall of Fame");

  const showSections = filter === "Todos";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-4 overflow-hidden">
        <div className="absolute inset-0 quantum-grid opacity-10 animate-grid-flow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-heading text-xs md:text-sm tracking-[0.3em] text-primary uppercase mb-4">Logros & Reconocimientos</p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
              Movimiento del <span className="text-gradient-quantum">Ecosistema</span>
            </h1>
            <p className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Descubre a quienes nos inspiran y los momentos que han marcado el camino de la comunidad cuántica más grande de Latinoamérica.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <div className="container mx-auto px-6 max-w-6xl mt-6 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => {
            const Icon = catIcons[cat];
            const isActive = filter === cat;

            return (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(cat)}
                className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-300 ${isActive
                    ? "btn-quantum !py-2.5 !px-6 shadow-lg shadow-primary/20 text-white"
                    : "glass text-muted-foreground border border-border/40 hover:border-primary/40 hover:text-foreground"
                  }`}
              >
                {Icon && <Icon className={`w-4 h-4 ${isActive ? "text-white" : "opacity-70"}`} />}
                {cat}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ═══════ HITOS TIMELINE ═══════ */}
      {(showSections ? hitos.length > 0 : filter === "Hitos") && hitos.length > 0 && (
        <section className="py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
          <div className="container mx-auto px-6 max-w-5xl relative">
            {showSections && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full mb-4 border border-accent/20 bg-accent/5">
                  <Rocket className="w-4 h-4 text-accent" />
                  <span className="font-heading text-[11px] tracking-[0.2em] text-accent uppercase font-semibold">Timeline</span>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Hitos del <span className="text-gradient-gold">Ecosistema</span>
                </h2>
              </motion.div>
            )}

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-accent/30 to-primary/10 hidden md:block" />
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-accent/30 to-primary/10 md:hidden" />

              <div className="space-y-12 md:space-y-20">
                {(filter === "Hitos" ? filtered : hitos).map((n, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: i * 0.06 }}
                      className={`relative flex items-center gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                    >
                      <div className={`flex-1 pl-14 md:pl-0 ${isLeft ? "md:pr-14 md:text-right" : "md:pl-14"}`}>
                        <Link to={`/noticias/${n.id}`} className="block group">
                          <div className="glass rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
                            <div className="relative h-48 md:h-56 overflow-hidden">
                              <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                              <span className="absolute top-4 left-4 glass px-3 py-1 rounded-full font-heading text-[10px] text-accent tracking-wider font-semibold shadow-black/50 shadow-sm">{n.date}</span>
                            </div>
                            <div className="p-6 md:p-8">
                              <h3 className="font-heading text-base md:text-lg font-bold mb-3 group-hover:text-primary transition-colors leading-snug">{n.title}</h3>
                              <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-3">{n.desc}</p>
                              <div className="mt-5 flex items-center gap-2 text-primary font-body text-sm font-medium group-hover:gap-3 transition-all">
                                Leer historia completa <ChevronRight className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>

                      <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 z-10">
                        <div className="w-14 h-14 rounded-full glass bg-background flex items-center justify-center border-2 border-accent/50 animate-pulse-glow shadow-xl shadow-accent/20">
                          <Rocket className="w-6 h-6 text-accent" />
                        </div>
                      </div>

                      <div className="hidden md:block flex-1" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════ HALL OF FAME ═══════ */}
      {(showSections ? hallOfFame.length > 0 : filter === "Hall of Fame") && (
        <section className="py-12 section-darker relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-accent/10 blur-[150px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[150px]" />
          </div>
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            {showSections && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full mb-4 border border-primary/20 bg-primary/5">
                  <Crown className="w-4 h-4 text-primary" />
                  <span className="font-heading text-[11px] tracking-[0.2em] text-primary uppercase font-semibold">Hall of Fame</span>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Quienes nos <span className="text-gradient-quantum">inspiran</span>
                </h2>
              </motion.div>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {(filter === "Hall of Fame" ? filtered : hallOfFame).map((n, i) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -8 }}
                >
                  <Link to={`/noticias/${n.id}`} className="block group h-full">
                    <article className="glass rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500 relative h-full flex flex-col hover:shadow-2xl hover:shadow-primary/10">
                      <div className="relative h-56 overflow-hidden">
                        <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="glass px-3 py-1 rounded-full font-body text-[11px] font-medium text-accent flex items-center gap-1.5 shadow-black/50 shadow-sm border border-accent/20">
                            <Trophy className="w-3.5 h-3.5" /> Hall of Fame
                          </span>
                        </div>
                        <span className="absolute top-4 right-4 glass px-3 py-1 rounded-full font-heading text-[10px] text-foreground/80 shadow-black/50 shadow-sm">{n.date}</span>
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="font-heading text-base md:text-lg font-bold mb-3 group-hover:text-primary transition-colors leading-snug">{n.title}</h3>
                        <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">{n.desc}</p>

                        {n.tags && n.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-5">
                            {n.tags.slice(0, 3).map((tag: string, index: number) => {
                              const colorClass = tagColors[index % tagColors.length];
                              return (
                                <span key={tag} className={`px-3 py-1 rounded-full text-[11px] font-body border ${colorClass}`}>
                                  #{tag}
                                </span>
                              );
                            })}
                          </div>
                        )}

                        <div className="mt-6 flex items-center gap-2 text-primary font-body text-sm font-medium group-hover:gap-3 transition-all border-t border-border/40 pt-4">
                          Leer historia <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none glow-purple" />
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Noticias;