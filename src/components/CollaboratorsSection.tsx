import { motion } from "framer-motion";
import uniLogo from "@/assets/img/logo_uni.png";
import ibmLogo from "@/assets/img/logo_IBM_Quantum.jpg";
import googleLogo from "@/assets/img/logo_google_quantum_ai.jpg";
import azureLogo from "@/assets/img/logo_azure.jpg";
import awsLogo from "@/assets/img/logo_aws_braket.jpg";
import qiskitLogo from "@/assets/img/logo_qiskit.png";
import qhubLogo from "@/assets/img/logo.png";

const collaborators = [
  { name: "IBM Quantum", img: ibmLogo, color: "rgba(10, 84, 255, 0.6)" },    // IBM Blue
  { name: "Universidad Nacional de Ingeniería", img: uniLogo, color: "rgba(168, 30, 48, 0.6)" },   // UNI Red
  { name: "Google Quantum AI", img: googleLogo, color: "rgba(255, 171, 0, 0.6)" },  // Google Yellow
  { name: "Microsoft Azure Quantum", img: azureLogo, color: "rgba(0, 164, 239, 0.6)" }, // Azure Blue
  { name: "AWS Braket", img: awsLogo, color: "rgba(255, 153, 0, 0.6)" },       // AWS Orange
  { name: "Qiskit Community", img: qiskitLogo, color: "rgba(133, 107, 255, 0.6)" }, // Qiskit Purple
];

const CollaboratorsSection = () => {
  const radius = 140; // Desktop orbital radius

  return (
    <section className="relative py-32 md:py-48 section-darker overflow-hidden flex flex-col items-center">
      {/* Background glow for the ecosystem */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-primary/30"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-heading text-xs md:text-sm tracking-[0.3em] text-muted-foreground uppercase mb-24 md:mb-32"
        >
          Con el respaldo de
        </motion.p>

        {/* Orbital Structure Container */}
        <div className="relative w-full max-w-4xl mx-auto flex justify-center items-center h-[350px] sm:h-[450px] md:h-[600px] mt-24 md:mt-32">

          {/* Central Node */}
          <div className="absolute z-20 flex flex-col items-center justify-center">
            <motion.div
              animate={{
                boxShadow: ["0 0 15px hsl(270,80%,60%,0.3)", "0 0 40px hsl(270,80%,60%,0.7)", "0 0 15px hsl(270,80%,60%,0.3)"]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-12 h-12 md:w-28 md:h-28 rounded-full bg-secondary/90 backdrop-blur-md border border-primary/50 flex items-center justify-center p-2 md:p-4"
            >
              <img src={qhubLogo} alt="QuantumHub Peru" className="w-full h-full object-contain" />
            </motion.div>
          </div>

          {/* CSS for orbit radius variables */}
          <style>{`
            .orbit-container { 
              --inner-radius: 140px; 
              --outer-radius: 340px; 
            }
            @media (max-width: 768px) { 
              .orbit-container { 
                --inner-radius: 110px; 
                --outer-radius: 230px; 
              } 
            }
            @media (max-width: 640px) { 
              .orbit-container { 
                --inner-radius: 80px; 
                --outer-radius: 180px; 
              } 
            }
            @media (max-width: 480px) { 
              .orbit-container { 
                --inner-radius: 65px; 
                --outer-radius: 130px; 
              } 
            }
          `}</style>

          <div className="absolute inset-0 flex items-center justify-center orbit-container">
            {/* SVG Orbit Rings */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              <circle cx="50%" cy="50%" r="var(--inner-radius)" fill="none" stroke="url(#gradient)" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="50%" cy="50%" r="var(--outer-radius)" fill="none" stroke="url(#gradient-outer)" strokeWidth="1" strokeDasharray="4 4" opacity="0.8" />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="gradient-outer" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--quantum-blue))" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="hsl(var(--quantum-turquoise))" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>

            {/* Synapse Pulses */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {/* Inner Ring Pulse */}
              <motion.circle
                cx="50%" cy="50%" r="var(--inner-radius)"
                fill="none" stroke="url(#gradient)" strokeWidth="3"
                strokeDasharray="1 1000" strokeLinecap="round"
                animate={{ strokeDashoffset: [0, -2000] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                style={{ filter: "drop-shadow(0 0 8px hsl(var(--primary)))" }}
                className="opacity-70"
              />
              {/* Outer Ring Pulse */}
              <motion.circle
                cx="50%" cy="50%" r="var(--outer-radius)"
                fill="none" stroke="url(#gradient-outer)" strokeWidth="3"
                strokeDasharray="1 1000" strokeLinecap="round"
                animate={{ strokeDashoffset: [0, 2000] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{ filter: "drop-shadow(0 0 8px hsl(var(--quantum-blue)))" }}
                className="opacity-70"
              />
            </svg>
            {/* Circling Logos */}
            {collaborators.map((c, i) => {
              const isOuter = i % 2 !== 0; // Alternate between inner and outer ring
              // Items in the same ring need to be spaced out proportionally to their sub-group length
              const itemsInRing = collaborators.length / 2;
              const subIndex = Math.floor(i / 2);

              // Calculate angles separately for each ring to space them evenly
              // Offset the outer ring by half a turn (60 degrees for 3 items) so they interleave with the inner ones
              const baseAngle = (subIndex * 360) / itemsInRing;
              const angle = isOuter ? baseAngle + (360 / itemsInRing / 2) : baseAngle;

              const currentRadius = isOuter ? 'var(--outer-radius)' : 'var(--inner-radius)';

              // Uniform movement to make it look elegant, synchronized, and "parejo"
              const duration = 60;
              const orbitRotation = [angle, angle + 360];
              const counterRotation = [-angle, -(angle + 360)];

              return (
                <motion.div
                  key={c.name}
                  className="absolute flex items-center justify-center pointer-events-none"
                  initial={{ rotate: angle }}
                  animate={{ rotate: orbitRotation }}
                  transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
                >
                  <div
                    className="absolute"
                    style={{ transform: `translateX(${currentRadius})` }}
                  >
                    {/* Counter-rotation to keep images upright */}
                    <motion.div
                      initial={{ rotate: -angle }}
                      animate={{ rotate: counterRotation }}
                      transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
                      className="flex flex-col items-center gap-1.5 md:gap-2 pointer-events-auto -translate-x-1/2 -translate-y-1/2"
                    >
                      <div
                        className="w-8 h-8 md:w-20 md:h-20 rounded-full bg-white border border-primary/20 overflow-hidden flex items-center justify-center p-0.5 md:p-1 cursor-pointer hover:scale-110 transition-all duration-300"
                        style={{ boxShadow: `0 0 25px ${c.color}, inset 0 0 10px ${c.color}` }}
                      >
                        <img src={c.img} alt={c.name} className="w-full h-full object-contain rounded-full" />
                      </div>
                      <span className="text-[7px] md:text-sm font-heading tracking-wide md:tracking-wider font-medium text-foreground bg-background/90 px-1 py-[2px] md:px-3 md:py-1 rounded-lg md:rounded-xl backdrop-blur-sm border border-border/50 text-center max-w-[80px] md:max-w-[150px] leading-tight">
                        {c.name}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaboratorsSection;
