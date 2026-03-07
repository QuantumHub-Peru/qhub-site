import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';

interface FAQ {
    question: string;
    answer: string;
}

interface FaqCarouselProps {
    faqs: FAQ[];
}

const colors = [
    '#8b5cf6', // quantum-purple
    '#d946ef', // quantum-pink
    '#3b82f6', // quantum-blue
    '#f59e0b', // accent (yellow)
    '#14b8a6'  // teal
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
        <div className="relative w-full max-w-6xl mx-auto h-[450px] flex items-center justify-center perspective-[1000px]">

            {/* Navigation Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-0 md:left-4 z-50 w-12 h-12 rounded-full glass border-quantum-pink/50 flex items-center justify-center text-quantum-pink hover:bg-quantum-pink hover:text-white hover:scale-110 hover:shadow-[0_0_20px_rgba(217,70,239,0.6)] transition-all duration-300"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-0 md:right-4 z-50 w-12 h-12 rounded-full glass border-quantum-pink/50 flex items-center justify-center text-quantum-pink hover:bg-quantum-pink hover:text-white hover:scale-110 hover:shadow-[0_0_20px_rgba(217,70,239,0.6)] transition-all duration-300"
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
                                className={`absolute w-[80%] md:w-[600px] h-[350px] rounded-3xl p-8 flex flex-col justify-center items-center text-center cursor-pointer transition-colors duration-500`}
                                style={{
                                    backgroundColor: isActive ? 'rgba(10, 10, 20, 0.95)' : 'rgba(10, 10, 20, 0.6)',
                                    border: `1px solid ${isActive ? color : 'rgba(255,255,255,0.1)'}`,
                                    boxShadow: isActive ? `0 0 40px ${color}40, inset 0 0 20px ${color}10` : 'none',
                                    backdropFilter: 'blur(12px)',
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
                                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-500"
                                    style={{
                                        backgroundColor: `${color}20`,
                                        color: color,
                                        border: `1px solid ${color}50`,
                                        boxShadow: isActive ? `0 0 20px ${color}60` : 'none'
                                    }}
                                >
                                    <HelpCircle className="w-8 h-8" />
                                </div>

                                <h3
                                    className="font-heading text-xl md:text-2xl font-bold mb-4 transition-colors duration-500"
                                    style={{ color: isActive ? color : 'rgba(255,255,255,0.7)' }}
                                >
                                    {faq.question}
                                </h3>

                                <p className={`text-muted-foreground md:text-lg transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                                    {faq.answer}
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
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
                {faqs.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setDirection(idx > activeIndex ? 1 : -1);
                            setActiveIndex(idx);
                        }}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx
                                ? 'bg-quantum-pink w-6 shadow-[0_0_10px_rgba(217,70,239,0.8)]'
                                : 'bg-white/20 hover:bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default FaqCarousel;
