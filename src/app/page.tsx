import Image from "next/image";
import styles from "./page.module.css";
import * as React from 'react';



export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Kigen</h1>
      <p>Design System Generator Figma Plugin</p>
    </div>
  )
}