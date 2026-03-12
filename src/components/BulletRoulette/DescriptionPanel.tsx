import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Bullet } from "./types";

interface DescriptionPanelProps {
    bullets: Bullet[];
    activeIndex: number;
    hslColor: string;
}

export const DescriptionPanel = ({ bullets, activeIndex, hslColor }: DescriptionPanelProps) => {
    const activeBullet = bullets[activeIndex];
    const hasKeyPoints = activeBullet?.keyPoints && activeBullet.keyPoints.length > 0;

    return (
        <div className="w-full flex-1 max-w-4xl shrink-0 relative z-40 flex lg:h-auto min-h-[400px]">
            <AnimatePresence mode="wait">
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
                            className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black mb-6 tracking-tight text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, white, hsl(${hslColor}))` }}
                        >
                            {activeBullet?.title}
                        </h3>

                        <p className={`font-body text-white/90 text-sm sm:text-base leading-relaxed font-medium tracking-wide text-justify ${hasKeyPoints ? 'mb-8' : 'mb-6'}`}>
                            {activeBullet?.description}
                        </p>

                        {hasKeyPoints && (
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
                                        <div className="mt-[2px] flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center bg-white/5 border border-white/10">
                                            <CheckCircle2 className="w-[10px] h-[10px] sm:w-3 sm:h-3" style={{ color: `hsl(${hslColor})` }} />
                                        </div>
                                        <span className="text-xs sm:text-sm text-white/80 font-medium">{point}</span>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {activeBullet?.images && activeBullet.images.length > 0 && (
                            <div className="mt-auto">
                                <div className={`flex gap-4 overflow-hidden ${hasKeyPoints ? 'h-32 sm:h-40' : 'h-64 sm:h-80'}`}>
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
            </AnimatePresence>
        </div>
    );
};
