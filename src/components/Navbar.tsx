import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Atom, BookOpen, Lightbulb, Megaphone, Users, ChevronDown } from "lucide-react";

const departments = [
  { label: "Investigación", path: "/investigacion", icon: Atom, color: "text-dept-research" },
  { label: "Académico", path: "/academico", icon: BookOpen, color: "text-dept-academic" },
  { label: "Innovación", path: "/innovacion", icon: Lightbulb, color: "text-dept-innovation" },
  { label: "Relaciones Públicas", path: "/relaciones-publicas", icon: Megaphone, color: "text-dept-relations" },
  { label: "Comunidad", path: "/comunidad", icon: Users, color: "text-dept-community" },
];

const navItems = [
  { label: "Inicio", path: "/" },
  { label: "Curso", path: "/curso" },
  { label: "Nosotros", path: "/nosotros", hasDropdown: true },
  { label: "Equipo", path: "/equipo" },
  { label: "Noticias", path: "/noticias" },
  { label: "Blog", path: "/blog" },
  { label: "Contacto", path: "/contacto" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [deptOpen, setDeptOpen] = useState(false);
  const [mobileDeptOpen, setMobileDeptOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-strong shadow-lg shadow-primary/5" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" onClick={handleLinkClick} className="flex items-center gap-3 group">
          <img src="/src/assets/img/logo.png" alt="QuantumHub Peru Logo" className="w-[28px] h-[28px] md:w-[35px] md:h-[35px] object-contain group-hover:scale-110 transition-transform" />
          <span className="font-heading text-sm font-bold tracking-widest text-foreground">
            QUANTUMHUB <span className="text-muted-foreground font-normal">PERU</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.path}
              className="relative"
              onMouseEnter={() => item.hasDropdown && setDeptOpen(true)}
              onMouseLeave={() => item.hasDropdown && setDeptOpen(false)}
            >
              <Link
                to={item.path}
                onClick={handleLinkClick}
                className="relative px-4 py-2 rounded-md text-sm font-body font-medium tracking-wide transition-colors group flex items-center gap-1"
                style={{
                  backgroundColor: location.pathname === item.path ? '#1C1A3A' : 'transparent',
                  color: location.pathname === item.path ? '#FFFFFF' : 'hsl(var(--muted-foreground))'
                }}
              >
                <span className={location.pathname === item.path || (item.hasDropdown && location.pathname.match(/^\/(investigacion|academico|innovacion|relaciones-publicas|comunidad)/)) ? "text-white group-hover:text-white" : "group-hover:text-white"}>
                  {item.label}
                </span>
                {item.hasDropdown && <ChevronDown className={`w-3 h-3 text-white/50 transition-transform ${deptOpen ? "rotate-180" : ""}`} />}
                {(location.pathname === item.path || (item.hasDropdown && location.pathname.match(/^\/(investigacion|academico|innovacion|relaciones-publicas|comunidad)/))) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                    style={{ background: "#DE5CA3" }}
                  />
                )}
              </Link>

              {/* Dropdown */}
              <AnimatePresence>
                {item.hasDropdown && deptOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 pt-2 w-64"
                  >
                    <div className="glass-strong rounded-xl p-2 shadow-xl shadow-primary/10">
                      {departments.map((dept) => (
                        <Link
                          key={dept.path}
                          to={dept.path}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover:bg-primary/10 group/dept"
                        >
                          <div className="w-8 h-8 rounded-lg bg-secondary/60 flex items-center justify-center group-hover/dept:bg-primary/20 transition-colors">
                            <dept.icon className={`w-4 h-4 ${dept.color}`} />
                          </div>
                          <span className="font-body text-sm text-muted-foreground group-hover/dept:text-foreground transition-colors">{dept.label}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <a href="https://www.qhubperu.com/aprendizaje" className="ml-4 btn-accent-cta text-xs py-2 px-5">
            Plataforma
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-border/30"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {navItems.map((item) => (
                <div key={item.path}>
                  <div className="flex items-center">
                    <Link
                      to={item.path}
                      onClick={() => {
                        handleLinkClick();
                        if (item.hasDropdown) setMobileDeptOpen(!mobileDeptOpen);
                      }}
                      className={`flex-1 text-sm font-body py-2 ${location.pathname === item.path ? "text-foreground" : "text-muted-foreground"
                        }`}
                    >
                      {item.label}
                    </Link>
                    {item.hasDropdown && (
                      <button onClick={() => setMobileDeptOpen(!mobileDeptOpen)} className="p-2 text-muted-foreground">
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileDeptOpen ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>
                  {item.hasDropdown && mobileDeptOpen && (
                    <div className="pl-4 pb-2 space-y-1">
                      {departments.map((dept) => (
                        <Link
                          key={dept.path}
                          to={dept.path}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 py-1.5 text-xs font-body text-muted-foreground hover:text-foreground"
                        >
                          <dept.icon className={`w-3 h-3 ${dept.color}`} />
                          {dept.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <a href="https://www.qhubperu.com/aprendizaje" onClick={() => setMobileOpen(false)} className="btn-accent-cta text-xs py-2 px-5 text-center mt-2">
                Plataforma
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
