"use client"
import Image from "next/image";
import styles from "./page.module.css";
import * as React from 'react';
import styled from 'styled-components'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import SuzukaAnimation from "@/components/SuzukaAnimation";
import AnimatedPathTrail from "@/components/AnimatedPathTrail";



export default function Home() {
  return (
    <Main>
      <Header />
      {/* <Features /> */}
      <Footer />
    </Main>
  )
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
`