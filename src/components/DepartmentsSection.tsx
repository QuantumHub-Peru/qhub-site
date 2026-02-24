import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Atom, BookOpen, Lightbulb, Megaphone, Users, ArrowRight, X, Zap, Globe, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line, Billboard, Text } from "@react-three/drei";
import * as THREE from "three";
import { createPortal } from "react-dom";

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

const Sphere = ({ color }: { color: string }) => {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} transparent opacity={0.2} wireframe />
    </mesh>
  );
};

const Lines = ({ theta, phi }: { theta: number, phi: number }) => {
  const pointsMeridian = [];
  const pointsParallel = [];

  for (let i = 0; i <= 100; i++) {
    const angle = (i / 100) * 2 * Math.PI;
    pointsMeridian.push(
      new THREE.Vector3(
        Math.sin(angle) * Math.cos(phi),
        Math.sin(angle) * Math.sin(phi),
        Math.cos(angle)
      )
    );
  }

  for (let i = 0; i <= 100; i++) {
    const angle = (i / 100) * 2 * Math.PI;
    pointsParallel.push(
      new THREE.Vector3(
        Math.sin(theta) * Math.cos(angle),
        Math.sin(theta) * Math.sin(angle),
        Math.cos(theta)
      )
    );
  }

  const intersectionPoint = new THREE.Vector3(
    Math.sin(theta) * Math.cos(phi),
    Math.sin(theta) * Math.sin(phi),
    Math.cos(theta)
  );

  const intersectionLinePoints = [
    new THREE.Vector3(0, 0, 0),
    intersectionPoint,
  ];

  return (
    <>
      {/* Quantum Blue */}
      <Line points={pointsMeridian} color="#00A4EF" lineWidth={4} />
      {/* Quantum Pink */}
      <Line points={pointsParallel} color="#FF0080" lineWidth={4} />
      {/* Primary Purple */}
      <Line points={intersectionLinePoints} color="#856BFF" lineWidth={7} />
    </>
  );
};

const Axes = () => {
  const axisLength = 1.5;

  return (
    <>
      <Line points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(axisLength, 0, 0)]} color="#FF0080" lineWidth={2} />
      <Billboard position={[axisLength + 0.1, 0, 0]}>
        <Text fontSize={0.25} color="white">X</Text>
      </Billboard>

      <Line points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, axisLength, 0)]} color="#10B981" lineWidth={2} />
      <Billboard position={[0, axisLength + 0.1, 0]}>
        <Text fontSize={0.25} color="white">Y</Text>
      </Billboard>

      <Line points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, axisLength)]} color="#00A4EF" lineWidth={2} />
      <Billboard position={[0, 0, axisLength + 0.1]}>
        <Text fontSize={0.25} color="white">Z</Text>
      </Billboard>
    </>
  );
};

const DepartmentsSection = () => {
  const [selected, setSelected] = useState<Department | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Responsive radius for departments layout
  const [radius, setRadius] = useState(220);

  useEffect(() => {
    const handleResize = () => {
      // Scale down radius smoothly across breakpoints
      if (window.innerWidth < 480) {
        setRadius(130);
      } else if (window.innerWidth < 640) {
        setRadius(160);
      } else if (window.innerWidth < 1024) {
        setRadius(200);
      } else {
        setRadius(220);
      }
    };

    // Initial call
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hardcode a dynamic-looking state for the Bloch vector pointing vaguely at one of the top categories
  const theta = (Math.PI * 3) / 10;
  const phi = (Math.PI * 7) / 12;

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
          <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center shrink-0 min-h-[350px] lg:min-h-0">

            {/* Starry Particles Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-full flex items-center justify-center">
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() * 3 + 1 + "px",
                    height: Math.random() * 3 + 1 + "px",
                    left: Math.random() * 100 + "%",
                    top: Math.random() * 100 + "%",
                    opacity: Math.random() * 0.5 + 0.3,
                  }}
                  animate={{
                    y: [0, Math.random() * -50 - 20],
                    x: [0, Math.random() * 40 - 20],
                    opacity: [Math.random() * 0.5 + 0.3, 0, Math.random() * 0.5 + 0.3],
                    scale: [1, Math.random() * 1.5 + 0.5, 1],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            {/* The React Three Fiber Bloch Sphere */}
            <div className="absolute inset-0 z-10 p-4">
              <Canvas camera={{ position: [2, 0, 4], up: [1, 0, 0] }}>
                <group rotation={[0, Math.PI / 2, 0]}>
                  <group rotation={[0, 0, 145 * (Math.PI / 180)]}>
                    <ambientLight intensity={1} />
                    <spotLight position={[15, 20, 5]} angle={0.9} />
                    <Sphere color="lightblue" />
                    <Lines theta={theta} phi={phi} />
                    <Axes />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
                  </group>
                </group>
              </Canvas>
            </div>

            {/* Department nodes (floating above) */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              {departments.map((dept) => {
                const rad = (dept.angle * Math.PI) / 180;
                const x = Math.cos(rad) * radius;
                const y = Math.sin(rad) * radius;
                const isHovered = hovered === dept.id;
                const isSelected = selected?.id === dept.id;

                return (
                  <motion.button
                    key={dept.id}
                    className="absolute z-20 pointer-events-auto"
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
                      className={`relative w-16 h-16 rounded-2xl glass flex items-center justify-center transition-all duration-500 ${isHovered || isSelected ? "border-primary/40" : ""
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
          </div>

          {/* Info panel (right side on desktop) */}
          <div className="w-full lg:w-96 min-h-[280px] flex items-center justify-center relative z-20">
            <AnimatePresence mode="wait">
              {hovered && !selected ? (
                <motion.div
                  key={`hover-${hovered}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-strong bg-background/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 w-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] transform transition-transform"
                >
                  {(() => {
                    const dept = departments.find((d) => d.id === hovered)!;
                    return (
                      <>
                        <div className="flex items-center gap-4 mb-5">
                          <div
                            className="w-14 h-14 rounded-2xl bg-black/40 flex items-center justify-center border border-white/5"
                            style={{ boxShadow: `0 0 20px hsl(${dept.hslColor} / 0.4)` }}
                          >
                            <dept.icon className={`w-7 h-7 ${dept.color}`} />
                          </div>
                          <div>
                            <h4 className="font-heading text-lg font-bold text-white tracking-wide">{dept.name}</h4>
                            <p className="font-body text-xs text-muted-foreground">{dept.subtitle}</p>
                          </div>
                        </div>
                        <p className="font-body text-sm text-foreground/80 leading-relaxed mb-6">{dept.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {dept.highlights.map((h) => (
                            <span key={h} className="px-3 py-1 rounded-full text-[10px] font-body bg-primary/10 text-primary border border-primary/20">{h}</span>
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

        {/* Expanded modal (Fixed z-index and redesigned) */}
        {createPortal(
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
              >
                {/* Full screen backdrop blur */}
                <div
                  className="absolute inset-0 bg-background/60 backdrop-blur-2xl transition-all duration-300"
                  onClick={() => setSelected(null)}
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 30 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="relative bg-[#080B14]/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 sm:p-10 max-w-lg w-full z-10 overflow-hidden"
                  style={{
                    boxShadow: `0 0 0 1px hsl(${selected.hslColor} / 0.2), 0 30px 60px -15px rgba(0,0,0,0.8), 0 0 80px -20px hsl(${selected.hslColor} / 0.15)`
                  }}
                >
                  {/* Decorative Glowing Orbs behind the card */}
                  <div
                    className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[80px] opacity-30 pointer-events-none"
                    style={{ backgroundColor: `hsl(${selected.hslColor})` }}
                  />
                  <div
                    className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none"
                    style={{ backgroundColor: `hsl(${selected.hslColor})` }}
                  />

                  {/* Close Button */}
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/5 flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 z-20 group"
                  >
                    <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  </button>

                  {/* Header Section */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10 relative z-10 text-center sm:text-left">
                    <div
                      className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-[1.5rem] bg-gradient-to-br from-black/80 to-black/40 flex items-center justify-center border border-white/10 relative group"
                    >
                      <div
                        className="absolute inset-0 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ boxShadow: `inset 0 0 20px hsl(${selected.hslColor} / 0.3)` }}
                      />
                      <selected.icon
                        className="w-10 h-10 sm:w-12 sm:h-12 relative z-10 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-transform duration-500 group-hover:scale-110"
                        style={{ color: `hsl(${selected.hslColor})` }}
                      />
                    </div>
                    <div className="pt-2">
                      <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-wide mb-1">
                        {selected.name}
                      </h3>
                      <div
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border"
                        style={{
                          backgroundColor: `hsl(${selected.hslColor} / 0.1)`,
                          color: `hsl(${selected.hslColor})`,
                          borderColor: `hsl(${selected.hslColor} / 0.2)`
                        }}
                      >
                        {selected.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Vertical Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

                  {/* Content Sections */}
                  <div className="space-y-8 mb-10 relative z-10">
                    {/* Descripción */}
                    <div className="group">
                      <div className="flex items-center gap-2 mb-3">
                        <Globe className="w-4 h-4" style={{ color: `hsl(${selected.hslColor})` }} />
                        <h4 className="font-heading text-xs uppercase tracking-[0.2em] font-bold text-white/70">Descripción</h4>
                      </div>
                      <p className="font-body text-[15px] sm:text-base text-white/60 leading-relaxed font-light group-hover:text-white/80 transition-colors">
                        {selected.description}
                      </p>
                    </div>

                    {/* Misión */}
                    <div className="group">
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="w-4 h-4" style={{ color: `hsl(${selected.hslColor})` }} />
                        <h4 className="font-heading text-xs uppercase tracking-[0.2em] font-bold text-white/70">Misión</h4>
                      </div>
                      <div className="pl-4 border-l-2" style={{ borderColor: `hsl(${selected.hslColor} / 0.4)` }}>
                        <p className="font-body text-[15px] sm:text-base text-white/80 font-medium leading-relaxed italic">
                          "{selected.mission}"
                        </p>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-4 h-4" style={{ color: `hsl(${selected.hslColor})` }} />
                        <h4 className="font-heading text-xs uppercase tracking-[0.2em] font-bold text-white/70">Highlights</h4>
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {selected.highlights.map((h, i) => (
                          <span
                            key={h}
                            className="px-4 py-2 rounded-xl text-xs font-body font-medium flex items-center gap-2 transition-all hover:scale-105"
                            style={{
                              backgroundColor: `hsl(${selected.hslColor} / 0.05)`,
                              color: `hsl(${selected.hslColor})`,
                              border: `1px solid hsl(${selected.hslColor} / 0.2)`,
                              boxShadow: `0 4px 12px hsl(${selected.hslColor} / 0.05)`
                            }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `hsl(${selected.hslColor})` }} />
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    to={selected.path}
                    className="relative w-full group overflow-hidden rounded-2xl p-[1px] inline-block z-10"
                    onClick={() => setSelected(null)}
                  >
                    <span
                      className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(90deg, transparent, hsl(${selected.hslColor} / 0.8), transparent)` }}
                    />
                    <div
                      className="relative px-8 py-4 bg-[#080B14] group-hover:bg-opacity-0 transition-colors duration-500 rounded-2xl flex items-center justify-center gap-3"
                      style={{ border: `1px solid hsl(${selected.hslColor} / 0.3)` }}
                    >
                      <span className="font-heading text-sm font-bold tracking-widest uppercase text-white">
                        Ver Departamento
                      </span>
                      <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </div>
    </section >
  );
};

export default DepartmentsSection;
