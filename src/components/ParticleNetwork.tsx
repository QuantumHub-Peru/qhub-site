import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    radius: number;
    vx: number;
    vy: number;
    color: string;
}

interface ParticleNetworkProps {
    particleCount?: number;
    connectionDistance?: number;
    speed?: number;
    colors?: string[];
}

const ParticleNetwork: React.FC<ParticleNetworkProps> = ({
    particleCount = 50,
    connectionDistance = 150,
    speed = 0.5,
    colors = ['#8b5cf6', '#d946ef', '#3b82f6', '#f59e0b', '#14b8a6'] // quantum-purple, quantum-pink, quantum-blue, quantum-yellow, quantum-turquoise
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameId = useRef<number>();
    const particles = useRef<Particle[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width;
        let height = canvas.height;

        const initParticles = () => {
            particles.current = [];
            for (let i = 0; i < particleCount; i++) {
                particles.current.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 2 + 1,
                    vx: (Math.random() - 0.5) * speed,
                    vy: (Math.random() - 0.5) * speed,
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }
        };

        const handleResize = () => {
            if (canvas.parentElement) {
                width = canvas.parentElement.clientWidth;
                height = canvas.parentElement.clientHeight;
                canvas.width = width;
                canvas.height = height;
                initParticles();
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        const drawParticles = () => {
            ctx.clearRect(0, 0, width, height);

            // Update particle positions
            particles.current.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x < 0 || particle.x > width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > height) particle.vy *= -1;

                // Draw particle (node)
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                // Make them glow
                ctx.shadowBlur = 10;
                ctx.shadowColor = particle.color;
                ctx.fill();
                ctx.shadowBlur = 0; // Reset for lines
            });

            // Draw connections
            for (let i = 0; i < particles.current.length; i++) {
                for (let j = i + 1; j < particles.current.length; j++) {
                    const p1 = particles.current[i];
                    const p2 = particles.current[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        // Draw line
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);

                        // Calculate opacity based on distance
                        const opacity = 1 - (distance / connectionDistance);

                        // Gradient line for current flow effect
                        const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                        gradient.addColorStop(0, `${p1.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
                        gradient.addColorStop(1, `${p2.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);

                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId.current = requestAnimationFrame(drawParticles);
        };

        drawParticles();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [particleCount, connectionDistance, speed, colors]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-60 mix-blend-screen"
            style={{ zIndex: 0 }}
        />
    );
};

export default ParticleNetwork;
