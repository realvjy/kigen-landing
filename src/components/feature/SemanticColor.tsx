"use client"
import Image from "next/image";
import styles from "./page.module.css";
import * as React from 'react';
import styled from 'styled-components'
import Link from "next/link";
import { AnimatedPathGradientDef, AnimatedPath, Direction } from "../AnimatedPath";
import { AnimatePresence, motion, useAnimation } from 'framer-motion';


export default function TypographyToken() {
  const [isSequenced, setIsSequenced] = React.useState(false);
  const [gradientSize, setGradientSize] = React.useState(4);

  // Sample paths
  const paths = [
    {
      id: 'anim1',
      d: 'M168 167C168 183.566 180 181.135 225.5 181.135C277.5 181.135 293 178.562 293 202',
      direction: 'right' as Direction,
      duration: 5,
      gradientColor: '#FF24BD',
    },
    {
      id: 'anim2',
      d: 'M152 114C152 63.0297 71 111.167 71 70',
      direction: 'left' as Direction,
      duration: 6,
      gradientColor: '#FF24BD',
    },
    {
      id: 'anim3',
      d: 'M272.402 141.5C297 141.5 310.25 140.5 310.25 115',
      direction: 'right' as Direction,
      duration: 8,
      gradientColor: '#FF24BD',
    },
    {
      id: 'anim4',
      d: 'M210 114C210 59.5 290 112.054 290 57',
      direction: 'left' as Direction,
      duration: 8,
      gradientColor: '#FF24BD',
    },
  ];

  return (
    <FeaturBox>
      <Wrapper>
        <GridWrap>
          <img src="/grid.svg" alt="grid" />
        </GridWrap>
        <SVGWrap>
          <svg width="350" height="230" viewBox="0 0 350 230" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Definitions must be FIRST */}
            <defs>
              {paths.map(({ id, duration, direction, gradientColor }) => (
                <AnimatedPathGradientDef
                  key={id}
                  id={`gradient-pulse-${id}`}
                  duration={duration}
                  direction={direction}
                  gradientColor={gradientColor}
                  gradientSize={gradientSize}
                />
              ))}

              {/* Animation keyframes */}
              <style>
                {paths.map(({ id }) => `
                @keyframes dash${id} {
                  0% {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                  }
                  100% {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 0;
                  }
                }
              `).join('')}
              </style>

              {/* Static gradients & filters */}
              <linearGradient id="paint0_linear_316_38223" x1="175" y1="0" x2="175" y2="230" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F1F2F4" />
                <stop offset="1" stopColor="white" />
              </linearGradient>
              <linearGradient id="paint1_linear_316_38223" x1="175" y1="114" x2="175" y2="126.059" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F2F3F5" />
                <stop offset="1" stopColor="white" />
              </linearGradient>
              <filter id="filter0_d_316_38223" x="74" y="114" width="202" height="58" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="0.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_316_38223" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_316_38223" result="shape" />
              </filter>
            </defs>

            {/* Background gradient */}
            <rect width="350" height="230" fill="url(#paint0_linear_316_38223)" />

            {/* Dotted background paths */}
            {paths.map(({ id, d }) => (

              <path key={`bg-${id}`} d={d} stroke="black" strokeOpacity="0.2" strokeDasharray="3 2" fill="none" />
            ))}
            {/* 
            {paths.map(({ id, d }) => (
              <path key={`bg-${id}`} d={d} stroke="black" strokeOpacity="0.1" fill="none" />
            ))} */}
            {/* Animated overlay paths */}
            {paths.map(({ id, d, direction, duration, gradientColor }, index) => (
              <AnimatedPath
                key={`anim-${id}`}
                id={id}
                pathData={d}
                direction={direction}
                duration={duration}
                gradientColor={gradientColor}
                delay={isSequenced ? index * (duration / 2) : 0}
                sequenced={isSequenced}
              />
            ))}

            {/* UI Rectangles */}
            <g filter="url(#filter0_d_316_38223)">
              <rect x="75" y="114" width="200" height="56" rx="16" fill="url(#paint1_linear_316_38223)" />
              <rect x="75.5" y="114.5" width="199" height="55" rx="15.5" stroke="black" strokeOpacity="0.08" />
              <rect x="91" y="130" width="24" height="24" rx="6" fill="#FC9E24" />
              <rect x="127" y="130" width="24" height="24" rx="6" fill="#FF5C16" />
              <rect x="163" y="130" width="24" height="24" rx="6" fill="#EA10AC" />
              <rect x="199" y="130" width="24" height="24" rx="6" fill="#4D49FC" />
              <rect x="235" y="130" width="24" height="24" rx="6" fill="#14AE5C" />
            </g>
          </svg>
        </SVGWrap>
        <PillWrap>
          <motion.div
            className="pill text"
            animate={{ x: [0, -4, 4, -4, 4, 0] }}
            transition={{
              duration: 10.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: [0.5, 0, 0, 1],
              delay: 0
            }}
          >
            <span className="color red" />text-accent
          </motion.div>
          <motion.div
            className="pill bg"
            animate={{ x: [0, -4, 4, -4, 4, 0] }}
            transition={{
              duration: 8.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: [0.5, 0, 0, 1],
              delay: 1.5
            }}
          >
            <span className="color blue" />bg-primary
          </motion.div>
          <motion.div
            className="pill icon"
            animate={{ x: [0, -4, 4, -4, 4, 0] }}
            transition={{
              duration: 12.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: [0.5, 0, 0, 1],
              delay: 1
            }}
          >
            <span className="color green" />icon-accent
          </motion.div>
          <motion.div
            className="pill border"
            animate={{ x: [0, -4, 4, -4, 4, 0] }}
            transition={{
              duration: 14,
              repeat: Infinity,
              repeatType: "loop",
              ease: [0.5, 0, 0, 1],
              delay: 2.5
            }}
          >
            <span className="color red" />border-primary
          </motion.div>
        </PillWrap>

      </Wrapper>
    </FeaturBox>
  )
}

const FeaturBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%);
  -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%);

`

const Wrapper = styled.div`
  position: relative;
  background: linear-gradient(180deg, var(--gray-grad-1) 0%, var(--white) 80%);
  box-shadow: 0px 1px 1px 0px inset rgb(255, 255, 255);
  border-radius: 16px 16px 0 0;
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  height: 100%;
  width: 100%;
  color: var(--foreground);
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

const GridWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.04;
  mask-image: radial-gradient(
    ellipse 60% 40% at 50% 40%,
    rgba(0,0,0,1) 10%,        
    rgba(0,0,0,0) 60%         
  );
  -webkit-mask-image: radial-gradient(
    ellipse 60% 40% at 50% 40%,
    rgba(0,0,0,1) 10%,        
    rgba(0,0,0,0) 60%         
  );
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;


const SVGWrap = styled.div`
  display: flex;
  flex-direction: column;
`
const PillWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 4;
  
  .pill{
    background: var(--white);
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.04), 0px 0px 0px 1px inset rgba(0, 0, 0, 0.08);
    display: inline-flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    font-family: var(--jetBrainsMono), monospace;
    font-weight: 600;
    font-size: 12px;
    line-height: 12px;
    gap: 4px;
    padding: 6px 12px 6px 8px;
    border-radius: 18px;
    color: var(--gray2);
    &.text{
      position: absolute;
      top: 64px;
      left: 20px;
    }
    &.bg{
      position: absolute;
      top: 48px;
      right: 18px;
    }
    &.icon{
      position: absolute;
      top: 112px;
      right: -32px;
    }
    &.border{
      position: absolute;
      top: 220px;
      right: -10px;
    }
    .color{
      height: 20px;
      width: 20px;
      border-radius: 50%;
    }
    .red{
      background-color: #FF5C16;
    }
    .pink{
      background-color: pink;
    }
    .blue{
      background-color: #C1C0FF;
    }
    .green{
      background-color: #00853e;
    }
  }
`