import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Atom, BookOpen, Lightbulb, Megaphone, Users, ArrowRight, Zap, Target, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line, Billboard, Text } from "@react-three/drei";
import * as THREE from "three";

const deptImg1 = "/investigación.png"; {/* investigación */ }
const deptImg2 = "/académico.png"; {/* académico */ }
const deptImg3 = "/innovación.png"; {/* innovación*/ }
const deptImg4 = "/relacionespublicas.png"; {/* relaciones */ }
const deptImg5 = "/comunidad.png"; {/* comunidad */ }

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
  image: string;
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
    image: deptImg1,
  },
  {
    id: "academico", name: "Académico", subtitle: "Education & Curriculum",
    icon: BookOpen, color: "text-dept-academic", hslColor: "270 70% 55%",
    angle: -18,
    description: "Diseño curricular, programas educativos y cursos en tecnologías cuánticas accesibles para toda la región.",
    mission: "Democratizar la educación cuántica en toda Latinoamérica.",
    highlights: ["Cursos estructurados", "Contenido self-paced", "Mentorías"],
    path: "/academico",
    image: deptImg2,
  },
  {
    id: "innovacion", name: "Innovación", subtitle: "EDTECH & SOFTWARE",
    icon: Lightbulb, color: "text-dept-innovation", hslColor: "175 80% 50%",
    angle: 54,
    description: "Ampliación del acceso a la computación cuántica mediante productos digitales y software especializado",
    mission: "Conectar la investigación cuántica con soluciones reales.",
    highlights: ["Software", "Edtech"],
    path: "/innovacion",
    image: deptImg3,
  },
  {
    id: "relaciones", name: "Relaciones Públicas", subtitle: "Outreach & Alliances",
    icon: Megaphone, color: "text-dept-relations", hslColor: "45 100% 55%",
    angle: 126,
    description: "Comunicación estratégica, alianzas institucionales y difusión del ecosistema cuántico en LATAM.",
    mission: "Amplificar la voz de la computación cuántica en la región.",
    highlights: ["Alianzas globales", "Media coverage", "Branding cuántico"],
    path: "/relaciones-publicas",
    image: deptImg4,
  },
  {
    id: "comunidad", name: "Comunidad", subtitle: "Network & People",
    icon: Users, color: "text-dept-community", hslColor: "330 70% 60%",
    angle: 198,
    description: "Construcción de la red más grande de entusiastas, estudiantes y profesionales cuánticos de Latinoamérica.",
    mission: "Crear la comunidad cuántica más activa de LATAM.",
    highlights: ["Meetups presenciales", "Discord activo", "Mentoría peer-to-peer"],
    path: "/comunidad",
    image: deptImg5,
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
    className="glass-strong bg-background/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] group h-full flex flex-col relative z-20 pointer-events-auto"
    style={{ boxShadow: `0 0 0 1px hsl(${dept.hslColor} / 0.2), 0 10px 40px -10px hsl(${dept.hslColor} / 0.15)` }}
  >
    <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] opacity-20 pointer-events-none" style={{ backgroundColor: `hsl(${dept.hslColor})` }} />

    <div className="w-full h-40 mb-6 rounded-2xl overflow-hidden relative z-10 shrink-0 border border-white/10 group-hover:border-white/20 transition-colors">
      <img src={dept.image} alt={dept.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
    </div>

    <div className="flex items-center gap-4 mb-5 relative z-10">
      <div
        className="w-14 h-14 shrink-0 rounded-2xl bg-black/40 flex items-center justify-center border border-white/5"
        style={{ boxShadow: `inset 0 0 15px hsl(${dept.hslColor} / 0.3)` }}
      >
        <dept.icon className="w-7 h-7" style={{ color: `hsl(${dept.hslColor})` }} />
      </div>
      <div>
        <h4 className="font-heading text-2xl font-bold text-white tracking-wide">{dept.name}</h4>
        <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">{dept.subtitle}</p>
      </div>
    </div>

    <div className="relative z-10 flex-grow mb-6 min-h-[72px] flex flex-col justify-between">
      <p className="font-body text-sm text-foreground/80 leading-relaxed line-clamp-3">
        {dept.description}
      </p>
      {dept.description.length > 90 && (
        <span className="text-xs font-semibold mt-1 inline-block" style={{ color: `hsl(${dept.hslColor})` }}>ver más...</span>
      )}
    </div>

    <div className="flex flex-wrap gap-2 mb-6 relative z-10">
      {dept.highlights.slice(0, 2).map((h) => (
        <span key={h} className="px-2 py-1 rounded-md text-[10px] font-body bg-white/5 border border-white/10 text-white/70">
          {h}
        </span>
      ))}
    </div>

    <Link
      to={dept.path}
      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors relative z-10 hover:brightness-125 mt-auto pt-4 border-t border-white/5"
      style={{ color: `hsl(${dept.hslColor})` }}
    >
      <span>Explorar Departamento</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </Link>
  </motion.div>
);

const DepartmentsSection = () => {
  return (
    <section className="relative pt-12 pb-1 section-dark overflow-hidden">
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
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black mb-6">
            Nuestros <span className="text-gradient-quantum">Departamentos</span>
          </h2>
          <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto">
            Un sistema vivo de nodos interconectados. Cada departamento expande una dimensión clave hacia la misión de democratizar la tecnología cuántica.
          </p>
        </motion.div>

        {/* Layout for all screens - max 3 per row */}
        <div className="flex flex-wrap justify-center gap-6 max-w-[1200px] mx-auto pb-10">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0"
            >
              <div className="w-full h-full">
                <DepartmentCard dept={dept} />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DepartmentsSection;
