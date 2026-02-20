import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Atom, BookOpen, Lightbulb, Megaphone, Users } from "lucide-react";

interface DeptPageProps {
  id: string;
  name: string;
  icon: React.ElementType;
  colorClass: string;
  glowClass: string;
  description: string;
  mission: string;
  actions: string[];
}

const deptData: Record<string, DeptPageProps> = {
  investigacion: {
    id: "investigacion", name: "Investigación", icon: Atom, colorClass: "text-dept-research",
    glowClass: "shadow-[0_0_30px_hsl(210,100%,60%,0.3)]",
    description: "El departamento de Investigación lidera los esfuerzos en exploración científica cuántica, desde algoritmos hasta hardware experimental.",
    mission: "Producir investigación de impacto y posicionar a Latinoamérica en el mapa cuántico global.",
    actions: ["Publicaciones científicas", "Colaboraciones internacionales", "Seminarios de investigación", "Mentorías para investigadores"]
  },
  academico: {
    id: "academico", name: "Académico", icon: BookOpen, colorClass: "text-dept-academic",
    glowClass: "shadow-[0_0_30px_hsl(270,70%,55%,0.3)]",
    description: "Diseñamos y ejecutamos programas educativos que hacen accesible la computación cuántica para todos los niveles.",
    mission: "Democratizar la educación cuántica en toda Latinoamérica.",
    actions: ["Diseño curricular", "Cursos y talleres", "Material educativo", "Certificaciones"]
  },
  innovacion: {
    id: "innovacion", name: "Innovación", icon: Lightbulb, colorClass: "text-dept-innovation",
    glowClass: "shadow-[0_0_30px_hsl(175,80%,50%,0.3)]",
    description: "Exploramos las aplicaciones prácticas de la computación cuántica en problemas reales de la región.",
    mission: "Conectar la investigación cuántica con soluciones que impacten a la sociedad.",
    actions: ["Hackathons cuánticos", "Incubación de proyectos", "Alianzas con industria", "Prototipado rápido"]
  },
  "relaciones-publicas": {
    id: "relaciones-publicas", name: "Relaciones Públicas", icon: Megaphone, colorClass: "text-dept-relations",
    glowClass: "shadow-[0_0_30px_hsl(45,100%,55%,0.3)]",
    description: "Amplificamos la voz de la computación cuántica en LATAM y construimos alianzas estratégicas.",
    mission: "Posicionar a QuantumHub Peru como referente cuántico regional.",
    actions: ["Comunicación estratégica", "Eventos y conferencias", "Alianzas institucionales", "Contenido digital"]
  },
  comunidad: {
    id: "comunidad", name: "Comunidad", icon: Users, colorClass: "text-dept-community",
    glowClass: "shadow-[0_0_30px_hsl(330,70%,60%,0.3)]",
    description: "Construimos la red más grande de entusiastas y profesionales cuánticos de Latinoamérica.",
    mission: "Crear una comunidad vibrante donde el conocimiento cuántico se comparte libremente.",
    actions: ["Meetups y networking", "Mentorías peer-to-peer", "Discord activo", "Proyectos comunitarios"]
  },
};

const DepartmentPage = ({ deptId }: { deptId: string }) => {
  const dept = deptData[deptId];
  if (!dept) return null;
  const Icon = dept.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className={`w-20 h-20 rounded-2xl glass mx-auto mb-6 flex items-center justify-center ${dept.glowClass}`}>
              <Icon className={`w-10 h-10 ${dept.colorClass}`} />
            </div>
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">{dept.name}</h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">{dept.description}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-8 mb-12">
            <h3 className="font-heading text-sm uppercase tracking-wider text-muted-foreground mb-3">Misión</h3>
            <p className="font-body text-foreground/90 leading-relaxed">{dept.mission}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h3 className="font-heading text-sm uppercase tracking-wider text-muted-foreground mb-6">Líneas de Acción</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {dept.actions.map((action, i) => (
                <motion.div key={action} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="glass rounded-xl p-5 group hover:glow-purple transition-all">
                  <p className="font-body text-sm text-foreground/80">{action}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default DepartmentPage;
