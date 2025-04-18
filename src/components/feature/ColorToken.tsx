"use client"
import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { Container } from '../ReusableUI';

const ColorToken = () => {
    // Sample design systems with their color palettes
    const designSystems = [
        {
            name: "Tailwind",
            logo: "/placeholder-logo.svg", // Replace with actual logo path
            colorPalette: [
                "#1e293b", "#334155", "#475569", "#64748b", "#94a3b8",
                "#cbd5e1", "#e2e8f0", "#f1f5f9", "#f8fafc", "#ffffff"
            ]
        },
        {
            name: "Material",
            logo: "/placeholder-logo.svg", // Replace with actual logo path
            colorPalette: [
                "#311b92", "#4527a0", "#512da8", "#5e35b1", "#673ab7",
                "#7e57c2", "#9575cd", "#b39ddb", "#d1c4e9", "#ede7f6"
            ]
        },
        {
            name: "Figma",
            logo: "/placeholder-logo.svg", // Replace with actual logo path
            colorPalette: [
                "#4d0028", "#750040", "#a30057", "#d4006a", "#ff0080",
                "#ff33a0", "#ff66b8", "#ff99d0", "#ffcce8", "#fff5fa"
            ]
        },
        {
            name: "Framer",
            logo: "/placeholder-logo.svg", // Replace with actual logo path
            colorPalette: [
                "#151515", "#2a2a2a", "#3e3e3e", "#535353", "#676767",
                "#7c7c7c", "#909090", "#a5a5a5", "#b9b9b9", "#cdcdcd"
            ]
        },
        {
            name: "Shopify",
            logo: "/placeholder-logo.svg", // Replace with actual logo path
            colorPalette: [
                "#004c3f", "#008060", "#00a47c", "#00c89c", "#00ebbb",
                "#6feccf", "#9befe0", "#c4f5ec", "#e3faf5", "#f7fcfa"
            ]
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0); // Start with first item
    const [direction, setDirection] = useState(1); // Start with forward direction

    // Auto slide every 3 seconds in a continuous loop
    useEffect(() => {
        const interval = setInterval(() => {
            // Always move forward for a consistent loop
            setDirection(1);
            setActiveIndex((prevIndex) =>
                prevIndex === designSystems.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [designSystems.length]); // Remove activeIndex dependency to prevent reset

    const handlePrev = () => {
        setDirection(-1);
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? designSystems.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setDirection(1);
        setActiveIndex((prevIndex) =>
            prevIndex === designSystems.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleDotClick = (index: number) => {
        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
    };

    return (
        <Section>
            <Container>
                <CarouselContainer>
                    <LogoWrapper>
                        {designSystems.map((system, index) => {
                            // Calculate position relative to active
                            const position = index - activeIndex;

                            return (
                                <LogoItem
                                    key={system.name}
                                    initial={false}
                                    animate={{
                                        x: `${position * 100}%`,
                                        scale: index === activeIndex ? 1.2 : 0.8,
                                        opacity: Math.abs(position) <= 2 ? 1 : 0.3,
                                        zIndex: 10 - Math.abs(position)
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        type: "spring",
                                        stiffness: 120,
                                        damping: 20
                                    }}
                                    onClick={() => handleDotClick(index)}
                                    className={index === activeIndex ? "active" : ""}
                                >
                                    <LogoCircle isActive={index === activeIndex}>
                                        {/* Placeholder for logo - replace with your actual logo */}
                                        <LogoPlaceholder />
                                    </LogoCircle>
                                </LogoItem>
                            );
                        })}
                    </LogoWrapper>

                    <NavigationButtons>
                        <NavButton onClick={handlePrev}>←</NavButton>
                        <NavButton onClick={handleNext}>→</NavButton>
                    </NavigationButtons>

                    <DotsContainer>
                        {designSystems.map((_, index) => (
                            <Dot
                                key={index}
                                isActive={index === activeIndex}
                                onClick={() => handleDotClick(index)}
                            />
                        ))}
                    </DotsContainer>
                </CarouselContainer>

                {/* Color Palette Display */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <PaletteContainer>
                            <ColorGrid>
                                {designSystems[activeIndex].colorPalette.map((color, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <ColorSwatch color={color}>
                                            <ColorValue>{color}</ColorValue>
                                        </ColorSwatch>
                                    </motion.div>
                                ))}
                            </ColorGrid>
                        </PaletteContainer>
                    </motion.div>
                </AnimatePresence>
            </Container>
        </Section>
    );
};

// Styled Components
const Section = styled.section`
  padding: 4rem 0;
  background-color: #f5f7fa;
`;



const CarouselContainer = styled.div`
  position: relative;
  max-width: 100%;
  margin: 0 auto 4rem;
  overflow: hidden;
  padding: 2rem 0;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  position: relative;
`;

const LogoItem = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  
  &.active {
    cursor: default;
  }
`;

const LogoCircle = styled.div<{ isActive?: boolean }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: ${props => props.isActive ?
        '0 10px 25px rgba(0, 0, 0, 0.15)' :
        '0 4px 10px rgba(0, 0, 0, 0.08)'};
  transition: all 0.3s ease;
  border: ${props => props.isActive ? '2px solid #3b82f6' : '1px solid #e5e7eb'};
`;

const LogoPlaceholder = styled.div`
  width: 40px;
  height: 40px;
  background-color: #cbd5e1;
  border-radius: 6px;
`;

const LogoName = styled.span`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 500;
  opacity: 0.8;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const NavButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  color: #333;
  transition: all 0.2s ease;
  pointer-events: auto;
  z-index: 20;
  
  &:hover {
    background: #f0f0f0;
    transform: scale(1.05);
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
`;

const Dot = styled.div<{ isActive?: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.isActive ? '#3b82f6' : '#d1d5db'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const PaletteContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
`;

const PaletteTitle = styled.h3`
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 500;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ColorSwatch = styled.div`
  aspect-ratio: 1/1;
  border-radius: 12px;
  background-color: ${props => props.color};
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0.5rem;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ColorValue = styled.span`
  font-size: 12px;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 8px;
  border-radius: 4px;
  color: #333;
  font-weight: 500;
`;

export default ColorToken;