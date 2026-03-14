import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Trophy, Rocket, Crown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Importamos la data generada
import { hallOfFameItems } from "@/data/hallOfFame.generated";
import { hitosItems } from "@/data/hitos.generated";

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

const NewsCard = ({ item, index, type }: { item: any, index: number, type: string }) => {
  const Icon = type === "Hall of Fame" ? Crown : Rocket;
  const isHallOfFame = type === "Hall of Fame";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -8 }}
    >
      <Link to={`/noticias/${item.id}`} className="block group h-full">
        <article className="glass rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500 relative h-full flex flex-col hover:shadow-2xl hover:shadow-primary/10">
          <div className="relative h-56 overflow-hidden">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className={`glass px-3 py-1 rounded-full font-body text-[11px] font-medium flex items-center gap-1.5 shadow-black/50 shadow-sm border ${isHallOfFame ? "text-primary border-primary/20" : "text-accent border-accent/20"}`}>
                <Icon className="w-3.5 h-3.5" /> {type}
              </span>
            </div>
            <span className="absolute top-4 right-4 glass px-3 py-1 rounded-full font-heading text-[10px] text-foreground/80 shadow-black/50 shadow-sm">{item.date}</span>
          </div>

          <div className="p-6 flex flex-col flex-1">
            <h3 className="font-heading text-base md:text-lg font-bold mb-3 group-hover:text-primary transition-colors leading-snug">{item.title}</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">{item.desc}</p>

            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
                {item.tags.slice(0, 3).map((tag: string, tagIdx: number) => {
                  const colorClass = tagColors[tagIdx % tagColors.length];
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
          <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isHallOfFame ? "glow-purple" : "glow-gold"}`} />
        </article>
      </Link>
    </motion.div>
  );
};

const Noticias = () => {
  const [filter, setFilter] = useState("Todos");

  // 1. Unificamos toda la data autogenerada.
  const allItems = [
    ...hallOfFameItems,
    ...hitosItems
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

      {/* ═══════ NEWS GRID ═══════ */}
      {showSections ? (
        <>
          {/* Hitos Section */}
          {hitos.length > 0 && (
            <section className="py-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
              <div className="container mx-auto px-6 max-w-7xl relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <div className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full mb-4 border border-accent/20 bg-accent/5">
                    <Rocket className="w-4 h-4 text-accent" />
                    <span className="font-heading text-[11px] tracking-[0.2em] text-accent uppercase font-semibold">HITOS DEL ECOSISTEMA</span>
                  </div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold">
                    EVENTOS QUE <span className="text-gradient-gold">MARCARON LA DIFERENCIA</span>
                  </h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {hitos.map((n, i) => (
                    <NewsCard key={n.id} item={n} index={i} type="Hitos" />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Hall of Fame Section */}
          {hallOfFame.length > 0 && (
            <section className="py-12 section-darker relative overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-accent/10 blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[150px]" />
              </div>
              <div className="container mx-auto px-6 max-w-7xl relative z-10">
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

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {hallOfFame.map((n, i) => (
                    <NewsCard key={n.id} item={n} index={i} type="Hall of Fame" />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        /* Filtered View */
        <section className="py-12 relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-7xl relative">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((n, i) => (
                <NewsCard key={n.id} item={n} index={i} type={n.cat} />
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