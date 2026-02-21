import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Atom, BookOpen, Lightbulb, Megaphone, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface QuantumState {
  id: string;
  ket: string;
  name: string;
  icon: React.ElementType;
  color: string;
  hslColor: string;
  description: string;
  path: string;
  probability: number;
}

const states: QuantumState[] = [
  {
    id: "investigacion", ket: "|Investigación⟩", name: "Investigación",
    icon: Atom, color: "text-dept-research", hslColor: "210 100% 60%",
    description: "Algoritmos cuánticos, fotónica integrada y QML aplicado a problemas reales de LATAM.",
    path: "/investigacion", probability: 0.25,
  },
  {
    id: "academico", ket: "|Académico⟩", name: "Académico",
    icon: BookOpen, color: "text-dept-academic", hslColor: "270 70% 55%",
    description: "Cursos estructurados, contenido self-paced y formación docente en tecnologías cuánticas.",
    path: "/academico", probability: 0.22,
  },
  {
    id: "innovacion", ket: "|Innovación⟩", name: "Innovación",
    icon: Lightbulb, color: "text-dept-innovation", hslColor: "175 80% 50%",
    description: "Startups cuánticas, hackathons y transferencia de tecnología al sector productivo.",
    path: "/innovacion", probability: 0.20,
  },
  {
    id: "relaciones", ket: "|Relaciones⟩", name: "Relaciones Públicas",
    icon: Megaphone, color: "text-dept-relations", hslColor: "45 100% 55%",
    description: "Comunicación estratégica, alianzas institucionales y posicionamiento regional.",
    path: "/relaciones-publicas", probability: 0.15,
  },
  {
    id: "comunidad", ket: "|Comunidad⟩", name: "Comunidad",
    icon: Users, color: "text-dept-community", hslColor: "330 70% 60%",
    description: "Meetups, mentorías y la red cuántica más activa de Latinoamérica.",
    path: "/comunidad", probability: 0.18,
  },
];

const QuantumStates = () => {
  const [collapsed, setCollapsed] = useState<string | null>(null);

  return (
    <section className="relative py-24 section-dark overflow-hidden">
      <div className="absolute inset-0 quantum-grid opacity-5" />
      <div className="relative z-10 container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-heading text-xs tracking-[0.3em] text-primary uppercase mb-4">Superposición</p>
          <h2 className="font-heading text-2xl md:text-4xl font-bold mb-3">
            ⟨ψ| <span className="text-gradient-quantum">QuantumHub</span> ⟩
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-lg mx-auto">
            Cada departamento existe en superposición hasta que interactúas. Haz clic para colapsar el estado.
          </p>
        </motion.div>

        {/* Superposition notation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-heading text-xs md:text-sm text-muted-foreground/60 tracking-wide">
            |ψ⟩ = {states.map((s, i) => (
              <span key={s.id}>
                <span className={collapsed === s.id ? "text-foreground" : "text-muted-foreground/40"}>
                  {s.probability.toFixed(2)}
                </span>
                <span className={`transition-all duration-500 ${collapsed === s.id ? "text-foreground font-bold" : "text-muted-foreground/50"}`}>
                  {s.ket}
                </span>
                {i < states.length - 1 && <span className="text-muted-foreground/30"> + </span>}
              </span>
            ))}
          </p>
        </motion.div>

        {/* State cards */}
        <div className="space-y-3">
          {states.map((state, i) => {
            const isCollapsed = collapsed === state.id;
            const isOther = collapsed && collapsed !== state.id;
            const Icon = state.icon;

            return (
              <motion.div
                key={state.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`transition-all duration-500 ${isOther ? "opacity-30 scale-[0.97]" : ""}`}
              >
                <button
                  onClick={() => setCollapsed(isCollapsed ? null : state.id)}
                  className={`w-full text-left glass rounded-xl p-4 md:p-5 transition-all duration-500 group ${
                    isCollapsed ? "border-primary/30 border" : "border border-transparent hover:border-border/50"
                  }`}
                  style={{
                    boxShadow: isCollapsed ? `0 0 40px hsl(${state.hslColor} / 0.15)` : "none",
                  }}
                >
                  <div className="flex items-center gap-4">
                    {/* Probability bar */}
                    <div className="hidden md:flex flex-col items-center gap-1 w-12">
                      <div className="w-full h-1 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: `hsl(${state.hslColor})` }}
                          animate={{ width: isCollapsed ? "100%" : `${state.probability * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <span className="font-heading text-[9px] text-muted-foreground/50">
                        {(state.probability * 100).toFixed(0)}%
                      </span>
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-lg glass flex items-center justify-center shrink-0 transition-all duration-500 ${
                        isCollapsed ? "" : ""
                      }`}
                      style={{
                        boxShadow: isCollapsed ? `0 0 20px hsl(${state.hslColor} / 0.3)` : "none",
                      }}
                    >
                      <Icon className={`w-5 h-5 ${state.color}`} />
                    </div>

                    {/* Ket notation */}
                    <div className="flex-1 min-w-0">
                      <p className={`font-heading text-sm md:text-base tracking-wider transition-colors duration-300 ${
                        isCollapsed ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      }`}>
                        {state.ket}
                      </p>
                    </div>

                    {/* Collapse indicator */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCollapsed ? "bg-primary/20" : "bg-secondary/60"
                    }`}>
                      <motion.div
                        animate={{ rotate: isCollapsed ? 45 : 0 }}
                        className="w-2 h-2 border-r border-b border-muted-foreground"
                        style={{ transform: "translateY(-1px)" }}
                      />
                    </div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isCollapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-border/20">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <span className="font-heading text-[10px] uppercase tracking-wider text-muted-foreground">
                              Estado colapsado
                            </span>
                          </div>
                          <p className="font-body text-sm text-foreground/70 leading-relaxed mb-4">{state.description}</p>
                          <Link
                            to={state.path}
                            className="inline-flex items-center gap-2 font-heading text-xs text-primary hover:gap-3 transition-all"
                          >
                            Observar estado → {state.name}
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuantumStates;
