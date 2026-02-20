import { motion } from "framer-motion";

const collaborators = [
  { name: "Universidad Nacional de Ingeniería", color: "from-quantum-blue to-quantum-purple" },
  { name: "IBM Quantum", color: "from-quantum-purple to-quantum-pink" },
  { name: "Google Quantum AI", color: "from-quantum-turquoise to-quantum-blue" },
  { name: "Microsoft Azure Quantum", color: "from-quantum-yellow to-quantum-pink" },
  { name: "AWS Braket", color: "from-quantum-pink to-quantum-purple" },
  { name: "Qiskit Community", color: "from-quantum-blue to-quantum-turquoise" },
];

const CollaboratorsSection = () => {
  return (
    <section className="relative py-24 section-darker overflow-hidden">
      <div className="relative z-10 container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-heading text-xs tracking-[0.3em] text-muted-foreground uppercase mb-12"
        >
          Con el respaldo de
        </motion.p>
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {collaborators.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="glass rounded-xl px-6 py-4 cursor-default group hover:glow-purple transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${c.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
                <span className="font-body text-sm text-muted-foreground group-hover:text-foreground transition-colors">{c.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollaboratorsSection;
