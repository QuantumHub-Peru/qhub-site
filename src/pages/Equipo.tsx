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
    <div className="min-h-screen bg-background">
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
                className={`px-5 py-2 rounded-full font-body text-xs transition-all duration-300 ${
                  filter === f ? "btn-quantum" : "glass text-muted-foreground hover:text-foreground hover:border-primary/30"
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
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative glass-strong rounded-2xl p-8 max-w-lg w-full z-10"
            >
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="w-8 h-8 text-primary/60" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">{selected.name}</h3>
                  <p className="font-body text-sm text-primary">{selected.role}</p>
                  <p className="font-body text-xs text-muted-foreground">{selected.dept}</p>
                </div>
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">{selected.bio}</p>
              <a
                href={selected.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-quantum inline-flex items-center gap-2 text-xs"
              >
                <Linkedin className="w-4 h-4" /> Ver en LinkedIn
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Equipo;
