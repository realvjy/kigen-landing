import React, { useEffect, useState } from 'react';
import { useMotionValue, useTransform, motion, animate, easeInOut } from "framer-motion";
import styled from 'styled-components';

interface UICardProps { }

const UICard: React.FC<UICardProps> = () => (
  <UICardWrap>
    <UIFrame>
      <div className="top">
        <div className="left-dots">
          <div className="win-btn"></div>
          <div className="win-btn"></div>
          <div className="win-btn"></div>
        </div>
      </div>
      <ContentContainer>
        <ContentLine style={{ width: "75%" }} />
        <ContentLine style={{ width: "100%" }} />
        <ContentLine style={{ width: "66%" }} />
      </ContentContainer>
    </UIFrame>
  </UICardWrap>
);

const UICardWrap = styled(motion.div)`
  width: 180px;
  min-height: 180px;
  background: var(--white);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  position: relative;
`;

const UIFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  flex: initial;
  gap: 0;
  width: 100%;
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

const ContentContainer = styled.div`
  padding: 16px;
`;

const ContentLine = styled.div`
  height: 8px;
  background: #e5e7eb;
  border-radius: 3px;
  margin-bottom: 10px;
  opacity: 0.6;
`;

export default function MiscToken() {
  const [minGap] = useState(60);
  const [maxGap] = useState(80);
  const CARD_WIDTH = 160;
  const HALF_CARD = CARD_WIDTH / 2;

  const progress = useMotionValue(0);

  useEffect(() => {
    const controls = animate(progress, 1, {
      duration: 3.6,
      repeat: Infinity,
      repeatType: "loop",
      ease: [0.5, 0, 0, 1]
    });
    return controls.stop;
  }, [progress]);

  const gap = useTransform(progress, [0, 0.5, 1], [maxGap, minGap, maxGap]);
  const halfGap = useTransform(gap, (g) => g / 2);
  const leftX = useTransform(halfGap, (hg) => -HALF_CARD - hg);
  const rightX = useTransform(halfGap, (hg) => HALF_CARD + hg);

  const gapStart = useTransform(leftX, (lx) => Number(lx) + CARD_WIDTH);
  const gapEnd = rightX;
  const lineWidth = useTransform([gapStart, gapEnd], ([start, end]) => Math.max(0, Number(end) - Number(start)) - 40);
  const lineCenter = 0;
  return (
    <FeaturBox>
      <Wrapper>
        <GridWrap>
          <img src="/grid.svg" alt="grid" />
        </GridWrap>
        <LayoutContainer>
          <SlideArea>
            <motion.div
              style={{
                x: leftX,
                position: "absolute",
                left: "50%",
                top: "50%",
                translateX: "-50%",
                translateY: "-50%"
              }}
            >
              <UICard />
            </motion.div>

            <motion.div
              style={{
                x: rightX,
                position: "absolute",
                left: "50%",
                top: "50%",
                translateX: "-50%",
                translateY: "-50%"
              }}
            >
              <UICard />
            </motion.div>
          </SlideArea>

          <HorizontalMeasure style={{ x: lineCenter }}>
            <LineContainer>
              <MotionHorizontalLine style={{ width: lineWidth }} />
              <LeftMark />
              <RightMark />
            </LineContainer>
          </HorizontalMeasure>
        </LayoutContainer>
      </Wrapper>
    </FeaturBox>
  );
};

const FeaturBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  max-width: 100%;
  background: linear-gradient(180deg, var(--gray-grad-1) 0%, var(--white) 80%);
`;

const Wrapper = styled.div`
  position: relative;
  background: linear-gradient(180deg, var(--gray-grad-1) 0%, var(--white) 80%);
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

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 90%);
  -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 90%);
`;

const SlideArea = styled.div`
  position: relative;
  width: 100%;
  margin: 32px 0;
  
`;

const HorizontalMeasure = styled(motion.div)`
  position: absolute;
  top: 140px;
  transform: translate(-50%, -50%);
`;

const LineContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -10px;
`;

const MotionHorizontalLine = styled(motion.div)`
  height: 0.125rem;
  background-color: #ec4899;
  border-radius: 1px;
  margin: 0 auto;
`;

const VerticalMeasureMark = styled.div`
  position: absolute;
  height: 16px;
  width: 2px;
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