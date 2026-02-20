import { motion } from "framer-motion";
import { ArrowRight, Monitor, BookOpen, Zap } from "lucide-react";

const PlatformSection = () => {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-quantum-pink/5" />
      <div className="absolute inset-0 quantum-grid opacity-10" />
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-heading text-xs tracking-[0.3em] text-primary uppercase mb-4">Plataforma Educativa</p>
            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-6">
              Explora nuestra <span className="text-gradient-quantum">Plataforma</span>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
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
            <a href="/plataforma" className="btn-quantum inline-flex items-center gap-2">
              Ver Plataforma <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl glass-strong p-6 glow-purple">
              <div className="rounded-lg bg-background/60 p-4 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-accent/60" />
                  <div className="w-3 h-3 rounded-full bg-quantum-turquoise/60" />
                </div>
                <div className="h-4 w-3/4 rounded bg-secondary animate-pulse" />
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="h-20 rounded-lg bg-secondary/60 animate-pulse" style={{ animationDelay: `${n * 200}ms` }} />
                  ))}
                </div>
                <div className="h-32 rounded-lg bg-gradient-to-br from-primary/10 to-quantum-pink/10 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 animate-pulse-glow" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-secondary/40" />
                  <div className="h-3 w-5/6 rounded bg-secondary/30" />
                </div>
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
