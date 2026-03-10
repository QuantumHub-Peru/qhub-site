import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface Bullet {
    title: string;
    shortTitle?: string;
    description: string;
    keyPoints?: string[];
    images?: string[];
}

interface BulletRouletteProps {
    bullets: Bullet[];
    hslColor: string;
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    // Subtract 90 so 0 degrees is top. Right is 90.
    const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180.0);
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function describeWedge(x: number, y: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number) {
    const startOuter = polarToCartesian(x, y, outerRadius, endAngle);
    const endOuter = polarToCartesian(x, y, outerRadius, startAngle);
    const startInner = polarToCartesian(x, y, innerRadius, endAngle);
    const endInner = polarToCartesian(x, y, innerRadius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
        "M", startOuter.x, startOuter.y,
        "A", outerRadius, outerRadius, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
        "L", endInner.x, endInner.y,
        "A", innerRadius, innerRadius, 0, largeArcFlag, 1, startInner.x, startInner.y,
        "Z"
    ].join(" ");
}

export default function BulletRoulette({ bullets, hslColor }: BulletRouletteProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNodeClick = (clickedIndex: number) => {
        setActiveIndex(clickedIndex);
    };

    // Auto-rotate the roulette slower to allow reading
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % bullets.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [activeIndex, bullets.length]);

    // SVG Layout Constants
    const SVG_SIZE = 600;
    const CENTER = SVG_SIZE / 2;
    const INNER_RADIUS = 110;
    const OUTER_RADIUS = 260;

    // Distribute angles around 90 degrees (which is the right side)
    const TOTAL_ANGLE = 160;
    const START_ANGLE_BASE = 90 - (TOTAL_ANGLE / 2);
    const WEDGE_GAP = 4; // degrees between wedges
    const wedgeAngleSize = (TOTAL_ANGLE - (WEDGE_GAP * (bullets.length - 1))) / bullets.length;

    return (
        <div className="relative w-full max-w-7xl mx-auto pt-12 lg:pt-20 flex flex-col items-center justify-center">

            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-4 lg:mb-8"
            >

                <h2 className="font-heading text-3xl md:text-5xl font-bold mb-0 text-white">
                    Nuestros <span style={{ color: `hsl(${hslColor})` }}>Pilares</span>
                </h2>
            </motion.div>

            {/* Content Container (Roulette + Info Side-by-Side on Desktop) */}
            <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-16 relative z-10 px-4 md:px-8">

                {/* Roulette Container */}
                <div className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[600px] md:h-[600px] shrink-0 flex items-center justify-center">

                    {/* Central Mascot */}
                    <div className="absolute z-30 w-24 h-24 md:w-36 md:h-36 lg:w-48 lg:h-48 flex flex-col items-center justify-center"
                        style={{ transform: 'translateX(-90px)' /* offset further left to separate from wedges */ }}>
                        <div className="relative w-full h-full flex items-center justify-center">
                            {/* Faint ambient glow behind mascot */}
                            <div className="absolute inset-0 rounded-full blur-2xl opacity-20" style={{ backgroundColor: `hsl(${hslColor})` }} />
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeIndex % 4}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    src={`/src/gato/cat_0${(activeIndex % 4) + 1}.png`}
                                    alt="Schordi"
                                    className="w-[120%] h-[120%] object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] relative z-10"
                                    onError={(e: any) => { e.currentTarget.src = 'https://utfs.io/f/cd115fb3-90d5-45d2-a745-f00e93ca910d-c0w41p.png'; }}
                                />
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Indicator Arrow */}
                    <div className="absolute z-20 pointer-events-none w-full h-full flex items-center justify-center">
                        <motion.div
                            className="absolute flex justify-end items-center"
                            style={{
                                width: INNER_RADIUS * 2 - 20,
                                originX: 0.5,
                                originY: 0.5,
                            }}
                            animate={{
                                // Rotate the arrow to point to the middle of the active wedge
                                rotate: START_ANGLE_BASE + (activeIndex * (wedgeAngleSize + WEDGE_GAP)) + (wedgeAngleSize / 2) - 90
                            }}
                            transition={{ type: "spring", stiffness: 60, damping: 15 }}
                        >
                            <svg
                                className="w-8 h-8 md:w-10 md:h-10 transform"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                fillOpacity="0.35"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                                style={{ color: `hsl(${hslColor})`, filter: `drop-shadow(0 0 15px hsl(${hslColor})) drop-shadow(0 0 5px hsl(${hslColor}))` }}
                            >
                                <path d="M4 2 L22 12 L4 22 L9 12 Z" />
                            </svg>
                        </motion.div>
                    </div>

                    {/* SVG Wedges */}
                    <svg width="100%" height="100%" viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} className="absolute inset-0 pointer-events-none drop-shadow-2xl">
                        {bullets.map((_, index) => {
                            const startAngle = START_ANGLE_BASE + (index * (wedgeAngleSize + WEDGE_GAP));
                            const endAngle = startAngle + wedgeAngleSize;
                            const isActive = index === activeIndex;

                            const pathData = describeWedge(CENTER, CENTER, INNER_RADIUS, OUTER_RADIUS, startAngle, endAngle);

                            // Calculate icon position
                            const midAngle = startAngle + (wedgeAngleSize / 2);
                            const midRadius = INNER_RADIUS + (OUTER_RADIUS - INNER_RADIUS) / 2;
                            const iconPos = polarToCartesian(CENTER, CENTER, midRadius, midAngle);

                            return (
                                <g key={index} className="pointer-events-auto cursor-pointer" onClick={() => handleNodeClick(index)}>
                                    {/* Wedge Background */}
                                    <motion.path
                                        d={pathData}
                                        fill={isActive ? `hsl(${hslColor} / 0.15)` : `hsl(${hslColor} / 0.05)`}
                                        stroke={isActive ? `hsl(${hslColor})` : `hsl(${hslColor} / 0.2)`}
                                        strokeWidth={isActive ? 3 : 1.5}
                                        animate={{
                                            fill: isActive ? `hsl(${hslColor} / 0.25)` : `hsl(${hslColor} / 0.08)`,
                                            filter: isActive ? `drop-shadow(0 0 15px hsl(${hslColor} / 0.6))` : "drop-shadow(0 0 0px transparent)",
                                        }}
                                        whileHover={{
                                            fill: isActive ? `hsl(${hslColor} / 0.3)` : `hsl(${hslColor} / 0.15)`,
                                        }}
                                        transition={{ duration: 0.3 }}
                                        style={{ transformOrigin: "center" }}
                                    />

                                    {/* Text inside the wedge */}
                                    <foreignObject
                                        x={iconPos.x - 75}
                                        y={iconPos.y - 50}
                                        width="150"
                                        height="100"
                                        className="pointer-events-none overflow-visible"
                                    >
                                        <motion.div
                                            className="w-full h-full flex items-center justify-center text-center px-1"
                                            animate={{ scale: isActive ? 1.05 : 0.95, opacity: isActive ? 1 : 0.6 }}
                                        >
                                            <span
                                                className={`text-[10px] sm:text-[11px] md:text-[13px] font-heading font-extrabold leading-tight drop-shadow-lg tracking-wide transition-all duration-300`}
                                                style={{
                                                    color: isActive ? `white` : `rgba(255,255,255,0.7)`,
                                                    textShadow: isActive ? `0 0 15px hsl(${hslColor})` : 'none'
                                                }}
                                            >
                                                {bullets[index].shortTitle || bullets[index].title}
                                            </span>
                                        </motion.div>
                                    </foreignObject>
                                </g>
                            );
                        })}
                    </svg>
                </div>

                {/* Active Item Description display area (Side on Desktop) */}
                <div className="w-full flex-1 max-w-2xl lg:max-w-xl xl:max-w-2xl shrink-0 relative z-40 flex lg:h-auto min-h-[450px]">
                    <AnimatePresence mode="wait">
                        {(() => {
                            const activeBullet = bullets[activeIndex];
                            return (
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="p-8 sm:p-10 rounded-[2.5rem] lg:rounded-[3rem] glass-strong backdrop-blur-2xl border border-white/10 bg-[#0a0f1a]/80 text-left w-full h-full flex flex-col justify-center"
                                    style={{ boxShadow: `0 30px 60px -15px hsl(${hslColor} / 0.15), inset 0 0 0 1px hsl(${hslColor} / 0.2)` }}
                                >
                                    <div className="flex flex-col h-full">
                                        <h3
                                            className="font-heading text-3xl sm:text-4xl font-black mb-6 tracking-tight text-transparent bg-clip-text"
                                            style={{ backgroundImage: `linear-gradient(to right, white, hsl(${hslColor}))` }}
                                        >
                                            {activeBullet?.title}
                                        </h3>

                                        <p className="font-body text-white/90 text-base sm:text-lg leading-relaxed mb-8 font-medium tracking-wide">
                                            {activeBullet?.description}
                                        </p>

                                        {activeBullet?.keyPoints && (
                                            <div className="mb-10 space-y-4">
                                                <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-4">Proyectos</h4>
                                                {activeBullet.keyPoints.map((point, i) => (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        key={i}
                                                        className="flex items-start gap-3"
                                                    >
                                                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-white/5 border border-white/10">
                                                            <CheckCircle2 className="w-3 h-3" style={{ color: `hsl(${hslColor})` }} />
                                                        </div>
                                                        <span className="text-sm sm:text-base text-white/80 font-medium">{point}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}

                                        {activeBullet?.images && activeBullet.images.length > 0 && (
                                            <div className="mt-auto">

                                                <div className="flex gap-4 h-32 sm:h-40 overflow-hidden">
                                                    {activeBullet.images.map((img, i) => (
                                                        <motion.div
                                                            key={i}
                                                            whileHover={{ scale: 1.02 }}
                                                            className="flex-1 rounded-2xl overflow-hidden border border-white/10 relative group"
                                                        >
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                            <img
                                                                src={img}
                                                                alt={`${activeBullet.title} visualization ${i + 1}`}
                                                                className="w-full h-full object-cover"
                                                                onError={(e: any) => {
                                                                    e.currentTarget.src = "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2670&auto=format&fit=crop";
                                                                }}
                                                            />
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })()}
                    </AnimatePresence>
                </div>

            </div>

        </div>
    );
}
