import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ArrowLeft, ArrowRight, X, Plus } from "lucide-react";

interface Achievement {
    title: string;
    subtitle?: string;
    titlePreview?: string;
    description?: string;
    photo?: string;
    video?: string;
    extraPhotos?: string[];
    link?: string;
}

interface AchievementsCarouselProps {
    achievements?: Achievement[];
    hslColor: string;
}

export default function AchievementsCarousel({ achievements = [], hslColor }: AchievementsCarouselProps) {
    const displayAchievements = [...achievements];

    const [activeIndex, setActiveIndex] = useState(0);
    const [desktopIndex, setDesktopIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(true);
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

    // Responsive detection
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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

    const itemsToShowDesktop = 2.5;
    const maxDesktopIndex = Math.max(0, displayAchievements.length - itemsToShowDesktop);

    const handleNext = () => {
        if (isMobile) {
            setActiveIndex((prev) => (prev + 1) % displayAchievements.length);
        } else {
            if (desktopIndex < maxDesktopIndex) {
                setDesktopIndex((prev) => prev + 1);
            }
        }
    };

    const handlePrev = () => {
        if (isMobile) {
            setActiveIndex((prev) => (prev - 1 + displayAchievements.length) % displayAchievements.length);
        } else {
            if (desktopIndex > 0) {
                setDesktopIndex((prev) => prev - 1);
            }
        }
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
        <section className="pt-0 pb-10 lg:pt-12 lg:pb-24 relative overflow-hidden">
            {/* Background ambient glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] blur-[120px] opacity-10 pointer-events-none"
                style={{ backgroundColor: `hsl(${hslColor})` }}
            />

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="text-center mb-8 md:mb-16">
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">
                        Nuestros <span style={{ color: `hsl(${hslColor})` }}>Logros y Productos</span>
                    </h2>
                </div>

                {isMobile ? (
                    /* MOBILE VIEW: 3D Stack (Original dynamic) */
                    <div className="relative h-[320px] flex items-center justify-center perspective-[1000px]">
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
                                        className="absolute inset-0 m-auto flex flex-col items-center justify-center overflow-hidden rounded-3xl cursor-pointer w-[280px] h-[300px] md:w-[350px] md:h-[350px]"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{
                                            x: xOffset,
                                            scale: scale,
                                            zIndex: zIndex,
                                            opacity: Math.max(0, opacity),
                                            rotateY: rotateY,
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
                                        {/* Background Image */}
                                        {achievement.photo && (
                                            <div className="absolute inset-0 z-0">
                                                <img
                                                    src={achievement.photo}
                                                    alt=""
                                                    className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                                                />
                                            </div>
                                        )}

                                        <div
                                            className="absolute inset-0 transition-all duration-500 z-0"
                                            style={{
                                                background: `linear-gradient(135deg, hsl(${hslColor} / 0.8) 0%, hsl(${hslColor} / 0.4) 100%)`,
                                                backdropFilter: achievement.photo ? 'blur(4px)' : 'blur(16px)',
                                            }}
                                        />

                                        <div className="relative z-20 p-6 flex flex-col items-center justify-center text-center w-full h-full gap-4">
                                            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2 bg-black/20 backdrop-blur-md border border-white/20">
                                                <Trophy className="w-7 h-7 text-white" />
                                            </div>
                                            <h3 className="font-heading font-bold text-xl text-white leading-snug">
                                                {achievement.title}
                                            </h3>
                                            {achievement.subtitle && (
                                                <p className="text-white/70 text-sm font-medium -mt-2">
                                                    {achievement.subtitle}
                                                </p>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                ) : (
                    /* DESKTOP VIEW: Traditional Carousel */
                    <div className="relative group">
                        <div className="overflow-hidden py-40 -my-40 px-10 -mx-10">
                            <motion.div
                                className={`flex gap-8 w-full overflow-visible ${displayAchievements.length < itemsToShowDesktop ? 'justify-center' : ''}`}
                                animate={{ x: displayAchievements.length < itemsToShowDesktop ? 0 : `-${(100 / itemsToShowDesktop) * desktopIndex}%` }}
                                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                            >
                                {displayAchievements.map((achievement, index) => (
                                    <div
                                        key={`${index}-${achievement.title}`}
                                        className="w-[calc(40%-1.2rem)] shrink-0 group/card cursor-pointer relative z-10 hover:z-50 transition-all duration-300 pb-4"
                                        onClick={() => setSelectedAchievement(achievement)}
                                    >
                                        {/* Photo - Visible as is */}
                                        <div
                                            className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 mb-6 transition-all duration-500 group-hover/card:scale-[1.02] group-hover/card:border-white/20"
                                            style={{
                                                boxShadow: `0 20px 40px -20px rgba(0,0,0,0.5)`
                                            }}
                                        >
                                            {achievement.photo ? (
                                                <img
                                                    src={achievement.photo}
                                                    alt={achievement.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                                    <Trophy className="w-16 h-16 text-white/20" />
                                                </div>
                                            )}

                                            <div
                                                className="absolute inset-0 opacity-0 group-hover/card:opacity-30 transition-opacity duration-500 pointer-events-none"
                                                style={{
                                                    background: `radial-gradient(circle at center, hsl(${hslColor}) 0%, transparent 70%)`
                                                }}
                                            />
                                        </div>

                                        {/* Title below photo */}
                                        <div className="text-center px-4 w-full">
                                            <h3
                                                className="font-heading font-bold text-xl text-white transition-colors duration-300 group-hover/card:brightness-125"
                                            >
                                                {achievement.title}
                                            </h3>
                                            {achievement.subtitle && (
                                                <p className="text-white/60 text-sm mt-1 font-medium transition-colors group-hover/card:text-white/80">
                                                    {achievement.subtitle}
                                                </p>
                                            )}
                                            <div className="w-8 h-1 mt-3 mx-auto rounded-full bg-white/10 transition-all duration-500 group-hover/card:w-16" style={{ backgroundColor: `hsl(${hslColor})` }} />

                                            {/* CTA: Ver Detalles (Energía Neón) */}
                                            <div className="mt-8 flex justify-center">
                                                <div
                                                    className="relative inline-flex items-center justify-center gap-3 w-64 py-3.5 rounded-full border-2 transition-all duration-300 group-hover/card:scale-105 active:scale-95 shadow-lg overflow-hidden"
                                                    style={{
                                                        backgroundColor: `hsl(${hslColor} / 0.1)`,
                                                        borderColor: `hsl(${hslColor} / 0.4)`,
                                                    }}
                                                >
                                                    {/* Layer for Hover Background */}
                                                    <div
                                                        className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 -z-10"
                                                        style={{
                                                            backgroundColor: `hsl(${hslColor})`,
                                                            boxShadow: `0 0 40px hsl(${hslColor} / 0.6)`
                                                        }}
                                                    />

                                                    <span className="text-xs font-black uppercase tracking-[0.2em] text-white transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                                                        Ver Detalles
                                                    </span>
                                                    <Plus className="w-5 h-5 text-white transition-transform duration-500 group-hover/card:rotate-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Arrows for Desktop - Bottom Centered for better focus */}
                        {displayAchievements.length > itemsToShowDesktop && (
                            <div className="flex justify-center items-center gap-4 mt-12">
                                <button
                                    onClick={handlePrev}
                                    disabled={desktopIndex === 0}
                                    className={`w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 shadow-lg transition-all active:scale-90 ${desktopIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white hover:text-slate-900 hover:scale-110'}`}
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    disabled={desktopIndex >= maxDesktopIndex}
                                    className={`w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 shadow-lg transition-all active:scale-90 ${desktopIndex >= maxDesktopIndex ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white hover:text-slate-900 hover:scale-110'}`}
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Mobile Navigation Dots / Arrows (Simplified) */}
                {isMobile && displayAchievements.length > 1 && (
                    <div className="flex justify-center gap-6 mt-8">
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

            {/* EXPANDED MODAL POPUP (Shared between versions) */}
            <AnimatePresence>
                {selectedAchievement && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedAchievement(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
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
                            <button
                                onClick={() => setSelectedAchievement(null)}
                                className="absolute top-4 right-4 z-[110] w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white/70 hover:text-white transition-colors backdrop-blur-sm border border-white/10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {(selectedAchievement.video || selectedAchievement.photo) && (
                                <div className="w-full h-64 md:h-80 relative overflow-hidden shrink-0">
                                    {selectedAchievement.video ? (
                                        <video
                                            src={selectedAchievement.video}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <img
                                            src={selectedAchievement.photo}
                                            alt={selectedAchievement.titlePreview}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
                                </div>
                            )}

                            <div className="p-8 md:p-12 flex-1 overflow-y-auto custom-scrollbar">
                                <h3
                                    className="font-heading text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-tight"
                                    style={{ color: `hsl(${hslColor})` }}
                                >
                                    {selectedAchievement.titlePreview}
                                </h3>

                                {selectedAchievement.link && (
                                    <a
                                        href={selectedAchievement.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 mb-6 rounded-xl font-heading font-bold text-white transition-all hover:scale-105"
                                        style={{
                                            backgroundColor: `hsl(${hslColor} / 0.2)`,
                                            border: `1px solid hsl(${hslColor} / 0.5)`,
                                            boxShadow: `0 0 20px -5px hsl(${hslColor} / 0.4)`
                                        }}
                                    >
                                        <span>Ver Publicación</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                    </a>
                                )}

                                {selectedAchievement.description && (
                                    <p className="text-white/80 font-body text-sm md:text-base leading-relaxed whitespace-pre-line text-justify mb-8">
                                        {selectedAchievement.description}
                                    </p>
                                )}

                                {selectedAchievement.extraPhotos && selectedAchievement.extraPhotos.length > 0 && (
                                    <div className={`mt-6 ${selectedAchievement.extraPhotos.length === 1 ? 'flex justify-center' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}`}>
                                        {selectedAchievement.extraPhotos.map((photo, i) => (
                                            <div
                                                key={i}
                                                className={`rounded-2xl overflow-hidden border border-white/10 aspect-square ${selectedAchievement.extraPhotos.length === 1 ? 'w-full max-w-xs' : 'w-full'}`}
                                            >
                                                <img src={photo} alt="" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
