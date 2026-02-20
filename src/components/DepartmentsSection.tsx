import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Atom, BookOpen, Lightbulb, Megaphone, Users, ArrowRight, X } from "lucide-react";

interface Department {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  glowClass: string;
  angle: number;
  description: string;
  mission: string;
  path: string;
}

const departments: Department[] = [
  {
    id: "investigacion", name: "Investigación", icon: Atom, color: "text-dept-research",
    glowClass: "shadow-[0_0_20px_hsl(210,100%,60%,0.4)]", angle: -90,
    description: "Desarrollo de investigación en computación cuántica, algoritmos y aplicaciones.",
    mission: "Producir investigación de impacto en computación cuántica desde Latinoamérica.", path: "/investigacion"
  },
  {
    id: "academico", name: "Académico", icon: BookOpen, color: "text-dept-academic",
    glowClass: "shadow-[0_0_20px_hsl(270,70%,55%,0.4)]", angle: -18,
    description: "Diseño curricular y programas educativos en tecnologías cuánticas.",
    mission: "Democratizar la educación cuántica en toda la región.", path: "/academico"
  },
  {
    id: "innovacion", name: "Innovación", icon: Lightbulb, color: "text-dept-innovation",
    glowClass: "shadow-[0_0_20px_hsl(175,80%,50%,0.4)]", angle: 54,
    description: "Exploración de aplicaciones prácticas y startups cuánticas.",
    mission: "Conectar la investigación cuántica con soluciones reales.", path: "/innovacion"
  },
  {
    id: "relaciones", name: "Relaciones Públicas", icon: Megaphone, color: "text-dept-relations",
    glowClass: "shadow-[0_0_20px_hsl(45,100%,55%,0.4)]", angle: 126,
    description: "Comunicación, alianzas estratégicas y difusión del ecosistema.",
    mission: "Amplificar la voz de la computación cuántica en LATAM.", path: "/relaciones-publicas"
  },
  {
    id: "comunidad", name: "Comunidad", icon: Users, color: "text-dept-community",
    glowClass: "shadow-[0_0_20px_hsl(330,70%,60%,0.4)]", angle: 198,
    description: "Construcción de la red de entusiastas y profesionales cuánticos.",
    mission: "Crear la comunidad cuántica más grande de Latinoamérica.", path: "/comunidad"
  },
];

const DepartmentsSection = () => {
  const [selected, setSelected] = useState<Department | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const radius = 180; // orbit radius

  return (
    <section className="relative py-28 section-dark overflow-hidden">
      <div className="absolute inset-0 quantum-grid opacity-10" />
      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="font-heading text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4">Ecosistema</p>
          <h2 className="font-heading text-2xl md:text-4xl font-bold">
            Nuestros <span className="text-gradient-quantum">Departamentos</span>
          </h2>
        </motion.div>

        {/* Orbital visualization */}
        <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center my-8">
          {/* Orbit ring */}
          <div className="absolute w-[360px] h-[360px] md:w-[400px] md:h-[400px] rounded-full border border-border/20" />

          {/* Core */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-quantum-pink flex items-center justify-center glow-purple z-10"
          >
            <span className="font-heading text-xs font-bold text-primary-foreground tracking-wider">QH</span>
          </motion.div>

          {/* Department nodes */}
          {departments.map((dept) => {
            const rad = (dept.angle * Math.PI) / 180;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;
            const isHovered = hovered === dept.id;

            return (
              <motion.button
                key={dept.id}
                className={`absolute z-20 group`}
                style={{ left: `calc(50% + ${x}px - 28px)`, top: `calc(50% + ${y}px - 28px)` }}
                onMouseEnter={() => setHovered(dept.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(dept)}
                whileHover={{ scale: 1.2 }}
              >
                {/* Connection line */}
                <svg className="absolute pointer-events-none" style={{ width: "300px", height: "300px", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
                  <line
                    x1="150" y1="150"
                    x2={150 - x} y2={150 - y}
                    stroke={isHovered ? "hsl(270 80% 60%)" : "hsl(222 30% 18%)"}
                    strokeWidth={isHovered ? "2" : "1"}
                    opacity={isHovered ? 0.8 : 0.3}
                    className="transition-all duration-300"
                  />
                </svg>
                <div className={`relative w-14 h-14 rounded-xl glass flex items-center justify-center transition-all duration-300 ${isHovered ? dept.glowClass : ""}`}>
                  <dept.icon className={`w-6 h-6 ${dept.color}`} />
                </div>
                <p className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-body text-xs transition-colors ${isHovered ? "text-foreground" : "text-muted-foreground"}`}>
                  {dept.name}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Hover info */}
        <AnimatePresence>
          {hovered && !selected && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-center max-w-md mx-auto"
            >
              <p className="font-body text-sm text-muted-foreground">
                {departments.find((d) => d.id === hovered)?.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
            >
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSelected(null)} />
              <div className="relative glass-strong rounded-2xl p-8 max-w-lg w-full z-10">
                <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl glass flex items-center justify-center ${selected.glowClass}`}>
                    <selected.icon className={`w-7 h-7 ${selected.color}`} />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold">{selected.name}</h3>
                    <p className="font-body text-xs text-muted-foreground">Departamento QuantumHub</p>
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-heading text-xs uppercase tracking-wider text-muted-foreground mb-1">Descripción</h4>
                    <p className="font-body text-sm text-foreground/80">{selected.description}</p>
                  </div>
                  <div>
                    <h4 className="font-heading text-xs uppercase tracking-wider text-muted-foreground mb-1">Misión</h4>
                    <p className="font-body text-sm text-foreground/80">{selected.mission}</p>
                  </div>
                </div>
                <a href={selected.path} className="btn-quantum inline-flex items-center gap-2 text-xs">
                  Ver Departamento <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DepartmentsSection;
