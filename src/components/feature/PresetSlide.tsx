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
    amount: number;
    icon: string;
    position?: string;
    key?: string;
}

interface TransactionCardProps {
    item: TransactionItem;
}

// Transaction Card Component
const TransactionCard: React.FC<TransactionCardProps> = ({ item }) => {
    const isPositive = item.amount > 0;

    return (
        <Card>
            <LeftSection>
                <IconContainer>{item.icon}</IconContainer>
                <TextContainer>
                    {/* Title block - width based on title length */}
                    <TitleBlock
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(item.title.length * 8, 120)}px` }}
                        transition={{ duration: 0.3 }}
                    />
                    {/* Category block - smaller width */}
                    <CategoryBlock
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(item.category.length * 6, 80)}px` }}
                        transition={{ duration: 0.3 }}
                    />
                </TextContainer>
            </LeftSection>
            {/* <Amount isPositive={isPositive}>
                {isPositive ? '+' : '-'} ${Math.abs(item.amount).toFixed(2)}
            </Amount> */}
        </Card>
    );
};

export default function PresetSlide() {
    // Sample transaction data
    const transactions = [
        { id: 1, title: "Birthday gift", category: "Revenue", amount: 100.00, icon: "🎁" },
        { id: 2, title: "Shoes", category: "Clothing", amount: -79.00, icon: "👟" },
        { id: 3, title: "Movie theater", category: "Entertainment", amount: -16.00, icon: "🎬" },
        { id: 4, title: "Salary", category: "Income", amount: 2450.00, icon: "💼" },
        { id: 5, title: "Grocery store", category: "Food", amount: -123.45, icon: "🛒" },
        { id: 6, title: "Gas station", category: "Transportation", amount: -45.00, icon: "⛽" },
        { id: 7, title: "Restaurant", category: "Food", amount: -68.50, icon: "🍽️" },
        { id: 8, title: "Investment return", category: "Revenue", amount: 210.00, icon: "📈" },
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
            setIsExiting(true); // 1. Trigger exit
            setTimeout(() => {
                // 2. After exit animation, update cards and reset exit
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
            }, 700); // match your exit animation duration
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
            transition: { duration: 0.8, ease: [0.5, 0, 0, 1] }
        },
        next: {
            y: 70,
            scale: 0.95,
            opacity: 0.8,
            zIndex: 2,
            transition: { duration: 0.7, ease: [0.5, 0, 0, 1] }
        },
        upcoming: {
            y: 130,
            scale: 0.9,
            opacity: 0.6,
            zIndex: 1,
            transition: { duration: 0.7, ease: [0.5, 0, 0, 1] }
        },
        exit: {
            y: -120,
            opacity: 0,
            transition: { duration: 0.7, ease: [0.5, 0, 0, 1] }
        },
        enter: {
            y: 180,
            scale: 0.85,
            opacity: 0.4,
            zIndex: 0,
            transition: { duration: 0.6, ease: [0.5, 0, 0, 1] }
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
                                <TransactionCard item={card} />
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
  justify-content: center;
  height: 280px;
  width: 100%;
  max-width: 100%;
  background: linear-gradient(180deg, var(--gray-grad-1) 0%, var(--white) 80%);

`;

const Container = styled.div`
  padding: 0 1.5rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardContainer = styled.div`
  position: relative;
  padding: 22px;
  width: 100%;
  max-width: 350px;
  height: 280px;
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
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  font-size: 1.25rem;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// Blocks that vary in width based on data content
const TitleBlock = styled(motion.div)`
  height: 16px;
  background-color: #e5e7eb;
  border-radius: 4px;
`;

const CategoryBlock = styled(motion.div)`
  height: 12px;
  background-color: #e5e7eb;
  border-radius: 4px;
  opacity: 0.7;
`;