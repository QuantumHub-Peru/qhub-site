import { motion, AnimatePresence } from "framer-motion";
import { Bullet } from "./types";
import { polarToCartesian, describeWedge } from "./utils";

interface RouletteWheelProps {
    bullets: Bullet[];
    activeIndex: number;
    hslColor: string;
    onWedgeClick: (index: number) => void;
}

export const RouletteWheel = ({ bullets, activeIndex, hslColor, onWedgeClick }: RouletteWheelProps) => {
    // 1. SISTEMA DE COORDENADAS VECTORIAL 
    const SVG_SIZE = 600;
    const CENTER = SVG_SIZE / 2;

    // Dejamos un claro espacio físico entre gato y ruleta para asegurar la flecha
    const CAT_RADIUS = 110;
    const INNER_RADIUS = 150;
    const OUTER_RADIUS = 295;

    const TOTAL_ANGLE = 140;
    const START_ANGLE_BASE = 90 - (TOTAL_ANGLE / 2);
    const WEDGE_GAP = 5;
    const wedgeAngleSize = (TOTAL_ANGLE - (WEDGE_GAP * (bullets.length - 1))) / bullets.length;

    return (
        <div className="relative w-full max-w-[20rem] md:max-w-[23rem] lg:max-w-[24rem] xl:max-w-[29rem] aspect-[480/600] flex items-center justify-center overflow-visible">

            <div className="relative w-full h-full flex items-center justify-center">

                <svg
                    width="100%"
                    height="100%"
                    viewBox={`130 0 480 ${SVG_SIZE}`}
                    className="absolute inset-0 pointer-events-none overflow-visible drop-shadow-2xl"
                >
                    <defs>
                        <filter id="arrow-glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="6" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* MASCOTA (Schordi) */}
                    <foreignObject x={CENTER - CAT_RADIUS - 40} y={CENTER - CAT_RADIUS} width={CAT_RADIUS * 2} height={CAT_RADIUS * 2}>
                        <div className="w-full h-full flex items-center justify-center relative pointer-events-auto">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeIndex % 4}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.25 }}
                                    src={`/src/gato/cat_0${(activeIndex % 4) + 1}.png`}
                                    alt="Schordi"
                                    className="w-[90%] h-[90%] object-contain relative z-10"
                                    onError={(e: any) => { e.currentTarget.src = 'https://utfs.io/f/cd115fb3-90d5-45d2-a745-f00e93ca910d-c0w41p.png'; }}
                                />
                            </AnimatePresence>
                        </div>
                    </foreignObject>

                    {/* PIEZAS DE LA RULETA */}
                    {bullets.map((_, index) => {
                        const startAngle = START_ANGLE_BASE + (index * (wedgeAngleSize + WEDGE_GAP));
                        const endAngle = startAngle + wedgeAngleSize;
                        const isActive = index === activeIndex;

                        const pathData = describeWedge(CENTER, CENTER, INNER_RADIUS, OUTER_RADIUS, startAngle, endAngle);
                        // Empujamos un poco el texto hacia afuera (0.48 -> 0.52) para alejarlo del borde interno
                        const midAngle = startAngle + (wedgeAngleSize / 2);
                        const midRadius = INNER_RADIUS + (OUTER_RADIUS - INNER_RADIUS) * 0.52;
                        const textPos = polarToCartesian(CENTER, CENTER, midRadius, midAngle);

                        const title = (bullets[index].shortTitle || bullets[index].title).toUpperCase();
                        const words = title.split(' ');

                        return (
                            <g key={index} className="pointer-events-auto cursor-pointer" onClick={() => onWedgeClick(index)}>
                                <motion.path
                                    d={pathData}
                                    fill={isActive ? `hsl(${hslColor} / 0.15)` : `hsl(${hslColor} / 0.05)`}
                                    stroke={isActive ? `hsl(${hslColor})` : `hsl(${hslColor} / 0.2)`}
                                    strokeWidth={isActive ? 3 : 1.5}
                                    animate={{
                                        fill: isActive ? `hsl(${hslColor} / 0.15)` : `hsl(${hslColor} / 0.02)`,
                                        filter: isActive ? `drop-shadow(0 0 16px hsl(${hslColor} / 0.6))` : "none",
                                    }}
                                    transition={{ duration: 0.3 }}
                                />

                                <text
                                    x={textPos.x}
                                    y={textPos.y}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="font-heading font-black tracking-wider pointer-events-none transition-all duration-300"
                                    style={{
                                        fill: 'white',
                                        fontSize: 18,
                                        opacity: isActive ? 1 : 0.4,
                                        textShadow: isActive ? `0 0 15px hsl(${hslColor}), 0 2px 4px rgba(0,0,0,0.8)` : '0 2px 4px rgba(0,0,0,0.8)'
                                    }}
                                >
                                    {words.map((word, i) => (
                                        <tspan
                                            key={i}
                                            x={textPos.x}
                                            dy={i === 0 ? -(words.length - 1) * 9 : 20}
                                        >
                                            {word}
                                        </tspan>
                                    ))}
                                </text>
                            </g>
                        );
                    })}

                    {/* LA FLECHA - INDESTRUCTIBLE Y COMPATIBLE CON SAFARI MÓVIL */}
                    <motion.g
                        initial={false}
                        animate={{
                            rotate: START_ANGLE_BASE + (activeIndex * (wedgeAngleSize + WEDGE_GAP)) + (wedgeAngleSize / 2) - 90
                        }}
                        transition={{ type: "spring", stiffness: 80, damping: 20 }}
                        /* 
                           EL TRUCO DE SAFARI: 
                           En lugar de usar píxeles absolutos (que Safari calcula mal), 
                           usamos porcentajes apoyados en la caja fantasma que hay dentro.
                        */
                        style={{ transformOrigin: "50% 50%" }}
                    >
                        {/* 
                            LA CAJA FANTASMA (PHANTOM BOUNDING BOX HACK)
                            Este círculo transparente e inerte fuerza a que el <motion.g> completo
                            tenga siempre un tamaño exacto de 600x600 (el tamaño del lienzo SVG).
                            Esto soluciona el bug de iOS/Safari donde el transformOrigin se 
                            deformaba porque solo consideraba el tamaño físico de la flechita.
                        */}
                        <circle cx={CENTER} cy={CENTER} r={CENTER} fill="transparent" className="pointer-events-none" />

                        {/* 
                            ESPACIO VACÍO SEGURO
                            Tenemos 40 unidades de espacio (INNER_RADIUS 150 - CAT_RADIUS 110 = 40).
                            Nueva flecha de 30 unidades posicionada en CAT_RADIUS + 5 (115).
                            Termina en 145, quedando EXACTAMENTE entre el gato y los bloques azules.
                            Nunca tocará la pieza azul que empieza en 150.
                        */}
                        <g transform={`translate(${CENTER + CAT_RADIUS} ${CENTER - 14})`}>
                            <path
                                d="M0 0 L24 14 L0 28 L6 14 Z"
                                fill="transparent"
                                stroke={`hsl(${hslColor})`}
                                strokeWidth="2.5"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                style={{ filter: `drop-shadow(0 0 5px hsl(${hslColor})) drop-shadow(0 0 15px hsl(${hslColor}))` }}
                            />
                        </g>
                    </motion.g>
                </svg>
            </div>
        </div>
    );
};
