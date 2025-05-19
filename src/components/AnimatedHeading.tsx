import React from 'react';
import { motion } from 'framer-motion';
import { Gradient } from './ReusableUI';
import styled from 'styled-components';


const StyledHeading = styled(motion.h1)`
  font-size: 44px;
  font-weight: 500;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  will-change: transform, opacity;
`;

const Word = styled(motion.span)`
  display: inline-block;
  margin: 0 0.5rem;
  will-change: transform, opacity;
`;

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1,
        },
    },
};

const Description = styled(motion.p)`
   font-size: 18px;
    color: var(--gray2);
    font-weight: 400;
    max-width: 500px;
    letter-spacing: -0.1px;
    line-height: 28px;
    margin: 0 auto;
    text-align: center;
    will-change: transform, opacity;
    @media (max-width: 700px) {
        font-size: 16px;
    }
`;

const item = {
    hidden: {
        y: 16,
        opacity: 0,
        filter: "blur(12px)",
    },
    visible: {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.4,
            ease: [0.2, 0, 0.5, 1],
        },
    },
};

const descriptionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.4,
            duration: 0.4,
            ease: "easeOut"
        }
    }
};

const AnimatedHeading = () => {
    return (
        <>
            <StyledHeading variants={container} initial="hidden" animate="visible">
                <Word variants={item}>Create</Word>
                <Word variants={item}>Design</Word>
                <Word variants={item}>System</Word>
                <Word variants={item}>
                    <Gradient $variant="blue">Variables</Gradient>
                </Word>
                <Word variants={item}>and</Word>
                <Word variants={item}>
                    <Gradient $variant="orange">Styles</Gradient>
                </Word>
                <Word variants={item}>Fast</Word>
            </StyledHeading>
            <Description
                variants={descriptionVariants}
                initial="hidden"
                animate="visible"
            >
                A faster way to start design systems. Use Kigen to create your core variables and styles in just a few clicks.
            </Description>
        </>
    );
};

export default AnimatedHeading;
