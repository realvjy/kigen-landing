import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
/// Define prop types for the Amount component
interface AmountProps {
  isPositive: boolean;
}

const Amount = styled.div<AmountProps>`
    font-weight: 500;
    color: ${props => props.isPositive ? '#10b981' : '#6b7280'};
`;

// Define Transaction item type
interface TransactionItem {
  id: number;
  title: string;
  category: string;
  color: string;
  icon: string;
  position?: string;
  key?: string;
}

interface SlideCardProps {
  item: TransactionItem;
}

// Transaction Card Component
const SlideCard: React.FC<SlideCardProps> = ({ item }) => {
  const isPositive = item.color === '#10b981';

  return (
    <Card>
      <LeftSection>
        <IconContainer style={{ backgroundColor: item.color }}><img src={`/${item.icon}.svg`} alt={item.icon} /></IconContainer>
        <TextContainer>
          <TitleBlock
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(item.title.length * 8, 150)}px` }}
            transition={{ duration: 0.3 }}
          />
          <CategoryBlock
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(item.category.length * 6, 80)}px` }}
            transition={{ duration: 0.3 }}
          />
        </TextContainer>
      </LeftSection>
    </Card>
  );
};

export default function PresetSlide() {
  // Sample transaction data
  const transactions = [
    { id: 1, title: "Birthday gift", category: "Revenue", color: '#F7F7F7', icon: "text" },
    { id: 2, title: "Shoes", category: "Clothing", color: '#FFEEF6', icon: "color" },
    { id: 3, title: "Movie theater", category: "Entertainment", color: '#E4F3FF', icon: "radius" },
    { id: 4, title: "Salary", category: "Income", color: '#FFF8F3', icon: "scale" },
  ];
  const [isExiting, setIsExiting] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedCards, setDisplayedCards] = useState<TransactionItem[]>([]);

  useEffect(() => {
    setDisplayedCards([
      { ...transactions[0], position: "main", key: `main-0` },
      { ...transactions[1], position: "next", key: `next-1` },
      { ...transactions[2], position: "upcoming", key: `upcoming-2` }
    ]);

    const interval = setInterval(() => {
      setIsExiting(true);
      setTimeout(() => {
        setCurrentIndex(prevIndex => {
          const newIndex = (prevIndex + 1) % transactions.length;
          const nextIndex = (newIndex + 1) % transactions.length;
          const upcomingIndex = (newIndex + 2) % transactions.length;

          setDisplayedCards([
            { ...transactions[newIndex], position: "main", key: `main-${newIndex}` },
            { ...transactions[nextIndex], position: "next", key: `next-${nextIndex}` },
            { ...transactions[upcomingIndex], position: "upcoming", key: `upcoming-${upcomingIndex}` }
          ]);

          return newIndex;
        });
        setIsExiting(false);
      }, 1200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Card animation variants
  const cardVariants = {
    main: {
      y: 0,
      scale: 1,
      opacity: 1,
      zIndex: 3,
      transition: { duration: 1.2, ease: [0.5, 0, 0, 1] }
    },
    next: {
      y: 60,
      scale: 0.9,
      opacity: 1,
      zIndex: 2,
      transition: { duration: 1.2, ease: [0.5, 0, 0, 1] }
    },
    upcoming: {
      y: 110,
      scale: 0.8,
      opacity: 1,
      zIndex: 1,
      transition: { duration: 1.2, ease: [0.5, 0, 0, 1] }
    },
    exit: {
      y: -120,
      scale: 0.8,
      opacity: 0,
      transition: { duration: 1.5, ease: [0.5, 0, 0, 1] }
    },
    enter: {
      y: 170,
      scale: 0.7,
      opacity: 0,
      zIndex: -1,
      transition: { duration: 1.2, ease: [0.5, 0, 0, 1] }
    }
  };

  return (
    <FeaturBox>
      <Container>
        <CardContainer>
          <AnimatePresence initial={false}>
            {displayedCards.map((card) => (
              <CardWrapper
                key={card.key || card.id}
                initial="enter"
                animate={card.position}
                exit="exit"
                variants={cardVariants}
              >
                <SlideCard item={card} />
              </CardWrapper>
            ))}
          </AnimatePresence>
        </CardContainer>
      </Container>
    </FeaturBox>
  );
}

const FeaturBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  height: 100%;
  background: linear-gradient(180deg, var(--gray-grad-1) 0%, var(--white) 80%);
  box-shadow: 0px 1px 1px 0px inset rgb(255, 255, 255);
  border-radius: 16px 16px 0 0;
  z-index: 0;
`;

const Container = styled.div`
  padding: 0 36px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardContainer = styled.div`
  position: relative;
  padding: 40px 0;
  width: 100%;
  max-width: 350px;
  height: 100%;
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%);
  -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%);
`;

const CardWrapper = styled(motion.div)`
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  border-radius: 18px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  background-color: var(--white);
  align-items: center;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.06), 0px 0px 0px 1px inset rgba(0, 0, 0, 0.06);
  background-clip: border-box;
  width: 100%;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  font-size: 1.25rem;
  img{
    width: 20px;
    height: 20px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// Blocks that vary in width based on data content
const TitleBlock = styled(motion.div)`
  height: 12px;
  background-color: #e5e7eb;
  border-radius: 5px;
  opacity: 0.6;
`;

const CategoryBlock = styled(motion.div)`
  height: 10px;
  background-color: #e5e7eb;
  border-radius: 5px;
  opacity: 0.4;
`;