import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";
import WorldMapBackground, { MapFeature } from "./WorldMapBackground";

interface CountryData {
  name: string;
  code: string;
  x: number;
  y: number;
  level: "high" | "medium" | "low" | "peru";
  info: string[];
}

const flagModules = import.meta.glob('../assets/svg-flags/*.svg', { eager: true, as: 'url' }) as Record<string, string>;

const getFlagUrl = (code: string) => {
  return flagModules[`../assets/svg-flags/${code.toLowerCase()}.svg`] || '';
};

const levelColors = {
  high: "bg-quantum-blue shadow-[0_0_15px_hsl(220,90%,56%,0.5)]",
  medium: "bg-quantum-purple shadow-[0_0_12px_hsl(270,80%,60%,0.4)]",
  low: "bg-muted-foreground/40",
  peru: "bg-quantum-yellow shadow-[0_0_15px_hsl(45,100%,55%,0.5)]",
};

const countryMetrics: Record<string, Record<string, string>> = {
  Canada: {
    Total_Funding: "$1.6B",
    Ecosystem: "120",
    Core_Firms: "55",
    PhD_Founders: "58%",
    Patent_Share: "3%",
    RTA_Index: "2.9"
  },
  China: {
    Total_Funding: "$1B",
    Ecosystem: "220",
    Core_Firms: "35",
    PhD_Founders: "No_Data",
    Patent_Share: "11%",
    RTA_Index: "0.8"
  }
};

const metricLabels: Record<string, string> = {
  Total_Funding: "Total Funding",
  Ecosystem: "Ecosystem Size",
  Core_Firms: "Core Firms",
  PhD_Founders: "PhD Founders",
  Patent_Share: "Patent Share",
  RTA_Index: "RTA Index"
};

const metricDescriptions: Record<string, string> = {
  Total_Funding: "Inversión total estimada",
  Ecosystem: "Número total de organizaciones identificadas en el sector",
  Core_Firms: "Cantidad de empresas cuya actividad principal es exclusivamente el desarrollo de tecnología cuántica",
  PhD_Founders: "Porcentaje de fundadores que poseen un título de doctorado",
  Patent_Share: "Porcentaje de Familias de Patentes Internacionales (IPF) que posee el país respecto al total mundial",
  RTA_Index: "Índice de Ventaja Tecnológica Revelada"
};

const WorldMapSection = () => {

  const [countries, setCountries] = useState<CountryData[]>([]);
  const [active, setActive] = useState<{
    id: string;
    name: string;
    code: string;
    cx: number;
    cy: number;
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

    const svgElement = (e.currentTarget as SVGGraphicsElement).ownerSVGElement;
    if (!svgElement) return;

    const bbox = (e.currentTarget as SVGGraphicsElement).getBBox();
    const cx = bbox.x + bbox.width / 2;
    const cy = bbox.y + bbox.height / 2;

    setActive({
      id: feature.id,
      name: feature.properties.name,
      code,
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

        <div className="relative w-full max-w-5xl mx-auto aspect-[2/1] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(70,188,174,0.3)]">

          <WorldMapBackground
            onCountryClick={handleCountryClick}
            activeFeatureId={active?.id}
            activeCenter={active ? { cx: active.cx, cy: active.cy } : null}
            onBgClick={() => setActive(null)}
          />

          <div className="absolute left-4 bottom-10 md:left-6 md:bottom-12 z-20 pointer-events-none">
            <p className="font-heading text-white text-xl md:text-2xl font-bold max-w-xs drop-shadow-md leading-tight">
              LATAM fuera del <span className="text-gradient-quantum">entrelazamiento global</span>
            </p>
          </div>

          <AnimatePresence>

            {active && (

              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
                className="absolute z-30 bg-[#1A1433]/95 backdrop-blur-md rounded-xl p-5 w-60 md:w-64 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 text-white"
                style={{
                  left: `75%`,
                  top: `50%`,
                }}
              >

                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">

                  <p className="font-heading text-lg font-bold text-white flex items-center gap-3">

                    {active.code && (
                      <img
                        src={getFlagUrl(active.code)}
                        alt={active.name}
                        className="w-6 h-4 object-cover rounded-[2px] shadow-sm border border-white/20"
                      />
                    )}

                    <span>{active.name}</span>

                  </p>

                </div>

                <div className="grid grid-cols-2 gap-y-5 gap-x-4 relative mt-2">

                  {Object.entries(metricLabels).map(([key, label]) => {

                    const countryData = countryMetrics[active.name] || {};
                    const value = countryData[key] || "null";

                    return (

                      <div key={key} className="flex flex-col items-start group/row">

                        <span className="text-xl font-bold text-quantum-blue leading-none mb-1 shadow-sm">
                          {value}
                        </span>

                        <div className="flex items-center gap-1 relative group/info cursor-help">

                          <span className="text-[9px] text-white/60 uppercase font-bold tracking-wider">
                            {label}
                          </span>

                          <div className="w-3 h-3 rounded-full bg-white/10 flex items-center justify-center text-[7px] font-bold text-white/60 hover:text-white hover:bg-white/20 transition-colors">
                            i
                          </div>

                          <div className="absolute left-0 bottom-full mb-2 w-48 bg-[#2B2252] text-white/90 text-[10px] sm:text-[11px] p-2.5 rounded-lg shadow-xl opacity-0 invisible group-hover/info:opacity-100 group-hover/info:visible transition-all duration-200 z-50 pointer-events-none border border-white/10">

                            <div className="absolute w-2 h-2 bg-[#2B2252] rotate-45 left-4 -bottom-1 border-r border-b border-white/10"></div>

                            {metricDescriptions[key]}

                          </div>

                        </div>

                      </div>

                    );

                  })}

                </div>

              </motion.div>

            )}

          </AnimatePresence>

        </div>

      </div>

    </section>
  );
};

export default WorldMapSection;