import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import countriesData from "../assets/mapData.json";
import WorldMapBackground from "./WorldMapBackground";

interface CountryData {
  name: string;
  code: string;
  x: number;
  y: number;
  level: "high" | "medium" | "low" | "peru";
  info: string[];
}

const flagModules = import.meta.glob('../assets/svg-flags/*.svg', { eager: true, as: 'url' }) as Record<string, string>;

const getFlagUrl = (code: string) => {
  return flagModules[`../assets/svg-flags/${code.toLowerCase()}.svg`] || '';
};

const countries = countriesData as CountryData[];

const levelColors = {
  high: "bg-quantum-blue shadow-[0_0_15px_hsl(220,90%,56%,0.5)]",
  medium: "bg-quantum-purple shadow-[0_0_12px_hsl(270,80%,60%,0.4)]",
  low: "bg-muted-foreground/40",
  peru: "bg-quantum-yellow shadow-[0_0_15px_hsl(45,100%,55%,0.5)]",
};

const WorldMapSection = () => {
  const [active, setActive] = useState<CountryData | null>(null);

  return (
    <section className="relative py-28 overflow-hidden section-dark">
      <div className="absolute inset-0 circuit-lines opacity-10" />
      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
            Mientras el mundo invierte en <span className="text-gradient-quantum">computación cuántica</span>...
          </h2>
          <p className="font-body text-muted-foreground">Los ecosistemas cuánticos ya están tomando forma.</p>
        </motion.div>

        {/* Map area */}
        <div className="relative w-full max-w-5xl mx-auto aspect-[2/1] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(70,188,174,0.3)]">
          {/* SVG Map Background */}
          <WorldMapBackground />

          {/* Country dots */}
          {countries.map((c) => (
            <motion.div
              key={c.code}
              className={`absolute w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-full cursor-pointer transition-all duration-300 border-[1px] md:border-[1.5px] overflow-hidden shadow-sm md:shadow-md bg-white ${active?.code === c.code ? "scale-[2.5] md:scale-150 z-20 border-white shadow-xl" : "border-white/70 hover:scale-150 md:hover:scale-125 hover:border-white"
                }`}
              style={{
                left: `${c.x}%`,
                top: `${c.y}%`,
                transform: "translate(-50%, -50%)",
                backgroundImage: `url(${getFlagUrl(c.code)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: c.level === 'peru' ? '0 0 15px hsl(45,100%,55%,0.5)' : undefined
              }}
              onMouseEnter={() => setActive(c)}
              onMouseLeave={() => setActive(null)}
              whileHover={{ scale: 1.4 }}
              animate={c.level === "peru" ? { scale: [1, 1.25, 1], borderColor: ["rgba(255,255,255,0.7)", "rgba(255,255,255,1)", "rgba(255,255,255,0.7)"] } : {}}
              transition={c.level === "peru" ? { repeat: Infinity, duration: 2 } : {}}
            />
          ))}

          {/* Tooltip */}
          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute z-30 glass-strong rounded-xl p-5 w-72"
                style={{
                  left: `${Math.min(Math.max(active.x, 20), 75)}%`,
                  top: `${active.y > 50 ? active.y - 25 : active.y + 8}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <p className="font-heading text-sm font-bold mb-2 flex items-center gap-2">
                  <img src={getFlagUrl(active.code)} alt={active.name} className="w-6 h-4 object-cover rounded shadow-sm" />
                  <span>{active.name}</span>
                </p>
                <ul className="space-y-1">
                  {active.info.map((line, i) => (
                    <li key={i} className="font-body text-xs text-muted-foreground">• {line}</li>
                  ))}
                </ul>
                {active.level === "peru" && (
                  <p className="mt-3 font-body text-xs text-accent font-semibold">
                    Por eso nace QuantumHub Peru. 🚀
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default WorldMapSection;
