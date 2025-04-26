import React, { useEffect, useId, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Define types for our components
export type Direction = 'left' | 'right';

interface PathData {
    id: string;
    d: string;
    direction: Direction;
    duration: number;
    gradientColor: string;
}

interface AnimatedPathGradientDefProps {
    id: string;
    duration: number;
    direction: Direction;
    gradientColor: string;
    gradientSize?: number;
}

interface AnimatedPathProps {
    id: string;
    pathData: string;
    direction: Direction;
    duration: number;
    gradientColor: string;
    delay?: number;
    sequenced?: boolean;
}

export const AnimatedPathGradientDef: React.FC<AnimatedPathGradientDefProps> = ({
    id,
    duration,
    direction,
    gradientColor,
    gradientSize = 1
}) => {
    // We'll animate x1 and x2 from -100% to 100% (or 0% to 200%) in a loop
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            x1: direction === 'right' ? ['-100%', '100%'] : ['100%', '-100%'],
            x2: direction === 'right' ? ['0%', '200%'] : ['200%', '0%'],
            transition: {
                x1: { repeat: Infinity, duration, ease: 'linear' },
                x2: { repeat: Infinity, duration, ease: 'linear' }
            }
        });
    }, [controls, duration, direction]);

    const halfSize = gradientSize / 100;

    return (
        <motion.linearGradient
            id={id}
            gradientUnits="userSpaceOnUse"
            initial={{
                x1: direction === 'right' ? '-100%' : '100%',
                x2: direction === 'right' ? '0%' : '200%',
            }}
            animate={controls}
        >
            <stop stopColor="transparent" offset="0" />
            <stop stopColor="transparent" offset={`${0.5 - halfSize}`} />
            <stop stopColor={gradientColor} offset="0.5" />
            <stop stopColor="transparent" offset={`${0.5 + halfSize}`} />
            <stop stopColor="transparent" offset="1" />
        </motion.linearGradient>
    );
};
// The animated path component that uses the gradient
export const AnimatedPath: React.FC<AnimatedPathProps> = ({
    id,
    pathData,
    direction,
    duration,
    gradientColor,
    delay = 0,
    sequenced = false
}) => {
    const [isAnimating, setIsAnimating] = useState(!sequenced);

    useEffect(() => {
        if (sequenced && delay > 0) {
            const timer = setTimeout(() => {
                setIsAnimating(true);
            }, delay * 1000);

            return () => clearTimeout(timer);
        }
    }, [sequenced, delay]);

    return (
        <path
            d={pathData}
            stroke={isAnimating ? `url(#gradient-pulse-${id})` : "black"}
            strokeWidth={isAnimating ? "2" : "1"}
            strokeOpacity={isAnimating ? "1" : "0.3"}
            fill="none"
            strokeLinecap="round"
            strokeDasharray="2 2"
        />
    );
};
