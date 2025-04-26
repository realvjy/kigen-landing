"use client"
import Image from "next/image";
import styles from "./page.module.css";
import * as React from 'react';
import styled from 'styled-components'
import Link from "next/link";
import { AnimatedConicButton } from "./ReusableUI";


export default function End() {
    return (
        <Section>
            <Container>
                <Wrapper>
                    <img src="/logo-mark.png" alt="Kigen" />
                    <h2>Any question about Kigen?</h2>
                    <p>If you have any questions or need support, feel free to get in touch.</p>
                    <ButtonWrap>
                        <AnimatedConicButton href="https://x.com/realvjy" className="install">Tweet/X</AnimatedConicButton>
                    </ButtonWrap>
                </Wrapper>

            </Container>
        </Section>
    )
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  margin-top: 100px;
`

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 8px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 30px;
  padding: 40px 0;
  font-size: 16px;
  letter-spacing: -0.2px;
  font-weight: 500;
  width: 100%;
  color: var(--foreground);
  gap: 12px;
  align-items: center;
  h2{
    text-align: center;
  font-size: 40px;
  line-height: 100%;
  letter-spacing: -1px;
  font-weight: 400;
  margin-top: 10px;
  @media (max-width: 700px) {
        font-size: 36px;
    }
  }

  p{
    max-width: 400px;
    margin-bottom: 8px;
    text-align: center;
  }
  img{
    height: 100px;
  }
  span {
    padding-inline: 5px;
    font-weight: 500;
    .img-r {
      transform: scale(1.2);
    }
    a {
      text-decoration: none;
      color: var(--foreground);
      opacity: 0.9;
      &:hover {
        opacity: 1;
      }
    }
    &.img {
      padding: 0;
    }
  }
`;


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
    span{
        display: flex;
    }
    a{
        display: flex;
    }
`

