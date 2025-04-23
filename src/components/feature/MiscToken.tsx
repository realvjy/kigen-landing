import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

export default function MiscToken() {
    const [animationKey, setAnimationKey] = useState(0);

    // Restart animation every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationKey(prev => prev + 1);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <FeaturBox>
            <Container>
                <LayoutContainer>
                    {/* Left box */}
                    <LeftBox
                        key={`left-${animationKey}`}
                        initial={{ x: 0 }}
                        animate={{
                            x: [0, 40, 0],
                        }}
                        transition={{
                            duration: 4,
                            times: [0, 0.5, 1],
                            ease: "easeInOut"
                        }}
                    >
                        {/* Content lines */}
                        <ContentContainer>
                            <ContentLine style={{ width: '75%' }} />
                            <ContentLine style={{ width: '100%' }} />
                            <ContentLine style={{ width: '66%' }} />
                        </ContentContainer>
                    </LeftBox>

                    {/* Right box */}
                    <RightBox
                        key={`right-${animationKey}`}
                        initial={{ x: 0 }}
                        animate={{
                            x: [0, -40, 0]
                        }}
                        transition={{
                            duration: 4,
                            times: [0, 0.5, 1],
                            ease: "easeInOut"
                        }}
                    >
                        {/* Window controls */}
                        <WindowControls>
                            <RedButton />
                            <YellowButton />
                            <GreenButton />
                        </WindowControls>

                        {/* Content lines */}
                        <ContentContainer>
                            <ContentLine style={{ width: '75%' }} />
                            <ContentLine style={{ width: '100%' }} />
                            <ContentLine style={{ width: '66%' }} />
                        </ContentContainer>
                    </RightBox>

                    {/* Curved pink measurement line - top */}
                    <CurvedSvg
                        key={`curve-${animationKey}`}
                        width="140"
                        height="60"
                        viewBox="0 0 140 60"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                            duration: 4,
                            times: [0, 0.2, 0.8, 1]
                        }}
                    >
                        <motion.path
                            d="M0,60 Q70,10 140,60"
                            fill="transparent"
                            stroke="#EC4899"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: [0, 1, 1, 0] }}
                            transition={{
                                duration: 4,
                                times: [0, 0.3, 0.7, 1]
                            }}
                        />
                        <motion.line
                            x1="0"
                            y1="60"
                            x2="0"
                            y2="40"
                            stroke="#EC4899"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: [0, 1, 1, 0] }}
                            transition={{
                                duration: 4,
                                times: [0, 0.3, 0.7, 1]
                            }}
                        />
                        <motion.line
                            x1="140"
                            y1="60"
                            x2="140"
                            y2="40"
                            stroke="#EC4899"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: [0, 1, 1, 0] }}
                            transition={{
                                duration: 4,
                                times: [0, 0.3, 0.7, 1]
                            }}
                        />
                    </CurvedSvg>

                    {/* Horizontal pink measurement line - middle */}
                    <HorizontalMeasure
                        key={`horizontal-${animationKey}`}
                        initial={{ width: 140 }}
                        animate={{
                            width: [140, 60, 140]
                        }}
                        transition={{
                            duration: 4,
                            times: [0, 0.5, 1],
                            ease: "easeInOut"
                        }}
                    >
                        <HorizontalLine />
                        <LeftMark />
                        <RightMark />
                    </HorizontalMeasure>
                </LayoutContainer>
            </Container>
        </FeaturBox>
    );
};

const FeaturBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 280px;
  width: 100%;
  max-width: 100%;
  background: linear-gradient(180deg, var(--gray-grad-1) 0%, var(--white) 80%);
`;
// Styled Components
const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LayoutContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 32rem;
  height: 200px;
`;

const Box = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 18rem;
  height: 100%;
  background-color: white;
  border-radius: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const LeftBox = styled(Box)`
  left: 0;
`;

const RightBox = styled(Box)`
  right: 0;
`;

const ContentLine = styled.div`
  height: 0.5rem;
  background-color: #f3f4f6;
  border-radius: 9999px;
  margin-bottom: 1rem;
`;

const WindowControls = styled.div`
  position: absolute;
  top: 2rem;
  left: 1.5rem;
  display: flex;
`;

const WindowButton = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  margin-right: 0.5rem;
`;

const RedButton = styled(WindowButton)`
  background-color: #f87171;
`;

const YellowButton = styled(WindowButton)`
  background-color: #fbbf24;
`;

const GreenButton = styled(WindowButton)`
  background-color: #4ade80;
`;

const ContentContainer = styled.div`
  padding: 1.5rem;
  padding-top: 4rem;
`;

const CurvedSvg = styled(motion.svg)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const HorizontalMeasure = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const HorizontalLine = styled.div`
  height: 0.125rem;
  background-color: #ec4899;
  width: 100%;
`;

const VerticalMeasureMark = styled.div`
  position: absolute;
  height: 1.5rem;
  width: 0.125rem;
  background-color: #ec4899;
  top: 50%;
  transform: translateY(-50%);
`;

const LeftMark = styled(VerticalMeasureMark)`
  left: 0;
`;

const RightMark = styled(VerticalMeasureMark)`
  right: 0;
`;