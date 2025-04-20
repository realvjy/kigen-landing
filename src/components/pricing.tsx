"use client"
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';

import styled, { createGlobalStyle } from 'styled-components';

import { AnimatedConicButton, Container, SmallTag, TagWrapper } from "./ReusableUI";
import { motion } from 'framer-motion'

const gradient = `
  linear-gradient(
    270deg,
    #A142FF 0%,
    #42D0FF 20.67%,
    #42A1FF 44.71%,
    #A1FF42 75%,
    #FF4242 100%
  )
`;




export default function Pricing() {


  const pricing = [
    {
      title: "Individual",
      description: "Perfect for solo designers & devlopers",
      image: "/indi-pricing.png",
      price: "FREE",
      discount: "$15",
      tag: "Most Popular",
      cta: "Get Started"
    }
  ]
  return (
    <Section id="pricing">
      <Container className="center">
        <TagWrapper>
          <SmallTag className="teal">Pricing</SmallTag>
        </TagWrapper>
        <Title>Get started it's free</Title>

        <PricingWrapper>
          <PricingGrid>
            {pricing.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PricingCard>
                  <PricingContent>
                    <PricingText>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <div className="price-box">
                        <span className="price">{item.price}</span>
                        <span className="discount">{item.discount}</span>
                        {/* <span>{item.tag}</span> */}
                      </div>
                    </PricingText>
                    <PricingImage>
                      <img src={item.image} alt={item.title} />
                      <ButtonWrap>
                        <AnimatedConicButton href={item.cta} className="install">{item.cta}</AnimatedConicButton>
                      </ButtonWrap>
                    </PricingImage>
                  </PricingContent>
                </PricingCard>
              </motion.div>
            ))}
          </PricingGrid>
        </PricingWrapper>
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


const PricingWrapper = styled.div`
width: 100%;
padding: 0 20px;
`;




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
const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 16px;
  max-width: 800px;
  width: fit-content; 
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;
  }
`;

const ButtonWrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background: linear-gradient(180deg, transparent, var(--white));
  width: 100%;
  height: 250px;
  display: flex;
  align-items: end;
  justify-content: center;
  .install {
    margin-bottom: 32px;
  }
`;

const PricingImage = styled.div`
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;  
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 100%;
  img {
    max-width: 250px;
    height: auto;
  }

  
`

const PricingContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const PricingCard = styled.div`
  transition: transform 0.3s ease;
  background: linear-gradient(180deg, var(--gray-grad-1), var(--white));
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04), inset 0px 0px 20px 1px #FFFFFF;
  background-clip: padding-box;
  border-radius: 20px;
  height: 100%; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 360px;
  overflow: hidden;
  text-align: center;
  h3 {
    font-size: 22px;
    font-weight: 450;
    letter-spacing: -0.4px;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 15px;
    line-height: 20px;
    color: var(--gray2);
    flex-grow: 1; 
    margin-bottom: 20px;
  }
`

const PricingText = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 20px;
  h3{
    font-size: 20px;
  }
  p{
    font-size: 16px;
    margin-bottom: 8px;
  }
  .price-box{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }
  .price{
    font-size: 20px;
    font-weight: 500;
    letter-spacing: -0.6px;
  }
  .discount{
    font-size: 20px;
    opacity: 0.7;
    font-weight: 400;
    text-decoration: line-through;
  }

`;