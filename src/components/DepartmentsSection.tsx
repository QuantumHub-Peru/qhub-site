import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Atom, BookOpen, Lightbulb, Megaphone, Users, ArrowRight, X, Zap, Globe, Target } from "lucide-react";
import { Link } from "react-router-dom";

interface Department {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  hslColor: string;
  angle: number;
  description: string;
  mission: string;
  highlights: string[];
  path: string;
}

const departments: Department[] = [
  {
    id: "investigacion", name: "Investigación", subtitle: "Research & Discovery",
    icon: Atom, color: "text-dept-research", hslColor: "210 100% 60%",
    angle: -90,
    description: "Desarrollo de investigación de frontera en computación cuántica, algoritmos, simulación y aplicaciones para problemas reales de LATAM.",
    mission: "Producir investigación de impacto global desde Latinoamérica.",
    highlights: ["Papers en arXiv", "Colaboración internacional", "Algoritmos variacionales"],
    path: "/investigacion",
  },
  {
    id: "academico", name: "Académico", subtitle: "Education & Curriculum",
    icon: BookOpen, color: "text-dept-academic", hslColor: "270 70% 55%",
    angle: -18,
    description: "Diseño curricular, programas educativos y cursos en tecnologías cuánticas accesibles para toda la región.",
    mission: "Democratizar la educación cuántica en toda Latinoamérica.",
    highlights: ["Cursos estructurados", "Contenido self-paced", "Mentorías"],
    path: "/academico",
  },
  {
    id: "innovacion", name: "Innovación", subtitle: "Tech & Startups",
    icon: Lightbulb, color: "text-dept-innovation", hslColor: "175 80% 50%",
    angle: 54,
    description: "Exploración de aplicaciones prácticas, startups cuánticas y transferencia de tecnología al sector productivo.",
    mission: "Conectar la investigación cuántica con soluciones reales.",
    highlights: ["Hackathons", "Proyectos aplicados", "Alianzas industria"],
    path: "/innovacion",
  },
  {
    id: "relaciones", name: "Relaciones Públicas", subtitle: "Outreach & Alliances",
    icon: Megaphone, color: "text-dept-relations", hslColor: "45 100% 55%",
    angle: 126,
    description: "Comunicación estratégica, alianzas institucionales y difusión del ecosistema cuántico en LATAM.",
    mission: "Amplificar la voz de la computación cuántica en la región.",
    highlights: ["Alianzas globales", "Media coverage", "Branding cuántico"],
    path: "/relaciones-publicas",
  },
  {
    id: "comunidad", name: "Comunidad", subtitle: "Network & People",
    icon: Users, color: "text-dept-community", hslColor: "330 70% 60%",
    angle: 198,
    description: "Construcción de la red más grande de entusiastas, estudiantes y profesionales cuánticos de Latinoamérica.",
    mission: "Crear la comunidad cuántica más activa de LATAM.",
    highlights: ["Meetups presenciales", "Discord activo", "Mentoría peer-to-peer"],
    path: "/comunidad",
  },
];

const DepartmentsSection = () => {
  const [selected, setSelected] = useState<Department | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const radius = 200;

  return (
    <section className="relative py-32 section-dark overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 quantum-grid opacity-10 animate-grid-flow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px]" />

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <p className="font-heading text-xs tracking-[0.3em] text-primary uppercase mb-4">Ecosistema</p>
          <h2 className="font-heading text-2xl md:text-4xl font-bold mb-3">
            Nuestros <span className="text-gradient-quantum">Departamentos</span>
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-lg mx-auto">
            Un sistema vivo de nodos interconectados, cada uno impulsando una dimensión del ecosistema cuántico.
          </p>
        </motion.div>

        {/* Orbital + info side by side on desktop */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">

          {/* Orbital visualization */}
          <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center shrink-0">
            {/* Orbit rings */}
            <div className="absolute w-[400px] h-[400px] rounded-full border border-border/15" />
            <div className="absolute w-[300px] h-[300px] rounded-full border border-border/10" />
            <div className="absolute w-[200px] h-[200px] rounded-full border border-border/5" />

            {/* Animated glow ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="absolute w-[400px] h-[400px] rounded-full"
              style={{
                background: "conic-gradient(from 0deg, transparent 0%, hsl(270 80% 60% / 0.15) 25%, transparent 50%, hsl(330 80% 60% / 0.1) 75%, transparent 100%)",
              }}
            />

            {/* Core */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-quantum-pink flex items-center justify-center glow-purple z-10 relative"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-quantum-pink opacity-50 blur-xl" />
              <span className="font-heading text-sm font-bold text-primary-foreground tracking-wider relative z-10">QH</span>
            </motion.div>

            {/* Department nodes */}
            {departments.map((dept) => {
              const rad = (dept.angle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;
              const isHovered = hovered === dept.id;
              const isSelected = selected?.id === dept.id;

              return (
                <motion.button
                  key={dept.id}
                  className="absolute z-20"
                  style={{ left: `calc(50% + ${x}px - 32px)`, top: `calc(50% + ${y}px - 32px)` }}
                  onMouseEnter={() => setHovered(dept.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setSelected(dept)}
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Connection line */}
                  <svg className="absolute pointer-events-none" style={{ width: "400px", height: "400px", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
                    <line
                      x1="200" y1="200"
                      x2={200 - x} y2={200 - y}
                      stroke={isHovered || isSelected ? `hsl(${dept.hslColor})` : "hsl(222 30% 18%)"}
                      strokeWidth={isHovered || isSelected ? "2" : "1"}
                      opacity={isHovered || isSelected ? 0.7 : 0.2}
                      className="transition-all duration-500"
                    />
                    {/* Energy pulse along line */}
                    {(isHovered || isSelected) && (
                      <circle r="3" fill={`hsl(${dept.hslColor})`} opacity="0.8">
                        <animateMotion
                          dur="1.5s"
                          repeatCount="indefinite"
                          path={`M200,200 L${200 - x},${200 - y}`}
                        />
                      </circle>
                    )}
                  </svg>

                  {/* Node */}
                  <div
                    className={`relative w-16 h-16 rounded-2xl glass flex items-center justify-center transition-all duration-500 ${
                      isHovered || isSelected ? "border-primary/40" : ""
                    }`}
                    style={{
                      boxShadow: isHovered || isSelected ? `0 0 30px hsl(${dept.hslColor} / 0.4), 0 0 60px hsl(${dept.hslColor} / 0.15)` : "none",
                    }}
                  >
                    <dept.icon className={`w-7 h-7 ${dept.color} transition-all duration-300 ${isHovered ? "scale-110" : ""}`} />
                  </div>

                  {/* Label */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                    <p className={`font-heading text-[10px] font-bold transition-colors duration-300 ${isHovered || isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                      {dept.name}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Info panel (right side on desktop) */}
          <div className="w-full lg:w-96 min-h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {hovered && !selected ? (
                <motion.div
                  key={`hover-${hovered}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass rounded-2xl p-6 w-full"
                >
                  {(() => {
                    const dept = departments.find((d) => d.id === hovered)!;
                    return (
                      <>
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className="w-10 h-10 rounded-xl glass flex items-center justify-center"
                            style={{ boxShadow: `0 0 20px hsl(${dept.hslColor} / 0.3)` }}
                          >
                            <dept.icon className={`w-5 h-5 ${dept.color}`} />
                          </div>
                          <div>
                            <h4 className="font-heading text-sm font-bold">{dept.name}</h4>
                            <p className="font-body text-[10px] text-muted-foreground">{dept.subtitle}</p>
                          </div>
                        </div>
                        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">{dept.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {dept.highlights.map((h) => (
                            <span key={h} className="px-2 py-0.5 rounded-full text-[10px] font-body bg-primary/10 text-primary/70">{h}</span>
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              ) : !selected ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center lg:text-left px-4"
                >
                  <div className="flex items-center gap-2 justify-center lg:justify-start mb-3 text-muted-foreground">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="font-body text-xs">Interactúa con los nodos</span>
                  </div>
                  <p className="font-body text-sm text-muted-foreground/60 leading-relaxed">
                    Pasa el cursor sobre cada departamento para descubrir su misión, o haz clic para ver más detalles.
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        {/* Expanded modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            >
              <div className="absolute inset-0 bg-background/85 backdrop-blur-md" onClick={() => setSelected(null)} />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative glass-strong rounded-2xl p-8 max-w-lg w-full z-10"
              >
                <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-4 h-4" />
                </button>

                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl glass flex items-center justify-center"
                    style={{ boxShadow: `0 0 30px hsl(${selected.hslColor} / 0.4)` }}
                  >
                    <selected.icon className={`w-8 h-8 ${selected.color}`} />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold">{selected.name}</h3>
                    <p className="font-body text-xs text-muted-foreground">{selected.subtitle}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-5 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-3.5 h-3.5 text-primary" />
                      <h4 className="font-heading text-xs uppercase tracking-wider text-muted-foreground">Descripción</h4>
                    </div>
                    <p className="font-body text-sm text-foreground/80 leading-relaxed">{selected.description}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-3.5 h-3.5 text-primary" />
                      <h4 className="font-heading text-xs uppercase tracking-wider text-muted-foreground">Misión</h4>
                    </div>
                    <p className="font-body text-sm text-foreground/80 leading-relaxed">{selected.mission}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-3.5 h-3.5 text-primary" />
                      <h4 className="font-heading text-xs uppercase tracking-wider text-muted-foreground">Highlights</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selected.highlights.map((h) => (
                        <span key={h} className="px-3 py-1 rounded-full text-xs font-body bg-primary/10 text-primary/80 border border-primary/20">{h}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  to={selected.path}
                  className="btn-quantum inline-flex items-center gap-2 text-xs w-full justify-center"
                  onClick={() => setSelected(null)}
                >
                  Ver Departamento <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DepartmentsSection;
