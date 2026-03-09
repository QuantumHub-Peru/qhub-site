import { motion } from "framer-motion";
import neuralBg from "@/assets/neural-bg.jpg"; // We'll use this as the placeholder image
import elisaImg from "@/gato/gato.png"; // Placeholder for the avatar

const WhatIsSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Column: Image with Pink Offset Backdrop */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto lg:mx-0 w-full max-w-md lg:max-w-full"
          >
            {/* The Pink Backdrop (Offset) */}
            <div className="absolute -inset-4 sm:-inset-6 bg-[#f4a2d8] rounded-3xl sm:rounded-[2.5rem] transform translate-y-4 sm:translate-y-6 -translate-x-2 sm:-translate-x-4 z-0" />

            {/* Main Image Container */}
            <div className="relative z-10 aspect-square sm:aspect-[4/3] rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl bg-card border border-border/50">
              <img
                src={neuralBg}
                alt="Quantum Education"
                className="w-full h-full object-cover"
              />
              {/* Optional overlay gradient for contrast if image is too bright */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </motion.div>

          {/* Right Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <p className="font-heading text-xs sm:text-sm font-bold tracking-[0.2em] text-[#48bcae] uppercase mb-4 sm:mb-6">
              QuiÉnes Somos
            </p>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-foreground leading-[1.1] mb-6 sm:mb-8">
              Democratizando la <br className="hidden sm:block" />Educación Cuántica
            </h2>

            <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed mb-10 sm:mb-12 max-w-xl">
              QuantumHub Peru es una iniciativa que impulsa la educación, investigación e innovación
              en computación cuántica desde Latinoamérica, con el objetivo de construir un ecosistema
              tecnológico donde hoy casi no existe infraestructura.
            </p>

            {/* Optional profile/founder plug (as seen in user's image) */}
            <div className="flex items-center gap-4 border-t border-border/40 pt-6 sm:pt-8 w-max">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/20 border-2 border-[#f4a2d8]">
                <img src={elisaImg} alt="Founder" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-heading font-bold text-foreground text-sm sm:text-base">Mascota Oficial</p>
                <p className="font-body text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider">Mascota & Símbolo</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
