import { motion } from "framer-motion";
import { ArrowRight, Monitor, BookOpen, Zap } from "lucide-react";

const PlatformSection = () => {
  return (
    <section className="relative pt-0 pb-28 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-quantum-pink/5" />
      <div className="absolute inset-0 quantum-grid opacity-10" />

      {/* Fondo móvil a pantalla completa - FULL BLEED */}
      <div
        className="absolute inset-0 md:hidden opacity-30 pointer-events-none z-[1]"
        style={{
          backgroundImage: 'url("/learning.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      />

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 relative"
          >
            <p className="font-heading text-xs tracking-[0.3em] text-primary uppercase mb-4">Plataforma Educativa</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-[1.1] uppercase tracking-tight">
              QuantumHub Peru <br />
              <span className="text-gradient-quantum">QHub Learning Platform</span>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-8 text-white/90">
              Accede a recursos interactivos, simuladores cuánticos, laboratorios virtuales y contenido
              educativo diseñado para construir tu conocimiento en computación cuántica paso a paso.
            </p>
            <div className="space-y-4 mb-8">
              {[
                { icon: Monitor, text: "Simuladores cuánticos interactivos" },
                { icon: BookOpen, text: "Contenido self-paced" },
                { icon: Zap, text: "Laboratorios prácticos" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-lg glass flex items-center justify-center group-hover:glow-purple transition-all">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-body text-sm text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
            <a
              href="https://www.qhubperu.com/curso"
              target="_blank"
              rel="noreferrer"
              className="btn-quantum inline-flex items-center gap-2 uppercase tracking-widest text-[11px] font-bold"
            >
              Explora nuestra plataforma <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:col-span-3"
          >
            <div className="rounded-2xl glass-strong p-1.5 glow-purple overflow-hidden">
              <div className="relative rounded-xl overflow-hidden aspect-video bg-background/40">
                <video
                  src="/plataformaqhub.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-xl glass animate-float glow-blue flex items-center justify-center">
              <Zap className="w-6 h-6 text-quantum-blue" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
