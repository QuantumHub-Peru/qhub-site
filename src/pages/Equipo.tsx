import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Linkedin, X, Users } from "lucide-react";

interface TeamMember {
  name: string;
  role: string[];
  dept: string[];
  bio: string;
  linkedin: string;
  foto?: string;
}

const deptFilters = ["Todos", "Ejecutivo", "Académico", "Investigación", "Relaciones Públicas", "Innovación", "Comunidad"];

const Equipo = () => {
  const [filter, setFilter] = useState("Todos");
  const [selected, setSelected] = useState<TeamMember | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [bioExpanded, setBioExpanded] = useState(false);

  useEffect(() => {
    fetch("/data/equipo.json")
      .then(res => res.json())
      .then(data => setTeamMembers(data))
      .catch(err => console.error("Error loading team data:", err));
  }, []);

  const getDeptWeight = (dept: string) => {
    const weights: Record<string, number> = {
      "Ejecutivo": 1,
      "Académico": 2,
      "Investigación": 3,
      "Innovación": 4,
      "Comunidad": 5,
      "Relaciones Públicas": 6
    };
    return weights[dept] || 99;
  };

  const getRoleWeight = (roles: string[]) => {
    if (!roles || !Array.isArray(roles) || roles.length === 0) return 6;
    let minWeight = 6;
    for (const role of roles) {
      if (!role) continue;
      const r = role.toLowerCase();
      if (r.includes("co-founder") || r.includes("co-fundador") || r.includes("co-fundadora")) minWeight = Math.min(minWeight, 1);
      else if (r.includes("chief")) minWeight = Math.min(minWeight, 2);
      else if (r.includes("director") || r.includes("directora") || r.includes("co-director") || r.includes("co-directora") || r.includes("lead")) minWeight = Math.min(minWeight, 3);
      else if (r.includes("senior")) minWeight = Math.min(minWeight, 4);
      else if (r.includes("junior")) minWeight = Math.min(minWeight, 5);
    }
    return minWeight;
  };

  const filtered = filter === "Todos" ? teamMembers : teamMembers.filter((m) => m.dept && m.dept.includes(filter));
  const sortedMembers = [...filtered].sort((a, b) => {
    const roleWeightA = getRoleWeight(a.role);
    const roleWeightB = getRoleWeight(b.role);
    if (roleWeightA !== roleWeightB) {
      return roleWeightA - roleWeightB;
    }

    // Custom name priorities WITHIN same role
    const customPriority = (name: string) => {
      const n = name.toLowerCase();
      // First in the same role level
      if (n.includes("rocio")) return -3;
      if (n.includes("daniella")) return -2;
      if (n.includes("marcelo") || n.includes("marcello")) return -1;

      // Last in the same role level
      if (n.includes("valentino")) return 100; // Second to last
      if (n.includes("gabriel")) return 101; // Last
      return 0; // Default
    };

    const priorityA = customPriority(a.name);
    const priorityB = customPriority(b.name);

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    const highestDeptA = a.dept && a.dept.length > 0 ? Math.min(...a.dept.map(getDeptWeight)) : 99;
    const highestDeptB = b.dept && b.dept.length > 0 ? Math.min(...b.dept.map(getDeptWeight)) : 99;

    if (highestDeptA !== highestDeptB) {
      return highestDeptA - highestDeptB;
    }

    return a.name.localeCompare(b.name);
  });

  const renderCard = (m: TeamMember, i: number) => (
    <motion.div
      key={m.name}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: (i % 20) * 0.05 }}
      onClick={() => setSelected(m)}
      className="glass rounded-2xl overflow-hidden cursor-pointer group hover:glow-purple transition-all duration-300"
    >
      <div className="aspect-[3/4] bg-gradient-to-br from-secondary to-muted relative overflow-hidden">
        {m.foto ? (
          <img src={m.foto} alt={m.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-10 h-10 text-primary/40" />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
          <span className="font-body text-xs text-primary font-medium">Click para más info</span>
        </div>
      </div>
      <div className="p-3 sm:p-4 text-center">
        <h3 className="font-heading text-[11px] sm:text-xs font-bold tracking-tight sm:tracking-wide leading-tight sm:leading-normal">{m.name}</h3>
        {m.role && m.role.length > 0 && (
          <p className="font-body text-[10px] sm:text-xs text-primary mt-1 leading-tight sm:leading-normal">
            {m.role.join(" • ")}
          </p>
        )}
        {m.dept && m.dept.length > 0 && (
          <div className="mt-1.5 flex flex-wrap justify-center gap-1 sm:gap-1.5">
            {m.dept.filter(d => d && d !== "Ejecutivo").map(d => (
              <span key={d} className="font-body text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-[2px] sm:py-0.5 bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-full text-white/80 shadow-sm">{d}</span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <p className="font-heading text-xs tracking-[0.3em] text-primary uppercase mb-4">Equipo</p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Nuestro <span className="text-gradient-quantum">Equipo</span>
            </h1>
            <p className="font-body text-muted-foreground max-w-xl mx-auto">
              Conoce a los expertos que hacen posible la educación cuántica de vanguardia en QuantumHub Perú.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-2 mb-12">
            {deptFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full font-body text-xs transition-all duration-300 ${filter === f ? "btn-quantum" : "glass text-muted-foreground hover:text-foreground hover:border-primary/30"
                  }`}
              >
                {f}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {sortedMembers.map((m, i) => renderCard(m, i))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Modal / Card Style */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => { setSelected(null); setBioExpanded(false); }} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative glass-strong bg-card/60 rounded-3xl max-w-2xl w-full z-10 p-8 sm:p-12 shadow-[0_0_50px_-12px_rgba(120,60,255,0.3)] border border-primary/20 flex flex-col items-center sm:items-stretch overflow-y-auto max-h-[85vh] scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
            >
              <button
                onClick={() => { setSelected(null); setBioExpanded(false); }}
                className="absolute top-4 right-4 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-2.5 rounded-full transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header: Avatar + Info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-10 mb-10 mt-4 sm:pl-4">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 shrink-0 group">
                  {/* Glowing background */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full blur-3xl opacity-20"></div>

                  {/* CSS Animated Blobs */}
                  <div className="absolute -inset-3 bg-gradient-to-tr from-primary/40 to-purple-500/40 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] animate-[spin_8s_linear_infinite] backdrop-blur-xl border border-white/5"></div>
                  <div className="absolute -inset-1.5 bg-gradient-to-br from-secondary/40 to-blue-500/40 rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] animate-[spin_12s_linear_infinite_reverse] backdrop-blur-xl border border-white/10"></div>

                  {/* Avatar Container */}
                  <div className="relative w-full h-full rounded-full border-2 border-white/10 bg-[#0A0B10] flex items-center justify-center overflow-hidden shadow-2xl z-10 group">
                    {selected.foto ? (
                      <img src={selected.foto} alt={selected.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <Users className="w-12 h-12 text-primary/40" />
                    )}
                  </div>
                </div>

                <div className="text-center sm:text-left">
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-1.5 leading-tight">
                    {selected.name}
                  </h3>
                  {selected.role && selected.role.length > 0 && (
                    <div className="flex flex-col gap-0.5 mb-3">
                      {selected.role.map((r, i) => (
                        <p key={i} className="font-heading text-lg sm:text-xl text-primary font-semibold">
                          {r}
                        </p>
                      ))}
                    </div>
                  )}
                  {selected.dept && selected.dept.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                      {selected.dept.filter(d => d && d !== "Ejecutivo").map(d => (
                        <div key={d} className="inline-flex px-4 py-1.5 bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/30 rounded-full items-center justify-center shadow-sm shadow-primary/10">
                          <p className="font-body text-[10px] sm:text-xs text-primary/90 uppercase tracking-[0.15em] font-semibold">
                            {d}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bio area with toggle */}
              <div className="w-full relative mt-4 sm:px-4">
                <div className={`relative transition-all duration-300 font-body text-base sm:text-lg text-white/75 leading-relaxed text-justify ${!bioExpanded ? "line-clamp-4" : ""}`}>
                  {selected.bio}
                </div>
                {!bioExpanded && selected.bio && selected.bio.length > 200 && (
                  <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#0e0f14] to-transparent pointer-events-none" />
                )}
              </div>

              {selected.bio && selected.bio.length > 200 && (
                <div className="w-full flex justify-center sm:justify-start sm:px-2 mt-4">
                  <button
                    onClick={() => setBioExpanded(!bioExpanded)}
                    className="text-xs font-bold text-primary hover:text-white uppercase tracking-wider transition-colors inline-block"
                  >
                    {bioExpanded ? "Mostrar menos ↑" : "Mostrar más ↓"}
                  </button>
                </div>
              )}

              {/* Line Separator */}
              <div className="w-full h-px bg-white/5 my-8" />

              {/* Action */}
              <div className="w-full flex justify-center sm:px-2 pb-2">
                <a
                  href={selected.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-[#0a66c2]/90 hover:bg-[#0a66c2] text-white px-10 py-3.5 rounded-full text-sm font-bold tracking-wide transition-all shadow-[0_4px_14px_0_rgba(10,102,194,0.39)] hover:shadow-[0_6px_20px_rgba(10,102,194,0.23)] hover:-translate-y-0.5"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>Conectar en LinkedIn</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Equipo;
