import { useState, useEffect, useRef } from "react";
import { Users, BookOpen, GraduationCap, Heart, School, Search, Target, Eye, Atom, ArrowRight, Play } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import gatoImg from "@/gato/gato.png";
import clubImg from "@/assets/r1.jpg";
import logoImg from "@/assets/club.jpg";
import quantumBg0 from "@/assets/r1.jpg";
import quantumBg1 from "@/assets/r2.jpg";
import quantumBg2 from "@/assets/r5.jpg";
import quantumBg3 from "@/assets/r3.jpg";
import quantumBg4 from "@/assets/r4.jpg";
import heroBgImage from "@/assets/hero-bg.png";
import DepartmentsSection from "@/components/DepartmentsSection";
import ParticleNetwork from "@/components/ParticleNetwork";

/* ── data ── */
const principiosData = [
  { id: 0, title: "Público objetivo", qh: "Secundaria y pregrado temprano.", otros: "Pregrado avanzado y posgrado.", icon: Users },
  { id: 1, title: "Enfoque pedagógico", qh: "Modular, accesible y progresivo, con acompañamiento educativo.", otros: "Altamente técnico.", icon: BookOpen },
  { id: 2, title: "Experiencia educativa", qh: "Curso estructurado de 4 meses con evaluación de ingreso y niveles personalizados.", otros: "Coloquios o bootcamps independientes.", icon: GraduationCap },
  { id: 3, title: "Comunidad y seguimiento", qh: "Comunidad activa online, asesorías, mentores y seguimiento académico a lo largo del curso.", otros: "Generalmente sin continuidad estructural.", icon: Heart },
  { id: 4, title: "Integración curricular", qh: "En diálogo con facultades universitarias y colegios para generar articulación real.", otros: "Enfocado en actividades extracurriculares.", icon: School },
  { id: 5, title: "Investigación e impacto", qh: "Estudio y análisis de datos socioeconómicos, geográficos y académicos para detectar brechas y optimizar el acceso equitativo a la educación cuántica.", otros: "Sin componente investigativo formal ni estudio del impacto educativo.", icon: Search },
];

const galleryImages = [quantumBg0, quantumBg1, quantumBg2, quantumBg3, quantumBg4, quantumBg0, quantumBg1, quantumBg2, quantumBg3, quantumBg4];

/* ── hooks ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function ScrollReveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── flip card ── */
function FlipCard({ item, delay }: { item: typeof principiosData[0]; delay: number }) {
  const [flipped, setFlipped] = useState(false);
  const { ref, visible } = useInView(0.1);
  const Icon = item.icon;

  return (
    <div
      ref={ref}
      className={`perspective-1000 h-72 cursor-pointer transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={() => setFlipped(!flipped)}
      onMouseEnter={() => {
        if (window.matchMedia('(hover: hover)').matches) setFlipped(true);
      }}
      onMouseLeave={() => {
        if (window.matchMedia('(hover: hover)').matches) setFlipped(false);
      }}
    >
      <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${flipped ? "rotate-y-180" : ""}`}>
        {/* Front */}
        <div className="absolute inset-0 backface-hidden rounded-2xl border border-border bg-card overflow-hidden group hover:border-[#F69D0E]/40 transition-colors duration-500">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F69D0E] via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="h-full p-6 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#F69D0E] to-primary/80 flex items-center justify-center mb-4">
              <Icon className="w-7 h-7 text-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.qh}</p>
            <span className="mt-4 text-xs text-[#F69D0E]/60 font-medium">Toca para comparar →</span>
          </div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border border-[#F69D0E]/30 bg-secondary overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-[#F69D0E] to-accent" />
          <div className="h-full p-6 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Otros programas</span>
            <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.otros}</p>
            <span className="mt-4 text-xs text-accent/60 font-medium">← Volver</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── main page ── */
export default function SobreNosotros() {
  const { scrollYProgress } = useScroll();
  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax transforms
  const backgroundY = useTransform(smoothY, [0, 1], ["0%", "20%"]);
  const textY = useTransform(smoothY, [0, 0.3], [0, 100]);
  const textOpacity = useTransform(smoothY, [0, 0.2], [1, 0]);
  const imageScale = useTransform(smoothY, [0, 0.5], [1, 1.1]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col relative">
      <Navbar />
      <main className="flex-1 w-full relative">
        {/* NEW HERO SECTION matching reference */}
        <section className="relative h-screen flex items-center px-4 md:px-12 lg:px-24 overflow-hidden pt-20 lg:pt-24">
          {/* Background image mapped to the entire section */}
          <motion.div
            style={{ y: backgroundY, scale: imageScale }}
            className="absolute inset-0 w-full h-full z-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${heroBgImage})` }}
            />
            {/* Dark gradient overlay mostly at the bottom for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F111A] via-[#0F111A]/40 to-transparent z-10" />

            {/* Particle Network Overlay for "current" effect */}
            <div className="absolute inset-0 z-10 opacity-60 mix-blend-screen pointer-events-none">
              <ParticleNetwork />
            </div>

            {/* Radial glow for subtle background texture */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] z-10 pointer-events-none" />
          </motion.div>

          <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col h-full items-center justify-center">
            {/* Centered Content Area */}
            <motion.div
              style={{ y: textY, opacity: textOpacity }}
              className="w-full flex flex-col items-center justify-center text-center animate-[fadeSlideUp_1s_ease-out_both] pt-16 md:pt-0 relative"
            >
              {/* Quantum spark particles around title */}
              <div className="absolute -inset-10 pointer-events-none">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [-20, -60],
                      x: [0, (i % 2 === 0 ? 20 : -20)],
                      opacity: [0, 0.8, 0],
                      scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                      ease: "easeOut"
                    }}
                    className="absolute w-1 h-1 bg-accent rounded-full blur-[0.5px]"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${40 + Math.random() * 40}%`
                    }}
                  />
                ))}
              </div>

              <h1 className="font-heading text-5xl sm:text-6xl md:text-6xl lg:text-[70px] font-black leading-[1.1] tracking-tight mb-10 md:mb-10 lg:mb-12 relative z-10 flex flex-col items-center px-2 md:px-0">
                <span className="text-white">Impulsamos la</span>
                <motion.span
                  className="inline-block bg-clip-text text-transparent pb-1"
                  style={{
                    backgroundImage: "linear-gradient(90deg, hsl(270 80% 60%), hsl(330 80% 60%), hsl(175 80% 70%), hsl(330 80% 60%), hsl(270 80% 60%))",
                    backgroundSize: "200% auto",
                  }}
                  animate={{
                    backgroundPosition: ["0% center", "-200% center"],
                    filter: [
                      "drop-shadow(0 0 2px rgba(138,43,226,0.2))",
                      "drop-shadow(0 0 15px rgba(20,184,166,0.6))",
                      "drop-shadow(0 0 2px rgba(138,43,226,0.2))"
                    ]
                  }}
                  transition={{
                    backgroundPosition: { duration: 3.5, repeat: Infinity, ease: "linear" },
                    filter: { duration: 1.75, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  educación cuántica <br />inclusiva en Perú
                </motion.span>
              </h1>

              <p className="text-lg sm:text-xl md:text-base lg:text-lg text-white/90 max-w-2xl leading-relaxed mb-16 md:mb-12 lg:mb-16 mx-2 md:mx-0 font-medium">
                Desarrollamos competencias en tecnología cuántica con una propuesta pedagógica innovadora, accesible y rigurosa en colaboración con instituciones líderes.
              </p>

            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            style={{ opacity: textOpacity }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-widest text-white/40">Scroll</span>
            <div className="w-px h-16 bg-gradient-to-b from-primary/60 to-transparent" />
          </motion.div>
        </section>

        {/* ═══ MISSION STATEMENT — centered ═══ */}
        <section className="py-24 px-6 md:px-12 relative z-10">
          <ScrollReveal>
            <p className="max-w-4xl mx-auto text-center text-xl md:text-2xl lg:text-3xl text-muted-foreground leading-relaxed font-light">
              Impulsamos la <span className="text-foreground font-semibold">educación cuántica inclusiva</span> en Perú con una propuesta pedagógica innovadora, accesible y rigurosa, formando a la primera generación de estudiantes en ciencia y tecnología cuánticas.
            </p>
          </ScrollReveal>
        </section>

        {/* ═══ NUESTRA HISTORIA — two-column ═══ */}
        <section id="nuestra-historia" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <span className="text-[#F69D0E] text-sm font-semibold tracking-widest uppercase">Nuestra Historia</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-4 mb-6 text-foreground leading-tight">
                Llevando la computación cuántica a cada rincón del Perú
              </h2>
              <a href="#principios" className="inline-flex items-center gap-2 text-[#F69D0E] font-semibold hover:underline text-sm">
                Descubre nuestros principios <ArrowRight className="w-4 h-4" />
              </a>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                QuantumHub Perú nació con la visión de democratizar el acceso a la educación cuántica. Creemos que el futuro de la tecnología no debe estar reservado a unos pocos, sino abierto a todos los estudiantes con curiosidad y determinación.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg mt-6">
                Nuestro programa ofrece un curso estructurado de 4 meses con evaluación de ingreso, niveles personalizados, mentores y una comunidad activa. Trabajamos en diálogo con facultades universitarias y colegios para integrar la computación cuántica en la currícula educativa.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══ MISIÓN & VISIÓN — side by side cards ═══ */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="rounded-2xl border border-border bg-card p-10 h-full group hover:border-[#F69D0E]/30 transition-colors duration-500">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F69D0E] to-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Target className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Misión</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Formar a la primera generación de estudiantes peruanos en ciencia y tecnología cuánticas mediante una educación accesible, rigurosa y contextualizada en computación cuántica.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="rounded-2xl border border-border bg-card p-10 h-full group hover:border-accent/30 transition-colors duration-500">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F69D0E] to-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Eye className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Visión</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Convertir al Perú en un país pionero en educación cuántica temprana, integrando esta disciplina a la currícula escolar y universitaria, y sentando las bases de un ecosistema regional que impulse una hoja de ruta latinoamericana en tecnologías cuánticas.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══ IMAGE GALLERY — infinite horizontal marquee (Bipsync style) ═══ */}
        <section className="py-24 overflow-hidden relative z-10">
          <ScrollReveal className="mb-12 px-6 md:px-12 max-w-7xl mx-auto">
            <span className="text-[#F69D0E] text-sm font-semibold tracking-widest uppercase">Nuestro Impacto</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-4 text-foreground">
              Inspirando el futuro cuántico
            </h2>
          </ScrollReveal>



          {/* Marquee row */}
          <div className="relative">
            <div className="flex gap-6 animate-[marquee_30s_linear_infinite] w-max select-none">
              {[...galleryImages, ...galleryImages].map((src, i) => (
                <div key={i} className="flex-shrink-0 w-[320px] md:w-[420px] h-[220px] md:h-[280px] rounded-2xl overflow-hidden">
                  <img src={src} alt={`Galería ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>




        {/* ═══ PRINCIPIOS — flip cards grid ═══ */}
        <section id="principios" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
          <ScrollReveal className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <Atom className="w-5 h-5 text-[#F69D0E] animate-[spin_8s_linear_infinite]" />
              <span className="text-sm font-semibold uppercase tracking-widest text-[#F69D0E]">Enfoque</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground">Nuestros Principios</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Descubre qué nos diferencia. Haz hover o toca cada tarjeta para ver cómo se comparan otros programas.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {principiosData.map((item, i) => (
              <FlipCard key={item.id} item={item} delay={i * 100} />
            ))}
          </div>
        </section>

        <DepartmentsSection />

        {/* ═══ CTA FOOTER — Enhanced with Mascot & Particles ═══ */}
        <section className="py-32 px-6 md:px-12 text-center relative overflow-hidden bg-slate-950/20">
          {/* Animated Particles background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100 }}
                animate={{
                  opacity: [0, 0.5, 0],
                  y: [-20, -120],
                  x: Math.sin(i) * 30
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear"
                }}
                className="absolute w-1 h-1 bg-primary rounded-full blur-[1px]"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: "0%"
                }}
              />
            ))}
          </div>

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-primary/10 blur-[140px]" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
            {/* Illuminated Gato Mascot */}
            <ScrollReveal className="mb-10">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-primary/30 blur-[60px] rounded-full animate-pulse scale-150" />
                <motion.img
                  src={gatoImg}
                  alt="Gato mascota"
                  className="w-48 md:w-64 relative drop-shadow-[0_0_30px_rgba(var(--primary),0.5)]"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, -2, 2, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-foreground max-w-4xl mx-auto leading-tight mb-8">
                El poder de muchos sobre el <span className="text-gradient-quantum">conocimiento de uno</span>
              </h2>
              <p className="text-muted-foreground mt-2 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
                Sé parte de la revolución cuántica en Perú. Desarrollamos talentos que liderarán la tecnología del mañana.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href="/curso"
                  className="group relative px-10 py-5 bg-primary text-primary-foreground rounded-full text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(var(--primary),0.4)] overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explorar el Plan Académico <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>

                <a
                  href="https://forms.gle/9EhQgzZmTXJRtp4Q6"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-2"
                >
                  Postular ahora <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeSlideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </main>
      <Footer />
    </div>
  );
}
