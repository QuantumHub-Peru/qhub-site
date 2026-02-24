import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Atom, BookOpen, Lightbulb, Megaphone, Users, Calendar, ArrowRight, Zap, Trophy, BrainCircuit, Rocket, Award } from "lucide-react";

interface Initiative {
  title: string;
  description: string;
  icon: React.ElementType;
  date?: string;
}

interface DeptPageData {
  name: string;
  subtitle: string;
  icon: React.ElementType;
  colorClass: string;
  borderColor: string;
  glowClass: string;
  bgAccent: string;
  hslColor: string;
  heroImage: string;
  description: string;
  mission: string;
  initiatives: Initiative[];
  projects: string[];
  howToJoin: string;
}

const deptData: Record<string, DeptPageData> = {
  investigacion: {
    name: "Departamento de Investigación",
    subtitle: "Proyectos técnicos en tecnologías cuánticas con enfoque aplicado",
    icon: Atom,
    colorClass: "text-[#3399FF]", // dept-research
    borderColor: "border-[#3399FF]/30",
    glowClass: "shadow-[0_0_30px_hsl(210,100%,60%,0.2)]",
    bgAccent: "from-[#3399FF]/10 to-transparent",
    hslColor: "210 100% 60%",
    heroImage: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=2670&auto=format&fit=crop", // laboratory
    description: "El Departamento de Investigación impulsa proyectos técnicos en tecnologías cuánticas con enfoque aplicado. Estamos integrados por egresados del curso de Computación Cuántica e Información Cuántica 2025 que continúan su formación científica con nosotros mediante investigación formal.",
    mission: "Producir investigación de impacto en computación cuántica y posicionar a Latinoamérica en el mapa cuántico global.",
    initiatives: [
      { title: "Publicación en arXiv: Fotónica Integrada", date: "Q3 2025", icon: BrainCircuit, description: "Desarrollo y modelado de componentes para plataformas cuánticas de fotónica integrada, documentando hallazgos sobre la eficiencia de acoplamiento." },
      { title: "Quantum Machine Learning aplicado a la Salud", date: "Activo", icon: Atom, description: "Despliegue de modelos híbridos cuánticos/clásicos enfocados en predicción de estructuras proteicas." },
      { title: "Directed Reading Programs (DRP)", date: "Continuo", icon: BookOpen, description: "Espacios de formación técnica intensiva orientados a investigación. Profundizamos en fundamentos teóricos y herramientas antes de integrarnos a proyectos activos." },
    ],
    projects: ["Fotónica cuántica integrada", "Quantum Machine Learning para medicina", "Análisis educativo con NLP", "Simulación de circuitos cuánticos"],
    howToJoin: "Para unirte al departamento de investigación, completa el curso introductorio y postula a uno de nuestros proyectos activos presentando tu perfil en Discord."
  },
  academico: {
    name: "Departamento Académico",
    subtitle: "Diseño curricular y programas educativos en tecnologías cuánticas",
    icon: BookOpen,
    colorClass: "text-[#AF52DE]", // dept-academic
    borderColor: "border-[#AF52DE]/30",
    glowClass: "shadow-[0_0_30px_hsl(270,70%,55%,0.2)]",
    bgAccent: "from-[#AF52DE]/10 to-transparent",
    hslColor: "270 70% 55%",
    heroImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2670&auto=format&fit=crop", // students/learning
    description: "El Departamento Académico diseña y ejecuta programas educativos que hacen accesible la computación cuántica para todos los niveles, desde principiantes hasta investigadores avanzados.",
    mission: "Democratizar la educación cuántica en toda Latinoamérica, eliminando barreras de acceso técnico y de lenguaje.",
    initiatives: [
      { title: "Curso Completo QC 2025", date: "Finalizado", icon: Trophy, description: "Culminación exitosa de la primera promoción de más de 300 estudiantes en fundamentos de información y computación cuántica." },
      { title: "Nueva Malla Curricular 2026", date: "En Desarrollo", icon: BookOpen, description: "Rediseño completo del material educativo integrando Pennylane y Qiskit 1.0, enfocado en aprendizaje interactivo." },
      { title: "Formación de Facilitadores", date: "Q2 2025", icon: Users, description: "Programa intensivo de 'train the trainers' para graduados del curso anterior, preparándolos para ser los profesores de la siguiente generación." },
    ],
    projects: ["Curso Introductorio QC 2026", "Talleres Presenciales", "Programa de certificación", "Libro de texto colaborativo"],
    howToJoin: "Buscamos constantemente profesores, mentores y creadores de contenido técnico. Envíanos un correo a academico@quantumhub.pe."
  },
  innovacion: {
    name: "Departamento de Innovación",
    subtitle: "Aplicaciones prácticas y startups cuánticas",
    icon: Lightbulb,
    colorClass: "text-[#10E8D9]", // dept-innovation
    borderColor: "border-[#10E8D9]/30",
    glowClass: "shadow-[0_0_30px_hsl(175,80%,50%,0.2)]",
    bgAccent: "from-[#10E8D9]/10 to-transparent",
    hslColor: "175 80% 50%",
    heroImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop", // tech/cyber space
    description: "El Departamento de Innovación explora las aplicaciones prácticas de la computación cuántica en problemas productivos de la región, tendiendo puentes directos entre la academia cuántica y el ecosistema de empresas y startups.",
    mission: "Traducir la ventaja cuántica teórica en soluciones tangibles para problemas industriales contemporáneos en Latinoamérica.",
    initiatives: [
      { title: "Quantum LATAM Hackathon", date: "Octubre 2025", icon: Rocket, description: "Competencia de fin de semana resolviendo problemas de optimización logística y portafolios financieros de empresas locales usando solvers híbridos." },
      { title: "Incubadora Q-Startups", date: "Fase Piloto", icon: Lightbulb, description: "Primera cohorte piloto apoyando a 3 equipos de estudiantes en el diseño de su modelo de negocio (spin-off) basado en tecnologías cuánticas." },
      { title: "Alianzas Estratégicas B2B", date: "Continuo", icon: BrainCircuit, description: "Conversaciones abiertas con los sectores bancarios y de agro-industria locales para explicar y explorar pilotos POC cuánticos." },
    ],
    projects: ["Hackathon Quantum Series", "Quantum Finance Simulator", "Optimización agrologística QAA", "Reportes de Industria"],
    howToJoin: "Desarrolladores, emprendedores, PMs de producto son bienvenidos. Postula tus ideas innovadoras a nuestro repositorio central de pitch."
  },
  "relaciones-publicas": {
    name: "Relaciones Públicas",
    subtitle: "Comunicación, alianzas estratégicas y difusión",
    icon: Megaphone,
    colorClass: "text-[#FFCC00]", // dept-relations
    borderColor: "border-[#FFCC00]/30",
    glowClass: "shadow-[0_0_30px_hsl(45,100%,55%,0.2)]",
    bgAccent: "from-[#FFCC00]/10 to-transparent",
    hslColor: "45 100% 55%",
    heroImage: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2670&auto=format&fit=crop", // networking / people
    description: "Amplificamos la voz de la computación cuántica en LATAM mediante relaciones internacionales e institucionales. Construimos y mantenemos vínculos clave con universidades, patrocinadores y la prensa especializada.",
    mission: "Convertir a QuantumHub Peru en el representante principal del continente ante las grandes esferas cuánticas de IBM, Google, AWS y startups líderes mundiales.",
    initiatives: [
      { title: "Sponsorship Q-Summit", date: "Agosto 2025", icon: Award, description: "Campaña central levantando fondos y alianzas con los mayores provedores de hardware del mundo para subvencionar el gran evento Quantum AI." },
      { title: "Lanzamiento del Podcast 'Superposición'", date: "Q1 2026", icon: Megaphone, description: "Programa de entrevistas en español con científicos latinoamericanos trabajando en corporaciones de primera línea en todo el globo." },
      { title: "Expansión Universitaria", date: "Continuo", icon: Users, description: "Firma sistemática de Memorándums de Entendimiento (MoUs) con universidades en todo LATAM para convalidar créditos." },
    ],
    projects: ["Quantum AI Summit 2025", "Plan de Branding Internacional", "Podcast Superposición", "Programa Ambassadors"],
    howToJoin: "Relacionistas públicos, marketers, abogados, diseñadores gráficos y comunicadores. ¡Ayúdanos a hacer que la cuántica sea pop y formal a la vez en LATAM!"
  },
  comunidad: {
    name: "Departamento de Comunidad",
    subtitle: "La base humana, red de entusiastas y profesionales",
    icon: Users,
    colorClass: "text-[#FF3399]", // dept-community
    borderColor: "border-[#FF3399]/30",
    glowClass: "shadow-[0_0_30px_hsl(330,70%,60%,0.2)]",
    bgAccent: "from-[#FF3399]/10 to-transparent",
    hslColor: "330 70% 60%",
    heroImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2670&auto=format&fit=crop", // energetic group of people
    description: "Nosotros somos los constructores de comunidad. Nos encargamos de que la red más grande de entusiastas cuánticos en Latinoamérica sea saludable, integradora y sinérgica. Mantenemos vivos los engranajes sociales de toda la organización.",
    mission: "Crear una comunidad vibrante asíncrona y presencial donde el conocimiento se distribuye democráticamente mediante pares (peer-to-peer).",
    initiatives: [
      { title: "Reestructuración Discord 2.0", date: "Febrero 2025", icon: BrainCircuit, description: "Apertura de nuevos canales de estudio, foros de papers orientados, gamificación (puntos Q) y sistema de roles automáticos para nuestros más de 600 miembros." },
      { title: "Meetup Presencial Lima #1", date: "Verano 2025", icon: Calendar, description: "El primer gran reencuentro offline. Cerveza, pizzas, networking de primer nivel y chárla introductoria sobre el ecosistema." },
      { title: "Sistema de Mentorías Estructuradas", date: "Plataforma Beta", icon: Users, description: "Emparejamiento de alumnos ingresantes 2026 con Egresados 2025 (Alumni) para asesoría técnica, emocional y metodológica 1-a-1." },
    ],
    projects: ["Plataforma Discord Q-Hub", "Eventos Offline Meetups", "Programa de Mentorías", "Wiki colaborativa LATAM"],
    howToJoin: "Community Builders, moderadores de comunidades, gente muy empática y social. Ingresa al discord general, conócenos y pide acceso al squad organizador."
  },
};

const DepartmentPage = ({ deptId }: { deptId: string }) => {
  const dept = deptData[deptId];
  const [hoveredInit, setHoveredInit] = useState<number | null>(null);

  if (!dept) return null;
  const Icon = dept.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-grow">

        {/* OVERLAPPING HERO SECTION */}
        <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full min-h-[85vh] flex items-center">

          <div className="flex flex-col lg:flex-row w-full gap-8 lg:gap-0 lg:items-stretch relative">

            {/* The Image Side (Right side on desktop, top on mobile) */}
            <div className="w-full lg:w-3/5 lg:absolute lg:top-0 lg:bottom-0 lg:right-0 h-64 sm:h-80 lg:h-auto rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl z-0">
              <div
                className="absolute inset-0 z-10 mix-blend-color"
                style={{ backgroundColor: `hsl(${dept.hslColor} / 0.4)` }}
              />
              <div
                className="absolute inset-0 z-20 opacity-60 mix-blend-multiply"
                style={{ backgroundColor: `hsl(${dept.hslColor} / 0.3)` }}
              />
              {/* Subtle dynamic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-30 lg:bg-gradient-to-l" />
              <img
                src={dept.heroImage}
                alt={dept.name}
                className="w-full h-full object-cover transform scale-105 transition-transform duration-1000"
              />
            </div>

            {/* The Overlapping Info Card (Left side on desktop, bottoms on mobile) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-[55%] relative z-40 mt-[-4rem] sm:mt-[-6rem] lg:mt-0 lg:py-12"
            >
              <div
                className="glass-strong bg-background/60 backdrop-blur-2xl rounded-[2rem] lg:rounded-[3rem] p-8 sm:p-10 lg:p-14 border border-white/5"
                style={{
                  boxShadow: `0 30px 60px -15px rgba(0,0,0,0.8), 0 0 100px -20px hsl(${dept.hslColor} / 0.2), inset 0 0 0 1px hsl(${dept.hslColor} / 0.15)`
                }}
              >
                {/* Icon badge */}
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-8 relative group"
                  style={{ backgroundColor: `hsl(${dept.hslColor} / 0.1)` }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl opacity-50 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ backgroundColor: `hsl(${dept.hslColor})` }}
                  />
                  <Icon
                    className="w-8 h-8 sm:w-10 sm:h-10 relative z-10"
                    style={{ color: `hsl(${dept.hslColor})` }}
                  />
                </div>

                <div
                  className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-5"
                  style={{
                    backgroundColor: `hsl(${dept.hslColor} / 0.15)`,
                    color: `hsl(${dept.hslColor})`,
                    border: `1px solid hsl(${dept.hslColor} / 0.3)`
                  }}
                >
                  <Zap className="w-3 h-3 mr-2" />
                  {dept.subtitle}
                </div>

                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white tracking-tight mb-8">
                  {dept.name}
                </h1>

                <p className="font-body text-lg sm:text-xl text-white/70 leading-relaxed font-light mb-10">
                  {dept.description}
                </p>

                <div
                  className="pl-6 border-l-4 py-2"
                  style={{ borderColor: `hsl(${dept.hslColor})` }}
                >
                  <h4 className="font-heading text-xs uppercase tracking-[0.2em] font-bold text-white/50 mb-2">
                    Misión del Departamento
                  </h4>
                  <p className="font-body text-[17px] text-white/90 font-medium italic leading-relaxed">
                    "{dept.mission}"
                  </p>
                </div>

              </div>
            </motion.div>

          </div>
        </section>

        {/* INITIATIVES TIMELINE SECTION */}
        <section className="py-24 relative overflow-hidden bg-[#0a0e1a]/50">
          <div className="absolute inset-0 quantum-grid opacity-5" />

          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <div className="text-center mb-20">
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4 text-white">
                Iniciativas y <span style={{ color: `hsl(${dept.hslColor})`, textShadow: `0 0 30px hsl(${dept.hslColor} / 0.4)` }}>Eventos</span>
              </h2>
              <p className="font-body text-lg text-white/50 max-w-2xl mx-auto">
                El pulso vital del departamento. Descubre en lo que estamos trabajando activamente y nuestros principales hitos.
              </p>
            </div>

            {/* The Timeline */}
            <div className="relative">
              {/* Vertical Glowing Line */}
              <div
                className="absolute left-6 md:left-1/2 md:-translate-x-px top-4 bottom-4 w-1 rounded-full opacity-30"
                style={{ background: `linear-gradient(to bottom, transparent, hsl(${dept.hslColor}), transparent)` }}
              />

              <div className="space-y-12">
                {dept.initiatives.map((init, i) => {
                  const isLeft = i % 2 === 0;
                  const InitIcon = init.icon;
                  const isHovered = hoveredInit === i;

                  return (
                    <motion.div
                      key={init.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className={`relative pl-20 md:pl-0 flex items-center ${isLeft ? "md:flex-row-reverse" : "md:flex-row"}`}
                      onMouseEnter={() => setHoveredInit(i)}
                      onMouseLeave={() => setHoveredInit(null)}
                    >
                      {/* Timeline Node (Circle in the middle) */}
                      <div className="absolute left-[22px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full z-20 transition-all duration-300 transform md:hover:scale-150"
                        style={{
                          backgroundColor: isHovered ? `hsl(${dept.hslColor})` : '#0f172a',
                          border: `3px solid hsl(${dept.hslColor})`,
                          boxShadow: isHovered ? `0 0 20px hsl(${dept.hslColor})` : 'none'
                        }}
                      />

                      {/* Content Card Side */}
                      <div className="w-full md:w-[calc(50%-3rem)]">
                        <div
                          className="glass bg-background/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 transition-all duration-500 overflow-hidden relative group"
                          style={{
                            borderColor: isHovered ? `hsl(${dept.hslColor} / 0.4)` : 'rgba(255,255,255,0.05)',
                            transform: isHovered ? 'translateY(-4px)' : 'none',
                            boxShadow: isHovered ? `0 20px 40px -10px rgba(0,0,0,0.8), 0 0 40px -10px hsl(${dept.hslColor} / 0.15)` : 'none'
                          }}
                        >
                          {/* Inner soft glow on hover */}
                          <div
                            className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[60px] opacity-0 transition-opacity duration-700 pointer-events-none group-hover:opacity-20"
                            style={{ backgroundColor: `hsl(${dept.hslColor})` }}
                          />

                          <div className={`flex flex-col ${isLeft ? "md:items-end md:text-right" : "md:items-start"} gap-4 relative z-10`}>
                            {/* Meta Track row: Icon + Date */}
                            <div className={`flex items-center gap-3 w-full ${isLeft ? "md:flex-row-reverse" : ""}`}>
                              <div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                                style={{ backgroundColor: `hsl(${dept.hslColor} / 0.1)` }}
                              >
                                <InitIcon className="w-6 h-6" style={{ color: `hsl(${dept.hslColor})` }} />
                              </div>
                              {init.date && (
                                <span
                                  className="font-heading text-[10px] sm:text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full border"
                                  style={{
                                    backgroundColor: `hsl(${dept.hslColor} / 0.05)`,
                                    color: `hsl(${dept.hslColor})`,
                                    borderColor: `hsl(${dept.hslColor} / 0.3)`
                                  }}
                                >
                                  {init.date}
                                </span>
                              )}
                            </div>

                            {/* Text Content */}
                            <div>
                              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-3">
                                {init.title}
                              </h3>
                              <p className="font-body text-white/60 text-sm sm:text-base leading-relaxed">
                                {init.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS & CTA BOTTOM SECTION */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

              {/* Active Projects List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#0f1422] rounded-[3rem] p-8 sm:p-12 border border-white/5 relative overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] opacity-10 pointer-events-none"
                  style={{ backgroundColor: `hsl(${dept.hslColor})` }}
                />
                <h3 className="font-heading text-2xl font-bold text-white mb-8 flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: `hsl(${dept.hslColor})` }} />
                  <span className="relative z-10">Proyectos Activos</span>
                </h3>

                <div className="space-y-4 relative z-10">
                  {dept.projects.map((p, i) => (
                    <div
                      key={p}
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `hsl(${dept.hslColor} / 0.15)` }}
                      >
                        <Zap className="w-4 h-4" style={{ color: `hsl(${dept.hslColor})` }} />
                      </div>
                      <span className="font-body text-white/80 font-medium group-hover:text-white transition-colors">
                        {p}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Join Department CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-[3rem] p-8 sm:p-12 relative flex flex-col justify-center overflow-hidden"
                style={{
                  background: `linear-gradient(145deg, hsl(${dept.hslColor} / 0.15), rgba(0,0,0,0) 80%)`,
                  borderColor: `hsl(${dept.hslColor} / 0.3)`,
                  borderWidth: '1px'
                }}
              >
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-white/10 backdrop-blur-md">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-white mb-6">¿Cómo Participar?</h3>
                  <p className="font-body text-lg text-white/70 leading-relaxed mb-10">
                    {dept.howToJoin}
                  </p>

                  <a
                    href="/nosotros"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-heading font-bold text-sm uppercase tracking-widest text-white transition-all hover:scale-105 group"
                    style={{
                      background: `linear-gradient(135deg, hsl(${dept.hslColor}), hsl(${dept.hslColor} / 0.6))`,
                      boxShadow: `0 10px 30px -10px hsl(${dept.hslColor} / 0.6)`
                    }}
                  >
                    Postula Aquí
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </a>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default DepartmentPage;
