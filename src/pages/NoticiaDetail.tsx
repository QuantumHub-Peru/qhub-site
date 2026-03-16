import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Tag, Heart, MessageCircle, Share2, Send, ChevronRight, Crown, Rocket, Link as LinkIcon, X } from "lucide-react";
import { useState } from "react";
// Importamos la data autogenerada
import { hallOfFameItems } from "@/data/hallOfFame.generated";
// A FUTURO: Cuando generes hitos, descomenta esto:
import { hitosItems } from "@/data/hitos.generated";

// Mapeo de íconos local (ya que eliminamos noticias-data)
const catIcons: Record<string, any> = {
  "Hall of Fame": Crown,
  "Hitos": Rocket,
};
const logoQH = "/logo.png";


interface Comment {
  id: string;
  author: string;
  avatar: string;
  date: string;
  text: string;
  likes: number;
}

const initialComments: Comment[] = [];

const NoticiaDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Unificamos toda la data generada
  const allItems = [
    ...hallOfFameItems,
    ...hitosItems // A futuro
  ];

  // Buscamos el artículo en la data unificada
  const article = allItems.find((n) => n.id === id);

  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="font-heading text-2xl mb-4">Artículo no encontrado</h1>
          <Link to="/noticias" className="btn-quantum inline-block">Volver a Noticias</Link>
        </div>
      </div>
    );
  }

  const Icon = catIcons[article.cat] || Calendar;

  // Buscamos artículos relacionados en la data unificada
  const relatedArticles = allItems.filter((n) => n.id !== article.id && n.cat === article.cat).slice(0, 3);

  const handleComment = () => {
    if (!newComment.trim()) return;
    setComments((prev) => [
      { id: Date.now().toString(), author: "Tú", avatar: logoQH, date: "Ahora", text: newComment, likes: 0 },
      ...prev,
    ]);
    setNewComment("");
  };

  const handleShare = async () => {
    const shareData = {
      title: article.title,
      text: article.desc,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Enlace copiado al portapapeles");
      }
    } catch (err) {
      console.error("Error al compartir:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Image */}
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative h-[65vh] md:h-[60vh] overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="absolute inset-0 quantum-grid opacity-10" />

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate("/noticias")}
          className="absolute top-24 left-6 md:top-28 md:left-12 glass rounded-full px-4 py-2 flex items-center gap-2 text-xs font-body text-foreground hover:border-primary/40 transition-all z-10"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Volver a Noticias</span><span className="sm:hidden">Volver</span>
        </motion.button>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="glass px-4 py-1.5 rounded-full font-body text-xs flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-primary" /> {article.cat}
                </span>
                {article.featured && <span className="glass px-3 py-1.5 rounded-full font-body text-[10px] text-accent">⭐ Destacado</span>}
              </div>
              <h1 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 line-clamp-3 md:line-clamp-none">{article.title}</h1>
              <p className="font-body text-sm md:text-lg text-muted-foreground max-w-2xl line-clamp-2 md:line-clamp-none">{article.desc}</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Article Body */}
      <section className="relative">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
          {/* Meta */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-wrap items-center gap-4 md:gap-6 mb-10 pb-6 border-b border-border/30">
            <div className="flex items-center gap-3">
              <img src={article.authorAvatar} alt={article.author} className="w-10 h-10 rounded-full border-2 border-primary/30" />
              <div>
                <p className="font-body text-sm font-medium">{article.author}</p>
                <p className="font-body text-xs text-muted-foreground">{article.authorRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground font-body ml-auto">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {article.readTime} lectura</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-6 mb-12">
            {article.content.map((p: string, i: number) => (
              <motion.p key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }} className="font-body text-base md:text-lg text-foreground/80 leading-relaxed">
                {p}
              </motion.p>
            ))}

            <motion.blockquote initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="border-l-4 border-primary pl-6 py-4 my-8 glass rounded-r-xl">
              <p className="font-body text-sm md:text-base italic text-foreground/70 leading-relaxed">
                "La computación cuántica no es el futuro lejano — es el presente que estamos construyendo juntos en Latinoamérica."
              </p>
              <p className="font-body text-xs text-primary mt-2">— QuantumHub Peru</p>
            </motion.blockquote>
          </motion.div>

          {/* Galería Adicional (Si existe) */}
          {article.gallery && article.gallery.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-12">
              <h3 className="font-heading text-lg font-bold mb-4">Galería</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {article.gallery.map((img: string, i: number) => (
                  <motion.div
                    key={i}
                    className="aspect-video rounded-xl overflow-hidden glass border border-border/20 cursor-pointer group"
                    onClick={() => setSelectedImage(img)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img src={img} alt={`${article.title} - imagen ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Enlaces de Interés (Si existen) */}
          {article.links && article.links.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mb-12 glass p-6 rounded-2xl border-l-4 border-accent">
              <h3 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-accent" /> Enlaces relacionados
              </h3>
              <div className="flex flex-col gap-3">
                {article.links.map((link: string, i: number) => {
                  // Pequeña lógica para darle un nombre más amigable según el dominio
                  let linkName = "Ver más detalles";
                  if (link.includes("linkedin.com")) linkName = "Ver publicación en LinkedIn";
                  if (link.includes("instagram.com")) linkName = "Ver publicación en Instagram";
                  if (link.includes("andina.pe")) linkName = "Leer artículo en Agencia Andina";

                  return (
                    <a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-body text-primary hover:text-accent transition-colors w-fit"
                    >
                      <ChevronRight className="w-4 h-4" /> {linkName}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <Tag className="w-4 h-4 text-muted-foreground" />
              {article.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-body bg-primary/10 text-primary/70">#{tag}</span>
              ))}
            </div>
          )}

          {/* Reactions */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="flex items-center gap-4 p-4 glass rounded-xl mb-12">
            <button
              onClick={() => { setLiked(!liked); setLikeCount((c) => liked ? c - 1 : c + 1); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body transition-all ${liked ? "bg-primary/20 text-primary" : "hover:bg-secondary text-muted-foreground"}`}
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-primary" : ""}`} /> {likeCount}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body hover:bg-secondary text-muted-foreground transition-all">
              <MessageCircle className="w-4 h-4" /> {comments.length}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body hover:bg-secondary text-muted-foreground transition-all ml-auto"
            >
              <Share2 className="w-4 h-4" /> Compartir
            </button>
          </motion.div>

          {/* Comments */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
            <h3 className="font-heading text-lg font-bold mb-6 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" /> Comentarios ({comments.length})
            </h3>

            <div className="glass rounded-xl p-4 mb-8">
              <div className="flex gap-3">
                <img src="https://ui-avatars.com/api/?name=TU&background=14b8a6&color=fff" alt="You" className="w-10 h-10 rounded-full flex-shrink-0" />
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Escribe un comentario..."
                    className="w-full bg-transparent border border-border/40 rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 resize-none min-h-[80px] transition-colors"
                  />
                  <div className="flex justify-end mt-2">
                    <button onClick={handleComment} disabled={!newComment.trim()} className="btn-quantum !py-2 !px-5 !text-xs flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
                      <Send className="w-3 h-3" /> Publicar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {comments.map((c) => (
                  <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass rounded-xl p-4 hover:border-primary/20 transition-colors">
                    <div className="flex gap-3">
                      <img src={c.avatar} alt={c.author} className="w-9 h-9 rounded-full flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-body text-sm font-medium">{c.author}</span>
                          <span className="font-body text-[10px] text-muted-foreground">{c.date}</span>
                        </div>
                        <p className="font-body text-sm text-foreground/70 leading-relaxed">{c.text}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors font-body"><Heart className="w-3 h-3" /> {c.likes}</button>
                          <button className="text-xs text-muted-foreground hover:text-primary transition-colors font-body">Responder</button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Related */}
          {relatedArticles.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="mt-16 pt-12 border-t border-border/30">
              <h3 className="font-heading text-lg font-bold mb-6">Artículos relacionados</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {relatedArticles.map((r) => (
                  <Link key={r.id} to={`/noticias/${r.id}`} className="group glass rounded-xl overflow-hidden hover:border-primary/30 transition-all">
                    <div className="h-28 overflow-hidden">
                      <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <p className="font-body text-[10px] text-muted-foreground mb-1">{r.date}</p>
                      <h4 className="font-heading text-xs font-bold group-hover:text-primary transition-colors line-clamp-2 leading-snug">{r.title}</h4>
                      <span className="flex items-center gap-1 text-primary text-[10px] font-body mt-2">Leer <ChevronRight className="w-3 h-3" /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8 cursor-zoom-out backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full h-full max-w-[95vw] max-h-[90vh] flex items-center justify-center p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Galería ampliada"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-white/10"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 md:-top-4 md:-right-4 text-white hover:text-primary transition-colors glass p-2 rounded-full z-[110] border border-white/20 hover:scale-110 active:scale-95"
                title="Cerrar"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NoticiaDetail;