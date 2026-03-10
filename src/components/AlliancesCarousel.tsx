import { motion } from "framer-motion";
import { Users, Building2, Sparkles } from "lucide-react";

interface AlliancesCarouselProps {
    alliances?: { name: string, logo?: string, isUpcoming?: boolean, country?: string }[];
    hslColor: string;
}

export default function AlliancesCarousel({ alliances = [], hslColor }: AlliancesCarouselProps) {
    const displayAlliances = [...alliances];
    if (displayAlliances.length === 0) {
        displayAlliances.push({ name: "Nuevas alianzas pronto...", isUpcoming: true });
    }

    return (
        <section className="pt-8 pb-8 lg:pt-12 lg:pb-12 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div
                className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-[150px] opacity-[0.05] pointer-events-none rounded-[100%]"
                style={{ backgroundColor: `hsl(${hslColor})` }}
            />

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="text-center mb-16 lg:mb-24 flex flex-col items-center">


                    <h2 className="font-heading text-3xl md:text-5xl font-bold mb-0 text-white">
                        Nuestras <span style={{ color: `hsl(${hslColor})`, textShadow: `0 0 30px hsl(${hslColor} / 0.4)` }}>Alianzas</span>
                    </h2>
                </div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-10 items-stretch max-w-6xl mx-auto">
                    {displayAlliances.map((alliance, index) => {
                        const isUpcoming = alliance.isUpcoming;

                        return (
                            <motion.div
                                key={`${index}-${alliance.name}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.7, delay: index * 0.15, type: "spring", stiffness: 100 }}
                                className="relative group perspective-[1000px] flex flex-col items-center gap-6 w-[260px] md:w-[300px] py-8"
                            >
                                {/* The Atom / Bloch Sphere Container */}
                                <div className="relative w-40 h-40 md:w-48 md:h-48 flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105">

                                    {/* Orbital Rings - Atom Shape */}
                                    {!isUpcoming && (
                                        <div className="absolute inset-0 -m-8 md:-m-12 pointer-events-none">
                                            {/* Core Energy Glow */}
                                            <div
                                                className="absolute inset-0 m-auto w-24 h-24 rounded-full blur-[40px] opacity-40 group-hover:opacity-70 transition-opacity duration-700 mix-blend-screen z-0"
                                                style={{ backgroundColor: `hsl(${hslColor})` }}
                                            />

                                            {/* Orbit 1 */}
                                            <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'rotateZ(0deg) rotateX(72deg)' }}>
                                                <div className="absolute w-full h-full border border-white/20 rounded-full opacity-60" />
                                                <div className="absolute w-full h-full animate-[spin_6s_linear_infinite]">
                                                    <div
                                                        className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full"
                                                        style={{
                                                            backgroundColor: `hsl(${hslColor})`,
                                                            boxShadow: `0 0 12px 3px hsl(${hslColor} / 0.8)`
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Orbit 2 */}
                                            <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'rotateZ(60deg) rotateX(72deg)' }}>
                                                <div className="absolute w-full h-full border border-white/20 rounded-full opacity-60" />
                                                <div className="absolute w-full h-full animate-[spin_8s_linear_infinite_reverse]">
                                                    <div
                                                        className="absolute top-1/2 -right-[3px] -translate-y-1/2 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full"
                                                        style={{
                                                            backgroundColor: `hsl(${hslColor})`,
                                                            boxShadow: `0 0 12px 3px hsl(${hslColor} / 0.8)`
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Orbit 3 */}
                                            <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'rotateZ(120deg) rotateX(72deg)' }}>
                                                <div className="absolute w-full h-full border border-white/20 rounded-full opacity-60" />
                                                <div className="absolute w-full h-full animate-[spin_10s_linear_infinite]">
                                                    <div
                                                        className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full"
                                                        style={{
                                                            backgroundColor: `hsl(${hslColor})`,
                                                            boxShadow: `0 0 12px 3px hsl(${hslColor} / 0.8)`
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Central Logo Box */}
                                    <div
                                        className={`
                                            w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-[1.5rem] flex items-center justify-center relative z-10 transition-all duration-500
                                            ${isUpcoming ? 'bg-white/5 border border-dashed border-white/20' : 'bg-background/80 backdrop-blur-xl border border-white/10'}
                                        `}
                                        style={{
                                            boxShadow: !isUpcoming ? `0 0 25px hsl(${hslColor} / 0.3), inset 0 0 15px hsl(${hslColor} / 0.15)` : 'none'
                                        }}
                                    >
                                        {alliance.logo ? (
                                            <img src={alliance.logo} alt={alliance.name} className="w-[85%] h-[85%] object-contain filter drop-shadow-lg" />
                                        ) : (
                                            <Building2 className={`w-12 h-12 ${isUpcoming ? 'text-white/30' : 'text-white/80'}`} />
                                        )}
                                    </div>
                                </div>

                                {/* Alliance Name outside the sphere */}
                                <div className="text-center max-w-[220px] relative z-20 pt-4 md:pt-6">
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
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
