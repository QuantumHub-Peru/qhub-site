import { motion } from "framer-motion";
import neuralBg from "@/assets/neural-bg.jpg";

const WhatIsSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${neuralBg})` }} />
      <div className="absolute inset-0 bg-background/80" />
      
      <div className="relative z-10 container mx-auto px-6 text-center max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-2xl md:text-3xl font-bold mb-8"
        >
          ¿Qué es <span className="text-gradient-quantum">QuantumHub Peru</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          QuantumHub Peru es una iniciativa que impulsa la educación, investigación e innovación
          en computación cuántica desde Latinoamérica, con el objetivo de construir un ecosistema
          tecnológico donde hoy casi no existe infraestructura.
        </motion.p>
        {/* Animated line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-10 mx-auto h-px w-48 origin-center"
          style={{ background: "linear-gradient(90deg, transparent, hsl(270 80% 60%), transparent)" }}
        />
      </div>
    </section>
  );
};

export default WhatIsSection;
