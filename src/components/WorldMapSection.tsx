import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountryData {
  name: string;
  flag: string;
  x: number;
  y: number;
  level: "high" | "medium" | "low" | "peru";
  info: string[];
}

const countries: CountryData[] = [
  { name: "Estados Unidos", flag: "🇺🇸", x: 22, y: 38, level: "high", info: ["USD 3.7B invertidos", "50+ centros de investigación", "Programas en Stanford, MIT, Caltech"] },
  { name: "China", flag: "🇨🇳", x: 75, y: 40, level: "high", info: ["Inversión estatal masiva", "Infraestructura nacional cuántica", "Satélite cuántico Micius"] },
  { name: "Alemania", flag: "🇩🇪", x: 50, y: 32, level: "medium", info: ["€2B en programa nacional", "Colaboración europea", "Quantum hubs regionales"] },
  { name: "Canadá", flag: "🇨🇦", x: 20, y: 28, level: "medium", info: ["Hogar de D-Wave", "Instituto Perimeter", "Programa nacional activo"] },
  { name: "Japón", flag: "🇯🇵", x: 83, y: 38, level: "medium", info: ["Riken Institute", "Inversión creciente", "Alianzas con IBM y Google"] },
  { name: "Perú", flag: "🇵🇪", x: 24, y: 62, level: "peru", info: ["Inversión pública: mínima", "Infraestructura especializada: inexistente", "Programas formales: escasos"] },
];

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
        <div className="relative w-full max-w-5xl mx-auto aspect-[2/1] rounded-2xl glass overflow-hidden">
          {/* Simplified world shape using dots pattern */}
          <div className="absolute inset-0 quantum-grid opacity-30" />

          {/* Country dots */}
          {countries.map((c) => (
            <motion.button
              key={c.name}
              className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ${levelColors[c.level]} ${
                active?.name === c.name ? "scale-150 z-20" : "hover:scale-125"
              }`}
              style={{ left: `${c.x}%`, top: `${c.y}%`, transform: "translate(-50%, -50%)" }}
              onMouseEnter={() => setActive(c)}
              onMouseLeave={() => setActive(null)}
              whileHover={{ scale: 1.4 }}
              animate={c.level === "peru" ? { scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] } : {}}
              transition={c.level === "peru" ? { repeat: Infinity, duration: 2 } : {}}
            >
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-lg">{c.flag}</span>
            </motion.button>
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
                  <span className="text-xl">{active.flag}</span> {active.name}
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

          {/* Legend */}
          <div className="absolute bottom-4 right-4 flex gap-4 text-xs font-body text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-quantum-blue" /> Alta inversión</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-quantum-purple" /> Media</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-quantum-yellow" /> Perú</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorldMapSection;
