import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, ChevronLeft, ChevronRight } from "lucide-react";

interface AlliancesCarouselProps {
    alliances?: { name: string, logo?: string, isUpcoming?: boolean, country?: string }[];
    hslColor: string;
}

export default function AlliancesCarousel({ alliances = [], hslColor }: AlliancesCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setItemsToShow(3);
            } else {
                setItemsToShow(1);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (alliances.length === 0) return null;

    const maxIndex = Math.max(0, alliances.length - itemsToShow);

    const nextSlide = () => {
        if (currentIndex < maxIndex) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const visibleAlliances = alliances;

    return (
        <section className="pt-6 pb-6 lg:pt-12 lg:pb-12 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div
                className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-[150px] opacity-[0.05] pointer-events-none rounded-[100%]"
                style={{ backgroundColor: `hsl(${hslColor})` }}
            />

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="text-center mb-8 lg:mb-16 flex flex-col items-center relative z-10">
                    <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-white text-center">
                        Nuestros <span style={{ color: `hsl(${hslColor})`, textShadow: `0 0 30px hsl(${hslColor} / 0.4)` }}>Colaboradores</span>
                    </h2>

                    {/* Subtitle Box - Disclaimer style but as a header element */}
                    <div
                        className="max-w-4xl mx-auto px-8 py-5 rounded-2xl md:rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-sm relative overflow-hidden group"
                        style={{ boxShadow: `0 20px 40px -15px rgba(0,0,0,0.4)` }}
                    >
                        {/* Accent Left Border - Inspired by the reference image */}
                        <div
                            className="absolute left-0 top-0 bottom-0 w-[4px] opacity-80"
                            style={{ backgroundColor: `hsl(${hslColor})`, boxShadow: `0 0 15px hsl(${hslColor})` }}
                        />

                        <p className="text-white/80 text-sm md:text-lg font-body leading-relaxed text-left pl-4">
                            Nuestra trayectoria desde junio de 2025 se ha fortalecido mediante la ejecución de proyectos conjuntos y colaboraciones con:
                        </p>
                    </div>
                </div>

                <div className="relative max-w-[1600px] mx-auto px-4 md:px-16">
                    {/* Navigation Buttons - Responsive Logic */}
                    {alliances.length > itemsToShow && (
                        <>
                            <button
                                onClick={prevSlide}
                                disabled={currentIndex === 0}
                                className={`absolute left-0 md:-left-8 lg:-left-24 top-[112px] md:top-[176px] -translate-y-1/2 z-40 p-2 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 text-white transition-all backdrop-blur-md ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'hover:bg-white/10 opacity-100'}`}
                                style={{ boxShadow: currentIndex === 0 ? 'none' : `0 0 20px hsl(${hslColor} / 0.2)` }}
                            >
                                <ChevronLeft className="w-5 h-5 md:w-8 md:h-8" />
                            </button>
                            <button
                                onClick={nextSlide}
                                disabled={currentIndex >= maxIndex}
                                className={`absolute right-0 md:-right-8 lg:-right-24 top-[112px] md:top-[176px] -translate-y-1/2 z-40 p-2 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 text-white transition-all backdrop-blur-md ${currentIndex >= maxIndex ? 'opacity-0 pointer-events-none' : 'hover:bg-white/10 opacity-100'}`}
                                style={{ boxShadow: currentIndex >= maxIndex ? 'none' : `0 0 20px hsl(${hslColor} / 0.2)` }}
                            >
                                <ChevronRight className="w-5 h-5 md:w-8 md:h-8" />
                            </button>
                        </>
                    )}

                    <div className="overflow-hidden">
                        <motion.div
                            className="flex items-stretch"
                            animate={{ x: `-${(100 / itemsToShow) * currentIndex}%` }}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        >
                            {alliances.map((alliance, idx) => {
                                const isUpcoming = alliance.isUpcoming;
                                const uniqueKey = `${idx}-${alliance.name}`;

                                return (
                                    <div
                                        key={uniqueKey}
                                        className={`shrink-0 flex flex-col items-center py-4 md:py-12 px-4 md:px-12 ${itemsToShow === 1 ? 'w-full' : 'w-1/3'}`}
                                    >
                                        {/* Container for the Atom to prevent collision */}
                                        <div className="relative w-full flex items-center justify-center mb-4 md:mb-10">
                                            <div className="relative w-40 h-40 md:w-64 md:h-64 flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105">

                                                {!isUpcoming && (
                                                    <div className="absolute inset-x-0 inset-y-0 -m-6 md:-m-12 pointer-events-none">
                                                        <div
                                                            className="absolute inset-0 m-auto w-20 h-20 md:w-24 md:h-24 rounded-full blur-[30px] md:blur-[40px] opacity-40 group-hover:opacity-70 transition-opacity duration-700 mix-blend-screen z-0"
                                                            style={{ backgroundColor: `hsl(${hslColor})` }}
                                                        />

                                                        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'rotateZ(0deg) rotateX(72deg)' }}>
                                                            <div className="absolute w-full h-full border-[1.5px] border-white/20 rounded-full opacity-60" />
                                                            <div className="absolute w-full h-full animate-[spin_6s_linear_infinite]">
                                                                <div
                                                                    className="absolute -top-[4px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full"
                                                                    style={{
                                                                        backgroundColor: `hsl(${hslColor})`,
                                                                        boxShadow: `0 0 15px 4px hsl(${hslColor} / 0.8)`
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'rotateZ(60deg) rotateX(72deg)' }}>
                                                            <div className="absolute w-full h-full border-[1.5px] border-white/20 rounded-full opacity-60" />
                                                            <div className="absolute w-full h-full animate-[spin_8s_linear_infinite_reverse]">
                                                                <div
                                                                    className="absolute top-1/2 -right-[4px] -translate-y-1/2 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full"
                                                                    style={{
                                                                        backgroundColor: `hsl(${hslColor})`,
                                                                        boxShadow: `0 0 15px 4px hsl(${hslColor} / 0.8)`
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'rotateZ(120deg) rotateX(72deg)' }}>
                                                            <div className="absolute w-full h-full border-[1.5px] border-white/20 rounded-full opacity-60" />
                                                            <div className="absolute w-full h-full animate-[spin_10s_linear_infinite]">
                                                                <div
                                                                    className="absolute -bottom-[4px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full"
                                                                    style={{
                                                                        backgroundColor: `hsl(${hslColor})`,
                                                                        boxShadow: `0 0 15px 4px hsl(${hslColor} / 0.8)`
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Central Logo Box - Transparent */}
                                                <div
                                                    className="w-24 h-24 md:w-48 md:h-48 shrink-0 flex items-center justify-center relative z-10 transition-all duration-500"
                                                >
                                                    {alliance.logo ? (
                                                        <img src={alliance.logo} alt={alliance.name} className="w-full h-full object-contain filter drop-shadow-2xl" />
                                                    ) : (
                                                        <Building2 className={`w-12 h-12 md:w-16 md:h-16 ${isUpcoming ? 'text-white/30' : 'text-white/80'}`} />
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-center max-w-[280px] relative z-20 pt-4">
                                            <h3
                                                className={`
                                                    font-heading leading-tight tracking-wide
                                                    ${isUpcoming ? 'text-white/40 italic font-medium text-sm' : 'text-white font-extrabold text-xl'}
                                                `}
                                                style={{
                                                    textShadow: !isUpcoming ? `0 0 20px rgba(255,255,255,0.4)` : 'none'
                                                }}
                                            >
                                                {alliance.name}
                                            </h3>
                                            {alliance.country && !isUpcoming && (
                                                <div className="text-white/60 text-sm font-body mt-1">
                                                    {alliance.country}
                                                </div>
                                            )}
                                            {isUpcoming && <div className="text-white/30 text-xs uppercase tracking-widest mt-2">(Próximamente)</div>}
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Pagination Dots - Responsive Style */}
                    {alliances.length > itemsToShow && (
                        <div className="flex justify-center items-center gap-3 mt-6 md:mt-12">
                            {alliances.slice(0, maxIndex + 1).map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`h-2 md:h-2.5 rounded-full transition-all duration-500 ${currentIndex === idx
                                        ? 'w-8 md:w-10 opacity-100 shadow-[0_0_15px_hsl(${hslColor})]'
                                        : 'w-2 md:w-2.5 opacity-20 hover:opacity-40'
                                        }`}
                                    style={{ backgroundColor: currentIndex === idx ? `hsl(${hslColor})` : 'white' }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
