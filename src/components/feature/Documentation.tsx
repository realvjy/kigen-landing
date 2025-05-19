import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export default function Documentation() {
  const generateRandomWidth = () => {
    return 60 + Math.floor(Math.random() * 40);
  };

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

  const [key, setKey] = useState(0);

  const regenerateWidths = () => {
    setSidebarBlocks(sidebarBlocks.map(() => ({ width: generateRandomWidth() })));
    setContentBlocks(contentBlocks.map(() => ({ width: generateRandomWidth() })));
    setKey(prevKey => prevKey + 1);
  };

  // Set up the animation cycle
  useEffect(() => {
    const interval = setInterval(() => {
      regenerateWidths();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <FeaturBox>
      <Wrapper>
        <UIWrapper>
          <UIFrame>
            <Container>
              <Sidebar>
                <WindowControls>
                  <div className='top'>
                    <div className='left-dots'>
                      <div className='win-btn'></div>
                      <div className='win-btn'></div>
                      <div className='win-btn'></div>
                    </div>
                  </div>
                </WindowControls>
                <SidebarContent>
                  <SidebarIcon />
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
              <MainContent>
                <motion.div
                  key={`content-${key}`}
                  className="full"
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
          </UIFrame>
        </UIWrapper>

      </Wrapper>
    </FeaturBox>

  );
}

const FeaturBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  max-width: 100%;
`;


const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Wrapper = styled.div`
  position: relative;
  background: linear-gradient(180deg, var(--gray-grad-1) 0%, var(--white) 80%);
  box-shadow: 0px 1px 1px 0px inset rgb(255, 255, 255);
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
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%);
  -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%);
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


const UIWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  z-index: 2;
`;

const UIFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  overflow: hidden;
  flex: initial;
  gap: 0;
  width: 240px;
  height: 180px;
  border-radius: 12px;
  background-clip: border-box;
  background: linear-gradient(180deg, #F2F3F5 0%, #FFFFFF 16%);
  box-shadow: 0px -1px 2px rgba(0, 0, 0, 0.06), 0px 0px 0px 1px inset rgba(0, 0, 0, 0.08);
  .top{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex: initial;
    padding: 8px 16px;
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

const Sidebar = styled.div`
  width: 30%;
  min-width: 80px;
  max-width: 120px;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
`;

const WindowControls = styled.div`
  display: flex;
  align-items: center;
`;

const Control = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
`;


const SidebarContent = styled.div`
  padding: 16px;
`;

const SidebarIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background-color: #FF24BD;
  margin-bottom: 16px;
`;

const SidebarBlock = styled(motion.div)`
  height: 8px;
  background-color: var(--block);
  margin-bottom: 8px;
  border-radius: 4px;
`;

const ContentBlock = styled(motion.div)`
  height: 8px;
  background-color: var(--block);
  margin-bottom: 12px;
  border-radius: 4px;
  opacity: 0.6;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 16px;
  margin-top: 20px;
  opacity: 0.6;
`;

const ContentWrapper = styled(motion.div)`
  max-width: 100%;
`;
