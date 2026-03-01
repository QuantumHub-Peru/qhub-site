import { motion } from "framer-motion";
import { Check, X, Orbit } from "lucide-react";

interface Principle {
    focus: string;
    qh: string;
    otros: string;
}

const principles: Principle[] = [
    { focus: 'Público objetivo', qh: 'Secundaria y pregrado temprano.', otros: 'Pregrado avanzado y posgrado.' },
    { focus: 'Enfoque pedagógico', qh: 'Modular, accesible y progresivo, con acompañamiento educativo.', otros: 'Altamente técnico.' },
    { focus: 'Experiencia educativa', qh: 'Curso estructurado de 4 meses con evaluación de ingreso y niveles personalizados.', otros: 'Coloquios o bootcamps independientes.' },
    { focus: 'Comunidad y seguimiento', qh: 'Comunidad activa online, asesorías, mentores y seguimiento académico a lo largo del curso.', otros: 'Generalmente sin continuidad estructural.' },
    { focus: 'Integración curricular', qh: 'En diálogo con facultades universitarias y colegios para generar articulación real.', otros: 'Enfocado en actividades extracurriculares.' },
    { focus: 'Investigación e impacto', qh: 'Estudio y análisis de datos socioeconómicos, geográficos y académicos para detectar brechas y optimizar el acceso equitativo a la educación cuántica.', otros: 'Sin componente investigativo formal ni estudio del impacto educativo.' }
];

export default function AnimatedComparison() {
    return (
        <div className="space-y-8 relative py-12 w-full max-w-6xl mx-auto">
            {/* Background connecting line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-primary/30 to-transparent -translate-x-1/2 z-0" />

            {/* Columns Header (Desktop only) */}
            <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-8 mb-16 relative z-10 text-center uppercase tracking-widest font-heading">
                <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-quantum-blue">QuantumHub Perú</div>
                <div className="w-56"></div>
                <div className="text-xl font-bold text-muted-foreground/60">Otros Programas</div>
            </div>

            {principles.map((p, i) => (
                <motion.div
                    key={p.focus}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] md:gap-8 items-center md:items-stretch gap-4"
                >
                    {/* QuantumHub Side */}
                    <div className="glass p-6 md:p-8 rounded-2xl md:rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent hover:from-primary/20 hover:border-primary/60 transition-all duration-500 shadow-[0_0_20px_rgba(139,92,246,0.1)] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] group relative overflow-hidden flex flex-col justify-center">
                        {/* Ambient animated glow */}
                        <div className="absolute -right-20 -top-20 w-48 h-48 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-700" />
                        <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-quantum-blue/20 rounded-full blur-2xl group-hover:bg-quantum-blue/30 transition-all duration-700 delay-100" />

                        <div className="relative z-10 flex items-start gap-4">
                            <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.5)] group-hover:scale-110 transition-transform duration-300">
                                <Check className="w-5 h-5 text-primary drop-shadow-[0_0_5px_rgba(139,92,246,0.8)]" />
                            </div>
                            <div>
                                <p className="md:hidden text-[10px] font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                                    <Orbit className="w-3 h-3" /> {p.focus}
                                </p>
                                <h4 className="md:hidden font-heading text-lg font-bold text-white mb-2">QuantumHub Perú</h4>
                                <p className="text-foreground/90 text-sm md:text-base font-medium leading-relaxed">{p.qh}</p>
                            </div>
                        </div>
                    </div>

                    {/* Central Principle Node - Desktop Only */}
                    <div className="hidden md:flex flex-col items-center justify-center w-56 px-4">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-background border border-primary/40 py-4 px-6 rounded-2xl glass shadow-[0_0_30px_rgba(139,92,246,0.15)] flex flex-col items-center gap-3 relative z-10 w-full"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-quantum-blue/10 rounded-2xl opacity-50" />
                            <div className="w-10 h-10 rounded-full glass bg-background/50 flex items-center justify-center relative z-10 border border-white/10">
                                <Orbit className="w-5 h-5 text-quantum-blue" />
                            </div>
                            <span className="text-xs font-bold w-full uppercase tracking-widest text-[#E2E8F0] text-center relative z-10">{p.focus}</span>
                        </motion.div>

                        {/* Connecting horizontal lines hints */}
                        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/30 to-white/5 -z-10" />
                    </div>

                    {/* Otros Side */}
                    <div className="glass p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 bg-white/5 opacity-70 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500 overflow-hidden flex flex-col justify-center relative group">
                        <div className="flex items-start gap-4 flex-row md:flex-row">
                            <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 group-hover:bg-red-500/20 transition-colors">
                                <X className="w-4 h-4 text-red-400/80 group-hover:text-red-400 transition-colors" />
                            </div>
                            <div className="text-left">
                                <p className="md:hidden text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">{p.focus} (Otros)</p>
                                <h4 className="md:hidden font-heading text-lg font-bold text-muted-foreground mb-2">Otros Programas</h4>
                                <p className="text-muted-foreground text-sm flex-1 leading-relaxed">{p.otros}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
