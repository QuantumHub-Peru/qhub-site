import { motion } from "framer-motion";
import { Users, Globe, BookOpen, Award } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Estudiantes", color: "text-quantum-purple" },
  { icon: Globe, value: "12", label: "Países", color: "text-quantum-blue" },
  { icon: BookOpen, value: "30+", label: "Módulos", color: "text-quantum-turquoise" },
  { icon: Award, value: "50+", label: "Proyectos", color: "text-quantum-yellow" },
];

const StatsSection = () => {
  return (
    <section className="relative py-24 section-darker">
      <div className="absolute inset-0 quantum-grid opacity-20" />
      <div className="relative z-10 container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-heading text-xs tracking-[0.3em] text-muted-foreground uppercase mb-12"
        >
          By the Numbers
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="text-center group"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl glass flex items-center justify-center group-hover:glow-purple transition-all">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="font-heading text-3xl md:text-4xl font-bold mb-1">{stat.value}</p>
              <p className="font-body text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
