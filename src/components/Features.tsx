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
  const path = 'M20 20 C40 10, 65 10, 95 80';


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
      title: "Color Palette",
      description: "A collection of primitive color palettes sourced from popular design systems like Material, Fluent, Tailwind, Polaris, and more — ready to use and extend for your brand.",
      component: < ColorToken />
    },
    {
      title: "Predefined Variables",
      description: "Start fast with a ready-to-use variable set built on best practices — easily customizable, so you never have to worry about how to begin.",
      component: < PresetSlide />

    },

    {
      title: "Semantic/Alias",
      description: "A ready-to-use set of semantics and aliases mapped to colors for Success, Error, Warning, and more — designed for accessible and consistent UI communication.",
      component: < SemanticColor />
    },
    {
      title: "Typography",
      description: "Tokenized font sizes, weights, and line heights ensure scalable and consistent text styling across your product.",
      component: <TypographyToken />
    },
    {
      title: "Size & Misc Variables",
      description: "Standardized spacing scale and size variables for padding, margins, and layout dimensions—fully bind with variables.",
      component: <MiscToken />
    },
    {
      title: "Documentation",
      description: "Easily generate and print all necessary token details for review, sharing, or developer handoff. Best to document all tokens & style.",
      component: <Documentation />
    },

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
                  <h3>{feature.title}</h3>
                </FeatureContent>
                <FeatureText>
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
  gap: 20px;
  margin-top: 60px;
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
    min-height: 250px;
  }
`

const FeatureContent = styled.div`
  height: 270px;
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  flex-direction: column;
  h3 {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 0.5rem;
    position: absolute;
    bottom: 0;
    left: 20px;
    z-index: 1;
  }
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
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 0.1px;
    color: var(--gray2);
    flex-grow: 1; 
    margin-bottom: 20px;
  }
`

const FeatureText = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  z-index: 1;
`;