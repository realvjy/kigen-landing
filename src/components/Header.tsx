"use client"
import Image from "next/image";
import styles from "./page.module.css";
import * as React from 'react';
import styled from 'styled-components'
import { AnimatedConicButton, Container, Gradient, SmallTag, TagWrapper } from "./ReusableUI";
import { motion } from "framer-motion";



export default function Header() {
    return (
        <Section>
            <Container>
                <Logo>
                    <Content>
                        <TagWrapper>
                            <SmallTag className="white">V1 Released</SmallTag>
                        </TagWrapper>
                        <h1>Create Design System <Gradient $variant="blue">Variables</Gradient> and <Gradient $variant="orange">Styles</Gradient> Fast</h1>
                        <p>A faster way to start design systems. Use Kigen to create your core variables and styles in just a few clicks.</p>
                    </Content>
                    <ButtonWrap>
                        <AnimatedConicButton href="https://s.vjy.me/project-ds" className="install">Get Started</AnimatedConicButton>
                    </ButtonWrap>
                </Logo>
            </Container>
            <ScreenUIWrapper>
                <img
                    src="/bg-blur.svg"
                    alt="Background Blur"
                    className="bg-blur"
                />
                <ScreenUI>
                    <img className="figma-ui" src="figma-ui-light.png" />
                    <div className="blur-bottom"></div>
                    <div className="plugin-ui">
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: 0.1,
                                ease: "easeOut"
                            }}
                        >
                            <img className="kigen-ui" src="kigen-ui-light.png" />
                        </motion.div>
                    </div>

                </ScreenUI>
            </ScreenUIWrapper>
        </Section>
    )
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  

`


const ScreenUIWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
  .bg-blur {
        position: absolute;
        top: -18%;
        left: 50%; 
        transform: translateX(-50%); 
        max-width: 90%; 
        height: auto; 
        z-index: -2;
        object-fit: cover; 
        object-position: top center;
    }
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
  @media (max-width: 768px) {
    padding: 40px 0;
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
        line-height: 110%;
        letter-spacing: -2px;
        @media (max-width: 700px) {
        font-size: 44px;
        }
    }

  p{
    font-size: 18px;
    color: var(--gray2);
    font-weight: 300;
    max-width: 500px;
    letter-spacing: -0.4px;
    @media (max-width: 700px) {
        font-size: 16px;
    }
  }
`

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 8px;
`;


const ScreenUI = styled.div`
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    background-color: rgba(40,40,40,0.2);
    backdrop-filter: blur(20px);
    margin: 0 auto;
    position: relative;
    --border-width: 1px;
    --border-radius: 12px;
    z-index: 1;
    position: relative;
    border-radius: var(--border-radius);
    padding: var(--border-width);
    background-clip: padding-box;
     /* Gradient border using mask */
     &::before {
        content: "";
        position: absolute;
        inset: 0;
        padding: var(--border-width);
        border-radius: var(--border-radius);
        /* background: linear-gradient(90deg, #A142FF 0%, #42D0FF 20.67%, #42A1FF 44.71%, #A1FF42 75%, #FF4242 100%); */
        background-color: rgba(40,40,40,0.02);
        -webkit-mask: 
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
        mask-composite: exclude;
        -webkit-mask-composite: xor;
        pointer-events: none;
    }
    
    .blur-bottom{
        height: 500px;
        background: linear-gradient(180deg, rgba(250, 250, 250, 0) 0%, #FAFAFA 100%);
        position: absolute;
        bottom: 0;
        left: -2px;
        width: calc(100% + 4px);
    }

    .kigen-ui{
        max-width: 320px;
        box-shadow: rgba(0, 0, 0, 0.04) 0px 0px 2px, rgba(0, 0, 0, 0.1) 0px 20px 34px, rgba(0, 0, 0, 0.11) 0px 4px 10px, rgba(0, 0, 0, 0.1) 0px 4px 24px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px;
        border-radius: var(--border-radius);
        @media (max-width: 500px) {
            max-width: 200px;
        }
    }
    .plugin-ui{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        @media (max-width: 500px) {
            top: 70%;
        }
    }
    .figma-ui{
        width: 100%;
        border-radius: var(--border-radius);
    }


`