import { useRef } from "react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import aprendiendoImg from "@/gato/aprendiendo.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, Monitor, BookOpen, Zap } from "lucide-react";

const HeroSection = () => {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <section className="relative min-h-screen">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
        opts={{
          loop: true,
        }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="h-screen m-0">
          {/* Slide 1: Original Hero */}
          <CarouselItem className="p-0 h-full relative flex items-center justify-center overflow-hidden">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroBg})` }}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-background/60" />
            {/* Grid overlay */}
            <div className="absolute inset-0 quantum-grid animate-grid-flow opacity-30" />

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-primary/40"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  x: [0, Math.random() * 30 - 15, 0],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mb-12">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-muted-foreground font-body text-sm tracking-[0.3em] uppercase mb-6"
              >
                QuantumHub Peru
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4"
              >
                FORMANDO UN{" "}
                <motion.div style={{ perspective: 1000 }} className="inline-block">
                  <motion.span
                    className="inline-block bg-clip-text text-transparent origin-center"
                    style={{
                      backgroundImage: "linear-gradient(135deg, #7B2CBF 0%, #F39C12 50%, #7B2CBF 100%)",
                    }}
                    animate={{ rotateX: [0, 1080, 1080, 2340, 2340, 3600, 3600] }}
                    transition={{
                      duration: 12,
                      ease: "easeInOut",
                      times: [0, 0.2, 0.3, 0.5, 0.6, 0.8, 1],
                      repeat: Infinity,
                    }}
                  >
                    ECOSISTEMA
                  </motion.span>
                </motion.div>
                <br />
                CUÁNTICO
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
              >
                Educación, investigación e innovación en computación cuántica desde Latinoamérica.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <a href="/curso" className="btn-accent-cta">Conocer el Curso</a>
                <a href="/plataforma" className="btn-outline-quantum">Aprende Gratis</a>
              </motion.div>
            </div>
          </CarouselItem>

          {/* Slide 2: Course Intro view (Gato) */}
          <CarouselItem className="p-0 h-full relative flex items-center justify-center overflow-hidden bg-background">
            {/* Background elements for second slide */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/15 via-background to-background pointer-events-none" />
            <div className="absolute inset-0 quantum-grid animate-grid-flow opacity-10 pointer-events-none" />
            
            <div className="relative z-10 w-full max-w-[1400px] flex flex-col items-center justify-center px-6 lg:px-20 mb-12">
              <div className="flex flex-col md:flex-row gap-8 lg:gap-14 items-center justify-between w-full">
                
                {/* Left side text */}
                <div className="md:w-1/2 lg:w-3/5 space-y-6 flex flex-col justify-center">
                  <div className="self-start px-5 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs tracking-widest font-bold shadow-sm uppercase">
                    Edición 2026 - I
                  </div>

                  <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.95] tracking-[-0.04em] flex flex-col items-start uppercase drop-shadow-md">
                    <span>Curso de</span>
                    <motion.span
                      className="inline-block bg-clip-text text-transparent pb-1"
                      style={{
                        backgroundImage: "linear-gradient(90deg, #7B2CBF 0%, #F39C12 50%, #7B2CBF 100%)",
                        backgroundSize: "200% auto",
                      }}
                      animate={{ backgroundPosition: ["0% center", "-200% center"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      Introducción a la Computación Cuántica
                    </motion.span>
                  </h1>

                  <p className="text-base sm:text-lg text-muted-foreground/90 leading-relaxed max-w-2xl font-medium">
                    Formación en computación cuántica para estudiantes de secundaria y universitarios. Desarrolla competencias en física, matemáticas y programación.
                  </p>

                  <div className="flex items-center gap-4 lg:gap-8 py-5 border-y border-border/40 max-w-lg bg-background/20 rounded-xl p-4 shadow-inner backdrop-blur-sm">
                    <div className="flex flex-col flex-1 items-center text-center">
                      <span className="text-2xl lg:text-4xl font-black text-foreground drop-shadow-sm">16+</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">Semanas</span>
                    </div>
                    <div className="w-px h-12 bg-border/50" />
                    <div className="flex flex-col flex-1 items-center text-center">
                      <span className="text-2xl lg:text-4xl font-black text-foreground drop-shadow-sm">74</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">Horas clase</span>
                    </div>
                    <div className="w-px h-12 bg-border/50" />
                    <div className="flex flex-col flex-1 items-center text-center">
                      <span className="text-2xl lg:text-4xl font-black text-foreground drop-shadow-sm">4</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">Módulos</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <a href="/curso" className="btn-accent-cta flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-black shadow-[0_0_20px_rgba(255,215,0,0.3)] uppercase tracking-widest hover:scale-105 transition-transform">
                      Ver Detalles <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Right side Image (Gato) */}
                <div className="hidden md:flex md:w-1/2 lg:w-2/5 p-4 rounded-3xl bg-gradient-to-br from-primary/20 via-background/60 to-quantum-pink/20 border border-white/10 shadow-[0_0_40px_rgba(138,43,226,0.15)] overflow-hidden group relative items-center justify-center backdrop-blur-md">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 pointer-events-none" />
                  <motion.img
                    src={aprendiendoImg}
                    alt="Gato aprendiendo computación cuántica"
                    className="w-full h-auto max-h-[50vh] rounded-2xl object-cover relative z-0 drop-shadow-[0_0_25px_rgba(0,0,0,0.8)]"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center">
                    <div className="bg-background/80 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full shadow-lg">
                      <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                        Aprende con nosotros
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>

          {/* Slide 3: Plataforma view */}
          <CarouselItem className="p-0 h-full relative flex items-center justify-center overflow-hidden bg-background">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-background to-background pointer-events-none" />
            <div className="absolute inset-0 quantum-grid animate-grid-flow-reverse opacity-10 pointer-events-none" />
            
            <div className="relative z-10 w-full max-w-[1400px] flex flex-col items-center justify-center px-6 lg:px-20 mb-12">
              <div className="flex flex-col md:flex-row gap-8 lg:gap-14 items-center justify-between w-full">
                
                {/* Left side text */}
                <div className="md:w-1/2 lg:w-3/5 space-y-6 flex flex-col justify-center">
                  <div className="self-start px-5 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs tracking-widest font-bold shadow-sm uppercase">
                    Plataforma Educativa
                  </div>

                  <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.95] tracking-[-0.04em] flex flex-col items-start uppercase drop-shadow-md">
                    <span>Explora nuestra</span>
                    <span className="text-gradient-quantum pb-1">Plataforma</span>
                  </h1>

                  <p className="text-base sm:text-lg text-muted-foreground/90 leading-relaxed max-w-2xl font-medium">
                    Accede a recursos interactivos, simuladores cuánticos y laboratorios virtuales diseñados para democratizar el conocimiento.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {[
                      { icon: Monitor, text: "Simuladores Interactivos" },
                      { icon: BookOpen, text: "Contenido Autogestionado" },
                      { icon: Zap, text: "Laboratorios Prácticos" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                          <item.icon className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-bold text-foreground/90">{item.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <a href="/plataforma" className="btn-accent-cta flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-black shadow-[0_0_20px_rgba(255,215,0,0.3)] uppercase tracking-widest hover:scale-105 transition-transform">
                      Ver Plataforma <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Right side Platform Mockup */}
                <div className="hidden md:flex md:w-1/2 lg:w-2/5 p-6 rounded-3xl bg-gradient-to-br from-accent/20 via-background/60 to-primary/20 border border-white/10 shadow-[0_0_40px_rgba(255,215,0,0.1)] overflow-hidden group relative items-center justify-center backdrop-blur-md">
                  <div className="w-full h-full glass-strong rounded-xl p-6 glow-purple">
                    <div className="rounded-lg bg-background/80 p-5 space-y-5 border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-primary/60" />
                        <div className="w-3 h-3 rounded-full bg-accent/60" />
                        <div className="w-3 h-3 rounded-full bg-quantum-turquoise/60" />
                      </div>
                      <div className="h-6 w-3/4 rounded bg-white/5" />
                      <div className="grid grid-cols-3 gap-3">
                        {[1, 2, 3].map((n) => (
                          <div key={n} className="h-24 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-white/5 flex items-center justify-center">
                            <Zap className="w-6 h-6 text-primary/40" />
                          </div>
                        ))}
                      </div>
                      <div className="h-32 rounded-lg bg-gradient-to-tr from-[#DE5CA3]/10 to-primary/10 flex items-center justify-center relative overflow-hidden">
                         <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                         <Monitor className="w-12 h-12 text-[#DE5CA3] relative z-10 opacity-70" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>

        </CarouselContent>
        
        {/* Carousel controls - placed absolutely on top of slides */}
        <CarouselPrevious className="hidden md:inline-flex left-6 lg:left-12 bg-background/40 backdrop-blur-xl border-white/20 text-white hover:bg-white/20 hover:text-white hover:scale-110 z-30 h-12 w-12 transition-all shadow-[0_0_15px_rgba(0,0,0,0.4)]" />
        <CarouselNext className="hidden md:inline-flex right-6 lg:right-12 bg-background/40 backdrop-blur-xl border-white/20 text-white hover:bg-white/20 hover:text-white hover:scale-110 z-30 h-12 w-12 transition-all shadow-[0_0_15px_rgba(0,0,0,0.4)]" />
        
        {/* Animated wave at bottom of the entire carousel section so it stays consistent */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <motion.path
              d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,40 1440,60 L1440,120 L0,120 Z"
              fill="hsl(222, 47%, 6%)"
              animate={{
                d: [
                  "M0,60 C360,120 720,0 1080,60 C1260,90 1380,40 1440,60 L1440,120 L0,120 Z",
                  "M0,80 C360,20 720,100 1080,40 C1260,60 1380,80 1440,50 L1440,120 L0,120 Z",
                  "M0,60 C360,120 720,0 1080,60 C1260,90 1380,40 1440,60 L1440,120 L0,120 Z",
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </Carousel>
    </section>
  );
};

export default HeroSection;
