import { useState, useEffect, useRef } from "react";
import { Users, BookOpen, GraduationCap, Heart, School, Search, Target, Eye, Atom, ArrowRight, Play, Leaf, Lightbulb, Briefcase, Globe, CheckCircle } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DepartmentsSection from "@/components/DepartmentsSection";
import ParticleNetwork from "@/components/ParticleNetwork";

// Las imágenes ahora se referencian directamente como strings desde la carpeta public (raíz "/")
const gatoImg = "/gato/gato.png";
const principiosCat = "/gato/principios.png";
const clubImg = "/r1.jpg";
const logoImg = "/club.jpg";
const quantumBg0 = "/r1.jpg";
const quantumBg1 = "/r2.jpg";
const quantumBg2 = "/r5.jpg";
const quantumBg3 = "/r3.jpg";
const quantumBg4 = "/r4.jpg";
const quantumBg5 = "/r6.jpg";
const quantumBg6 = "/r7.jpg";
const quantumBg7 = "/r8.jpg";
const quantumBg8 = "/r9.jpg";
const quantumBg9 = "/r10.jpg";
const quantumBg10 = "/r5.jpg";
const heroBgImage = "/hero-bg.png";
/* ── data ── */
const principiosData = [
  {
    id: 0,
    title: "Sostenibilidad",
    desc: "Construimos una comunidad capaz de autoproyectarse. Nuestros estudiantes graduados, con el tiempo, se convierten en investigadores, mentores, profesores y líderes dentro de QuantumHub.",
    icon: Leaf
  },
  {
    id: 1,
    title: "Formación Rigurosa",
    desc: "Nuestros productos y programas educativos demandan una alta capacidad y disciplina académica. La exigencia inducida en nuestro curso y preparación para investigación requiere una gran motivación científica.",
    icon: BookOpen
  },
  {
    id: 2,
    title: "Investigación Temprana",
    desc: "Nuestra red de estudiantes graduados se involucra en proyectos de investigación en hardware, software y educación cuántica, con la meta de publicar en revistas de alto impacto.",
    icon: Search
  },
  {
    id: 3,
    title: "Desarrollo Profesional",
    desc: "Promovemos el crecimiento académico de nuestros miembros. Tras el curso bandera, los graduados son invitados a formar parte de los 5 departamentos de QuantumHub Perú.",
    icon: Briefcase
  },
  {
    id: 4,
    title: "Innovación",
    desc: "Impulsamos el desarrollo de herramientas, plataformas y proyectos que contribuyen a la accesibilidad educativa y al avance del software y hardware cuántico en la región.",
    icon: Lightbulb
  },
  {
    id: 5,
    title: "Red de Colaboración",
    desc: "Articulamos proyectos de investigación y actividades formativas en alianza con universidades e instituciones nacionales e internacionales que fortalecen nuestro impacto.",
    icon: Globe
  },
];

const galleryImages = [quantumBg0, quantumBg1, quantumBg2, quantumBg3, quantumBg4, quantumBg0, quantumBg1, quantumBg2, quantumBg3, quantumBg4];
const galleryImages2 = [quantumBg5, quantumBg6, quantumBg7, quantumBg8, quantumBg9, quantumBg10, quantumBg5, quantumBg6, quantumBg7, quantumBg8, quantumBg9, quantumBg10];

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

/* ── principle card ── */
function PrincipleCard({ item, delay }: { item: typeof principiosData[0]; delay: number }) {
  const { ref, visible } = useInView(0.1);
  const Icon = item.icon;

  return (
    <div
      ref={ref}
      className={`group relative h-auto min-h-[160px] md:min-h-[180px] p-6 rounded-2xl border border-border bg-card overflow-hidden transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{
        transitionDelay: `${delay}ms`,
        boxShadow: visible
          ? "0 0 25px rgba(246,157,14,0.15)"
          : "0 0 0 rgba(0,0,0,0)",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F69D0E] via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex items-start gap-4 text-left">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#F69D0E] to-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
          <Icon className="w-6 h-6 text-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-lg font-black text-foreground mb-2 leading-tight group-hover:text-[#F69D0E] transition-colors">{item.title}</h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {item.desc}
          </p>
        </div>
      </div>

      {/* Subtle glow on hover */}
      <div className="absolute -inset-px bg-gradient-to-br from-[#F69D0E]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
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

            {/* Radial glow instead of particles to keep it clean */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] z-10 pointer-events-none" />
          </motion.div>

          <div className="relative z-20 w-full max-w-[1400px] mx-auto flex flex-col h-full items-center justify-center">
            {/* Centered Content Area */}
            <motion.div
              style={{ y: textY, opacity: textOpacity }}
              className="w-full flex flex-col items-center justify-center text-center animate-[fadeSlideUp_1s_ease-out_both] pt-16 md:pt-0 relative"
            >
              {/* Removed particle overlay per user request */}

              <h1 className="font-heading text-[3.25rem] sm:text-[4rem] md:text-[5rem] lg:text-[75px] xl:text-[95px] font-black leading-[1.05] tracking-normal mb-8 md:mb-10 lg:mb-12 relative z-10 text-center px-4 w-full">
                <span className="text-white drop-shadow-md">Construyendo el primer</span>
                <br className="hidden md:block" />
                <span className="md:hidden"> </span>
                <motion.span
                  className="inline-block bg-clip-text text-transparent pb-1 md:pb-2 pt-1 md:pt-2"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #7B2CBF 0%, #F39C12 50%, #7B2CBF 100%)",
                    backgroundSize: "200% auto",
                  }}
                  animate={{
                    backgroundPosition: ["0% center", "-200% center"],
                    filter: [
                      "drop-shadow(0 0 2px rgba(123,44,191,0.2))",
                      "drop-shadow(0 0 15px rgba(123,44,191,0.6))",
                      "drop-shadow(0 0 2px rgba(123,44,191,0.2))"
                    ]
                  }}
                  transition={{
                    backgroundPosition: { duration: 3.5, repeat: Infinity, ease: "linear" },
                    filter: { duration: 1.75, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  ecosistema cuántico del Perú
                </motion.span>
              </h1>

              <p className="text-lg sm:text-xl md:text-xl lg:text-2xl text-white/90 max-w-3xl leading-relaxed mb-16 md:mb-12 lg:mb-16 mx-4 font-medium">
                Formamos, conectamos e impulsamos a la próxima generación hispanoamericana de talento en computación y tecnologías cuánticas.
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
              Creamos un <span className="text-foreground font-semibold">ecosistema autosostenible de aprendizaje, investigación y cooperación entre gobierno, industria y academia</span> que permite a nuevos talentos explorar el espectro del mundo cuántico y proyectarse hacia carreras científicas y tecnológicas.
            </p>
          </ScrollReveal>
        </section>

        {/* ═══ NUESTRA HISTORIA — two-column ═══ */}
        <section id="nuestra-historia" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <span className="text-[#F69D0E] text-sm font-semibold tracking-widest uppercase">Nuestra Historia</span>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black mt-4 mb-6 text-foreground leading-tight">
                La ruta cuántica empieza aquí
              </h2>
              <a href="#principios" className="inline-flex items-center gap-2 text-[#F69D0E] font-semibold hover:underline text-sm">
                Descubre nuestros principios <ArrowRight className="w-4 h-4" />
              </a>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                QuantumHub Perú nace a partir de preguntas simples pero urgentes: ¿Y si los estudiantes más jóvenes también pudieran aprender ciencia de frontera? ¿Y si Latinoamérica fuera participante activo de una revolución tecnológica?
              </p>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg mt-6">
                Frente a la falta de sistemas y de representación latinoamericana en tecnologías cuánticas, durante el Año Internacional de Ciencias y Tecnologías Cuánticas, QuantumHub Perú surge como un espacio para abrir ese camino desde el Perú, acercando la computación cuántica a estudiantes jóvenes y creando una comunidad donde la curiosidad científica, el rigor académico y la colaboración se encuentren.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg mt-6">
                Estudiantes, investigadores, profesionales, educadores y entusiastas se unen para investigar, desarrollar productos, impartir conocimiento y democratizar la tecnología cuántica en la región.
              </p>
            </ScrollReveal>
          </div>
        </section>
        {/* ═══ IMAGE GALLERY — infinite horizontal marquee (Bipsync style) ═══ */}
        <section className="py-24 overflow-hidden relative z-10">
          <ScrollReveal className="mb-12 px-6 md:px-12 max-w-7xl mx-auto">
            <span className="text-[#F69D0E] text-sm font-semibold tracking-widest uppercase">Nuestro Impacto</span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black mt-4 text-foreground">
              Inspirando el futuro cuántico
            </h2>
          </ScrollReveal>



          {/* Marquee row 1 */}
          <div className="relative mb-6">
            <div className="flex gap-6 animate-[marquee_30s_linear_infinite] w-max select-none">
              {[...galleryImages, ...galleryImages].map((src, i) => (
                <div key={i} className="flex-shrink-0 w-[320px] md:w-[420px] h-[220px] md:h-[280px] rounded-2xl overflow-hidden">
                  <img src={src} alt={`Galería ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>

          {/* Marquee row 2 (reverse) */}
          <div className="relative">
            <div className="flex gap-6 animate-[marqueeReverse_30s_linear_infinite] w-max select-none">
              {[...galleryImages2, ...galleryImages2].map((src, i) => (
                <div key={`reverse-${i}`} className="flex-shrink-0 w-[320px] md:w-[420px] h-[220px] md:h-[280px] rounded-2xl overflow-hidden">
                  <img src={src} alt={`Galería Inversa ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ═══ MISIÓN & VISIÓN — side by side cards ═══ */}
        <section className="pt-24 pb-4 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="rounded-2xl border border-border bg-card p-10 h-full group hover:border-[#F69D0E]/30 transition-colors duration-500">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F69D0E] to-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Target className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="font-heading text-3xl font-black mb-4 text-foreground">Misión</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Construir el primer capital humano cuántico del Perú desde su formación integral técnica en computación cuántica hasta su completa inmersión en especialidades de hardware y software cuánticos con aplicaciones de impacto real.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="rounded-2xl border border-border bg-card p-10 h-full group hover:border-accent/30 transition-colors duration-500">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F69D0E] to-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Eye className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="font-heading text-3xl font-black mb-4 text-foreground">Visión</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Convertir al Perú en un participante activo del ecosistema cuántico global, fortaleciendo la colaboración institucional a nivel nacional e internacional que potencie la investigación, educación y divulgación de ciencia y tecnología cuánticas en la región latinoamericana.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>


        <DepartmentsSection />

        {/* ═══ PRINCIPIOS — gato a la izquierda + grid 2x3 ═══ */}
        <section id="principios" className="py-20 px-4 md:px-10 lg:px-14 relative z-10">
          <ScrollReveal className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <Atom className="w-5 h-5 text-[#F69D0E] animate-[spin_8s_linear_infinite]" />
              <span className="text-sm font-semibold uppercase tracking-widest text-[#F69D0E]">Enfoque</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-foreground">Nuestros Principios</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Nuestros principios guían cada paso en la construcción del ecosistema cuántico.
            </p>
          </ScrollReveal>

          <div className="mt-10 flex flex-col items-center">
            <div className="grid lg:grid-cols-3 gap-8 items-center w-full max-w-7xl mx-auto">

              {/* Left Column: 3 principles */}
              <div className="flex flex-col gap-6 order-2 lg:order-1">
                {principiosData.slice(0, 3).map((item, index) => (
                  <PrincipleCard key={item.id} item={item} delay={index * 150} />
                ))}
              </div>

              {/* Center Column: Gato mascot */}
              <div className="relative flex items-center justify-center order-1 lg:order-2">
                <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[380px] lg:h-[380px] flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/30 via-[#F69D0E]/20 to-accent/30 blur-3xl opacity-60" />
                  <motion.div
                    aria-hidden
                    className="absolute inset-2 rounded-full border-2 border-[#F69D0E]/50 border-dashed"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-6 rounded-full border-[3px] border-primary/40 shadow-[0_0_60px_rgba(129,140,248,0.4)]" />

                  <motion.img
                    src={principiosCat}
                    alt="Gato QuantumHub principios"
                    className="relative z-10 w-[90%] h-[90%] object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.8)]"
                    animate={{ y: [-10, 10, -10], scale: [1, 1.03, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>

              {/* Right Column: 3 principles */}
              <div className="flex flex-col gap-6 order-3">
                {principiosData.slice(3, 6).map((item, index) => (
                  <PrincipleCard key={item.id} item={item} delay={(index + 3) * 150} />
                ))}
              </div>

            </div>
          </div>
        </section>



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
              <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black text-foreground max-w-4xl mx-auto leading-tight mb-8">
                El poder de muchos sobre el <span className="text-gradient-quantum">conocimiento de uno</span>
              </h2>
              <p className="text-muted-foreground mt-2 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
                Sé parte de la revolución cuántica en Perú. Desarrollamos talentos que liderarán la tecnología del mañana.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <motion.a
                  href="/curso"
                  className="group relative px-10 py-5 text-white rounded-full text-xl font-bold transition-all duration-300 hover:scale-105 overflow-hidden focus:outline-none"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #7B2CBF 0%, #F39C12 50%, #7B2CBF 100%)",
                    backgroundSize: "200% auto",
                  }}
                  animate={{
                    backgroundPosition: ["0% center", "-200% center"],
                    boxShadow: [
                      "0 0 20px rgba(123,44,191,0.5)",
                      "0 0 40px rgba(243,156,18,0.6)",
                      "0 0 20px rgba(123,44,191,0.5)"
                    ]
                  }}
                  transition={{
                    backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" },
                    boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2 text-center">
                    Conoce más sobre nuestro Curso <br className="hidden sm:block" /> Edición 2026 - I <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                  {/* Subtle inner border for depth */}
                  <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
                </motion.a>

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
          @keyframes marqueeReverse {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}</style>
      </main>
      <Footer />
    </div>
  );
}
