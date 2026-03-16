import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";
import WorldMapBackground, { MapFeature } from "./WorldMapBackground";

export interface CountryData {
  name: string;
  code: string;
  x: number;
  y: number;
  level: "high" | "medium" | "low" | "peru";
  info: string[];
}

const getFlagUrl = (code: string) => {
  if (!code) return '';
  return `/svg-flags/${code.toLowerCase()}.svg`;
};

const levelColors = {
  high: "bg-quantum-blue shadow-[0_0_15px_hsl(220,90%,56%,0.5)]",
  medium: "bg-quantum-purple shadow-[0_0_12px_hsl(270,80%,60%,0.4)]",
  low: "bg-muted-foreground/40",
  peru: "bg-quantum-yellow shadow-[0_0_15px_hsl(45,100%,55%,0.5)]",
};



const WorldMapSection = () => {

  const [countries, setCountries] = useState<CountryData[]>([]);
  const [active, setActive] = useState<{
    id: string;
    name: string;
    code: string;
    cx: number;
    cy: number;
    info?: string[];
  } | null>(null);

  useEffect(() => {
    fetch("/mapData.json")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Error loading mapData:", err));
  }, []);

  const handleCountryClick = (feature: MapFeature, e: React.MouseEvent) => {

    if (!countries.length) return;

    const fName = feature.properties.name.toLowerCase();

    const dataMatch = countries.find(
      c =>
        c.name.toLowerCase().includes(fName) ||
        fName.includes(c.name.toLowerCase())
    );

    const code = dataMatch ? dataMatch.code : "";
    const info = dataMatch ? dataMatch.info : [];

    const svgElement = (e.currentTarget as SVGGraphicsElement).ownerSVGElement;
    if (!svgElement) return;

    if (active?.id === feature.id) {
        setActive(null);
        return;
    }

    const bbox = (e.currentTarget as SVGGraphicsElement).getBBox();
    const cx = bbox.x + bbox.width / 2;
    const cy = bbox.y + bbox.height / 2;

    setActive({
      id: feature.id,
      name: feature.properties.name,
      code,
      info,
      cx,
      cy
    });
  };

  return (
    <section className="relative py-28 overflow-hidden section-dark">

      <div className="absolute inset-0 circuit-lines opacity-10" />

      <div className="relative z-10 container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
            Mientras el mundo invierte en <span className="text-gradient-quantum">computación cuántica</span>...
          </h2>

          <p className="font-body text-muted-foreground">
            Los ecosistemas cuánticos ya están tomando forma.
          </p>
        </motion.div>

        {/* Map area */}

        <div className="relative w-full max-w-5xl mx-auto">
          <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(70,188,174,0.3)]">
            <WorldMapBackground
              onCountryClick={handleCountryClick}
              activeFeatureId={active?.id}
              activeCenter={active ? { cx: active.cx, cy: active.cy } : null}
              onBgClick={() => setActive(null)}
              countriesData={countries}
            />

            <div className="hidden md:block absolute left-4 bottom-10 md:left-6 md:bottom-12 z-20 pointer-events-none">
              <p className="font-heading text-white text-xl md:text-2xl font-bold max-w-xs drop-shadow-md leading-tight">
                LATAM fuera del <span className="text-gradient-quantum">entrelazamiento global</span>
              </p>
            </div>
          </div>

          <AnimatePresence>
            {active && (
              <div className="mt-6 md:mt-0 md:absolute md:top-1/2 md:left-[75%] md:-translate-y-1/2 md:-translate-x-1/2 z-30 w-full md:w-[304px] pointer-events-none md:pointer-events-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#1A1433]/95 backdrop-blur-md rounded-xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 text-white w-full mx-auto md:max-w-none pointer-events-auto"
                >
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                    <p className="font-heading text-xl font-bold text-white flex items-center gap-3">
                      {active.code && (
                        <img
                          src={getFlagUrl(active.code)}
                          alt={active.name}
                          className="w-8 h-[20px] object-cover rounded shadow-md border border-white/20"
                        />
                      )}
                      <span>{active.name}</span>
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 relative mt-3">
                    {active.info && active.info.length > 0 ? (
                      active.info.map((text, idx) => {
                        const parts = text.split(/(Fuente:\s*.*|\[cite:\s*\d+\])/);
                        return (
                          <div key={idx} className="flex gap-2.5 items-start text-[13px] sm:text-[14px] text-white/90">
                            <div className="w-2 h-2 rounded-full bg-quantum-blue mt-1.5 shrink-0 shadow-[0_0_8px_rgba(70,188,174,0.8)]" />
                            <p className="leading-snug">
                              {parts.map((part, i) => {
                                if (!part) return null;
                                if (part.startsWith('Fuente:')) {
                                  return <span key={i} className="block mt-1 text-[11px] sm:text-[12px] text-quantum-blue/80 italic">{part}</span>;
                                }
                                if (part.startsWith('[cite:')) {
                                  return <span key={i} className="text-[11px] text-quantum-blue/80 ml-1">{part}</span>;
                                }
                                return <span key={i}>{part}</span>;
                              })}
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-[14px] text-white/60 italic">No hay información específica disponible para esta región.</p>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </section>
  );
};

export default WorldMapSection;