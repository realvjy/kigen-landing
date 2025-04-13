"use client"
import Image from "next/image";
import styles from "./page.module.css";
import * as React from 'react';
import styled from 'styled-components'



export default function Header() {
    return (
        <Section>
            <Container>
                <Logo>
                    <img src="kigen-logo.svg" />
                    <Content>
                        <h1>Create Design System Variables and Styles Fast</h1>
                        <p>A faster way to start design systems. Use Kigen to create your core variables and styles in just a few clicks.</p>
                    </Content>
                    <Button href="https://s.vjy.me/project-ds">Join Wait List</Button>
                </Logo>

            </Container>
            <img
                src="/bg-blur.png"
                alt="Background Blur"
                className="bg-blur"
            />
            <ScreenUI>

                <img src="figma-ui.png" />
                <img className="kigen-ui" src="kigen-ui.png" />
            </ScreenUI>
        </Section>
    )
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  .bg-blur {
        position: absolute;
        top: 220px;
        left: 50%; /* Center horizontally */
        transform: translateX(-50%); /* Adjust for exact centering */
        max-width: 80%; /* Adjust as needed */
        height: auto; /* Maintain aspect ratio */
        z-index: -2;
        object-fit: cover; /* Ensures the image covers the area */
        object-position: top center; /* Position at top center */
    }
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

const Container = styled.div`
    max-width: 1240px;
    margin: 0 auto;
`

const ScreenUI = styled.div`
    max-width: 1440px;
    display: flex;
    flex-direction: column;
    background-color: rgba(40,40,40,0.2);
    backdrop-filter: blur(20px);
    margin: 0 auto;
    position: relative;
    --border-width: 1px;
    --border-radius: 20px;
    z-index: -1;
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
        background: linear-gradient(180deg, #0099F8 0%, #0F0092 40.87%, rgba(15, 0, 146, 0) 96.63%);
        -webkit-mask: 
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
        mask-composite: exclude;
        -webkit-mask-composite: xor;
        pointer-events: none;
    }
    

    img{
        width: 100%;
    }


    .kigen-ui{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%); 
        max-width: 375px;
    }
`