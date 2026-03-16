import React, { useEffect, useRef, useState, useMemo } from "react";
import Globe from "react-globe.gl";
import { motion, AnimatePresence } from "framer-motion";

// Flags
const flagPE = "/svg-flags/pe.svg";
const flagCO = "/svg-flags/co.svg";
const flagAR = "/svg-flags/ar.svg";
const flagMX = "/svg-flags/mx.svg";
const flagCL = "/svg-flags/cl.svg";
const flagBR = "/svg-flags/br.svg";
const flagEC = "/svg-flags/ec.svg";
const flagBO = "/svg-flags/bo.svg";
const flagUY = "/svg-flags/uy.svg";
const flagVE = "/svg-flags/ve.svg";

const LatamGlobe = () => {
    const globeEl = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [countryIdx, setCountryIdx] = useState(0);

    // Países
    const latamViews = useMemo(
        () => [
            { name: "Perú", icon: flagPE, lat: -9.19, lng: -75.01, altitude: 0.35, color: "#ff0000" },
            { name: "Perú", icon: flagPE, lat: -9.19, lng: -75.01, altitude: 0.35, color: "#ff0000" },
            { name: "Perú", icon: flagPE, lat: -9.19, lng: -75.01, altitude: 0.35, color: "#ff0000" },
            { name: "Perú", icon: flagPE, lat: -9.19, lng: -75.01, altitude: 0.35, color: "#ff0000" },
            { name: "Perú", icon: flagPE, lat: -9.19, lng: -75.01, altitude: 0.35, color: "#ff0000" },
            { name: "Perú", icon: flagPE, lat: -9.19, lng: -75.01, altitude: 0.35, color: "#ff0000" },
            { name: "Perú", icon: flagPE, lat: -9.19, lng: -75.01, altitude: 0.35, color: "#ff0000" },
            { name: "Perú", icon: flagPE, lat: -9.19, lng: -75.01, altitude: 0.35, color: "#ff0000" },
            { name: "Perú", icon: flagPE, lat: -9.19, lng: -75.01, altitude: 0.35, color: "#ff0000" },
            { name: "Perú", icon: flagPE, lat: -9.19, lng: -75.01, altitude: 0.35, color: "#ff0000" }
        ],
        []
    );

    // Detectar tamaño
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight
                });
            }
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    // Coreografía cámara
    useEffect(() => {
        if (!globeEl.current || dimensions.width === 0) return;

        const currentView = latamViews[countryIdx];

        globeEl.current.controls().enableZoom = false;
        globeEl.current.controls().autoRotate = false;

        // Zoom out
        globeEl.current.pointOfView(
            { lat: -15, lng: -65, altitude: 1.6 },
            1200
        );

        // Zoom in
        const zoomInTimer = setTimeout(() => {
            globeEl.current.pointOfView(
                {
                    lat: currentView.lat,
                    lng: currentView.lng,
                    altitude: currentView.altitude
                },
                1800
            );
        }, 1200);

        // Siguiente país
        const nextCountryTimer = setTimeout(() => {
            setCountryIdx((prev) => (prev + 1) % latamViews.length);
        }, 5500);

        return () => {
            clearTimeout(zoomInTimer);
            clearTimeout(nextCountryTimer);
        };
    }, [countryIdx, dimensions.width, latamViews]);

    const currentCountry = latamViews[countryIdx];

    // Marker único neon
    const markersData = useMemo(
        () => [
            {
                lat: currentCountry.lat,
                lng: currentCountry.lng,
                color: currentCountry.color
            }
        ],
        [currentCountry]
    );

    return (
        <div
            ref={containerRef}
            className="w-full h-full relative flex justify-center items-center overflow-visible"
        >
            <div className="absolute inset-0 overflow-hidden rounded-full">
                <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] rounded-full z-10 pointer-events-none" />

                {dimensions.width > 0 && (
                    <Globe
                        ref={globeEl}
                        width={dimensions.width}
                        height={dimensions.height}
                        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                        backgroundColor="rgba(0,0,0,0)"
                        atmosphereColor={currentCountry.color}
                        atmosphereAltitude={0.2}
                        htmlElementsData={markersData}
                        htmlLat="lat"
                        htmlLng="lng"
                        htmlElement={(d: any) => {
                            const el = document.createElement("div");

                            el.innerHTML = `
                <div style="
                  width:16px;
                  height:16px;
                  border-radius:50%;
                  background:${d.color};
                  box-shadow:
                    0 0 8px ${d.color},
                    0 0 16px ${d.color},
                    0 0 30px ${d.color};
                  border:2px solid white;
                "></div>
              `;

                            return el;
                        }}
                    />
                )}
            </div>

            {/* Cartel País estilo HUD Futurista */}
            <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none w-full flex justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={countryIdx}
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)", y: 20 }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
                        exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)", y: -10, transition: { duration: 0.2 } }}
                        transition={{ type: "spring", stiffness: 180, damping: 20 }}
                        className="flex flex-col items-center"
                    >
                        <div
                            className="relative flex items-center gap-4 sm:gap-6 px-4 py-2 sm:px-8 sm:py-3 bg-black/60 backdrop-blur-md border-y border-white/20 overflow-hidden group"
                            style={{
                                boxShadow: `inset 0 0 40px ${currentCountry.color}30, 0 10px 30px rgba(0,0,0,0.8)`,
                            }}
                        >
                            {/* Scanning line animation */}
                            <motion.div
                                className="absolute top-0 bottom-0 w-8 bg-white/20 blur-[8px] mix-blend-overlay"
                                animate={{ left: ["-50%", "150%"] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                            />

                            {/* Left HUD angle brackets */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 shadow-[0_0_15px_currentcolor]" style={{ backgroundColor: currentCountry.color, color: currentCountry.color }} />
                            <div className="absolute left-0 top-0 w-4 h-[2px]" style={{ backgroundColor: currentCountry.color }} />
                            <div className="absolute left-0 bottom-0 w-4 h-[2px]" style={{ backgroundColor: currentCountry.color }} />

                            {/* Right HUD angle brackets */}
                            <div className="absolute right-0 top-0 bottom-0 w-1 shadow-[0_0_15px_currentcolor]" style={{ backgroundColor: currentCountry.color, color: currentCountry.color }} />
                            <div className="absolute right-0 top-0 w-4 h-[2px]" style={{ backgroundColor: currentCountry.color }} />
                            <div className="absolute right-0 bottom-0 w-4 h-[2px]" style={{ backgroundColor: currentCountry.color }} />

                            {/* Bandera / Data box */}
                            <div className="relative z-10 p-1 bg-black/50 border border-white/10" style={{ boxShadow: `0 0 15px ${currentCountry.color}20` }}>
                                <img
                                    src={currentCountry.icon as string}
                                    alt={currentCountry.name}
                                    className="w-8 sm:w-10 h-auto opacity-90 grayscale-[20%] contrast-125"
                                    style={{ filter: `drop-shadow(0 0 12px ${currentCountry.color}80)` }}
                                />
                            </div>

                            {/* Textos */}
                            <div className="flex flex-col relative z-10 pr-2">
                                <div className="text-[8px] sm:text-[10px] text-muted-foreground uppercase mb-1 flex items-center gap-2 font-mono tracking-widest">
                                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: currentCountry.color, boxShadow: `0 0 10px ${currentCountry.color}` }} />
                                    <span className="text-white/70"></span>
                                </div>
                                <span
                                    className="font-heading font-black text-xl sm:text-2xl tracking-[0.25em] uppercase text-white leading-none"
                                    style={{ textShadow: `0 0 20px ${currentCountry.color}, 0 0 40px ${currentCountry.color}` }}
                                >
                                    {currentCountry.name}
                                </span>
                            </div>
                        </div>

                        {/* Tech details under the box */}
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                            className="mt-2 flex gap-3 sm:gap-6 text-[8px] sm:text-[10px] font-mono tracking-[0.2em] uppercase text-white/50 border-t border-white/5 pt-1 overflow-hidden"
                        >
                            <span>SYS.LAT: {currentCountry.lat.toFixed(2)}&deg;</span>
                            <span>SYS.LNG: {currentCountry.lng.toFixed(2)}&deg;</span>
                            <span style={{ color: currentCountry.color }} className="animate-pulse">[ ON ]</span>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default LatamGlobe;