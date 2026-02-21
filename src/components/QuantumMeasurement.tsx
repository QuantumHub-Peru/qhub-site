import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Atom, BookOpen, Lightbulb, Megaphone, Users, Zap, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

interface MeasurementResult {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  hslColor: string;
  path: string;
  message: string;
  weight: number;
}

const outcomes: MeasurementResult[] = [
  { id: "investigacion", name: "Investigación", icon: Atom, color: "text-dept-research", hslColor: "210 100% 60%", path: "/investigacion", message: "Tu estado cuántico colapsó hacia la frontera del conocimiento.", weight: 25 },
  { id: "academico", name: "Académico", icon: BookOpen, color: "text-dept-academic", hslColor: "270 70% 55%", path: "/academico", message: "La superposición se resolvió: aprender es tu estado fundamental.", weight: 22 },
  { id: "innovacion", name: "Innovación", icon: Lightbulb, color: "text-dept-innovation", hslColor: "175 80% 50%", path: "/innovacion", message: "Medición completada: la innovación es tu eigenvalue.", weight: 20 },
  { id: "relaciones", name: "Relaciones Públicas", icon: Megaphone, color: "text-dept-relations", hslColor: "45 100% 55%", path: "/relaciones-publicas", message: "Colapso confirmado: tu resonancia está en la comunicación.", weight: 15 },
  { id: "comunidad", name: "Comunidad", icon: Users, color: "text-dept-community", hslColor: "330 70% 60%", path: "/comunidad", message: "Estado medido: tu entrelazamiento natural es con la comunidad.", weight: 18 },
];

type Phase = "idle" | "measuring" | "result";

const QuantumMeasurement = () => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<MeasurementResult | null>(null);

  const measure = useCallback(() => {
    setPhase("measuring");
    setResult(null);

    const totalWeight = outcomes.reduce((s, o) => s + o.weight, 0);
    const rand = Math.random() * totalWeight;
    let cumulative = 0;
    let chosen = outcomes[0];
    for (const o of outcomes) {
      cumulative += o.weight;
      if (rand <= cumulative) { chosen = o; break; }
    }

    setTimeout(() => {
      setResult(chosen);
      setPhase("result");
    }, 2200);
  }, []);

  const reset = () => {
    setPhase("idle");
    setResult(null);
  };

  return (
    <section className="relative py-20 section-darker overflow-hidden">
      <div className="absolute inset-0 quantum-grid opacity-5" />
      <div className="relative z-10 container mx-auto px-6 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="font-heading text-xs tracking-[0.3em] text-primary uppercase mb-4">Experimento</p>
          <h2 className="font-heading text-xl md:text-3xl font-bold mb-3">
            Medición <span className="text-gradient-quantum">Cuántica</span>
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-md mx-auto">
            El ecosistema QuantumHub existe en superposición. Realiza una medición y descubre qué departamento resuena contigo.
          </p>
        </motion.div>

        {/* Measurement area */}
        <div className="relative glass rounded-2xl p-8 md:p-12 min-h-[280px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {phase === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-6"
              >
                {/* Superposition visualization */}
                <div className="relative w-32 h-32">
                  {outcomes.map((o, i) => {
                    const angle = (i / outcomes.length) * Math.PI * 2 - Math.PI / 2;
                    const r = 48;
                    return (
                      <motion.div
                        key={o.id}
                        className="absolute w-8 h-8 rounded-lg glass flex items-center justify-center"
                        style={{
                          left: `calc(50% + ${Math.cos(angle) * r}px - 16px)`,
                          top: `calc(50% + ${Math.sin(angle) * r}px - 16px)`,
                        }}
                        animate={{
                          opacity: [0.4, 0.8, 0.4],
                          scale: [0.9, 1.1, 0.9],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2 + i * 0.3,
                          ease: "easeInOut",
                        }}
                      >
                        <o.icon className={`w-4 h-4 ${o.color}`} />
                      </motion.div>
                    );
                  })}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading text-lg text-muted-foreground/30">|ψ⟩</span>
                  </div>
                </div>

                <button onClick={measure} className="btn-quantum flex items-center gap-2 text-xs">
                  <Zap className="w-4 h-4" /> Medir Estado
                </button>
              </motion.div>
            )}

            {phase === "measuring" && (
              <motion.div
                key="measuring"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-6"
              >
                {/* Collapse animation */}
                <div className="relative w-40 h-40 flex items-center justify-center">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full border border-primary/30"
                      initial={{ width: 160, height: 160, opacity: 0.6 }}
                      animate={{
                        width: [160, 20],
                        height: [160, 20],
                        opacity: [0.6, 0],
                        borderColor: ["hsl(270 80% 60% / 0.3)", "hsl(330 80% 60% / 0.6)"],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.4,
                        ease: "easeIn",
                      }}
                    />
                  ))}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    className="w-10 h-10 rounded-full border-2 border-primary/50 border-t-primary"
                  />
                </div>
                <p className="font-heading text-xs tracking-wider text-muted-foreground animate-pulse">
                  Colapsando función de onda...
                </p>
              </motion.div>
            )}

            {phase === "result" && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", damping: 15 }}
                className="flex flex-col items-center gap-5"
              >
                <motion.div
                  className="w-20 h-20 rounded-2xl glass flex items-center justify-center"
                  style={{ boxShadow: `0 0 40px hsl(${result.hslColor} / 0.4)` }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <result.icon className={`w-10 h-10 ${result.color}`} />
                </motion.div>

                <div>
                  <p className="font-heading text-lg font-bold mb-1">{result.name}</p>
                  <p className="font-body text-sm text-muted-foreground max-w-sm">{result.message}</p>
                </div>

                <div className="flex gap-3 mt-2">
                  <Link to={result.path} className="btn-quantum text-xs flex items-center gap-2">
                    Explorar Departamento
                  </Link>
                  <button onClick={reset} className="btn-outline-quantum text-xs flex items-center gap-2 !px-4 !py-2">
                    <RotateCcw className="w-3 h-3" /> Re-medir
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default QuantumMeasurement;
