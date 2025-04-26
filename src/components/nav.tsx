"use client"
import Image from "next/image";
import * as React from 'react';
import styled from 'styled-components'
import { Container, LinkScroll } from "./ReusableUI";



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
              <LinkScroll href="#features">Features</LinkScroll>
              <a href="https://s.vjy.me/project-ds">Install</a>
              <LinkScroll href="#faq">faq</LinkScroll>
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

  a{
    text-decoration: none;
    letter-spacing: 0.2px;
    color: var(--foreground);
    &:hover {
      opacity: 1;
    }
  }
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

