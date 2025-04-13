"use client"
import Image from "next/image";
import styles from "./page.module.css";
import * as React from 'react';
import styled from 'styled-components'
import Header from "@/components/Header";
import Footer from "@/components/Footer";



export default function Home() {
  return (
    <Main>
      <Header />
      <Footer />
    </Main>
  )
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
`