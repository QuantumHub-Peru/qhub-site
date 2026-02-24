import { useParams, Navigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { posts, categories } from "@/data/blogData";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { motion } from "framer-motion";

const BlogPost = () => {
    const { id } = useParams();
    const post = posts.find((p) => p.id === id);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-grow pt-32 pb-20">
                <article className="container mx-auto px-6 max-w-4xl">
                    {/* Back Button */}
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" /> Volver al Blog
                    </Link>

                    {/* Header */}
                    <header className="mb-10">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <span className="glass px-3 py-1 rounded-full font-body text-xs text-primary mb-4 inline-block">
                                {categories.find((c) => c.id === post.category)?.label}
                            </span>
                            <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-6">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-body pb-6 border-b border-border/30">
                                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
                                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime} lectura</span>
                                <span>Por <span className="text-foreground font-medium">{post.author}</span></span>

                                <button className="ml-auto flex items-center gap-1 hover:text-primary transition-colors">
                                    <Share2 className="w-4 h-4" /> Compartir
                                </button>
                            </div>
                        </motion.div>
                    </header>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-12 shadow-2xl relative"
                    >
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="prose prose-invert prose-lg max-w-none font-body"
                    >
                        <p className="text-xl text-foreground/90 font-medium mb-8 leading-relaxed">
                            {post.summary}
                        </p>
                        <div className="text-foreground/80 leading-relaxed space-y-6">
                            {post.content.split('\n').map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border/30">
                            <span className="text-sm text-muted-foreground font-medium mr-2 flex items-center">Etiquetas:</span>
                            {post.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-full text-xs font-body bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </article>
            </main>

            <Footer />
        </div>
    );
};

export default BlogPost;
