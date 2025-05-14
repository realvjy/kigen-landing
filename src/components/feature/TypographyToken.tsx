"use client"
import Image from "next/image";
import styles from "./page.module.css";
import * as React from 'react';
import styled from 'styled-components'
import Link from "next/link";
import { AnimatedPathGradientDef, AnimatedPath, Direction } from "../AnimatedPath";
import { motion } from "framer-motion";

const Abc = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="144"
        height="85"
        fill="none"
        viewBox="0 0 144 85"
        className="abc"
    >
        <path
            fill="url(#paint0_linear_320_38244)"
            stroke="url(#paint1_linear_320_38244)"
            strokeWidth="0.5"
            d="M116.365 22.756c8.077.123 14.579 2.156 19.359 6.241h-.001l.458.389.003.002.436.39c4.434 4.079 6.63 9.487 6.63 16.104V82.99h-18.544l-.042-.198-.951-4.464q-.09.093-.183.184l-.176.17c-1.999 1.97-4.172 3.392-6.524 4.225l.004.004-.384.129q-3.372 1.131-6.681 1.205l-.441.005c-4.324 0-8.312-.793-11.947-2.398l-.01-.005-.005-.002-.013-.006-.002-.002c-3.566-1.692-6.451-4.081-8.626-7.169l-.007-.01-.005-.009-.385-.592c-1.86-2.989-2.778-6.397-2.778-10.189l.009-.645c.088-3.206.835-6.075 2.28-8.572l.004-.006.007-.011.007-.012c1.505-2.461 3.47-4.399 5.885-5.79l.49-.272c1.93-1.058 4.092-1.821 6.476-2.3l.003-.001.889-.166h.004l.794-.128a40 40 0 0 1 5.869-.417h14.776c-.071-1.99-.783-3.299-2.04-4.142l-.284-.178h-.001c-1.618-.94-3.655-1.474-6.163-1.538l-.509-.005c-2.909 0-6.038.544-9.394 1.655l-.006.002-.018.005h.001c-3.16.977-5.81 2.17-7.968 3.567l-.426.282-.866.59-.215.146-.137-.222-8.62-13.867-.13-.21.208-.132.829-.532.002-.002.88-.556h.002l.772-.472c3.851-2.312 7.62-4.012 11.304-5.08l.003-.002.835-.232.851-.227q6.411-1.65 13.626-1.648zM50.193.75l.064.153 34.267 82 .146.347H62.144l-.062-.161-5.099-13.383H28.37L23.212 83.09l-.062.16H.624l.146-.347 34.385-82L35.22.75zm60.669 60.015q-1.31.001-2.349.205l-.349.09q-.504.156-.913.41h-.001l-.159.105c-.375.261-.67.599-.893 1.03l-.011.024-.005.009-.005.008-.014.021.001.001c-.189.322-.299.71-.299 1.2l.005.219c.054 1.078.518 1.935 1.466 2.65 1.149.732 2.725 1.15 4.823 1.15l.379-.004c1.877-.045 3.567-.427 5.086-1.13 1.722-.835 3.046-1.93 4.013-3.272l.174-.25q.75-1.133 1.047-2.466zm-75.34-9.627h14.39l-7.156-18.779z"
        ></path>
        <defs>
            <linearGradient
                id="paint0_linear_320_38244"
                x1="100.852"
                x2="135.254"
                y1="-17.5"
                y2="90.07"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#B2E3FF"></stop>
                <stop offset="0.333" stopColor="#B0E5D6"></stop>
                <stop offset="0.667" stopColor="#FFD08A"></stop>
                <stop offset="1" stopColor="#FFB0A9"></stop>
            </linearGradient>
            <linearGradient
                id="paint1_linear_320_38244"
                x1="72"
                x2="72"
                y1="1"
                y2="84"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#fff"></stop>
                <stop offset="1" stopColor="#fff"></stop>
            </linearGradient>
        </defs>
    </svg>
);



export default function TypographyToken() {
    const [isSequenced, setIsSequenced] = React.useState(false);
    const [gradientSize, setGradientSize] = React.useState(4);

    const paths = [
        {
            id: 'dotted1',
            d: 'M93 124H252',
            direction: 'right' as Direction,
            duration: 2.2,
            gradientColor: '#2684FF',
        },
        {
            id: 'dotted2',
            d: 'M93 95H252',
            direction: 'left' as Direction,
            duration: 2.5,
            gradientColor: '#2684FF',
        },
        {
            id: 'path1',
            d: 'M94.5 74C94.1 74 93 74 74 74V156H94.5',
            direction: 'right' as Direction,
            duration: 3,
            gradientColor: '#111111',
        },
        {
            id: 'path2',
            d: 'M244.25 95C244.64 95 245.713 95 264.25 95V156H244.25',
            direction: 'left' as Direction,
            duration: 3.2,
            gradientColor: '#111111',
        }
    ];

    return (
        <FeaturBox>
            <Wrapper>
                <GridWrap>
                    <img src="/grid.svg" alt="grid" />
                </GridWrap>
                <SVGWrap >
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

                            <linearGradient id="paint0_linear_292_36994" x1="175" y1="0" x2="175" y2="230" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#F1F2F4" />
                                <stop offset="1" stopColor="white" />
                            </linearGradient>
                            <radialGradient id="paint1_radial_292_36994" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(172.5 124.307) rotate(0.278669) scale(79.5009)">
                                <stop stopColor="#2684FF" />
                                <stop offset="1" stopColor="#666666" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="paint2_radial_292_36994" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(172.5 95.3067) rotate(0.278669) scale(79.5009)">
                                <stop stopColor="#2684FF" />
                                <stop offset="1" stopColor="#666666" stopOpacity="0" />
                            </radialGradient>
                            <linearGradient id="paint3_linear_292_36994" x1="74" y1="67.44" x2="98.7278" y2="69.1338" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#111111" />
                                <stop offset="1" stopColor="#666666" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="paint4_linear_292_36994" x1="264.25" y1="90.12" x2="240.206" y2="92.28" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#111111" />
                                <stop offset="1" stopColor="#666666" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        {/* Background gradient */}
                        <rect width="350" height="230" fill="url(#paint0_linear_292_36994)" />

                        {/* Original dotted paths (visible but will be overlaid with animated paths) */}
                        <path d="M93 124H252" stroke="url(#paint1_radial_292_36994)" strokeDasharray="2 2" />
                        <path d="M93 95H252" stroke="url(#paint2_radial_292_36994)" strokeDasharray="2 2" />
                        <path d="M94.5 74C94.1 74 93 74 74 74V156H94.5" stroke="url(#paint3_linear_292_36994)" strokeLinecap="round" />
                        <path d="M244.25 95C244.64 95 245.713 95 264.25 95V156H244.25" stroke="url(#paint4_linear_292_36994)" strokeLinecap="round" />

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

                        {/* Text Z */}
                        <path d="M62.06 120V116.76L59.108 111.636H60.5L62.636 115.536L64.82 111.636H66.2L63.284 116.76V120H62.06Z" fill="black" />
                    </svg>

                    <Abc />
                </SVGWrap>
                <PillWrap>
                    <motion.div
                        className="pill label"
                        animate={{ x: [0, -4, 4, -4, 4, 0] }}
                        transition={{
                            duration: 10.5,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: [0.5, 0, 0, 1],
                            delay: 0
                        }}
                    >
                        Label 1
                    </motion.div>
                    <motion.div
                        className="pill heading"
                        animate={{ x: [0, -4, 4, -4, 4, 0] }}
                        transition={{
                            duration: 8.5,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: [0.5, 0, 0, 1],
                            delay: 1.5
                        }}
                    >
                        Heading XS
                    </motion.div>
                    <motion.div
                        className="pill body"
                        animate={{ x: [0, -4, 4, -4, 4, 0] }}
                        transition={{
                            duration: 8.5,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: [0.5, 0, 0, 1],
                            delay: 1.5
                        }}
                    >
                        Body SM
                    </motion.div>
                    <motion.div
                        className="pill tiny"
                        animate={{ x: [0, -4, 4, -4, 4, 0] }}
                        transition={{
                            duration: 12.5,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: [0.5, 0, 0, 1],
                            delay: 1
                        }}
                    >
                        Tiny Extended
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

    .abc{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`
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
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%);
  -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%);
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
    padding: 8px 12px;
    border-radius: 18px;
    color: var(--gray2);
    &.label{
      position: absolute;
      top: 44px;
      left: 44px;
    }
    &.heading{
      position: absolute;
      top: 68px;
      right: 24px;
    }
    &.body{
      position: absolute;
      top: 180px;
      left: 90px;
    }
    &.tiny{
      position: absolute;
      top: 200px;
      right: 68px;
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
