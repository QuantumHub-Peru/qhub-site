import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Linkedin, X, Users } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  dept: string;
  bio: string;
  linkedin: string;
}

const teamMembers: TeamMember[] = [
  { name: "Freddy Herrera Cueva", role: "CEO & Co-Fundador", dept: "Ejecutivo", bio: "Líder visionario en computación cuántica con experiencia en física teórica y emprendimiento tecnológico. Freddy fundó QuantumHub Peru con la misión de construir el primer ecosistema cuántico de Latinoamérica, conectando educación, investigación e industria para cerrar la brecha tecnológica regional.", linkedin: "#" },
  { name: "Adriana Alvarado León", role: "Co-Fundadora", dept: "Ejecutivo", bio: "Experta en gestión de proyectos tecnológicos y desarrollo organizacional. Adriana lidera la estrategia operativa de QuantumHub Peru, asegurando que cada iniciativa se ejecute con excelencia y contribuya al crecimiento sostenible del ecosistema cuántico latinoamericano.", linkedin: "#" },
  { name: "Vania Pachas Acuña", role: "Co-Fundadora", dept: "Ejecutivo", bio: "Investigadora en computación cuántica con formación en matemáticas aplicadas. Vania aporta rigor académico y visión científica al liderazgo de QuantumHub, impulsando programas de investigación y alianzas con instituciones internacionales.", linkedin: "#" },
  { name: "Claudia Zendejas-Morales", role: "Profesora Internacional", dept: "Académico", bio: "Docente e investigadora internacional especializada en mecánica cuántica y sistemas de información cuántica. Claudia diseña contenido curricular de clase mundial y facilita la transferencia de conocimiento entre universidades globales y QuantumHub Peru.", linkedin: "#" },
  { name: "Carlos Mendoza", role: "Dir. Investigación", dept: "Investigación", bio: "Físico con doctorado en óptica cuántica, Carlos lidera los proyectos de investigación en hardware y software cuántico. Su trabajo en fotónica cuántica integrada está posicionando a QuantumHub como referente en investigación aplicada en la región.", linkedin: "#" },
  { name: "María García", role: "Dir. Innovación", dept: "Innovación", bio: "Ingeniera en ciencias de la computación con maestría en machine learning cuántico. María conecta la investigación teórica con aplicaciones prácticas, organizando hackathons y programas de incubación para startups quantum-native en Latinoamérica.", linkedin: "#" },
  { name: "José Rivera", role: "Dir. Relaciones Públicas", dept: "Relaciones Públicas", bio: "Comunicador estratégico con experiencia en marketing tecnológico y relaciones institucionales. José amplifica la voz de QuantumHub Peru en medios internacionales y construye alianzas con universidades, empresas y gobiernos comprometidos con el futuro cuántico.", linkedin: "#" },
  { name: "Ana Torres", role: "Dir. Comunidad", dept: "Comunidad", bio: "Community builder apasionada por la tecnología inclusiva. Ana gestiona la comunidad de más de 500 entusiastas cuánticos, organiza meetups mensuales y programas de mentoría que conectan a estudiantes con profesionales del ecosistema cuántico global.", linkedin: "#" },
  { name: "Luis Fernández", role: "Investigador Senior", dept: "Investigación", bio: "Especialista en algoritmos cuánticos variacionales y quantum machine learning. Luis contribuye activamente a publicaciones científicas y guía a nuevos investigadores en el desarrollo de proyectos que exploran las fronteras de la computación cuántica.", linkedin: "#" },
  { name: "Sofía Ramírez", role: "Coordinadora Académica", dept: "Académico", bio: "Educadora con experiencia en diseño instruccional para tecnologías emergentes. Sofía coordina el desarrollo de cursos, talleres y programas de certificación que hacen accesible la computación cuántica a estudiantes de toda Latinoamérica.", linkedin: "#" },
  { name: "Diego Castillo", role: "Quantum Intern", dept: "Quantum Interns", bio: "Estudiante de física en la Universidad Nacional de Ingeniería, Diego participa en el programa de investigación en quantum hardware track, explorando circuitos ópticos y sistemas de fotónica cuántica bajo la mentoría del equipo senior.", linkedin: "#" },
  { name: "Valentina Cruz", role: "Quantum Intern", dept: "Quantum Interns", bio: "Estudiante de ingeniería de sistemas apasionada por quantum machine learning. Valentina desarrolla modelos híbridos clásico-cuánticos y contribuye al quantum software track con implementaciones en Qiskit y Pennylane.", linkedin: "#" },
];

const deptFilters = ["Todos", "Ejecutivo", "Académico", "Investigación", "Relaciones Públicas", "Innovación", "Comunidad", "Quantum Interns"];

const Equipo = () => {
  const [filter, setFilter] = useState("Todos");
  const [selected, setSelected] = useState<TeamMember | null>(null);
  const filtered = filter === "Todos" ? teamMembers : teamMembers.filter((m) => m.dept === filter);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <p className="font-heading text-xs tracking-[0.3em] text-primary uppercase mb-4">Equipo</p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Nuestro <span className="text-gradient-quantum">Equipo</span>
            </h1>
            <p className="font-body text-muted-foreground max-w-xl mx-auto">
              Conoce a los expertos que hacen posible la educación cuántica de vanguardia en QuantumHub Perú.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-2 mb-12">
            {deptFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full font-body text-xs transition-all duration-300 ${filter === f ? "btn-quantum" : "glass text-muted-foreground hover:text-foreground hover:border-primary/30"
                  }`}
              >
                {f}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((m, i) => (
                <motion.div
                  key={m.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelected(m)}
                  className="glass rounded-2xl overflow-hidden cursor-pointer group hover:glow-purple transition-all duration-300"
                >
                  {/* Avatar placeholder */}
                  <div className="aspect-[3/4] bg-gradient-to-br from-secondary to-muted relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Users className="w-10 h-10 text-primary/40" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                      <span className="font-body text-xs text-primary font-medium">Click para más info</span>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-heading text-xs font-bold tracking-wide">{m.name}</h3>
                    <p className="font-body text-xs text-primary mt-1">{m.role}</p>
                    <p className="font-body text-[10px] text-muted-foreground mt-0.5">{m.dept}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative glass-strong rounded-3xl max-w-5xl w-full z-10 overflow-y-auto overflow-x-hidden max-h-[95vh] flex flex-col p-6 sm:p-10 lg:p-12 shadow-[0_0_50px_-12px_rgba(120,60,255,0.3)] border border-primary/20"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 lg:top-6 lg:right-6 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-2 sm:p-3 rounded-full transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Main Content (Top Section) */}
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center lg:items-start mb-10 pt-4 lg:pt-0">
                {/* Left: Text Content */}
                <div className="flex-1 space-y-6 text-center lg:text-left order-2 lg:order-1">
                  <div>
                    <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2">
                      {selected.name}
                    </h3>
                    <p className="font-heading text-xl sm:text-2xl text-gradient-quantum font-semibold mb-3">
                      {selected.role}
                    </p>
                    <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                      <p className="font-body text-xs text-primary uppercase tracking-widest font-medium">
                        {selected.dept}
                      </p>
                    </div>
                  </div>

                  <p className="font-body text-base sm:text-lg text-white/80 leading-relaxed font-light">
                    {selected.bio}
                  </p>

                  <div className="pt-2 flex justify-center lg:justify-start">
                    <a
                      href={selected.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 bg-[#0a66c2]/90 hover:bg-[#0a66c2] text-white px-8 py-3.5 rounded-full text-sm font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(10,102,194,0.3)] hover:shadow-[0_0_30px_rgba(10,102,194,0.6)] hover:-translate-y-1"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span>Conectar en LinkedIn</span>
                    </a>
                  </div>
                </div>

                {/* Right: Avatar with Blobs */}
                <div className="relative w-56 h-56 sm:w-72 sm:h-72 shrink-0 order-1 lg:order-2 mt-4 lg:mt-0">
                  {/* Glowing background */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full blur-3xl opacity-20"></div>

                  {/* CSS Animated Blobs */}
                  <div className="absolute -inset-4 bg-gradient-to-tr from-primary/40 to-purple-500/40 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] animate-[spin_8s_linear_infinite] backdrop-blur-xl border border-white/5"></div>
                  <div className="absolute -inset-2 bg-gradient-to-br from-secondary/40 to-blue-500/40 rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] animate-[spin_12s_linear_infinite_reverse] backdrop-blur-xl border border-white/10"></div>

                  {/* Avatar Container */}
                  <div className="relative w-full h-full rounded-full border-2 border-white/10 bg-[#0A0B10] flex items-center justify-center overflow-hidden shadow-2xl z-10 group">
                    <Users className="w-24 h-24 sm:w-32 sm:h-32 text-primary/40 group-hover:scale-110 group-hover:text-primary/60 transition-all duration-500" />
                  </div>
                </div>
              </div>

              {/* Bottom Section: Highlights Grids (Like the 3 columns in the inspiration) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-auto">
                {/* Card 1 */}
                <div className="glass bg-white/5 hover:bg-white/10 p-6 sm:p-8 rounded-3xl flex flex-col items-center text-center gap-4 border border-white/5 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center text-white border border-primary/20 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-heading text-white font-bold text-sm uppercase tracking-wide mb-2">Rol Estratégico</h5>
                    <p className="font-body text-white/60 text-xs sm:text-sm leading-relaxed">{selected.role} clave dentro de QuantumHub.</p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="glass bg-white/5 hover:bg-white/10 p-6 sm:p-8 rounded-3xl flex flex-col items-center text-center gap-4 border border-white/5 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-secondary/5 group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/20 to-blue-500/20 flex items-center justify-center text-white border border-secondary/20 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-heading text-white font-bold text-sm uppercase tracking-wide mb-2">Impacto</h5>
                    <p className="font-body text-white/60 text-xs sm:text-sm leading-relaxed">Impulsando el desarrollo tecnológico del primer ecosistema cuántico.</p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="glass bg-white/5 hover:bg-white/10 p-6 sm:p-8 rounded-3xl flex flex-col items-center text-center gap-4 border border-white/5 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/5 group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-orange-500/20 flex items-center justify-center text-white border border-pink-500/20 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-heading text-white font-bold text-sm uppercase tracking-wide mb-2">Experiencia</h5>
                    <p className="font-body text-white/60 text-xs sm:text-sm leading-relaxed">Dedicación comprobada en el área de {selected.dept}.</p>
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Equipo;
