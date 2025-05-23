"use client"
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components'
import Link from "next/link";
import { AnimatePresence, motion, useAnimation } from 'framer-motion';

interface CarouselItem {
  id: string;
  value: number;
  color: string;
  logo: string;
  position: number;
  originIndex: number;
}


export default function ColorToken() {

  const items: number[] = [1, 2, 3, 4, 5];

  const colors: string[] = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500"
  ];

  const logos: string[] = [
    "tailwind",
    "atlassian",
    "figma",
    "fluent",
    "polaris"
  ];

  const designSystems = [
    {
      name: "tailwind",
      logo: "/tailwind.png",
      colorPalette: [
        "#0d3d38", // 12
        "#008573", // 11
        "#0d9b8a", // 10
        "#12a594", // 9
        "#53b9ab", // 8
        "#83cdc1", // 7
        "#a1ded2", // 6
        "#b8eae0", // 5
        "#ccf3ea", // 4
        "#e0f8f3", // 3
      ]
    },
    {
      name: "atlassian",
      logo: "/atlassian.png",
      colorPalette: [
        "#172554", // 950
        "#1e3a8a", // 900
        "#1e40af", // 800
        "#1d4ed8", // 700
        "#2563eb", // 600
        "#3b82f6", // 500
        "#60a5fa", // 400
        "#93c5fd", // 300
        "#bfdbfe", // 200
        "#dbeafe", // 100
      ]
    },
    {
      name: "figma",
      logo: "/figma.png",
      colorPalette: [
        "#4d0028", "#750040", "#a30057", "#d4006a", "#ff0080",
        "#ff33a0", "#ff66b8", "#ff99d0", "#ffcce8", "#fff5fa"
      ]
    },
    {
      name: "fluent",
      logo: "/fluent.png",
      colorPalette: [
        "#641723", // 12
        "#ce2c31", // 11
        "#dc3e42", // 10
        "#e5484d", // 9
        "#eb8e90", // 8
        "#f4a9aa", // 7
        "#fdbdbe", // 6
        "#ffcdce", // 5
        "#ffdbdc", // 4
        "#feebec", // 3
      ]
    },
    {
      name: "polaris",
      logo: "/polaris.png",
      colorPalette: [
        "#083a23", // 1000
        "#024626", // 900
        "#036838", // 800
        "#008043", // 700
        "#009951", // 600
        "#14ae5c", // 500
        "#85e0a3", // 400
        "#aff4c6", // 300
        "#cff7d3", // 200
        "#ebffee", // 100
      ]
    },
  ];
  // Track the current slide index
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [displayItems, setDisplayItems] = useState<CarouselItem[]>([]);

  const needsRepositioning = useRef<boolean>(false);

  useEffect(() => {
    initializeDisplayItems();
  }, []);

  const initializeDisplayItems = (): void => {
    const initialItems: CarouselItem[] = [];

    for (let i = -2; i <= items.length + 1; i++) {
      const itemIndex = ((i % items.length) + items.length) % items.length;

      initialItems.push({
        id: `item-${i}`,
        value: items[itemIndex],
        color: colors[itemIndex],
        logo: logos[itemIndex],
        position: i,
        originIndex: itemIndex
      });
    }

    setDisplayItems(initialItems);
  };

  // Handle carousel movement
  const moveCarousel = (direction: 'left' | 'right'): void => {
    if (isAnimating) return;

    setIsAnimating(true);

    const newIndex = currentIndex + (direction === 'right' ? 1 : -1);
    setCurrentIndex(newIndex);

    needsRepositioning.current = true;

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  useEffect(() => {
    if (!isAnimating && needsRepositioning.current) {
      needsRepositioning.current = false;

      setDisplayItems(prev => {
        const updatedItems: CarouselItem[] = [];
        for (let i = currentIndex - 2; i <= currentIndex + items.length + 1; i++) {
          const itemIndex = ((i % items.length) + items.length) % items.length;

          updatedItems.push({
            id: `item-${i}`,
            value: items[itemIndex],
            color: colors[itemIndex],
            logo: logos[itemIndex],
            position: i,
            originIndex: itemIndex
          });
        }

        return updatedItems;
      });
    }
  }, [isAnimating, currentIndex, items.length, items, colors]);

  // Auto-rotate the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        moveCarousel('right');
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  interface VisualProps {
    x: number;
    scale: number;
    opacity: number;
    zIndex: number;
  }

  const getVisualProps = (position: number): VisualProps => {
    const relativePos = position - currentIndex;

    const LOGO_WIDTH = 42;
    const SPACING = 20;
    const CONTAINER_WIDTH = 350;
    const VISIBLE_ITEMS = 5;
    const MANUAL_X_ADJUST = -22;

    if (relativePos < -2 || relativePos > 2) {
      return { x: relativePos < 0 ? -CONTAINER_WIDTH : CONTAINER_WIDTH, scale: 0, opacity: 0, zIndex: 0 };
    }
    const first_center =
      ((CONTAINER_WIDTH - (VISIBLE_ITEMS * LOGO_WIDTH + (VISIBLE_ITEMS - 1) * SPACING)) / 2) +
      LOGO_WIDTH / 2;
    const center_positions = Array.from({ length: VISIBLE_ITEMS }, (_, i) =>
      first_center + i * (LOGO_WIDTH + SPACING)
    );

    const idx = relativePos + 2;
    const container_center = CONTAINER_WIDTH / 2;
    const x = center_positions[idx] - container_center + MANUAL_X_ADJUST;

    const scales = [1, 1, 1.4, 1, 1];
    const opacities = [0.8, 1, 1, 1, 0.8];
    const zIndexes = [1, 2, 3, 2, 1];

    return {
      x,
      scale: scales[idx],
      opacity: opacities[idx],
      zIndex: zIndexes[idx],
    };
  };
  const centerItem = displayItems.find(item => item.position - currentIndex === 0);
  const centerSystem = centerItem ? designSystems[centerItem.originIndex] : designSystems[0];

  const gridVariants = {
    animate: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.05,
      }
    }
  };

  const cellVariants = {
    initial: { opacity: 0, scale: 0.7, y: 16 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 250, damping: 20 } },
    exit: { opacity: 0, scale: 0.7, y: -16, transition: { duration: 0.18 } }
  };

  return (
    <FeaturBox>
      <Wrapper>
        <GridWrap>
          <img src="/grid.svg" alt="grid" />
        </GridWrap>
        <MainContent>
          <LogoCarousel>
            {displayItems.map(item => {
              const { x, scale, opacity, zIndex } = getVisualProps(item.position);
              const isCenter = item.position - currentIndex === 0;

              return (
                <motion.div
                  key={item.id}
                  className={`logo${isCenter ? ' logo-center' : ''}`}
                  initial={false}
                  animate={{
                    x,
                    scale,
                    opacity,
                    zIndex
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.5, 0, 0, 1]
                  }}
                >
                  {isCenter && (
                    <AnimatePresence>
                      <motion.svg
                        key={`circle-${centerSystem.name}`}
                        className="logo-border"
                        width={54}
                        height={54}
                        viewBox="0 0 54 54"
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          pointerEvents: 'none',
                          zIndex: 6,
                        }}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <defs>
                          <linearGradient id="blue-gradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#FF24BD" stopOpacity="1" />
                            <stop offset="100%" stopColor="#FF24BD" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <motion.circle
                          cx={27}
                          cy={27}
                          r={23}
                          fill="none"
                          stroke="url(#blue-gradient)"
                          strokeWidth={1}
                          transform="rotate(-90 27 27)"
                          variants={{
                            initial: { pathLength: 0 },
                            animate: { pathLength: 1, transition: { duration: 0.5, ease: [0.5, 0, 0, 1] } },
                            exit: { pathLength: 0, transition: { duration: 0.3, ease: "easeInOut" } }
                          }}
                        />
                      </motion.svg>
                      <motion.svg
                        key={`line-${centerSystem.name}`}
                        width={54}
                        height={200}
                        viewBox="0 0 54 200"
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          pointerEvents: 'none',
                          zIndex: 5,
                        }}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <motion.line
                          x1={27}
                          y1={124}
                          x2={27}
                          y2={152}
                          stroke="#FF24BD"
                          strokeWidth={1}
                          strokeLinecap="round"
                          opacity={0.7}
                          variants={{
                            initial: { pathLength: 0 },
                            animate: { pathLength: 1, transition: { duration: 0.5, ease: [0.5, 0, 0, 1] } },
                            exit: { pathLength: 0, transition: { duration: 0.3, ease: "easeInOut" } }
                          }}
                        />
                      </motion.svg>
                    </AnimatePresence>
                  )}
                  <LogoWrap>
                    <img
                      src={`/${item.logo}.png`}
                      alt={item.logo}
                      className='logo-icon'

                      draggable={false}
                    />
                  </LogoWrap>
                </motion.div>
              );
            })}
          </LogoCarousel>
          <UIWrapper>
            <UIFrame>
              <div className='top'>
                <div className='left-dots'>
                  <div className='win-btn'></div>
                  <div className='win-btn'></div>
                  <div className='win-btn'></div>
                </div>
              </div>
              <div className='bottom'>
                <AnimatePresence >
                  <motion.div
                    key={centerSystem.name}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={gridVariants}
                    style={{ width: "100%" }}
                  >
                    <ColorGrid className='color-grid'>
                      {centerSystem.colorPalette.slice(0, 10).map((color, i) => (
                        <motion.div
                          className="color-cell"
                          key={color}
                          style={{ background: color }}
                          variants={cellVariants}
                          layout
                        />
                      ))}
                    </ColorGrid>
                  </motion.div>
                </AnimatePresence>
              </div>
            </UIFrame>
          </UIWrapper>
        </MainContent>
      </Wrapper>
    </FeaturBox>
  )
}

const FeaturBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  z-index: 0;
`

const Wrapper = styled.div`
  position: relative;
  background: linear-gradient(180deg, var(--gray-grad-1) 0%, var(--white) 80%);
  box-shadow: 0px 1px 1px 0px inset rgb(255, 255, 255);
  border-radius: 16px 16px 0 0;
  display: flex;
  justify-content: center;
  font-size: 16px;
  letter-spacing: -0.2px;
  font-weight: 500;
  height: 100%;
  width: 100%;
  color: var(--foreground);
  gap: 4px;
  align-items: center;
  span {
    padding-inline: 5px;
    font-weight: 500;
    .img-r {
      transform: scale(1.2);
    }
    a {
      text-decoration: none;
      color: var(--foreground);
      opacity: 0.9;
      &:hover {
        opacity: 1;
      }
    }
    &.img {
      padding: 0;
    }
  }
`;

const GridWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.04;
  mask-image: radial-gradient(
    ellipse 60% 40% at 50% 40%,
    rgba(0,0,0,1) 10%,        
    rgba(0,0,0,0) 60%         
  );
  -webkit-mask-image: radial-gradient(
    ellipse 60% 40% at 50% 40%,
    rgba(0,0,0,1) 10%,        
    rgba(0,0,0,0) 60%         
  );
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const LogoCarousel = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;      
  width: 350px;
  height: 100px;            
  margin: 0 auto;
  .logo {
    background: var(--white);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04), 0px 0px 0px 1px inset rgba(0, 0, 0, 0.08);
    position: absolute;
    height: 42px;
    width: 42px;
    left: 50%;
    top: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radii-full);
    transform: translateY(-50%);
  }
  .logo-center {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 0px 0px 1px inset rgba(0, 0, 0, 0.08);
  }
`;

const LogoWrap = styled.div`
  display: flex;
  .logo-icon{
    width: 24px;
    height: 24px;
    object-fit: contain;
    display: block;
  }
`

const MainContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 95%);
  -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 95%);
  flex-direction: column;
  align-items: center;
`;

const Controls = styled.div`
  display: flex;
  gap: 1.5rem;

  button {
    padding: 0.5rem 1.25rem;
    border-radius: 6px;
    border: none;
    background: var(--foreground);
    color: var(--white);
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    opacity: 0.9;
    transition: opacity 0.2s;
    &:hover:enabled {
      opacity: 1;
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const DebugInfo = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  font-size: 0.9rem;
  color: var(--foreground);
  opacity: 0.7;
  pointer-events: none;
`;

const UIWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  transform: translateY(20px);

  overflow: visible;
  z-index: 2;
`;

const UIFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  flex: initial;
  gap: 0;
  width: 240px;
  height: 140px;
  border-radius: 12px;
  background-clip: border-box;
  background: linear-gradient(180deg, #F2F3F5 0%, #FFFFFF 16%);
  box-shadow: 0px -1px 2px rgba(0, 0, 0, 0.06), 0px 0px 0px 1px inset rgba(0, 0, 0, 0.06);
  .top{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex: initial;
    padding: 8px 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
    gap: 0;
  }

  .left-dots{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex: initial;
    margin-top: 4px;
    gap: 4px;
  }
  .win-btn{
    height: 6px;
    width: 6px;
    border-radius: 100%;
    display: inline-block;
    &:first-child{
      background-color: #FF24BD;
    }
    &:nth-child(2){
      background-color: #feb119;
    }
    &:last-child{
      background-color: #3dd852;
    }
  }
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 14px;
  width: fit-content;
  height: 24px;
  padding: 12px 16px;
  box-sizing: border-box;
  margin: 0 auto;
  .color-cell {
    border-radius: 6px;
    width: 100%;
    height: 100%;
    height: 24px;
    width: 24px;
    padding: 4px;
    background: #eee;
    box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    border: 1px solid rgba(0,0,0,0.04);
  }
`;