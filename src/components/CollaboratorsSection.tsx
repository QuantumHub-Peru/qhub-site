import { motion } from "framer-motion";
import uniLogo from "@/assets/img/logo_uni.png";
import ibmLogo from "@/assets/img/logo_IBM_Quantum.jpg";
import googleLogo from "@/assets/img/logo_google_quantum_ai.jpg";
import azureLogo from "@/assets/img/logo_azure.jpg";
import awsLogo from "@/assets/img/logo_aws_braket.jpg";
import qiskitLogo from "@/assets/img/logo_qiskit.png";

const collaborators = [
  { name: "IBM Quantum", img: ibmLogo },
  { name: "Universidad Nacional de Ingeniería", img: uniLogo },
  { name: "Google Quantum AI", img: googleLogo },
  { name: "Microsoft Azure Quantum", img: azureLogo },
  { name: "AWS Braket", img: awsLogo },
  { name: "Qiskit Community", img: qiskitLogo },
];

const CollaboratorsSection = () => {
  // We separate the array render to duplicate it easily for an infinite marquee
  const Group = () => (
    <div className="flex items-center gap-16 md:gap-24 lg:gap-32 pr-16 md:pr-24 lg:pr-32">
      {collaborators.map((c, i) => (
        <div
          key={`${c.name}-${i}`}
          className="flex items-center justify-center shrink-0 h-16 md:h-20 lg:h-24 hover:scale-105 transition-transform duration-300 rounded overflow-hidden"
        >
          <img
            src={c.img}
            alt={c.name}
            className="h-full w-auto max-w-[200px] md:max-w-[250px] lg:max-w-[300px] object-contain"
          />
        </div>
      ))}
    </div>
  );

  return (
    <section className="relative py-24 md:py-32 section-darker flex flex-col items-center justify-center overflow-hidden border-b border-border/10">
      {/* Salto Cuantico Wave Background Effects */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 mix-blend-screen opacity-50">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary/20 blur-[100px] rounded-full"
        />
        <motion.div
          animate={{ rotate: -360, scale: [1, 1.3, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-quantum-pink/20 blur-[100px] rounded-full"
        />

        {/* Wave/Ripple Rings (Efectos de onda) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-primary/20"
              style={{ width: i * 200, height: i * 200 }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-full mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-heading text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-16"
          style={{ color: "#2c8d7b" }}
        >
          Con el respaldo de
        </motion.p>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden flex items-center mask-image-gradient">
          <style>{`
            .mask-image-gradient {
              mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
              -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            }
            .animate-marquee {
              animation: marquee 30s linear infinite;
            }
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); } 
            }
            .animate-marquee:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="flex w-max animate-marquee items-center">
            {/* Output two main parts to translate exactly -50% for a seamless loop */}
            <div className="flex"><Group /><Group /></div>
            <div className="flex"><Group /><Group /></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaboratorsSection;
