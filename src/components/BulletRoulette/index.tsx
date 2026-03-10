import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BulletRouletteProps } from "./types";
import { RouletteWheel } from "./RouletteWheel";
import { DescriptionPanel } from "./DescriptionPanel";

export default function BulletRoulette({ bullets, hslColor }: BulletRouletteProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNodeClick = (clickedIndex: number) => {
        setActiveIndex(clickedIndex);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % bullets.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [bullets.length]);

    return (
        <section className="relative w-full max-w-[90rem] mx-auto pt-[4rem] pb-[4rem] lg:pt-[6rem] lg:pb-[6rem] flex flex-col items-center justify-center overflow-hidden">

            {/* Title - Fully Responsive Text */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-[2rem] lg:mb-[4rem] px-4"
            >
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black mb-0 text-white leading-tight uppercase tracking-tight">
                    Nuestros <span style={{ color: `hsl(${hslColor})` }}>Pilares</span>
                </h2>
            </motion.div>

            {/* Content Container - 100% Fluid Layout */}
            <div className="w-full flex flex-col lg:flex-row items-center justify-center lg:gap-[2%] relative z-10 px-[5%]">

                {/* Visual Wheel - Scales with its container */}
                <div className="w-full lg:w-[46%] flex items-center">
                    <RouletteWheel
                        bullets={bullets}
                        activeIndex={activeIndex}
                        hslColor={hslColor}
                        onWedgeClick={handleNodeClick}
                    />
                </div>

                {/* Info Panel - Fills its column */}
                <div className="w-full lg:w-[48%] flex items-stretch py-[2rem] lg:py-0">
                    <DescriptionPanel
                        bullets={bullets}
                        activeIndex={activeIndex}
                        hslColor={hslColor}
                    />
                </div>

            </div>

        </section>
    );
}
