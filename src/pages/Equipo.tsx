import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

const teamMembers = [
  { name: "Director General", role: "Liderazgo" },
  { name: "Dir. Investigación", role: "Investigación" },
  { name: "Dir. Académico", role: "Académico" },
  { name: "Dir. Innovación", role: "Innovación" },
  { name: "Dir. Relaciones Públicas", role: "Comunicación" },
  { name: "Dir. Comunidad", role: "Comunidad" },
];

const Equipo = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="font-heading text-xs tracking-[0.3em] text-primary uppercase mb-4">Equipo</p>
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Nuestro <span className="text-gradient-quantum">Equipo</span>
          </h1>
          <p className="font-body text-muted-foreground">Las personas detrás del ecosistema cuántico.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teamMembers.map((m, i) => (
            <motion.div key={m.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6 text-center group hover:glow-purple transition-all">
              <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-sm font-bold">{m.name}</h3>
              <p className="font-body text-xs text-muted-foreground mt-1">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Equipo;
