import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ArrowLeft, ArrowRight, X } from "lucide-react";

interface Achievement {
    title: string;
    description?: string;
    photo?: string;
}

interface AchievementsCarouselProps {
    achievements?: Achievement[];
    hslColor: string;
}

export default function AchievementsCarousel({ achievements = [], hslColor }: AchievementsCarouselProps) {
    const displayAchievements = [...achievements];

    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedAchievement) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedAchievement]);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % displayAchievements.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + displayAchievements.length) % displayAchievements.length);
    };

    // Calculate position relative to active index: 0 is center, -1 is left, 1 is right, etc.
    const getPosition = (index: number) => {
        const diff = index - activeIndex;
        const middle = Math.floor(displayAchievements.length / 2);
        let adjustedDiff = diff;
        if (adjustedDiff > middle) adjustedDiff -= displayAchievements.length;
        if (adjustedDiff < -middle) adjustedDiff += displayAchievements.length;
        return adjustedDiff;
    };

    return (
        <section className="pt-8 pb-16 lg:pt-12 lg:pb-20 relative overflow-hidden">
            {/* Background ambient glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] blur-[120px] opacity-10 pointer-events-none"
                style={{ backgroundColor: `hsl(${hslColor})` }}
            />

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
                        Nuestros <span style={{ color: `hsl(${hslColor})` }}>Logros</span>
                    </h2>
                </div>

                <div className="relative h-[400px] flex items-center justify-center perspective-[1000px]">
                    <AnimatePresence mode="popLayout">
                        {displayAchievements.map((achievement, index) => {
                            const pos = getPosition(index);

                            if (Math.abs(pos) > 2) return null;

                            const xOffset = pos * 150;
                            const scale = 1 - Math.abs(pos) * 0.15;
                            const zIndex = 50 - Math.abs(pos);
                            const opacity = 1 - Math.abs(pos) * 0.4;
                            const rotateY = pos * -25;
                            const isActive = pos === 0;

                            return (
                                <motion.div
                                    key={`${index}-${achievement.title}`}
                                    className="absolute inset-0 m-auto flex flex-col items-center justify-center overflow-hidden rounded-3xl cursor-pointer"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                        x: xOffset,
                                        scale: scale,
                                        zIndex: zIndex,
                                        opacity: Math.max(0, opacity),
                                        rotateY: rotateY,
                                        width: "350px", // Fixed square width
                                        height: "350px", // Fixed square height
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20
                                    }}
                                    onClick={() => {
                                        if (isActive && achievement.description) {
                                            setSelectedAchievement(achievement);
                                        } else {
                                            setActiveIndex(index);
                                        }
                                    }}
                                    style={{
                                        boxShadow: isActive
                                            ? `0 25px 50px -12px rgba(0,0,0,0.5), 0 0 30px -5px hsl(${hslColor} / 0.4)`
                                            : '0 10px 15px -3px rgba(0,0,0,0.3)',
                                    }}
                                >
                                    <div
                                        className="absolute inset-0 transition-opacity duration-500"
                                        style={{
                                            background: `linear-gradient(135deg, hsl(${hslColor} / 0.8) 0%, hsl(${hslColor} / 0.3) 100%)`
                                        }}
                                    />

                                    <div
                                        className="absolute inset-0 opacity-50"
                                        style={{
                                            background: `radial-gradient(circle at center, hsl(${hslColor}) 0%, transparent 70%)`,
                                            mixBlendMode: 'overlay'
                                        }}
                                    />

                                    <div className="absolute inset-0 glass-strong backdrop-blur-sm border border-white/20 rounded-3xl" />

                                    <div className="relative z-10 p-8 flex flex-col items-center justify-center text-center w-full h-full gap-4 group">
                                        <h3
                                            className="font-heading font-extrabold text-2xl md:text-3xl tracking-tight uppercase text-white"
                                            style={{
                                                textShadow: isActive ? '0 0 20px rgba(255,255,255,0.8)' : 'none'
                                            }}
                                        >
                                            {achievement.title}
                                        </h3>

                                        {/* Subtle hint that card is clickable */}
                                        {isActive && achievement.description && (
                                            <div className="absolute bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <span className="text-white/80 text-sm tracking-widest uppercase bg-black/40 border border-white/20 px-4 py-2 rounded-full">
                                                    Ver Detalles
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {displayAchievements.length > 1 && (
                    <div className="flex justify-center gap-6 mt-12">
                        <button
                            onClick={handlePrev}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 hover:border-white/30 transition-all hover:scale-110"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 hover:border-white/30 transition-all hover:scale-110"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            {/* EXPANDED MODAL POPUP */}
            <AnimatePresence>
                {selectedAchievement && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedAchievement(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                            style={{
                                boxShadow: `0 0 50px -10px hsl(${hslColor} / 0.4), 0 20px 40px -20px black`
                            }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedAchievement(null)}
                                className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white/70 hover:text-white transition-colors backdrop-blur-sm border border-white/10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Photo / Header Area */}
                            {selectedAchievement.photo && (
                                <div className="w-full h-64 md:h-80 relative overflow-hidden shrink-0">
                                    <img
                                        src={selectedAchievement.photo}
                                        alt={selectedAchievement.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Gradient overlay to smoothly blend with text area */}
                                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
                                </div>
                            )}

                            {/* Content Area */}
                            <div className="p-8 md:p-12 flex-1 overflow-y-auto custom-scrollbar">
                                <h3
                                    className="font-heading text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-tight"
                                    style={{ color: `hsl(${hslColor})` }}
                                >
                                    {selectedAchievement.title}
                                </h3>

                                {selectedAchievement.description && (
                                    <p className="text-white/80 font-body text-base md:text-lg leading-relaxed whitespace-pre-line">
                                        {selectedAchievement.description}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
