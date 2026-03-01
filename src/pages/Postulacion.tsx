import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    Clock,
    FileText,
    GraduationCap,
    Mail,
    MapPin,
    PenTool,
    Users,
    Terminal,
    Calculator,
    Binary,
    PieChart,
    HelpCircle
} from "lucide-react";
import FaqCarousel from "@/components/FaqCarousel";
import clubLogo from "@/assets/club.jpg";
import utecLogo from "@/assets/logoUTEC_horizontal.png";
import ParticleNetwork from "@/components/ParticleNetwork";

// FAQ Data
const faqs = [
    {
        question: "¿Cuánto cuesta el curso?",
        answer: "El curso es 100% gratis, por ello contamos con plazas limitadas.",
    },
    {
        question: "¿Las clases son presenciales o virtuales?",
        answer: "La modalidad es 100% virtual pues contamos con docentes que dictarán a larga distancia.",
    },
    {
        question: "¿Necesito conocimientos previos de ...?",
        answer: "Cada módulo tiene prerrequisitos específicos que se detallan en la sección del curso.",
    },
    {
        question: "¿Qué certificación obtengo al completar el curso?",
        answer: "Al completar el programa recibes un certificado de QuantumHub Perú.",
    },
    {
        question: "¿Hay límite de edad para postular?",
        answer: "Los estudiantes de secundaria (menores de edad) pueden postular al Módulo 1, y estudiantes universitarios de 1er a 4to ciclo o de academias preuniversitarias pueden postular a partir del Módulo 2.",
    },
    {
        question: "¿Ofrecen apoyo para conseguir trabajo después del curso?",
        answer: "Tenemos una red de empresas aliadas y profesionales en investigación y desarrollo en el área cuántica, pero no es parte del programa per se.",
    },
];

const Postulacion = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20">
                <div className="absolute inset-0 bg-background/50 z-0" />
                <div className="absolute inset-0 quantum-grid opacity-20" />
                <ParticleNetwork particleCount={40} connectionDistance={160} speed={0.4} />
                <div className="absolute top-20 left-10 w-72 h-72 bg-quantum-purple/10 rounded-full blur-[100px] animate-pulse-glow" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-quantum-blue/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />

                <div className="container relative z-10 mx-auto px-6 max-w-5xl text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/30 text-primary mb-6"
                    >
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                        </span>
                        <span className="text-sm font-medium">Admisión 2026 Próximamente</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-heading text-5xl md:text-7xl font-bold mb-6"
                    >
                        <span className="text-gradient-quantum">Postulación</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-muted-foreground font-body max-w-2xl mx-auto mb-10"
                    >
                        Únete a la próxima generación de especialistas en computación cuántica. Conoce todo sobre nuestro proceso de admisión.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center"
                    >
                        <a href="#rutas" className="btn-accent-cta inline-flex items-center gap-2 text-lg">
                            ¡Postular Ahora! <ArrowRight className="w-5 h-5" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Cronograma de Admisión */}
            <section className="py-24 bg-card/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
                <div className="absolute inset-0 quantum-grid opacity-5" />

                <div className="container mx-auto px-6 max-w-5xl relative z-10">
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/30 text-primary mb-6"
                        >
                            <CalendarDays className="w-4 h-4" />
                            <span className="text-sm font-medium">Fechas Importantes</span>
                        </motion.div>

                        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Cronograma de Admisión <span className="text-gradient-quantum">2026</span></h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Sigue estas fechas importantes para no perderte ninguna etapa del proceso de admisión.</p>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        {/* Central Animated Line */}
                        <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/5 via-accent/20 to-primary/5 md:-translate-x-1/2 rounded-full overflow-hidden">
                            <motion.div
                                className="w-full bg-gradient-to-b from-transparent via-primary to-transparent"
                                animate={{ height: ['0%', '20%', '100%'], top: ['-20%', '50%', '100%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                style={{ position: 'absolute', height: '20%' }}
                            />
                        </div>

                        <div className="space-y-16">
                            {/* Item 1: Postulación */}
                            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                                <div className="md:w-5/12 ml-16 md:ml-0 md:text-right order-2 md:order-1">
                                    <motion.div
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="glass-strong p-6 rounded-2xl border-primary/20 group-hover:border-primary/50 hover:glow-purple transition-all relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="relative z-10">
                                            <h3 className="font-heading text-2xl font-bold text-primary mb-2">Postulación</h3>
                                            <div className="inline-flex items-center gap-2 text-sm text-foreground/80 mb-3 bg-background/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-border/50">
                                                <CalendarDays className="w-4 h-4 text-quantum-blue" />
                                                1 de Septiembre - 7 de Septiembre
                                            </div>
                                            <p className="text-muted-foreground text-sm">Envío de formulario de postulación y verificación de documentos.</p>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Node */}
                                <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 w-7 h-7 rounded-full bg-background border-4 border-primary z-10 shadow-[0_0_15px_rgba(139,92,246,0.5)] flex items-center justify-center order-1 md:order-2 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(139,92,246,0.8)] transition-all duration-300">
                                    <motion.div
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="w-2.5 h-2.5 rounded-full bg-primary"
                                    />
                                </div>

                                <div className="md:w-5/12 order-3" />
                            </div>

                            {/* Item 2: Evaluación */}
                            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                                <div className="md:w-5/12 order-3 ml-16 md:ml-0">
                                    <motion.div
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="glass-strong p-6 rounded-2xl border-accent/20 group-hover:border-accent/50 hover:glow-yellow transition-all relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-bl from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="relative z-10">
                                            <h3 className="font-heading text-2xl font-bold text-accent mb-2">Evaluación</h3>
                                            <div className="inline-flex items-center gap-2 text-sm text-foreground/80 mb-3 bg-background/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-border/50">
                                                <Clock className="w-4 h-4 text-quantum-pink" />
                                                Sábado 13 de Sept. 3:00 PM - 5:00 PM
                                            </div>
                                            <p className="text-muted-foreground text-sm">
                                                Examen de ingreso presencial. Sede UTEC. <br />Traer DNI, lapicero y corrector.
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Node */}
                                <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 w-7 h-7 rounded-full bg-background border-4 border-accent z-10 shadow-[0_0_15px_rgba(245,158,11,0.5)] flex items-center justify-center order-1 md:order-2 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.8)] transition-all duration-300">
                                    <motion.div
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                                        className="w-2.5 h-2.5 rounded-full bg-accent"
                                    />
                                </div>

                                <div className="md:w-5/12 order-2 md:order-1" />
                            </div>

                            {/* Item 3: Resultados */}
                            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                                <div className="md:w-5/12 ml-16 md:ml-0 md:text-right order-2 md:order-1">
                                    <motion.div
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="glass-strong p-6 rounded-2xl border-quantum-pink/20 group-hover:border-quantum-pink/50 hover:glow-pink transition-all relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-quantum-pink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="relative z-10">
                                            <h3 className="font-heading text-2xl font-bold text-quantum-pink mb-2">Resultados</h3>
                                            <div className="inline-flex items-center gap-2 text-sm text-foreground/80 mb-3 bg-background/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-border/50">
                                                <CalendarDays className="w-4 h-4 text-primary" />
                                                Domingo 14 de Septiembre
                                            </div>
                                            <p className="text-muted-foreground text-sm">Publicación de resultados y notificación a admitidos.</p>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Node */}
                                <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 w-7 h-7 rounded-full bg-background border-4 border-quantum-pink z-10 shadow-[0_0_15px_rgba(217,70,239,0.5)] flex items-center justify-center order-1 md:order-2 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(217,70,239,0.8)] transition-all duration-300">
                                    <motion.div
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                                        className="w-2.5 h-2.5 rounded-full bg-quantum-pink"
                                    />
                                </div>

                                <div className="md:w-5/12 order-3" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Requisitos de Postulación */}
            <section className="py-20 relative">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="font-heading text-3xl font-bold mb-4">Requisitos de Postulación</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Asegúrate de cumplir con todos los requisitos y tener la documentación necesaria antes de enviar tu postulación.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glass p-6 rounded-2xl flex flex-col items-center text-center border-primary/20 hover:border-primary/50 transition-colors"
                        >
                            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary">
                                <FileText className="w-6 h-6" />
                            </div>
                            <p className="font-medium">Formulario de postulación completo</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="glass p-6 rounded-2xl flex flex-col items-center text-center border-quantum-blue/20 hover:border-quantum-blue/50 transition-colors"
                        >
                            <div className="w-12 h-12 bg-quantum-blue/20 rounded-full flex items-center justify-center mb-4 text-quantum-blue">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <p className="font-medium">DNI válido <br /><span className="text-sm text-muted-foreground">(se requerirá el día del examen)</span></p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="glass p-6 rounded-2xl flex flex-col items-center text-center border-accent/20 hover:border-accent/50 transition-colors"
                        >
                            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4 text-accent">
                                <PenTool className="w-6 h-6" />
                            </div>
                            <p className="font-medium">Lapicero y corrector <br /><span className="text-sm text-muted-foreground">(se utilizarán en el examen)</span></p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 flex flex-col sm:flex-row gap-4 items-center sm:items-start max-w-3xl mx-auto"
                    >
                        <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center shrink-0">
                            <MapPin className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                            <h4 className="text-amber-500 font-bold mb-1">Atención</h4>
                            <p className="text-amber-500/90 text-sm md:text-base">
                                Toma en cuenta que para este módulo la única sede para rendir el examen de admisión será la <b>UTEC</b>.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ¡Postula Ahora! (Rutas) */}
            <section id="rutas" className="py-20 relative overflow-hidden bg-secondary/30">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

                <div className="container relative z-10 mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="font-heading text-3xl font-bold mb-4 text-gradient-quantum">¡Postula Ahora!</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Completa tu postulación en línea y da el primer paso hacia tu futuro cuántico.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glass-strong p-8 rounded-3xl border-blue-500/20 hover:border-blue-500/50 hover:glow-blue transition-all relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-blue-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 text-blue-400">
                                    <Users className="w-8 h-8" />
                                </div>
                                <h3 className="font-heading text-2xl font-bold mb-2">Estudiantes de Secundaria</h3>
                                <div className="inline-block px-3 py-1 bg-blue-500/10 rounded-full text-blue-400 text-sm font-medium mb-6">Módulo 1</div>

                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-2 text-sm text-foreground/80">
                                        <CheckCircle2 className="w-4 h-4 text-blue-400" /> Edad límite: Etapa escolar
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-foreground/80">
                                        <CheckCircle2 className="w-4 h-4 text-blue-400" /> Nivelación asegurada
                                    </li>
                                </ul>

                                <a href="https://docs.google.com/forms/d/e/1FAIpQLSdDyYljeJ77f_a_AB0QAMNIx0eWbWhP8AbCmPmujsEglqxwJw/closedform" target="_blank" rel="noopener noreferrer" className="w-full py-3 rounded-lg font-heading font-semibold text-sm tracking-wider uppercase bg-secondary/50 text-muted-foreground border border-border cursor-not-allowed block text-center pointer-events-none">
                                    Cerrado Temporalmente
                                </a>
                                <p className="text-xs text-center text-muted-foreground mt-3">El proceso toma aproximadamente 5 minutos</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="glass-strong p-8 rounded-3xl border-primary/20 hover:border-primary/50 hover:glow-purple transition-all relative overflow-hidden group opacity-80"
                        >
                            <div className="absolute top-4 right-4 bg-primary/20 text-primary text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                                Próximamente
                            </div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 text-primary">
                                    <GraduationCap className="w-8 h-8" />
                                </div>
                                <h3 className="font-heading text-2xl font-bold mb-2">Estudiantes Universitarios</h3>
                                <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">Módulo 2</div>

                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-2 text-sm text-foreground/80">
                                        <CheckCircle2 className="w-4 h-4 text-primary" /> 1er a 4to ciclo o academia
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-foreground/80">
                                        <CheckCircle2 className="w-4 h-4 text-primary" /> Requiere Python básico
                                    </li>
                                </ul>

                                <button disabled className="w-full py-3 rounded-lg font-heading font-semibold text-sm tracking-wider uppercase bg-secondary/50 text-muted-foreground border border-border cursor-not-allowed">
                                    Cerrado Temporalmente
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Las Fijas del Módulo 2 */}
            <section className="py-20 relative">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="font-heading text-3xl font-bold mb-4">Las Fijas del Módulo 2</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Estos son los temas clave del examen para estudiantes universitarios. ¡Prepárate!
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Álgebra Lineal", icon: Calculator, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20", items: ["Vectores en ℝⁿ y ℂⁿ", "Matrices hermíticas y unitarias", "Producto escalar", "Operadores", "Autovalores y autovectores"] },
                            { title: "Números Complejos", icon: Binary, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20", items: ["Forma binómica y polar", "Módulo y argumento", "Operaciones básicas", "Plano complejo", "Fórmula de Euler"] },
                            { title: "Probabilidad y Estadística", icon: PieChart, color: "text-quantum-pink", bg: "bg-quantum-pink/10", border: "border-quantum-pink/20", items: ["Eventos simples y compuestos", "Probabilidad condicional", "Reglas de suma y producto", "Distribuciones discretas", "Análisis de frecuencias"] },
                            { title: "Algoritmos", icon: Terminal, color: "text-accent", bg: "bg-accent/10", border: "border-accent/20", items: ["Pseudocódigo", "Estructuras condicionales", "Bucles", "Definición de funciones", "Eficiencia básica"] }
                        ].map((subject, i) => (
                            <motion.div
                                key={subject.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`glass p-6 rounded-2xl border ${subject.border} hover:scale-[1.02] transition-transform`}
                            >
                                <div className={`w-12 h-12 ${subject.bg} rounded-xl flex items-center justify-center mb-4 ${subject.color}`}>
                                    <subject.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-heading font-bold text-lg mb-4">{subject.title}</h3>
                                <ul className="space-y-2">
                                    {subject.items.map((item, idx) => (
                                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${subject.bg.replace('/10', '')}`} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Preguntas Frecuentes */}
            <section className="py-24 relative bg-background overflow-hidden border-y border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-quantum-purple/10 via-background to-background z-0" />
                <ParticleNetwork particleCount={35} connectionDistance={140} speed={0.6} />

                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-quantum-pink/30 text-quantum-pink mb-6"
                        >
                            <HelpCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Resolviendo Dudas</span>
                        </motion.div>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Preguntas <span className="text-gradient-quantum">Frecuentes</span></h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Encuentra respuestas a las preguntas más comunes sobre nuestro programa y proceso de admisión.
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <FaqCarousel faqs={faqs} />
                    </motion.div>
                </div>
            </section>

            {/* Nuestros Colaboradores */}
            <section className="py-16 relative">
                <div className="container mx-auto px-6 max-w-5xl text-center">
                    <h2 className="font-heading text-2xl font-bold mb-2">Nuestros Colaboradores</h2>
                    <p className="text-sm text-muted-foreground mb-12">Trabajamos con las mejores instituciones para ofrecer una educación de calidad.</p>

                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center gap-4 group"
                        >
                            <div className="w-40 h-20 relative bg-white/5 rounded-xl flex items-center justify-center p-4 border border-white/10 group-hover:border-primary/30 transition-colors">
                                <img src={clubLogo} alt="Clubes de Ciencia Perú" className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                            </div>
                            <div className="text-sm">
                                <p className="font-medium text-foreground">Clubes de Ciencia Perú</p>
                                <p className="text-muted-foreground text-xs">Comunidad educativa</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-col items-center gap-4 group"
                        >
                            <div className="w-40 h-20 relative bg-white/5 rounded-xl flex items-center justify-center p-4 border border-white/10 group-hover:border-quantum-blue/30 transition-colors">
                                <img src={utecLogo} alt="Universidad de Ingeniería y Tecnología" className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                            </div>
                            <div className="text-sm">
                                <p className="font-medium text-foreground">Universidad de Ingeniería y Tecnología</p>
                                <p className="text-muted-foreground text-xs">Apoyo institucional</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 relative overflow-hidden bg-card/80 border-t border-border">
                <div className="absolute inset-0 quantum-grid opacity-5" />
                <div className="container relative z-10 mx-auto px-6 max-w-4xl text-center">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-heading text-3xl font-bold mb-4">
                            ¿Tienes más preguntas?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                            Nuestro equipo está listo para ayudarte con cualquier duda sobre el proceso de admisión o nuestros programas.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a href="mailto:contacto@qhubperu.org" className="btn-quantum w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base px-8 py-3">
                                Contactar Admisiones <Mail className="w-4 h-4 ml-1" />
                            </a>
                            <a href="/curso" className="btn-outline-quantum w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base px-8 py-3">
                                Ver Detalles del Curso
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Postulacion;
