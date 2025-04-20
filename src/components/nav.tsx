"use client"
import Image from "next/image";
import styles from "./page.module.css";
import * as React from 'react';
import styled from 'styled-components'
import Link from "next/link";
import { Container } from "./ReusableUI";



export default function Nav() {
  return (
    <Section>
      <Container>
        <NavWrap>
          <Left>
            <div className="logo">
              <a href="#">
                <img src="kigen-logo-color.png" />
              </a>
            </div>
          </Left>
          <Right>
            <Links>
              <a href="#">About</a>
              <a href="#">Features</a>
              <a href="#">Install</a>
            </Links>
          </Right>
        </NavWrap>
      </Container>
    </Section >
  )
}

const Section = styled.section`
  display: flex;
  flex-direction: column;

`

const NavWrap = styled.div`
  display: flex;
  max-width: 700px;
  justify-content: center;
  margin: 30px auto;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  color: var(--foreground);
  gap: 4px;
  align-items: center;
  /* border-radius: var(--radii-16);
  border: 1px solid var(--border-gray-1);
  background-color: var(--white);
  box-shadow: var(--shadow-sm); */
`;




const Left = styled.div`
  .logo{
    a{
      display: flex;
    }
    img{
      height: 24px;
    }
  }
`

const Right = styled.div`
  display: flex;
  
  
`
const Links = styled.div`
  display: flex;
  gap: 16px;
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

