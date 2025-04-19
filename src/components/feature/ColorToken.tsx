'use client';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { animate, createScope, createSpring, Scope } from 'animejs';
import styled from 'styled-components';
import { Container } from '../ReusableUI';

const ColorToken = () => {
  const designSystems = [
    {
      name: "Tailwind",
      logo: "/placeholder-logo.svg",
      colorPalette: ["#1e293b", "#334155", "#475569", "#64748b", "#94a3b8", "#cbd5e1", "#e2e8f0", "#f1f5f9", "#f8fafc", "#ffffff"]
    },
    {
      name: "Material",
      logo: "/placeholder-logo.svg",
      colorPalette: ["#311b92", "#4527a0", "#512da8", "#5e35b1", "#673ab7", "#7e57c2", "#9575cd", "#b39ddb", "#d1c4e9", "#ede7f6"]
    },
    {
      name: "Figma",
      logo: "/placeholder-logo.svg",
      colorPalette: ["#4d0028", "#750040", "#a30057", "#d4006a", "#ff0080", "#ff33a0", "#ff66b8", "#ff99d0", "#ffcce8", "#fff5fa"]
    },
    {
      name: "Framer",
      logo: "/placeholder-logo.svg",
      colorPalette: ["#151515", "#2a2a2a", "#3e3e3e", "#535353", "#676767", "#7c7c7c", "#909090", "#a5a5a5", "#b9b9b9", "#cdcdcd"]
    },
    {
      name: "Shopify",
      logo: "/placeholder-logo.svg",
      colorPalette: ["#004c3f", "#008060", "#00a47c", "#00c89c", "#00ebbb", "#6feccf", "#9befe0", "#c4f5ec", "#e3faf5", "#f7fcfa"]
    },
  ];

  const root = useRef(null);
  const scope = useRef<Scope | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const colorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const [virtualIndex, setVirtualIndex] = useState(0);

  const animateTrack = (active: number) => {
    const itemWidth = 100; // each logo is positioned by 100% width (as before)
    const offset = itemWidth * active;

    if (trackRef.current) {
      animate(trackRef.current, {
        translateX: `-${offset}%`,
        duration: 600,
        ease: createSpring({ stiffness: 100, damping: 20 }),
      });
    }
  };

  useEffect(() => {
    scope.current = createScope({ root }).add(() => {
      animateTrack(activeIndex);
      animatePalette(activeIndex);
      animateLogos(activeIndex); // ✅
      scope.current?.add('update', (newIndex: number) => {
        animateTrack(newIndex);
        animatePalette(newIndex);
        animateLogos(newIndex); // ✅
      });
    });

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % designSystems.length;
      setActiveIndex(nextIndex);
      scope.current?.methods.update(nextIndex);
    }, 3000);

    return () => {
      clearInterval(interval);
      scope.current?.revert();
    };
  }, []);

  const getCircularOffset = (from: number, to: number, length: number) => {
    let offset = to - from;
    if (offset > length / 2) offset -= length;
    if (offset < -length / 2) offset += length;
    return offset;
  };



  const animateLogos = (active: number) => {
    const total = designSystems.length;

    designSystems.forEach((_, index) => {
      const el = document.querySelector(`.logo-item-${index}`) as HTMLDivElement;

      // NEW: Calculate circular offset
      const position = getCircularOffset(active, index, total);
      const scale = index === active ? 1.2 : 0.8;
      const opacity = Math.abs(position) <= 2 ? 1 : 0.3;
      const zIndex = 10 - Math.abs(position);

      if (el) {
        el.style.zIndex = `${zIndex}`;
        animate(el, {
          translateX: `${position * 100}%`,
          scale,
          opacity,
          duration: 500,
          ease: createSpring({ stiffness: 120, damping: 20 })
        });
      }
    });
  };


  const animatePalette = (index: number) => {
    colorRefs.current.forEach((el, i) => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'scale(0.8)';
        animate(el, {
          opacity: [0, 1],
          scale: [0.8, 1],
          delay: i * 50,
          duration: 300,
          ease: 'out(3)',
        });
      }
    });
    colorRefs.current = [];
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    scope.current?.methods.update(index);
  };
  return (
    <Section ref={root}>
      <CarouselContainer>
        <LogoWrapper>
          <LogoTrack ref={trackRef}>
            {[...designSystems, ...designSystems].map((system, index) => {
              const realIndex = index % designSystems.length;
              const isActive = realIndex === activeIndex;
              return (
                <LogoItem
                  key={`${system.name}-${index}`}
                  className={`logo-item logo-item-${index} ${isActive ? 'active' : ''}`}
                  onClick={() => handleDotClick(realIndex)} // ✅ Add this line
                >
                  <LogoCircle isActive={isActive}>
                    <LogoPlaceholder />
                  </LogoCircle>
                </LogoItem>
              );
            })}
          </LogoTrack>
        </LogoWrapper>

      </CarouselContainer>

      <PaletteContainer>
        <ColorGrid>
          {designSystems[activeIndex].colorPalette.map((color, i) => (
            <ColorSwatch
              key={i}
              color={color}
              ref={(el) => {
                colorRefs.current[i] = el;
              }}
            >
            </ColorSwatch>
          ))}
        </ColorGrid>
      </PaletteContainer>
    </Section>
  );
};

// Styled components
const Section = styled.section`
  padding: 4rem 0;
  background-color: #f5f7fa;
  position: relative;
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

const LogoItem = styled.div`
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

const PaletteContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
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

const ColorSwatch = styled.div<{ color: string }>`
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  background-color: ${props => props.color};
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0.5rem;
  opacity: 0;
  transform: scale(0.8);
  width: 80px;
  height: 80px;
`;

const ColorValue = styled.span`
  font-size: 12px;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 8px;
  border-radius: 4px;
  color: #333;
  font-weight: 500;
`;

const LogoTrack = styled.div`
  display: flex;
  position: absolute;
  will-change: transform;
`;

export default ColorToken;
