"use client"
import * as React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import FAQ from '@/components/faq';
import End from '@/components/End';
import SocialInfo from '@/components/Socialinfo';
import Pricing from '@/components/pricing';

export default function Home() {
  return (
    <main className="main">
      <Header />
      <SocialInfo />
      <Features />
      <FAQ />
      <End />
      <Footer />
    </main>
  )
}

