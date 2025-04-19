"use client"
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { animate, svg } from 'animejs';
import AnimatedPathTrail from '../AnimatedPathTrail';
import { Container } from '../ReusableUI';

const SemanticColor = () => {
    // const [activeConnection, setActiveConnection] = useState(0);
    const pathRef = useRef<SVGPathElement>(null);
    const dotRef = useRef<SVGCircleElement>(null);
    const trailRef = useRef<SVGPathElement>(null);
    const activeConnection = 2;

    useEffect(() => {
        if (!pathRef.current || !trailRef.current) return;

        // Create animated dash offset for energy pulse effect
        const trailAnimation = animate(
            trailRef.current,
            {
                strokeDashoffset: [0, -30],  // Animate the dash offset to create moving effect
                easing: 'linear',
                duration: 1500,
                loop: true
            }
        );

        return () => {
            trailAnimation.pause();
        };
    }, []);
    // Token data matches the image
    const tokens = [
        {
            id: 'text-accent',
            color: '#FFD700', // Yellow
            top: '173px',
            left: '120px',
            path: 'M 120 173 Q 180 250, 240 343',
        },
        {
            id: 'bg-primary',
            color: '#FFA6E6', // Pink
            top: '123px',
            left: '500px',
            path: 'M 500 123 Q 450 230, 360 343',
        },
        {
            id: 'icon-accent',
            color: '#00A173', // Green
            top: '263px',
            left: '668px',
            path: 'M 668 263 Q 600 290, 503 343',
        },
        {
            id: 'border-primary',
            color: '#DA22FF', // Purple
            top: '498px',
            left: '602px',
            path: 'M 602 498 Q 500 450, 420 360',
        }
    ];

    // Colors in the center palette
    const colorPalette = [
        '#FF9940', // Orange
        '#FF5733', // Red-Orange
        '#E91E63', // Pink
        '#5E5AFF', // Blue
        '#00C07F'  // Green
    ];

    return (
        <Container>
            {/* Token Pills */}

            <div style={{ width: '150px', height: '100%' }}>
                <AnimatedPathTrail
                    pathData="M9 6L33.4959 6C42.3324 6 49.4959 13.1634 49.4959 22L49.4959 70C49.4959 78.8366 56.6593 86 65.4959 86H79"
                    viewBox="0 0 90 90"  // Should match your path's natural dimensions
                    baseColor="#ccc"
                    trailColor="#00f"
                    trailWidth={8}
                    baseWidth={1}
                    trailLength={20}
                    animationDuration={4000}
                    svgWidth={90}
                    svgHeight={90}
                />
            </div>
            {/* Center color palette */}
            <ColorPalette>
                {colorPalette.map((color, index) => (
                    <ColorBox
                        key={index}
                        style={{ backgroundColor: color }}
                    />
                ))}
            </ColorPalette>



        </Container>
    );
};

// Styled Components

const TokenPill = styled.div<{ active?: boolean }>`
  position: absolute;
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 30px;
  padding: 8px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  transform: translate(-50%, -50%);
  
  ${props => props.active && `
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translate(-50%, -50%) scale(1.05);
  `}
`;

const ColorDot = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  margin-right: 8px;
`;

const TokenName = styled.span`
  font-family: monospace;
  font-size: 14px;
  color: #333;
`;

const ColorPalette = styled.div`
  position: absolute;
  top: 343px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  background-color: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const ColorBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
`;



export default SemanticColor;