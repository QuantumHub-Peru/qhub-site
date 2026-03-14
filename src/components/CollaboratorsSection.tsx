import { motion } from "framer-motion";
const collaborators = [
  { name: "QuMatrix", img: "/images/investigacion/alianza2.png" },
  { name: "Université Libre de Bruxelles", img: "/images/investigacion/alianza1.png" },
  { name: "Universidad Libre", img: "/images/investigacion/alianza3.png" },
  { name: "Universidad Politécnica de Valencia", img: "/images/investigacion/alianza4.png" },
  { name: "LEAD PUCP", img: "/images/academico/alianza1.png" },
  { name: "Universidad de Ingeniería y Tecnología (UTEC)", img: "/images/academico/alianza3.png" },
  { name: "IEEE Computer Society PUCP", img: "/images/academico/alianza4.png" },
  { name: "Universidad de Ciencias y Humanidades (UCH)", img: "/images/academico/alianza5.jpg" },
  { name: "CIP Lima", img: "/images/rrpp/alianza2.jpg" }
];

const hslColor = "210 100% 60%"; // Reusing a default blue color similar to the image

const CollaboratorsSection = () => {
  // We separate the array render to duplicate it easily for an infinite marquee
  const Group = () => (
    <div className="flex items-center gap-8 md:gap-12 lg:gap-16 pr-8 md:pr-12 lg:pr-16">
      {collaborators.map((c, i) => (
        <div
          key={`${c.name}-${i}`}
          className="relative group perspective-[1000px] flex flex-col items-center gap-4 w-[200px] md:w-[240px] py-4"
        >
          {/* The Atom / Bloch Sphere Container */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105">

            {/* Orbital Rings - Atom Shape */}
            <div className="absolute inset-0 -m-8 md:-m-10 pointer-events-none">
              {/* Core Energy Glow */}
              <div
                className="absolute inset-0 m-auto w-16 h-16 md:w-20 md:h-20 rounded-full blur-[30px] opacity-40 group-hover:opacity-70 transition-opacity duration-700 mix-blend-screen z-0"
                style={{ backgroundColor: `hsl(${hslColor})` }}
              />

              {/* Orbit 1 */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'rotateZ(0deg) rotateX(72deg)' }}>
                <div className="absolute w-full h-full border border-white/20 rounded-full opacity-60" />
                <div className="absolute w-full h-full animate-[spin_6s_linear_infinite]">
                  <div
                    className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: `hsl(${hslColor})`,
                      boxShadow: `0 0 10px 2px hsl(${hslColor} / 0.8)`
                    }}
                  />
                </div>
              </div>

              {/* Orbit 2 */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'rotateZ(60deg) rotateX(72deg)' }}>
                <div className="absolute w-full h-full border border-white/20 rounded-full opacity-60" />
                <div className="absolute w-full h-full animate-[spin_8s_linear_infinite_reverse]">
                  <div
                    className="absolute top-1/2 -right-[3px] -translate-y-1/2 w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: `hsl(${hslColor})`,
                      boxShadow: `0 0 10px 2px hsl(${hslColor} / 0.8)`
                    }}
                  />
                </div>
              </div>

              {/* Orbit 3 */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'rotateZ(120deg) rotateX(72deg)' }}>
                <div className="absolute w-full h-full border border-white/20 rounded-full opacity-60" />
                <div className="absolute w-full h-full animate-[spin_10s_linear_infinite]">
                  <div
                    className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: `hsl(${hslColor})`,
                      boxShadow: `0 0 10px 2px hsl(${hslColor} / 0.8)`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Central Logo Box */}
            <div
              className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-2xl flex items-center justify-center relative z-10 transition-all duration-500 bg-background/80 backdrop-blur-xl border border-white/10"
              style={{ boxShadow: `0 0 20px hsl(${hslColor} / 0.3), inset 0 0 10px hsl(${hslColor} / 0.15)` }}
            >
              <img src={c.img} alt={c.name} className="w-[80%] h-[80%] object-contain filter drop-shadow-lg" />
            </div>
          </div>

          {/* Alliance Name outside the sphere */}
          <div className="text-center max-w-[180px] md:max-w-[200px] relative z-20 pt-2 md:pt-4">
            <h3
              className="font-heading leading-tight tracking-wide text-white font-bold text-lg md:text-xl"
              style={{ textShadow: `0 0 15px rgba(255,255,255,0.4)` }}
            >
              {c.name}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="relative py-24 md:py-32 section-darker flex flex-col items-center justify-center overflow-hidden border-b border-border/10">
      {/* Salto Cuantico Wave Background Effects */}
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

        {/* Wave/Ripple Rings (Efectos de onda) */}
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

      <div className="relative z-10 w-full max-w-full mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-heading text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-16"
          style={{ color: "#2c8d7b" }}
        >
          Con el respaldo de
        </motion.p>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden flex items-center mask-image-gradient">
          <style>{`
            .mask-image-gradient {
              mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
              -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            }
            .animate-marquee {
              animation: marquee 30s linear infinite;
            }
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); } 
            }
            .animate-marquee:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="flex w-max animate-marquee items-center">
            {/* Output two main parts to translate exactly -50% for a seamless loop */}
            <div className="flex"><Group /><Group /></div>
            <div className="flex"><Group /><Group /></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaboratorsSection;
