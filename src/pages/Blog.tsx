import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { posts, categories, catAccent } from "@/data/blogData";

const Blog = () => {
  const [filter, setFilter] = useState("all");
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
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-xs transition-all duration-300 ${active
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
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="block"
                >
                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
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
                </Link>
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
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="block"
                >
                  <motion.article
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.06 }}
                    className="group cursor-pointer glass rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-500 h-full"
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
                </Link>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
