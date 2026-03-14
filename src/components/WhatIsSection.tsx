import { motion } from "framer-motion";

const r1Img = "/r1.jpg";
const elisaImg = "/gato/gato.png";

const WhatIsSection = () => {
  return (
    <section className="relative py-16 md:py-32 overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Left Column: Image with Luminous Glow Backdrop */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto lg:mx-0 w-[90%] sm:w-full max-w-md lg:max-w-full mt-6 mb-8 lg:mt-0 lg:mb-0 group"
          >
            {/* The Luminous Glowing Backdrop */}
            <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-[#F39C12] via-primary to-[#7B2CBF] rounded-2xl sm:rounded-[2.5rem] blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 animate-pulse z-0" />

            {/* Main Image Container */}
            <div className="relative z-10 aspect-square sm:aspect-[4/3] rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(123,44,191,0.6)] bg-card border-[6px] border-white/20 group-hover:border-primary/60 transition-colors duration-500">
              <img
                src={r1Img}
                alt="Quantum Education"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Optional overlay gradient for contrast if image is too bright */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
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
            <div className="flex items-center gap-4 border-t border-border/40 pt-6 sm:pt-8 w-full max-w-lg">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/20 border-2 border-[#f4a2d8] shrink-0">
                <img src={elisaImg} alt="Richard Feynman" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-heading font-medium italic text-foreground text-xs sm:text-sm leading-tight text-white/90">
                  "Si crees que entiendes la mecánica cuántica, es que no la entiendes en absoluto."
                </p>
                <p className="font-body text-[10px] mt-1 text-[#48bcae] font-bold uppercase tracking-widest">— Richard Feynman</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
