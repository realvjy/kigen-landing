import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export default function Documentation() {
    // Generate random widths for blocks
    const generateRandomWidth = () => {
        // Return a random percentage between 60% and 100%
        return 60 + Math.floor(Math.random() * 40);
    };

    // Create sidebar and content blocks with random widths
    const [sidebarBlocks, setSidebarBlocks] = useState([
        { width: generateRandomWidth() },
        { width: generateRandomWidth() },
        { width: generateRandomWidth() }
    ]);

    const [contentBlocks, setContentBlocks] = useState([
        { width: generateRandomWidth() },
        { width: generateRandomWidth() },
        { width: generateRandomWidth() },
        { width: generateRandomWidth() }
    ]);

    // Animation key to force re-render
    const [key, setKey] = useState(0);

    // Regenerate random widths and restart animation
    const regenerateWidths = () => {
        setSidebarBlocks(sidebarBlocks.map(() => ({ width: generateRandomWidth() })));
        setContentBlocks(contentBlocks.map(() => ({ width: generateRandomWidth() })));
        setKey(prevKey => prevKey + 1);
    };

    // Set up the animation cycle
    useEffect(() => {
        const interval = setInterval(() => {
            regenerateWidths();
        }, 4000); // Regenerate every 4 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <FeaturBox>
            <Container>
                {/* Sidebar */}
                <Sidebar>
                    {/* Window Controls */}
                    <WindowControls>
                        <RedControl />
                        <YellowControl />
                        <GreenControl />
                    </WindowControls>

                    {/* Sidebar Content */}
                    <SidebarContent>
                        <SidebarIcon />

                        {/* Animated sidebar lines */}
                        <motion.div
                            key={`sidebar-${key}`}
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        staggerChildren: 0.15
                                    }
                                }
                            }}
                        >
                            {sidebarBlocks.map((block, index) => (
                                <SidebarBlock
                                    key={index}
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{
                                        width: [`0%`, `${block.width}%`, `${block.width}%`, `0%`],
                                        opacity: [0, 1, 1, 0]
                                    }}
                                    transition={{
                                        duration: 3.5,
                                        times: [0, 0.2, 0.8, 1],
                                        delay: index * 0.15,
                                    }}
                                />
                            ))}
                        </motion.div>
                    </SidebarContent>
                </Sidebar>

                {/* Main Content */}
                <MainContent>
                    <motion.div
                        key={`content-${key}`}
                        className="max-w-full"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: {
                                transition: {
                                    staggerChildren: 0.15
                                }
                            }
                        }}
                    >
                        {contentBlocks.map((block, index) => (
                            <ContentBlock
                                key={index}
                                initial={{ width: 0, opacity: 0 }}
                                animate={{
                                    width: [`0%`, `${block.width}%`, `${block.width}%`, `0%`],
                                    opacity: [0, 1, 1, 0]
                                }}
                                transition={{
                                    duration: 3.5,
                                    times: [0, 0.2, 0.8, 1],
                                    delay: index * 0.15,
                                }}
                            />
                        ))}
                    </motion.div>
                </MainContent>
            </Container>
        </FeaturBox>

    );
}

const FeaturBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 280px;
  width: 100%;
  max-width: 100%;
`;


// Styled Components
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 380px;
  max-height: 250px;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 30%;
  min-width: 80px;
  max-width: 120px;
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const WindowControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
`;

const Control = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
`;

const RedControl = styled(Control)`
  background-color: #f87171;
`;

const YellowControl = styled(Control)`
  background-color: #fbbf24;
`;

const GreenControl = styled(Control)`
  background-color: #34d399;
`;

const SidebarContent = styled.div`
  padding: 12px;
`;

const SidebarIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: #e5e7eb;
  margin-bottom: 16px;
`;

const SidebarBlock = styled(motion.div)`
  height: 8px;
  background-color: #e5e7eb;
  margin-bottom: 12px;
  border-radius: 4px;
`;

const ContentBlock = styled(motion.div)`
  height: 16px;
  background-color: #e5e7eb;
  margin-bottom: 12px;
  border-radius: 4px;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 16px;
`;

const ContentWrapper = styled(motion.div)`
  max-width: 100%;
`;
