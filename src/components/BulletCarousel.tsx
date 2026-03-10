import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

interface Bullet {
    title: string;
    shortTitle?: string;
    description: string;
    keyPoints?: string[];
    images?: string[];
}

interface BulletCarouselProps {
    bullets: Bullet[];
    hslColor: string;
}

export default function BulletCarousel({ bullets, hslColor }: BulletCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % bullets.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + bullets.length) % bullets.length);
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto py-8 lg:py-16 flex flex-col items-center justify-center overflow-hidden">

            {/* Visual Title / Context */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-10"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: `hsl(${hslColor})` }} />
                    <span className="text-xs font-heading tracking-widest uppercase text-white/70">Puntos Clave</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">
                    Nuestra <span style={{ color: `hsl(${hslColor})` }}>Propuesta</span>
                </h2>
            </motion.div>

            <div className="relative w-full h-[320px] flex items-center justify-center perspective-[1000px]">
                {bullets.map((bullet, index) => {
                    let position = index - currentIndex;
                    if (position < -1) position += bullets.length;
                    if (position > 2) position -= bullets.length;

                    const isActive = position === 0;
                    const isRight = position === 1;
                    const isLeft = position === -1;
                    const isBack = position === 2;

                    // Adjust positions
                    const translateX = isActive ? "0%" : isRight ? "105%" : isLeft ? "-105%" : "0%";
                    const scale = isActive ? 1 : isBack ? 0.7 : 0.85;
                    const opacity = isActive ? 1 : isBack ? 0 : 0.4;
                    const zIndex = isActive ? 30 : isBack ? 10 : 20;

                    return (
                        <motion.div
                            key={index}
                            initial={false}
                            animate={{
                                x: translateX,
                                scale: scale,
                                opacity: opacity,
                                zIndex: zIndex,
                            }}
                            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 25 }}
                            onClick={() => {
                                if (!isActive) setCurrentIndex(index);
                            }}
                            className="absolute w-[80%] sm:w-[320px] h-[240px] rounded-3xl cursor-pointer flex flex-col items-center justify-center p-8 text-center backdrop-blur-xl border"
                            style={{
                                backgroundColor: isActive ? `hsl(${hslColor} / 0.15)` : "rgba(15, 20, 34, 0.6)",
                                borderColor: isActive ? `hsl(${hslColor} / 0.3)` : "rgba(255,255,255,0.05)",
                                boxShadow: isActive ? `0 20px 50px -10px hsl(${hslColor} / 0.2)` : "none",
                            }}
                        >
                            {isActive && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 rounded-3xl blur-[50px] -z-10 pointer-events-none"
                                    style={{ backgroundColor: `hsl(${hslColor} / 0.15)` }}
                                />
                            )}

                            <CheckCircle2
                                className={`w-10 h-10 mb-5 transition-all duration-500 flex-shrink-0 ${isActive ? 'scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'opacity-40'}`}
                                style={{ color: isActive ? `hsl(${hslColor})` : "white" }}
                            />

                            <h4 className={`font-heading font-bold mb-3 transition-all duration-500 ${isActive ? 'text-xl text-white' : 'text-lg text-white/60'}`}>
                                {bullet.title}
                            </h4>

                            <div
                                className={`overflow-hidden transition-all duration-500 w-full flex-grow flex items-start justify-center ${isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <p className="font-body text-[15px] sm:text-base text-white/80 leading-relaxed font-light">
                                    {bullet.description}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="flex gap-4 sm:gap-6 mt-6 relative z-40">
                <button
                    onClick={handlePrev}
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-[#0a0f1a] hover:bg-white/10 transition-colors border border-white/10 hover:border-white/30"
                    style={{ boxShadow: `0 0 15px hsl(${hslColor} / 0.15)` }}
                >
                    <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                    onClick={handleNext}
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-[#0a0f1a] hover:bg-white/10 transition-colors border border-white/10 hover:border-white/30"
                    style={{ boxShadow: `0 0 15px hsl(${hslColor} / 0.15)` }}
                >
                    <ChevronRight className="w-5 h-5 text-white" />
                </button>
            </div>

            <div className="flex gap-2 mt-6">
                {bullets.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className="w-2 h-2 rounded-full transition-all duration-300"
                        style={{
                            backgroundColor: currentIndex === idx ? `hsl(${hslColor})` : 'rgba(255,255,255,0.2)',
                            width: currentIndex === idx ? '24px' : '8px'
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
