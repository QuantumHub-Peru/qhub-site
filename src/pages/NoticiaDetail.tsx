import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Tag, Heart, MessageCircle, Share2, Send, ChevronRight } from "lucide-react";
import { useState } from "react";
import { newsItems, catIcons, catColors } from "@/data/noticias-data";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  date: string;
  text: string;
  likes: number;
}

const initialComments: Comment[] = [
  { id: "1", author: "Ana María R.", avatar: "https://ui-avatars.com/api/?name=AM&background=7c3aed&color=fff", date: "Hace 2 días", text: "¡Increíble artículo! La comunidad cuántica en LATAM está creciendo rápidamente. Espero poder asistir al próximo evento. 🚀", likes: 12 },
  { id: "2", author: "Carlos V.", avatar: "https://ui-avatars.com/api/?name=CV&background=3b82f6&color=fff", date: "Hace 1 día", text: "Excelente trabajo de QuantumHub. Es inspirador ver cómo se construye un ecosistema desde cero. Felicitaciones al equipo.", likes: 8 },
  { id: "3", author: "Laura S.", avatar: "https://ui-avatars.com/api/?name=LS&background=ec4899&color=fff", date: "Hace 5 horas", text: "Me encanta la visión de democratizar la computación cuántica. ¿Habrá próximos workshops online para quienes no estamos en Lima?", likes: 15 },
];

const NoticiaDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const article = newsItems.find((n) => n.id === id);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl mb-4">Artículo no encontrado</h1>
          <Link to="/noticias" className="btn-quantum inline-block">Volver a Noticias</Link>
        </div>
      </div>
    );
  }

  const Icon = catIcons[article.cat] || Calendar;

  const relatedArticles = newsItems.filter((n) => n.id !== article.id && n.cat === article.cat).slice(0, 3);

  const handleComment = () => {
    if (!newComment.trim()) return;
    setComments((prev) => [
      {
        id: Date.now().toString(),
        author: "Tú",
        avatar: "https://ui-avatars.com/api/?name=TU&background=14b8a6&color=fff",
        date: "Ahora",
        text: newComment,
        likes: 0,
      },
      ...prev,
    ]);
    setNewComment("");
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Image */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[50vh] md:h-[60vh] overflow-hidden"
      >
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="absolute inset-0 quantum-grid opacity-10" />

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate("/noticias")}
          className="absolute top-28 left-6 md:left-12 glass rounded-full px-4 py-2 flex items-center gap-2 text-xs font-body text-foreground hover:border-primary/40 transition-all z-10"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Volver a Noticias
        </motion.button>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex items-center gap-3 mb-4">
                <span className={`glass px-4 py-1.5 rounded-full font-body text-xs flex items-center gap-2`}>
                  <Icon className="w-3.5 h-3.5 text-primary" />
                  {article.cat}
                </span>
                {article.featured && (
                  <span className="glass px-3 py-1.5 rounded-full font-body text-[10px] text-accent">⭐ Destacado</span>
                )}
              </div>
              <h1 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                {article.title}
              </h1>
              <p className="font-body text-base md:text-lg text-muted-foreground max-w-2xl">{article.desc}</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Article Body */}
      <section className="relative">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
          {/* Meta bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 md:gap-6 mb-10 pb-6 border-b border-border/30"
          >
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

          {/* Content paragraphs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-6 mb-12"
          >
            {article.content.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="font-body text-base md:text-lg text-foreground/80 leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Inline quote block */}
            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="border-l-4 border-primary pl-6 py-4 my-8 glass rounded-r-xl"
            >
              <p className="font-body text-sm md:text-base italic text-foreground/70 leading-relaxed">
                "La computación cuántica no es el futuro lejano — es el presente que estamos construyendo juntos en Latinoamérica."
              </p>
              <p className="font-body text-xs text-primary mt-2">— QuantumHub Peru</p>
            </motion.blockquote>
          </motion.div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Tag className="w-4 h-4 text-muted-foreground" />
            {article.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs font-body bg-primary/10 text-primary/70 hover:bg-primary/20 transition-colors cursor-default">
                #{tag}
              </span>
            ))}
          </div>

          {/* Reactions bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-4 p-4 glass rounded-xl mb-12"
          >
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body transition-all ${
                liked ? "bg-primary/20 text-primary" : "hover:bg-secondary text-muted-foreground"
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-primary" : ""}`} /> {likeCount}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body hover:bg-secondary text-muted-foreground transition-all">
              <MessageCircle className="w-4 h-4" /> {comments.length}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body hover:bg-secondary text-muted-foreground transition-all ml-auto">
              <Share2 className="w-4 h-4" /> Compartir
            </button>
          </motion.div>

          {/* Comments Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <h3 className="font-heading text-lg font-bold mb-6 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              Comentarios ({comments.length})
            </h3>

            {/* New comment */}
            <div className="glass rounded-xl p-4 mb-8">
              <div className="flex gap-3">
                <img
                  src="https://ui-avatars.com/api/?name=TU&background=14b8a6&color=fff"
                  alt="You"
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Escribe un comentario..."
                    className="w-full bg-transparent border border-border/40 rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 resize-none min-h-[80px] transition-colors"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handleComment}
                      disabled={!newComment.trim()}
                      className="btn-quantum !py-2 !px-5 !text-xs flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Send className="w-3 h-3" /> Publicar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments list */}
            <div className="space-y-4">
              <AnimatePresence>
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="glass rounded-xl p-4 hover:border-primary/20 transition-colors"
                  >
                    <div className="flex gap-3">
                      <img src={comment.avatar} alt={comment.author} className="w-9 h-9 rounded-full flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-body text-sm font-medium">{comment.author}</span>
                          <span className="font-body text-[10px] text-muted-foreground">{comment.date}</span>
                        </div>
                        <p className="font-body text-sm text-foreground/70 leading-relaxed">{comment.text}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors font-body">
                            <Heart className="w-3 h-3" /> {comment.likes}
                          </button>
                          <button className="text-xs text-muted-foreground hover:text-primary transition-colors font-body">
                            Responder
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mt-16 pt-12 border-t border-border/30"
            >
              <h3 className="font-heading text-lg font-bold mb-6">Artículos relacionados</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    to={`/noticias/${related.id}`}
                    className="group glass rounded-xl overflow-hidden hover:border-primary/30 transition-all"
                  >
                    <div className="h-28 overflow-hidden">
                      <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <p className="font-body text-[10px] text-muted-foreground mb-1">{related.date}</p>
                      <h4 className="font-heading text-xs font-bold group-hover:text-primary transition-colors line-clamp-2 leading-snug">{related.title}</h4>
                      <span className="flex items-center gap-1 text-primary text-[10px] font-body mt-2">
                        Leer <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NoticiaDetail;
