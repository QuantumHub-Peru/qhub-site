import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, Microscope, Users, Lightbulb } from "lucide-react";

const categories = ["Todos", "Eventos", "Investigación", "Comunidad", "Innovación"];
const catIcons: Record<string, React.ElementType> = { Eventos: Calendar, Investigación: Microscope, Comunidad: Users, Innovación: Lightbulb };

const newsItems = [
  { title: "Quantum AI Summit 2025", cat: "Eventos", date: "Mar 2025", desc: "El primer evento cuántico organizado por QuantumHub Peru." },
  { title: "Paper publicado en arXiv", cat: "Investigación", date: "Feb 2025", desc: "Nuevo paper sobre algoritmos variacionales." },
  { title: "Meetup Lima #3", cat: "Comunidad", date: "Ene 2025", desc: "Tercer meetup con 80+ asistentes." },
  { title: "Alianza con universidad europea", cat: "Innovación", date: "Dic 2024", desc: "Nueva colaboración de investigación." },
  { title: "Graduados primera cohorte", cat: "Comunidad", date: "Nov 2024", desc: "50 graduados del primer curso de QC." },
  { title: "Hackathon Qiskit", cat: "Innovación", date: "Oct 2024", desc: "Primer hackathon cuántico en LATAM." },
];

import { useState } from "react";

const Noticias = () => {
  const [filter, setFilter] = useState("Todos");
  const filtered = filter === "Todos" ? newsItems : newsItems.filter(n => n.cat === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <p className="font-heading text-xs tracking-[0.3em] text-primary uppercase mb-4">Noticias</p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold">
              Movimiento del <span className="text-gradient-quantum">Ecosistema</span>
            </h1>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full font-body text-xs transition-all ${filter === cat ? "btn-quantum" : "glass text-muted-foreground hover:text-foreground"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((n, i) => {
              const Icon = catIcons[n.cat] || Calendar;
              return (
                <motion.div key={n.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass rounded-2xl p-6 group hover:glow-purple transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="font-body text-xs text-muted-foreground">{n.cat}</span>
                    <span className="ml-auto font-body text-xs text-muted-foreground">{n.date}</span>
                  </div>
                  <h3 className="font-heading text-sm font-bold mb-2">{n.title}</h3>
                  <p className="font-body text-xs text-muted-foreground">{n.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Noticias;
