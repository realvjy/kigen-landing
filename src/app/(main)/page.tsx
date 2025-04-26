"use client"
import * as React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import FAQ from '@/components/faq';
import Pricing from '@/components/pricing';
import End from '@/components/End';



export default function Home() {
  return (
    <main className="main">
      <Header />
      <Features />
      {/* <Pricing /> */}
      <FAQ />
      <End />
      <Footer />
    </main>
  )
}

