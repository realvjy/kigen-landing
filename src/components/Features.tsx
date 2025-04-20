"use client"
import Image from "next/image";
import styles from "./page.module.css";
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';

import styled from 'styled-components'
import Link from "next/link";
import { Container } from "./ReusableUI";
import { motion } from 'framer-motion'
import ColorToken from "./feature/ColorToken";
import { animate, createScope, Scope } from 'animejs';
import AnimatedPathTrail from "./AnimatedPathTrail";
import SemanticColor from "./feature/SemanticColor";



export default function Features() {


    const features = [
        {
            title: "Color tokens",
            description: "A collection of base color palettes sourced from popular design systems like Material, Fluent, and Polaris—ready to use and extend for your brand.",
            component: ColorToken
        },
        {
            title: "Typography tokens",
            description: "Pre-configured typography scales based on popular design systems, ready to customize for your brand.",
            component: SemanticColor
        },
        {
            title: "Spacing tokens",
            description: "Consistent spacing scales that help maintain rhythm in your designs across all platforms.",
            image: "/feature.png"
        },
        {
            title: "Shadow tokens",
            description: "Elevation systems with ready-to-use shadow values for creating depth in your interfaces.",
            image: "/feature.png"
        },
        {
            title: "Border radius tokens",
            description: "Comprehensive set of border radius values to maintain consistent component styling.",
            image: "/feature.png"
        },
        {
            title: "Export options",
            description: "Export your design tokens to various formats including CSS, SCSS, JSON, and more.",
            image: "/feature.png"
        }
    ]
    return (
        <Section>
            <Container>
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
                                        <feature.component />
                                    ) : (
                                        <FeatureImage>
                                            <img src={feature.image} alt={feature.title} />
                                        </FeatureImage>
                                    )}
                                </FeatureContent>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </FeatureCard>
                        </motion.div>
                    ))}
                </FeatureGrid>
                <div style={{ width: '150px', height: '100%' }}>
                    <AnimatedPathTrail
                        pathData="M9 6L33.4959 6C42.3324 6 49.4959 13.1634 49.4959 22L49.4959 70C49.4959 78.8366 56.6593 86 65.4959 86H79"
                        viewBox="0 0 90 90"  // Should match your path's natural dimensions
                        baseColor="#ccc"
                        trailColor="#00f"
                        trailWidth={8}
                        baseWidth={1}
                        trailLength={20}
                        animationDuration={4000}
                        svgWidth={90}
                        svgHeight={90}
                    />
                </div>

            </Container>
        </Section>
    )
}

const Section = styled.section`
  display: flex;
  flex-direction: column;

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
  margin-bottom: 2rem;
  font-size: 2rem;
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`


const FeatureCard = styled.div`
  padding: 1.5rem;
  transition: transform 0.3s ease;
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04), inset 0px 0px 40px 2px #FFFFFF;
  border-radius: 16px;
  height: 100%; 
  display: flex;
  flex-direction: column;
  
  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    line-height: 1.5;
    flex-grow: 1; 
  }
`
const FeatureImage = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-bottom: 1rem;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    max-width: 100%;
    height: auto;
  }
`

const FeatureContent = styled.div`
  margin-bottom: 1rem;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;