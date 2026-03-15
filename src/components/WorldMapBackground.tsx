import geoData from '@/data/countries.geo.json';
import countryLevels from '@/data/countryLevels.json';
import { motion } from 'framer-motion';
import { CountryData } from './WorldMapSection';
const project = (lng: number, lat: number) => {
    // Using the exact linear projection as the centroid generator
    const x = lng * 0.265 + 48.5;
    const y = lat * -0.48 + 57.2;
    return { x, y };
};

const renderPath = (coordinates: any[], type: string) => {
    if (type === 'Polygon') {
        return coordinates.map((ring: any[]) => {
            return ring.map((coord, i) => {
                const { x, y } = project(coord[0], coord[1]);
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ') + ' Z';
        }).join(' ');
    } else if (type === 'MultiPolygon') {
        return coordinates.map((polygon: any[]) => {
            return polygon.map((ring: any[]) => {
                return ring.map((coord, i) => {
                    const { x, y } = project(coord[0], coord[1]);
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ') + ' Z';
            }).join(' ');
        }).join(' ');
    }
    return '';
};

export interface MapFeature {
    id: string;
    properties: {
        name: string;
    };
}

interface WorldMapBackgroundProps {
    onCountryClick?: (feature: MapFeature, e: React.MouseEvent) => void;
    onBgClick?: () => void;
    activeFeatureId?: string | null;
    activeCenter?: { cx: number, cy: number } | null;
    countriesData?: CountryData[];
}

const WorldMapBackground = ({ onCountryClick, onBgClick, activeFeatureId, activeCenter, countriesData }: WorldMapBackgroundProps) => {
    return (
        <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full bg-secondary/30"
            onClick={onBgClick}
        >
            <motion.g
                initial={false}
                animate={
                    activeCenter
                        ? {
                            scale: 2,
                            x: 40 - activeCenter.cx * 2,
                            y: 50 - activeCenter.cy * 2,
                        }
                        : {
                            scale: 1,
                            x: 0,
                            y: 0,
                        }
                }
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                style={{ originX: 0, originY: 0 }}
            >
                {/* Invisible rect to force SVG bounding box to exactly 0 0 100 100 so originX/originY 0 is actually 0,0 */}
                <rect x="0" y="0" width="100" height="100" fill="transparent" className="pointer-events-none" />
                {(geoData as any).features.map((feature: any, i: number) => {
                    if (!['Polygon', 'MultiPolygon'].includes(feature.geometry.type)) return null;
                    const d = renderPath(feature.geometry.coordinates, feature.geometry.type);
                    const isActive = activeFeatureId === feature.id;

                    let matchedData = countriesData?.find(
                        c => c.name.toLowerCase().includes(feature.properties.name.toLowerCase()) || 
                             feature.properties.name.toLowerCase().includes(c.name.toLowerCase())
                    );
                    
                    // We deduce if it's LATAM from the old countryLevels.json using Nivel_2 or Nivel_3
                    const isLatam = ["Nivel_2", "Nivel_3"].includes((countryLevels as Record<string, string>)[feature.id]);
                    const hasInfo = matchedData && Array.isArray(matchedData.info) && matchedData.info.length > 0;

                    let baseClasses = "";
                    let activeClasses = "text-white fill-white stroke-white drop-shadow-[0_0_12px_rgba(255,255,255,1)] z-10";

                    if (isLatam) {
                        // LATAM ones -> bright pink/purple
                        baseClasses = "text-quantum-purple/80 fill-quantum-purple/80 stroke-white/40 hover:brightness-125 hover:stroke-white/80 animate-map-glow z-0";
                        
                        // If there is an active feature and this isn't it, dim it slightly to preserve focus
                        if (activeFeatureId && !isActive) {
                           baseClasses = "text-quantum-purple/60 fill-quantum-purple/60 stroke-white/20 hover:brightness-125";
                        }
                    } else if (hasInfo) {
                        // Non-latam but has info content -> medium pink
                        baseClasses = "text-quantum-purple/45 fill-quantum-purple/45 stroke-quantum-purple/50 hover:brightness-125 hover:stroke-white/60";
                    } else {
                        // Everything else (no info, not latam, or not even in JSON) -> very dark pink background
                        baseClasses = "text-quantum-purple/15 fill-quantum-purple/15 stroke-quantum-purple/20 hover:brightness-125 hover:stroke-white/40";
                    }

                    return (
                        <path
                            key={i}
                            d={d}
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth={isActive ? "0.3" : "0.15"}
                            onClick={(e) => {
                                e.stopPropagation();
                                onCountryClick && onCountryClick(feature, e);
                            }}
                            className={`transition-all duration-300 cursor-pointer outline-none ${isActive ? activeClasses : baseClasses}`}
                            style={{
                                transformOrigin: "center",
                            }}
                        />
                    );
                })}
            </motion.g>
        </svg>
    );
};

export default WorldMapBackground;
