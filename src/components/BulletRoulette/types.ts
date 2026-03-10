export interface Bullet {
    title: string;
    shortTitle?: string;
    description: string;
    keyPoints?: string[];
    images?: string[];
}

export interface BulletRouletteProps {
    bullets: Bullet[];
    hslColor: string;
}
