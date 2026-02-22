import geoData from '../assets/countries.geo.json';

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

const WorldMapBackground = () => {
    return (
        <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full bg-secondary/30"
        >
            {(geoData as any).features.map((feature: any, i: number) => {
                if (!['Polygon', 'MultiPolygon'].includes(feature.geometry.type)) return null;
                const d = renderPath(feature.geometry.coordinates, feature.geometry.type);
                return (
                    <path
                        key={i}
                        d={d}
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0.1"
                        className="text-primary/10 stroke-primary/30 transition-colors hover:text-primary/20"
                    />
                );
            })}
        </svg>
    );
};

export default WorldMapBackground;
