import { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

interface DeptNode {
  id: string;
  name: string;
  label: string;
  position: [number, number, number];
  color: string;
  path: string;
}

const deptNodes: DeptNode[] = [
  { id: "investigacion", name: "Investigación", label: "|I⟩", position: [0, 1.3, 0], color: "#3B82F6", path: "/investigacion" },
  { id: "comunidad", name: "Comunidad", label: "|C⟩", position: [0, -1.3, 0], color: "#EC4899", path: "/comunidad" },
  { id: "academico", name: "Académico", label: "|A⟩", position: [1.3, 0, 0], color: "#8B5CF6", path: "/academico" },
  { id: "innovacion", name: "Innovación", label: "|N⟩", position: [-0.9, 0, 0.9], color: "#14B8A6", path: "/innovacion" },
  { id: "relaciones", name: "Relaciones Públicas", label: "|R⟩", position: [-0.9, 0, -0.9], color: "#EAB308", path: "/relaciones-publicas" },
];

function WireframeSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.05;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.15, 24, 24]} />
      <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.08} />
    </mesh>
  );
}

function Axes() {
  const axes: Array<{ from: [number, number, number]; to: [number, number, number] }> = [
    { from: [0, -1.4, 0], to: [0, 1.4, 0] },
    { from: [-1.4, 0, 0], to: [1.4, 0, 0] },
    { from: [0, 0, -1.4], to: [0, 0, 1.4] },
  ];
  return (
    <>
      {axes.map((a, i) => (
        <Line key={i} points={[a.from, a.to]} color="#7c3aed" lineWidth={0.5} transparent opacity={0.2} />
      ))}
    </>
  );
}

function EquatorRing() {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * 1.15, 0, Math.sin(angle) * 1.15));
    }
    return pts;
  }, []);
  return <Line points={points} color="#7c3aed" lineWidth={1} transparent opacity={0.15} />;
}

function DeptPoint({
  node,
  onHover,
  onClick,
  isHovered,
}: {
  node: DeptNode;
  onHover: (id: string | null) => void;
  onClick: (node: DeptNode) => void;
  isHovered: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      const targetScale = isHovered ? 1.6 : 1;
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);
    }
    if (glowRef.current) {
      glowRef.current.scale.lerp(
        new THREE.Vector3(isHovered ? 3 : 1.8, isHovered ? 3 : 1.8, isHovered ? 3 : 1.8),
        delta * 6
      );
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = isHovered ? 0.25 : 0.08;
    }
  });

  return (
    <group position={node.position}>
      {/* Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={node.color} transparent opacity={0.08} />
      </mesh>
      {/* Point */}
      <mesh
        ref={ref}
        onPointerEnter={() => onHover(node.id)}
        onPointerLeave={() => onHover(null)}
        onClick={() => onClick(node)}
      >
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={node.color} />
      </mesh>
      {/* Label */}
      <Text
        position={[0, 0.2, 0]}
        fontSize={0.12}
        color={isHovered ? "#ffffff" : "#9ca3af"}
        anchorX="center"
        anchorY="bottom"
        font="/fonts/Inter-Regular.woff"
      >
        {node.label}
      </Text>
    </group>
  );
}

function StateVector() {
  const ref = useRef<THREE.Group>(null);
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += delta * 0.3;
    if (ref.current) {
      const theta = Math.PI * 0.3 + Math.sin(t.current) * 0.2;
      const phi = t.current * 0.5;
      ref.current.rotation.set(0, 0, 0);
      ref.current.lookAt(
        Math.sin(theta) * Math.cos(phi),
        Math.cos(theta),
        Math.sin(theta) * Math.sin(phi)
      );
    }
  });

  return (
    <group ref={ref}>
      <Line points={[[0, 0, 0], [0, 0, 1.15]]} color="#ec4899" lineWidth={2} transparent opacity={0.6} />
      <mesh position={[0, 0, 1.15]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial color="#ec4899" />
      </mesh>
    </group>
  );
}

function Scene({
  onHover,
  onClick,
  hoveredId,
}: {
  onHover: (id: string | null) => void;
  onClick: (node: DeptNode) => void;
  hoveredId: string | null;
}) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <WireframeSphere />
      <Axes />
      <EquatorRing />
      <StateVector />
      {deptNodes.map((node) => (
        <DeptPoint
          key={node.id}
          node={node}
          onHover={onHover}
          onClick={onClick}
          isHovered={hoveredId === node.id}
        />
      ))}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.8}
      />
    </>
  );
}

interface BlochSphereProps {
  onNavigate?: (path: string) => void;
}

const BlochSphere = ({ onNavigate }: BlochSphereProps) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredNode = deptNodes.find((n) => n.id === hovered);

  const handleClick = (node: DeptNode) => {
    onNavigate?.(node.path);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="aspect-square rounded-3xl overflow-hidden glass border border-border/30 relative">
        {/* Labels */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="font-heading text-[10px] tracking-wider text-primary/50">|0⟩</span>
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
          <span className="font-heading text-[10px] tracking-wider text-primary/50">|1⟩</span>
        </div>

        <Canvas camera={{ position: [2.5, 1.5, 2.5], fov: 40 }}>
          <Suspense fallback={null}>
            <Scene onHover={setHovered} onClick={handleClick} hoveredId={hovered} />
          </Suspense>
        </Canvas>
      </div>

      {/* Info panel */}
      <AnimatePresence>
        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 glass rounded-xl px-5 py-3 text-center whitespace-nowrap z-20"
          >
            <p className="font-heading text-xs font-bold" style={{ color: hoveredNode.color }}>
              {hoveredNode.name}
            </p>
            <p className="font-body text-[10px] text-muted-foreground">Click para explorar →</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlochSphere;
