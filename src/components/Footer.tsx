import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

const Footer = () => {
  const links = {
    Departamentos: [
      { label: "Investigación", href: "/investigacion" },
      { label: "Académico", href: "/academico" },
      { label: "Innovación", href: "/innovacion" },
      { label: "Relaciones Públicas", href: "/relaciones-publicas" },
      { label: "Comunidad", href: "/comunidad" },
    ],
    "Acceso Rápido": [
      { label: "Inicio", href: "/" },
      { label: "Nosotros", href: "/nosotros" },
      { label: "Curso", href: "/curso" },
      { label: "Plataforma", href: "https://www.qhubperu.com/aprendizaje" },
      { label: "Noticias", href: "/noticias" },
    ],
  };

  return (
    <footer className="relative py-20 section-darker border-t border-border/30 overflow-hidden">
      <div className="absolute inset-0 quantum-grid opacity-5" />
      <div className="relative z-10 container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/img/logo.png" alt="QuantumHub Peru Logo" className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] object-contain" />
              <span className="font-heading text-sm font-bold tracking-widest">QUANTUMHUB PERU</span>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">
              Construyendo el ecosistema cuántico de Latinoamérica a través de la educación, investigación e innovación.
            </p>
            {/* Newsletter */}

          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">{title}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social + copyright */}
        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-muted-foreground">
            © 2026 QuantumHub Peru. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <motion.a
              href="https://www.linkedin.com/company/quantumhub-per%C3%BA/"
              whileHover={{ y: -2 }}
              className="font-body text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              LinkedIn
            </motion.a>
            <motion.a
              href="https://www.instagram.com/quantumhub.pe/"
              whileHover={{ y: -2 }}
              className="font-body text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Instagram
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
