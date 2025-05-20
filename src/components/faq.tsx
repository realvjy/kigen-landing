"use client"
import Image from "next/image";
import styles from "./page.module.css";
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';

import styled from 'styled-components'
import Link from "next/link";
import { Container, SmallTag, TagWrapper, Wrapper } from "./ReusableUI";
import { motion, AnimatePresence } from 'framer-motion';
import Collapsible from "./Collapsible";



export default function FAQ() {


  const FAQData = [
    {
      question: "What is Kigen?",
      description: "Kigen is a plugin for Figma that helps you create design variables and styles quickly. The word Kigen is japanese for 'to generate','origin' or 'to create'.",
    },
    {
      question: "What is Variable/Token?",
      description: "In Figma, a variable is a value that can be reused throughout your design system. It can be a color, a font, a size, or any other value that you want to use consistently across your design system. We also called it Tokens in our design system.",
    },
    {
      question: "How to use this plugin?",
      description: (
        <>
          UI is pretty intuitive, you can use it by following the instructions in the plugin. Check launch <a href="https://x.com/realvjy/status/1922979962425934029">demo here</a>.
        </>
      ),
    },
    {
      question: "What's license for it?",
      description: "Current version is free to use for personal and commercial use. However, we reserve the right to change the license terms in the future.",
    }

  ]
  return (
    <Section id="faq">
      <Container className="center">
        <TagWrapper>
          <SmallTag className="green">FAQ</SmallTag>
        </TagWrapper>
        <Title>Frequently asked questions</Title>
        <Wrapper>
          <Content>
            {FAQData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Collapsible question={item.question}>
                  {item.description}
                </Collapsible>
              </motion.div>
            ))}
          </Content>
        </Wrapper>


      </Container>
    </Section>
  )
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  margin-top: 200px;
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
    gap: 16px;
    align-items: center;
    max-width: 600px;
    margin-top: 30px;
    width: 100%;
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
  margin-bottom: 24px;
  @media (max-width: 700px) {
    font-size: 36px;
  }
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
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

const FeatureCard = styled.div`
  transition: transform 0.3s ease;
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04), inset 0px 0px 40px 2px #FFFFFF;
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
    font-size: 16px;
    line-height: 1.2;
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