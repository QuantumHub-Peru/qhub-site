import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight, Clock, Trophy, Sparkles, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { newsItems, categories, catIcons, catColors, milestones, hallOfFame } from "@/data/noticias-data";

const Noticias = () => {
  const [filter, setFilter] = useState("Todos");
  const filtered = filter === "Todos" ? newsItems : newsItems.filter((n) => n.cat === filter);
  const featured = filtered.filter((n) => n.featured);
  const regular = filtered.filter((n) => !n.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 quantum-grid opacity-10 animate-grid-flow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-heading text-xs tracking-[0.3em] text-primary uppercase mb-4">Noticias & Logros</p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Movimiento del <span className="text-gradient-quantum">Ecosistema</span>
            </h1>
            <p className="font-body text-muted-foreground max-w-xl mx-auto">
              Hitos, logros y las últimas novedades de la comunidad cuántica más grande de Latinoamérica.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════ MILESTONES TIMELINE ═══════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
        <div className="container mx-auto px-6 max-w-5xl relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-heading text-xs tracking-[0.3em] text-accent uppercase mb-3">Timeline</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold">
              Hitos del <span className="text-gradient-gold">Ecosistema</span>
            </h2>
          </motion.div>

          {/* Timeline line */}
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-accent/30 to-primary/10 hidden md:block" />
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-accent/30 to-primary/10 md:hidden" />

            <div className="space-y-12 md:space-y-16">
              {milestones.map((m, i) => {
                const Icon = m.icon;
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className={`relative flex items-center gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* Card */}
                    <div className={`flex-1 pl-12 md:pl-0 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <div className="glass rounded-2xl p-6 hover:border-primary/30 transition-all duration-500 group hover:glow-purple">
                        <span className={`font-heading text-[10px] tracking-[0.2em] text-${m.color} uppercase`}>{m.year}</span>
                        <h3 className="font-heading text-sm font-bold mt-1 mb-2 group-hover:text-primary transition-colors">{m.title}</h3>
                        <p className="font-body text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
                      </div>
                    </div>

                    {/* Node */}
                    <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 z-10">
                      <div className={`w-12 h-12 rounded-full glass flex items-center justify-center border-2 border-${m.color}/40 animate-pulse-glow`}>
                        <Icon className={`w-5 h-5 text-${m.color}`} />
                      </div>
                    </div>

                    {/* Spacer on desktop */}
                    <div className="hidden md:block flex-1" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ HALL OF FAME ═══════ */}
      <section className="py-20 section-darker relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
        </div>
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-4">
              <Trophy className="w-4 h-4 text-accent" />
              <span className="font-heading text-[10px] tracking-[0.2em] text-accent uppercase">Hall of Fame</span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold">
              Logros que nos <span className="text-gradient-quantum">definen</span>
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-3 max-w-lg mx-auto">
              Los momentos que marcaron el camino de QuantumHub y de la computación cuántica en Latinoamérica.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hallOfFame.map((entry, i) => {
              const Icon = entry.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`glass rounded-2xl p-6 group cursor-default hover:border-primary/40 transition-all duration-500 relative overflow-hidden`}
                >
                  {/* Background glow */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${entry.glow}`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:border-primary/40 transition-colors">
                        <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="font-heading text-[10px] text-accent tracking-widest">{entry.year}</span>
                    </div>
                    <h3 className="font-heading text-xs font-bold mb-2 group-hover:text-primary transition-colors">{entry.name}</h3>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed">{entry.achievement}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ NEWS SECTION ═══════ */}
      <section className="py-20 relative">
        <div className="absolute inset-0 quantum-grid opacity-5" />
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="font-heading text-xs tracking-[0.3em] text-primary uppercase mb-3">Actualidad</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold">
              Últimas <span className="text-gradient-quantum">Noticias</span>
            </h2>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full font-body text-xs transition-all duration-300 ${
                  filter === cat ? "btn-quantum !py-2 !px-5 !text-xs" : "glass text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Featured articles */}
          {featured.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {featured.map((n, i) => {
                const Icon = catIcons[n.cat] || Calendar;
                return (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <Link to={`/noticias/${n.id}`} className="block group">
                      <article className="rounded-2xl overflow-hidden border border-border/30 hover:border-primary/40 transition-all duration-500 relative">
                        {/* Image */}
                        <div className="relative h-52 overflow-hidden">
                          <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                          <div className="absolute top-4 left-4 flex gap-2">
                            <span className="glass px-3 py-1 rounded-full font-body text-[10px] text-foreground flex items-center gap-1.5">
                              <Icon className="w-3 h-3 text-primary" /> {n.cat}
                            </span>
                            <span className="glass px-3 py-1 rounded-full font-body text-[10px] text-accent">⭐ Destacado</span>
                          </div>
                        </div>
                        <div className="p-6 bg-card/50">
                          <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground font-body">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {n.date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {n.readTime} lectura</span>
                          </div>
                          <h3 className="font-heading text-sm font-bold mb-2 group-hover:text-primary transition-colors">{n.title}</h3>
                          <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-2">{n.desc}</p>
                          <div className="mt-4 flex items-center gap-2 text-primary font-body text-xs font-medium group-hover:gap-3 transition-all">
                            Leer artículo <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none glow-purple" />
                      </article>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Regular articles grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {regular.map((n, i) => {
                const Icon = catIcons[n.cat] || Calendar;
                return (
                  <motion.div
                    key={n.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -6 }}
                  >
                    <Link to={`/noticias/${n.id}`} className="block group h-full">
                      <article className="glass rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-500 h-full flex flex-col">
                        {/* Image */}
                        <div className="relative h-40 overflow-hidden">
                          <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 to-transparent" />
                          <div className="absolute top-3 left-3">
                            <span className="glass px-2 py-0.5 rounded-full font-body text-[10px] text-foreground flex items-center gap-1">
                              <Icon className="w-3 h-3 text-primary" /> {n.cat}
                            </span>
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground font-body">
                            <span>{n.date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {n.readTime}</span>
                          </div>
                          <h3 className="font-heading text-xs font-bold mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">{n.title}</h3>
                          <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">{n.desc}</p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mt-3">
                            {n.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-body bg-primary/10 text-primary/70">#{tag}</span>
                            ))}
                          </div>

                          <div className="mt-3 flex items-center gap-1 text-primary font-body text-xs font-medium group-hover:gap-2 transition-all">
                            Leer artículo <ChevronRight className="w-3 h-3" />
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
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
