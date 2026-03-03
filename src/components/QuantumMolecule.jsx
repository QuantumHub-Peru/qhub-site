import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';

export default function QuantumMolecule({ color = "#A855F7", speed = 2, distort = 0.4 }) {
    return (
        // El canvas ocupa el fondo absoluto de la tarjeta
        <div className="absolute inset-0 w-full h-full -z-10 opacity-60">
            <Canvas camera={{ position: [0, 0, 5] }} gl={{ alpha: true }}>
                {/* Iluminación para dar el efecto 3D brillante */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={2} color="white" />
                <spotLight position={[-10, -10, -10]} intensity={1} color={color} />

                {/* Fondo de estrellas sutil para el toque espacial/cuántico */}
                <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

                {/* El objeto 3D flotante */}
                <Float speed={3} rotationIntensity={2} floatIntensity={2}>
                    <Sphere args={[1.5, 64, 64]}>
                        <MeshDistortMaterial
                            color={color}
                            envMapIntensity={1}
                            clearcoat={1}
                            clearcoatRoughness={0.1}
                            metalness={0.6}
                            roughness={0.2}
                            distort={distort} // Cuánto se deforma la esfera
                            speed={speed}     // Qué tan rápido se mueve
                        />
                    </Sphere>
                </Float>
            </Canvas>
        </div>
    );
}