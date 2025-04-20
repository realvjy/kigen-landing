"use client"
import Image from "next/image";
import styles from "./page.module.css";
import * as React from 'react';
import styled from 'styled-components'
import Link from "next/link";



export default function SemanticColor() {
  return (
    <FeaturBox>

    </FeaturBox>
  )
}

const FeaturBox = styled.div`
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


