import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DepartmentsSection from "@/components/DepartmentsSection";
import QuantumStates from "@/components/QuantumStates";
import QuantumMeasurement from "@/components/QuantumMeasurement";
import BlochSphere from "@/components/BlochSphere";
import { motion } from "framer-motion";
import { Target, Eye, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Nosotros = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <p className="font-heading text-xs tracking-[0.3em] text-primary uppercase mb-4">Sobre Nosotros</p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-6">
              Construyendo el <span className="text-gradient-quantum">Ecosistema Cuántico</span> de LATAM
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              QuantumHub Peru nace como respuesta a la necesidad de un ecosistema tecnológico en computación cuántica
              en una región donde la infraestructura es prácticamente inexistente.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              { icon: Target, title: "Misión", text: "Impulsar la educación, investigación e innovación en computación cuántica desde Latinoamérica, creando oportunidades para la próxima generación de científicos y tecnólogos." },
              { icon: Eye, title: "Visión", text: "Ser el principal hub de computación cuántica en Latinoamérica, conectando talento, recursos e instituciones para construir un futuro cuántico inclusivo." },
              { icon: Rocket, title: "Propósito", text: "Democratizar el acceso al conocimiento cuántico y crear puentes entre la academia, la industria y la comunidad en toda la región." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="glass rounded-2xl p-8 group hover:glow-purple transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-sm font-bold mb-3">{item.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Bloch Sphere */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <div className="text-center mb-8">
              <p className="font-heading text-xs tracking-[0.3em] text-primary uppercase mb-3">Navegación Cuántica</p>
              <h2 className="font-heading text-xl md:text-2xl font-bold mb-2">
                Esfera de <span className="text-gradient-quantum">Bloch</span>
              </h2>
              <p className="font-body text-sm text-muted-foreground max-w-md mx-auto">
                Rota la esfera para explorar los departamentos en el espacio de estados cuántico.
              </p>
            </div>
            <BlochSphere onNavigate={(path) => navigate(path)} />
          </motion.div>
        </div>
      </section>

      {/* Quantum States */}
      <QuantumStates />

      {/* Orbital Departments */}
      <DepartmentsSection />

      {/* Quantum Measurement Game */}
      <QuantumMeasurement />

      <Footer />
    </div>
  );
};

export default Nosotros;
