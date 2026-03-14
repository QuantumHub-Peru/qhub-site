import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
const aprendiendoImg = "gato/aprendiendo.png"
const CourseSection = () => {
  return (
    <>
      {/* Container 1: Curso Intro */}
      <section className="relative py-20 lg:py-28 overflow-hidden section-darker">
        <div className="absolute inset-0 circuit-lines opacity-10" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-[1400px] flex-1 lg:glass-strong rounded-none lg:rounded-3xl px-6 sm:px-6 md:px-8 lg:px-10 xl:px-12 pb-6 sm:pb-6 md:pb-8 lg:pb-10 xl:pb-12 pt-8 lg:pt-10 relative overflow-hidden border-none lg:border lg:border-primary/20 bg-transparent lg:bg-card/60 backdrop-blur-none lg:backdrop-blur-xl shadow-none lg:shadow-[0_0_50px_rgba(138,43,226,0.15)] flex flex-col justify-center"
          >
            <div className="flex flex-col md:flex-row gap-8 lg:gap-10 xl:gap-12 items-center justify-between relative z-10 flex-1 py-4 lg:py-2">
              <div className="md:w-1/2 lg:w-3/5 space-y-5 lg:space-y-5 xl:space-y-6 flex flex-col justify-center">
                <div className="self-start px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-bold mb-1 lg:mb-2 shadow-sm">
                  Edición 2026 - I
                </div>

                {/* --- TÍTULO CON EFECTO DE CORRIENTE ELÉCTRICA --- */}
                <h2 className="font-heading text-4xl sm:text-5xl lg:text-5xl xl:text-[3.5rem] 2xl:text-6xl font-black leading-[1.1] tracking-tight flex flex-col items-start">
                  <span>Curso de</span>
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
                    Introducción a la Computación Cuántica
                  </motion.span>
                </h2>

                <p className="text-base sm:text-lg lg:text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium">
                  Formación en computación cuántica para estudiantes de secundaria y universitarios. Desarrolla competencias en física, matemáticas y programación.
                </p>
                <div className="flex items-center gap-6 py-5 lg:py-4 xl:py-5 border-y border-border/50 w-full max-w-lg">
                  <div className="flex flex-col flex-1">
                    <span className="text-2xl lg:text-3xl xl:text-4xl font-black text-foreground">16+</span>
                    <span className="text-[10px] lg:text-[11px] text-muted-foreground uppercase tracking-widest font-bold mt-1">Semanas</span>
                  </div>
                  <div className="w-px h-12 bg-border/50" />
                  <div className="flex flex-col flex-1">
                    <span className="text-2xl lg:text-3xl xl:text-4xl font-black text-foreground">74</span>
                    <span className="text-[10px] lg:text-[11px] text-muted-foreground uppercase tracking-widest font-bold mt-1">Horas clase</span>
                  </div>
                  <div className="w-px h-12 bg-border/50" />
                  <div className="flex flex-col flex-1">
                    <span className="text-2xl lg:text-3xl xl:text-4xl font-black text-foreground">4</span>
                    <span className="text-[10px] lg:text-[11px] text-muted-foreground uppercase tracking-widest font-bold mt-1">Módulos</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full">
                  <a href="/curso" className="btn-accent-cta flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-4 lg:px-8 lg:py-3.5 text-sm lg:text-sm font-black shadow-xl uppercase tracking-widest hover:scale-105 transition-transform">
                    Ir al Curso <ArrowRight className="w-5 h-5" />
                  </a>
                  <a href="https://drive.google.com/file/d/1pfsNJQas2XYNtcwhCoyVu_QeqmXK_aWq/view?usp=sharing" target="_blank" className="btn-outline-quantum flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-4 lg:px-8 lg:py-3.5 text-sm lg:text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">
                    Ver más <Download className="w-5 h-5 opacity-70" />
                  </a>
                </div>
              </div>
              <div className="hidden lg:flex md:w-1/2 lg:w-2/5 p-3 rounded-3xl bg-gradient-to-br from-primary/20 to-quantum-pink/20 border border-white/10 shadow-2xl overflow-hidden group relative items-center justify-center">
                <img
                  src={aprendiendoImg}
                  alt="Aprendiendo Computación Cuántica"
                  className="w-full h-auto max-h-[45vh] lg:max-h-[45vh] xl:max-h-[50vh] rounded-2xl object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Container 2: CTA */}
      <section className="w-full min-h-[50vh] flex flex-col items-center justify-center relative z-10 px-4 py-20 lg:py-32 overflow-hidden section-darker border-t border-border/10">

        {/* Background Video (Matching Curso.tsx) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen"
          >
            <source src="/video-bg.mp4" type="video/mp4" />
            Tu navegador no soporta videos HTML5.
          </video>
          <div className="absolute inset-0 bg-background/60" />
        </div>

        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 mix-blend-screen opacity-50">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary/20 blur-[100px] rounded-full"
          />
          <motion.div
            animate={{ rotate: -360, scale: [1, 1.3, 1] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-quantum-pink/20 blur-[100px] rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-accent/10 blur-[80px] rounded-full"
          />

          {/* Vector Waves (Efectos de onda del fondo) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-primary/20"
                style={{ width: i * 200, height: i * 200 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          className="w-full max-w-5xl relative z-10 flex flex-col items-center text-center space-y-6 md:space-y-8 glass-strong rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 lg:p-20 border border-primary/30 shadow-[0_0_50px_rgba(138,43,226,0.3)] bg-black/40 backdrop-blur-xl"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]"
          >
            ¿Listo para dar el <br className="hidden sm:block" />

            <motion.span
              className="text-gradient-quantum inline-block mt-2 origin-bottom"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.1, 1],
                filter: ["hue-rotate(0deg)", "hue-rotate(60deg)", "hue-rotate(0deg)"]
              }}
              transition={{
                duration: 0.35,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1.5
              }}
            >
              salto cuántico
            </motion.span>?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-white/80 text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl font-medium leading-relaxed"
          >
            Únete a la próxima generación de innovadores tecnológicos. Los cupos son limitados y las inscripciones cierran pronto.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6, type: "spring", stiffness: 100 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-6 md:pt-8 w-full sm:w-auto"
          >
            <motion.a
              href="https://forms.gle/9EhQgzZmTXJRtp4Q6"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: ["0px 0px 20px rgba(255,215,0,0.4)", "0px 0px 40px rgba(255,215,0,0.8)", "0px 0px 20px rgba(255,215,0,0.4)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="btn-accent-cta flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-8 py-5 md:px-12 md:py-6 text-base md:text-lg font-black shadow-xl uppercase tracking-widest relative overflow-hidden group rounded-2xl"
            >
              <motion.div
                animate={{ x: ["-300%", "300%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                className="absolute top-0 bottom-0 left-[-20%] w-[50%] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
              />
              <span className="relative z-10 flex items-center gap-2 md:gap-3">
                ¡Inscríbete Ahora! <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.a>

            <motion.a
              href="https://drive.google.com/file/d/1pfsNJQas2XYNtcwhCoyVu_QeqmXK_aWq/view?usp=sharing"
              target="_blank"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline-quantum flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-8 py-5 md:px-12 md:py-6 text-base md:text-lg font-bold uppercase tracking-widest transition-colors rounded-2xl"
            >
              Más Info <Download className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default CourseSection;
