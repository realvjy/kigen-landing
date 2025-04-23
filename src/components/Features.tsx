"use client"
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import dynamic from "next/dynamic";

import styled from 'styled-components'
import { Container, SmallTag, TagWrapper } from "./ReusableUI";
import { motion } from 'framer-motion'
import ColorToken from "./feature/ColorToken";
import { animate, createScope, Scope } from 'animejs';
import AnimatedPathTrail from "./AnimatedPathTrail";
import cardTest from "@/assets/card-test.json";
import SemanticColor from './feature/SemanticColor';
import TypographyToken from './feature/TypographyToken';
import Documentation from './feature/Documentation';
import PresetSlide from './feature/PresetSlide';
import MiscToken from './feature/MiscToken';



export default function Features() {

  const [animationType, setAnimationType] = useState<'draw' | 'pulse' | 'flow'>('draw');
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [duration, setDuration] = useState<number>(2);
  const [strokeColor, setStrokeColor] = useState<string>('#1d1d20');
  const [showBackground, setShowBackground] = useState(true);
  const path = 'M20 20 C40 10, 65 10, 95 80'; // Example curved path


  // Available animation types
  const animationTypes: Array<'draw' | 'pulse' | 'flow'> = ["draw", "pulse", "flow"];
  const directions: Array<'right' | 'left'> = ["right", "left"];
  const colorOptions: Record<string, string> = {
    "Black": "#1d1d20",
    "Blue": "#3b82f6",
    "Green": "#10b981",
    "Red": "#ef4444",
    "Purple": "#8b5cf6"
  };

  const features = [
    {
      title: "Color tokens",
      description: "A collection of primitive color palettes sourced from popular design systems like Material, Fluent, and Polaris—ready to use and extend for your brand.",
      component: <ColorToken />
    },
    {
      title: "Semantic/Alias tokens",
      description: "A pre-configured typography system with properly configured variables, seamlessly bound to text styles and ready for customization to match your brand.",
      component: <SemanticColor />
    },
    {
      title: "Typography tokens",
      description: "Consistent spacing scales that help maintain rhythm in your designs across all platforms.",
      component: <TypographyToken />
    },
    {
      title: "Size & Misc Tokens",
      description: "Elevation systems with ready-to-use shadow values for creating depth in your interfaces.",
      component: <MiscToken />
    },
    {
      title: "Documentation",
      description: "Comprehensive set of border radius values to maintain consistent component styling.",
      component: <Documentation />
    },
    {
      title: "Presets options",
      description: "Export your design tokens to various formats including CSS, SCSS, JSON, and more.",
      component: <PresetSlide />

    }
  ]
  return (
    <Section id="features">
      <Container className="center">
        <TagWrapper>
          <SmallTag className="pink">Core Feature</SmallTag>
        </TagWrapper>
        <Title>Our Amazing Features</Title>
        <FeatureGrid>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard>
                <FeatureContent>
                  {feature.component ? (
                    feature.component
                  ) : (
                    <FeatureImage>
                      {/* <img src={feature.image} alt={feature.title} /> */}
                    </FeatureImage>
                  )}
                </FeatureContent>
                <FeatureText>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </FeatureText>
              </FeatureCard>
            </motion.div>
          ))}

        </FeatureGrid>


      </Container>
    </Section >
  )
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  margin-top: 100px;
`





const Button = styled.a`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.6px;
  padding: 12px 20px;
  background-color: var(--foreground);
  border-radius: 40px;
  color: var(--background);
`

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px 0;
  gap: 20px;
  align-items: center;
  text-align: center;
  img{
    height: 40px;
  }

`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    max-width: 600px;
    h1{
        font-size: 48px;
        font-weight: 400;
        line-height: 100%;
        letter-spacing: -1.8px;
    }

  p{
    font-size: 20px;
    opacity: 0.8;
    font-weight: 300;
  }
`

const Title = styled.h2`
  text-align: center;
  font-size: 40px;
  line-height: 100%;
  letter-spacing: -1px;
  font-weight: 400;
  margin-top: 24px;
  margin-bottom: 40px;
  @media (max-width: 700px) {
    font-size: 36px;
  }
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 20px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`



const FeatureImage = styled.div`
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  width: 100%;
  img {
    max-width: 100%;
    min-height: 280px;
  }
`

const FeatureContent = styled.div`
  min-height: 280px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FeatureCard = styled.div`
  transition: transform 0.3s ease;
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04), inset 0px 0px 40px 2px #FFFFFF;
  background-clip: padding-box;
  border-radius: 16px;
  height: 100%; 
  display: flex;
  flex-direction: column;
  overflow: hidden;
  h3 {
    font-size: 22px;
    font-weight: 450;
    letter-spacing: -0.4px;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 14px;
    line-height: 20px;
    color: var(--gray2);
    flex-grow: 1; 
    margin-bottom: 20px;
  }
`

const FeatureText = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;

`;