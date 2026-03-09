import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Atom, BookOpen, Lightbulb, Megaphone, Users, ArrowRight, Zap, Target, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line, Billboard, Text } from "@react-three/drei";
import * as THREE from "three";

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
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial color={color} transparent opacity={0.2} wireframe />
    </mesh>
  );
};

const Lines = ({ theta, phi }: { theta: number, phi: number }) => {
  const pointsMeridian = [];
  const pointsParallel = [];
  const radius = 1.5;

  for (let i = 0; i <= 100; i++) {
    const angle = (i / 100) * 2 * Math.PI;
    pointsMeridian.push(
      new THREE.Vector3(
        radius * Math.sin(angle) * Math.cos(phi),
        radius * Math.sin(angle) * Math.sin(phi),
        radius * Math.cos(angle)
      )
    );
  }

  for (let i = 0; i <= 100; i++) {
    const angle = (i / 100) * 2 * Math.PI;
    pointsParallel.push(
      new THREE.Vector3(
        radius * Math.sin(theta) * Math.cos(angle),
        radius * Math.sin(theta) * Math.sin(angle),
        radius * Math.cos(theta)
      )
    );
  }

  const intersectionPoint = new THREE.Vector3(
    radius * Math.sin(theta) * Math.cos(phi),
    radius * Math.sin(theta) * Math.sin(phi),
    radius * Math.cos(theta)
  );

  const intersectionLinePoints = [
    new THREE.Vector3(0, 0, 0),
    intersectionPoint,
  ];

  return (
    <>
      <Line points={pointsMeridian} color="#00A4EF" lineWidth={3} />
      <Line points={pointsParallel} color="#FF0080" lineWidth={3} />
      <Line points={intersectionLinePoints} color="#856BFF" lineWidth={5} />
    </>
  );
};

const Axes = () => {
  const axisLength = 2.2;
  return (
    <>
      <Line points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(axisLength, 0, 0)]} color="#FF0080" lineWidth={2} />
      <Billboard position={[axisLength + 0.2, 0, 0]}><Text fontSize={0.3} color="white">X</Text></Billboard>
      <Line points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, axisLength, 0)]} color="#10B981" lineWidth={2} />
      <Billboard position={[0, axisLength + 0.2, 0]}><Text fontSize={0.3} color="white">Y</Text></Billboard>
      <Line points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, axisLength)]} color="#00A4EF" lineWidth={2} />
      <Billboard position={[0, 0, axisLength + 0.2]}><Text fontSize={0.3} color="white">Z</Text></Billboard>
    </>
  );
};

const DepartmentCard = ({ dept }: { dept: Department }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="glass-strong bg-background/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] group w-[320px] min-h-[280px] flex flex-col relative z-20 pointer-events-auto"
    style={{ boxShadow: `0 0 0 1px hsl(${dept.hslColor} / 0.2), 0 10px 40px -10px hsl(${dept.hslColor} / 0.15)` }}
  >
    <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] opacity-20 pointer-events-none" style={{ backgroundColor: `hsl(${dept.hslColor})` }} />

    <div className="flex items-center gap-4 mb-4 relative z-10">
      <div
        className="w-12 h-12 shrink-0 rounded-2xl bg-black/40 flex items-center justify-center border border-white/5"
        style={{ boxShadow: `inset 0 0 15px hsl(${dept.hslColor} / 0.3)` }}
      >
        <dept.icon className="w-6 h-6" style={{ color: `hsl(${dept.hslColor})` }} />
      </div>
      <div>
        <h4 className="font-heading text-lg font-bold text-white tracking-wide">{dept.name}</h4>
        <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">{dept.subtitle}</p>
      </div>
    </div>

    <p className="font-body text-sm text-foreground/80 leading-relaxed mb-5 relative z-10 flex-grow">
      {dept.description}
    </p>

    <div className="flex flex-wrap gap-2 mb-6 relative z-10">
      {dept.highlights.slice(0, 2).map((h) => (
        <span key={h} className="px-2 py-1 rounded-md text-[10px] font-body bg-white/5 border border-white/10 text-white/70">
          {h}
        </span>
      ))}
    </div>

    <Link
      to={dept.path}
      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors relative z-10 hover:brightness-125"
      style={{ color: `hsl(${dept.hslColor})` }}
    >
      <span>Explorar Departamento</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </Link>
  </motion.div>
);

const DepartmentsSection = () => {
  const theta = (Math.PI * 3) / 10;
  const phi = (Math.PI * 7) / 12;
  const radius = 380; // Distance of cards from center on desktop

  return (
    <section className="relative py-32 section-dark overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 quantum-grid opacity-10 animate-grid-flow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-heading text-xs tracking-[0.3em] text-primary uppercase mb-4">Ecosistema</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Nuestros <span className="text-gradient-quantum">Departamentos</span>
          </h2>
          <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto">
            Un sistema vivo de nodos interconectados. Cada departamento expande una dimensión clave hacia la misión de democratizar la tecnología cuántica.
          </p>
        </motion.div>

        {/* Desktop Orbital Layout (Hidden on small screens) */}
        <div className="hidden xl:flex relative w-full h-[900px] items-center justify-center mt-24 pointer-events-none max-w-[1200px] mx-auto">

          {/* The Sphere in the center */}
          <div className="absolute inset-0 flex items-center justify-center z-10 w-[500px] h-[500px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Canvas camera={{ position: [4, 2, 6], up: [0, 1, 0] }}>
              <ambientLight intensity={1} />
              <spotLight position={[15, 20, 5]} angle={0.9} />
              <Sphere color="lightblue" />
              <Lines theta={theta} phi={phi} />
              <Axes />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.0} />
            </Canvas>
          </div>

          {/* Connecting SVG Lines */}
          <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            <defs>
              <radialGradient id="centerGlow">
                <stop offset="0%" stopColor="rgba(133, 107, 255, 0.4)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <circle cx="50%" cy="50%" r="200" fill="url(#centerGlow)" />
            {departments.map((dept) => {
              const rad = (dept.angle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;
              return (
                <line
                  key={`line-${dept.id}`}
                  x1="50%" y1="50%"
                  x2={`calc(50% + ${x}px)`} y2={`calc(50% + ${y}px)`}
                  stroke={`hsl(${dept.hslColor} / 0.4)`}
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />
              );
            })}
          </svg>

          {/* Orbiting Cards */}
          {departments.map((dept) => {
            const rad = (dept.angle * Math.PI) / 180;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;
            return (
              <div
                key={`card-${dept.id}`}
                className="absolute z-20"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <DepartmentCard dept={dept} />
              </div>
            );
          })}
        </div>

        {/* Tablet/Mobile Layout */}
        <div className="xl:hidden flex flex-col items-center gap-10 mt-10">
          {/* Sphere Visualization for Mobile */}
          <div className="w-full h-[400px] relative pointer-events-auto">
            <Canvas camera={{ position: [4, 2, 6], up: [0, 1, 0] }}>
              <ambientLight intensity={1} />
              <spotLight position={[15, 20, 5]} angle={0.9} />
              <Sphere color="lightblue" />
              <Lines theta={theta} phi={phi} />
              <Axes />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
            </Canvas>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 w-full max-w-4xl mx-auto pb-10">
            {departments.map((dept) => (
              <div key={dept.id} className="flex justify-center w-full">
                <DepartmentCard dept={dept} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default DepartmentsSection;
