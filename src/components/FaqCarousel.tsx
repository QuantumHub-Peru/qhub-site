import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';

interface FAQ {
    question: string;
    answer: React.ReactNode;
}

interface FaqCarouselProps {
    faqs: FAQ[];
}

const colors = [
    '#F39C12', // primary yellow/orange
    '#E67E22', // carrot orange
    '#D35400', // pumpkin orange
    '#F1C40F', // sunflower yellow
    '#E67E22'  // carrot orange (repeated for variety)
];

const FaqCarousel: React.FC<FaqCarouselProps> = ({ faqs }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextSlide = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % faqs.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + faqs.length) % faqs.length);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [faqs.length]);

    const getCardStyle = (index: number) => {
        const offset = (index - activeIndex + faqs.length) % faqs.length;
        // We want offset to be -2, -1, 0, 1, 2 depending on distance from active
        let normalizedOffset = offset;
        if (offset > Math.floor(faqs.length / 2)) {
            normalizedOffset -= faqs.length;
        }

        const absOffset = Math.abs(normalizedOffset);
        const isActive = normalizedOffset === 0;

        // Base specific color based on the index to give it that "colorful" look
        const cardColor = colors[index % colors.length];

        return {
            offset: normalizedOffset,
            absOffset,
            isActive,
            color: cardColor,
        };
    };

    return (
        <div className="relative w-full h-[380px] md:h-[400px] flex items-center justify-center perspective-[1000px] overflow-visible">

            {/* Navigation Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-0 md:left-4 z-50 w-12 h-12 rounded-full glass border-primary/50 flex items-center justify-center text-primary hover:bg-primary/20 hover:text-white hover:scale-110 hover:shadow-[0_0_20px_rgba(243,156,18,0.4)] transition-all duration-300"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-0 md:right-4 z-50 w-12 h-12 rounded-full glass border-primary/50 flex items-center justify-center text-primary hover:bg-primary/20 hover:text-white hover:scale-110 hover:shadow-[0_0_20px_rgba(243,156,18,0.4)] transition-all duration-300"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Carousel Track */}
            <div className="relative w-full h-full flex items-center justify-center transform-style-[preserve-3d]">
                <AnimatePresence initial={false} custom={direction}>
                    {faqs.map((faq, index) => {
                        const { offset, absOffset, isActive, color } = getCardStyle(index);

                        // Do not render cards that are too far away to save performance
                        if (absOffset > 2) return null;

                        return (
                            <motion.div
                                key={index}
                                className={`absolute w-[85%] md:w-[550px] h-[300px] md:h-[320px] rounded-3xl p-6 md:p-8 flex flex-col justify-center items-center text-center cursor-pointer transition-colors duration-500`}
                                style={{
                                    background: isActive 
                                        ? `linear-gradient(135deg, rgba(30, 10, 80, 0.95) 0%, rgba(60, 20, 120, 0.9) 100%)` 
                                        : 'rgba(20, 10, 40, 0.6)',
                                    border: `2px solid ${isActive ? color : 'rgba(255,255,255,0.1)'}`,
                                    boxShadow: isActive 
                                        ? `0 0 50px ${color}50, inset 0 0 30px ${color}20` 
                                        : 'none',
                                    backdropFilter: 'blur(20px)',
                                }}
                                initial={{
                                    opacity: 0,
                                    scale: 0.8,
                                    x: direction > 0 ? 200 : -200,
                                    rotateY: direction > 0 ? -20 : 20,
                                    z: -200
                                }}
                                animate={{
                                    opacity: isActive ? 1 : 1 - absOffset * 0.4,
                                    scale: isActive ? 1 : 1 - absOffset * 0.15,
                                    x: `${offset * 120}px`,
                                    z: isActive ? 0 : -absOffset * 100,
                                    rotateY: offset * -15,   // Coverflow effect
                                    zIndex: 20 - absOffset,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.8,
                                    x: direction < 0 ? 200 : -200,
                                    rotateY: direction < 0 ? -20 : 20,
                                    z: -200
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 30,
                                    mass: 1,
                                }}
                                onClick={() => {
                                    if (!isActive) {
                                        setDirection(offset > 0 ? 1 : -1);
                                        setActiveIndex(index);
                                    }
                                }}
                            >
                                {/* Glowing Icon */}
                                <div
                                    className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6 transition-all duration-500"
                                    style={{
                                        backgroundColor: `${color}20`,
                                        color: color,
                                        border: `1px solid ${color}50`,
                                        boxShadow: isActive ? `0 0 20px ${color}60` : 'none'
                                    }}
                                >
                                    <HelpCircle className="w-8 h-8 drop-shadow-[0_0_10px_currentColor]" />
                                </div>

                                <h3
                                    className="font-heading text-xl md:text-2xl font-black mb-4 transition-colors duration-500 tracking-tight"
                                    style={{ 
                                        color: isActive ? color : 'rgba(255,255,255,0.7)',
                                        textShadow: isActive ? `0 0 20px ${color}40` : 'none'
                                    }}
                                >
                                    {faq.question}
                                </h3>

                                <p className={`text-white text-base md:text-lg font-medium leading-relaxed transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                                    {isActive ? faq.answer : ''}
                                </p>

                                {/* Laser scan line effect when active */}
                                {isActive && (
                                    <motion.div
                                        className="absolute left-0 right-0 h-[2px] opacity-50"
                                        style={{
                                            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                                            boxShadow: `0 0 10px ${color}`
                                        }}
                                        animate={{ top: ['0%', '100%', '0%'] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Indicator dots */}
            <div className="absolute -bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
                {faqs.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setDirection(idx > activeIndex ? 1 : -1);
                            setActiveIndex(idx);
                        }}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx
                                ? 'bg-primary w-6 shadow-[0_0_10px_rgba(243,156,18,0.6)]'
                                : 'bg-white/20 hover:bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default FaqCarousel;
