// In AnimatedPathTrail.tsx
"use client";
import { useEffect, useRef } from 'react';
import { animate, createScope, Scope } from 'animejs';
import styled from 'styled-components';

interface AnimatedPathTrailProps {
    pathData: string;
    viewBox?: string;
    baseColor?: string;
    trailColor?: string;
    trailWidth?: number;
    baseWidth?: number;
    trailLength?: number;
    animationDuration?: number;
    svgWidth?: number | string;
    svgHeight?: number | string;
}

export default function AnimatedPathTrail({
    pathData,
    viewBox = "0 0 100 100",
    baseColor = "#e1e1e1",
    trailColor = "#4285F4",
    trailWidth = 1,
    baseWidth = 1,
    trailLength = 30,
    animationDuration = 4500,
    svgWidth = 500,
    svgHeight = 200
}: AnimatedPathTrailProps) {
    const root = useRef<HTMLDivElement>(null);
    const scope = useRef<Scope | null>(null);

    useEffect(() => {
        if (!root.current) return;

        let animation: ReturnType<typeof animate> | null = null;
        let timeoutId: ReturnType<typeof setTimeout> | null = null;

        scope.current = createScope({ root }).add(() => {
            const trailPath = root.current!.querySelector('.trail') as SVGPathElement;
            const pathLength = trailPath.getTotalLength();
            const startOffset = pathLength * 0.02;
            const extraOffset = pathLength * 0.1;
            const loopDelay = 8000; // ms delay before loop restarts

            // Setup initial styles
            trailPath.style.strokeDasharray = `${trailLength} ${pathLength}`;

            const runAnimation = () => {
                // Reset position
                trailPath.style.strokeDashoffset = `-${startOffset}`;

                // Run animation
                animation = animate(trailPath, {
                    strokeDashoffset: [`-${startOffset}`, `-${pathLength + extraOffset}`],
                    duration: animationDuration,
                    easing: 'linear',
                    loop: true,

                });
            };

            // Start the animation
            runAnimation();
        });

        // Clean up
        return () => {
            scope.current?.revert();
            if (timeoutId) clearTimeout(timeoutId);
            if (animation) animation.pause();
        };
    }, [animationDuration, trailLength]);



    return (
        <div ref={root} className="centered">

            <svg width={svgWidth} height={svgHeight} viewBox={viewBox}
                style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'visible'
                }}>
                <defs>
                    <filter id="blurFilter" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
                    </filter>
                    <mask id="pathMask">
                        <path
                            d={pathData}
                            stroke="white"
                            strokeWidth={baseWidth + 1}
                            fill="none"
                        />
                    </mask>
                </defs>
                <path
                    d={pathData}
                    fill="none"
                    stroke={baseColor}
                    strokeWidth={baseWidth}
                    strokeDasharray="4,2"
                />

                <g mask="url(#pathMask)">
                    <path
                        className="trail"
                        d={pathData}
                        fill="none"
                        stroke={trailColor}
                        strokeWidth={trailWidth}
                        strokeLinecap="round"
                        filter="url(#blurFilter)"
                    />
                </g>
            </svg>
        </div>
    );
}