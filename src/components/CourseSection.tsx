import { motion } from "framer-motion";
import { Clock, Users, BookOpen, ArrowRight } from "lucide-react";

const modules = [
  "Fundamentos de Mecánica Cuántica",
  "Qubits y Puertas Lógicas",
  "Algoritmos Cuánticos",
  "Circuitos con Qiskit",
  "Aplicaciones Reales",
  "Proyecto Final",
];

const CourseSection = () => {
  return (
    <section className="relative py-28 section-darker overflow-hidden">
      <div className="absolute inset-0 circuit-lines opacity-10" />
      <div className="relative z-10 container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-heading text-xs tracking-[0.3em] text-accent uppercase mb-4"
          >
            Próximo Curso
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-2xl md:text-4xl font-bold mb-4"
          >
            Introducción a la <span className="text-gradient-quantum">Computación Cuántica</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-muted-foreground max-w-xl mx-auto"
          >
            Un programa diseñado para llevar los fundamentos de la computación cuántica a toda Latinoamérica, sin requisitos previos avanzados.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Clock, label: "Duración", value: "12 semanas" },
            { icon: Users, label: "Modalidad", value: "100% Online" },
            { icon: BookOpen, label: "Módulos", value: "6 módulos" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-6 text-center group hover:glow-purple transition-all"
            >
              <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-heading text-xs text-muted-foreground uppercase tracking-wider">{item.label}</p>
              <p className="font-body text-lg font-semibold mt-1">{item.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Module timeline */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-quantum-pink to-transparent" />
          {modules.map((mod, i) => (
            <motion.div
              key={mod}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 py-3 group"
            >
              <div className="w-8 h-8 rounded-full glass flex items-center justify-center shrink-0 group-hover:glow-purple transition-all z-10">
                <span className="font-heading text-xs text-primary">{i + 1}</span>
              </div>
              <span className="font-body text-sm text-muted-foreground group-hover:text-foreground transition-colors">{mod}</span>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a href="/curso" className="btn-accent-cta inline-flex items-center gap-2">
            Más Información <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
