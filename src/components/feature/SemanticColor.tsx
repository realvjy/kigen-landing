"use client"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const SemanticColor = () => {
    const [activeConnection, setActiveConnection] = useState(0);

    // Auto-cycle through connections
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveConnection(prev => (prev + 1) % 4);
        }, 2500);

        return () => clearInterval(interval);
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
            {tokens.map((token, index) => (
                <TokenPill
                    key={token.id}
                    style={{
                        top: token.top,
                        left: token.left,
                        border: index === activeConnection ? `2px solid ${token.color}` : '1px solid #eaeaea'
                    }}
                    active={index === activeConnection}
                >
                    <ColorDot style={{ backgroundColor: token.color }} />
                    <TokenName>{token.id}</TokenName>
                </TokenPill>
            ))}

            {/* Center color palette */}
            <ColorPalette>
                {colorPalette.map((color, index) => (
                    <ColorBox
                        key={index}
                        style={{ backgroundColor: color }}
                    />
                ))}
            </ColorPalette>

            {/* SVG for the connection lines */}
            <SVGContainer>
                <defs>
                    {/* Moving gradient animation */}
                    <linearGradient id="movingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <motion.stop
                            offset="0%"
                            stopColor="rgba(255,255,255,0)"
                            animate={{ offset: ["0%", "100%"] }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "linear"
                            }}
                        />
                        <motion.stop
                            offset="50%"
                            stopColor="rgba(255,255,255,0.8)"
                            animate={{ offset: ["0%", "100%"] }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "linear"
                            }}
                        />
                        <motion.stop
                            offset="100%"
                            stopColor="rgba(255,255,255,0)"
                            animate={{ offset: ["0%", "100%"] }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "linear"
                            }}
                        />
                    </linearGradient>

                    {/* Gradient for each token */}
                    {tokens.map((token, index) => (
                        <linearGradient
                            key={`gradient-${index}`}
                            id={`lineGradient-${index}`}
                            gradientUnits="userSpaceOnUse"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop offset="0%" stopColor={token.color} stopOpacity="0.3" />
                            <stop offset="100%" stopColor={token.color} stopOpacity="0.6" />
                        </linearGradient>
                    ))}
                </defs>

                {/* Connection lines */}
                {tokens.map((token, index) => {
                    const isActive = index === activeConnection;

                    return (
                        <g key={`connection-${index}`}>
                            {/* Base dotted line */}
                            <path
                                d={token.path}
                                stroke={`url(#lineGradient-${index})`}
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                fill="none"
                                opacity={isActive ? 1 : 0.5}
                            />

                            {/* Animated gradient overlay (only on active connection) */}
                            {isActive && (
                                <path
                                    d={token.path}
                                    stroke="url(#movingGradient)"
                                    strokeWidth="3"
                                    strokeDasharray="5,5"
                                    fill="none"
                                />
                            )}
                        </g>
                    );
                })}
            </SVGContainer>
        </Container>
    );
};

// Styled Components
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  background-color: #f5f7fa;
  overflow: hidden;
`;

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

const SVGContainer = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

export default SemanticColor;