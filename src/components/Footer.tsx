"use client"
import Image from "next/image";
import styles from "./page.module.css";
import * as React from 'react';
import styled from 'styled-components'
import Link from "next/link";



export default function Footer() {
    return (
        <Section>
            <Container>
                <div className="footer">
                    <Wrapper>
                        made by
                        <span>
                            <Link target={"_blank"} href={"https://vjy.me?kigen"}>
                                <img src="realvjy.svg" className="img-r" />
                            </Link>
                        </span>
                        at
                        <span>
                            <Link
                                target={"_blank"}
                                href={"https://overlayz.studio?figmaplugin"}
                            >
                                @overlayz
                            </Link>
                        </span>
                        <span className={"img"}>
                            <Link target="" href={"https://x.com/realvjy"}>
                                <img src={"twitter.svg"} />
                            </Link>
                        </span>
                    </Wrapper>
                </div>

            </Container>
        </Section>
    )
}

const Section = styled.section`
  display: flex;
  flex-direction: column;

`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  padding: 40px 0;
  font-size: 16px;
  letter-spacing: -0.2px;
  font-weight: 500;
  width: 100%;
  color: rgba(255, 255, 255, 0.8);
  gap: 4px;
  align-items: center;
  span {
    padding-inline: 5px;
    font-weight: 500;
    .img-r {
      transform: scale(1.2);
    }
    a {
      text-decoration: none;
      color: rgba(255, 255, 255, 1);
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

