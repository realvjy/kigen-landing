"use client";
import { useEffect, useRef } from 'react';
import * as React from 'react';
import { animate, svg } from 'animejs';
import styled from 'styled-components';

const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f3f4f6;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const AnimationWrapper = styled.div`
  position: relative;
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export default function SuzukaAnimation() {
    const pathRef = useRef<SVGPathElement>(null);
    const carRef = useRef<SVGGElement>(null);

    useEffect(() => {
        if (!pathRef.current || !carRef.current) return;

        // Car animation using createMotionPath (two-argument form)
        const carAnimation = animate(
            carRef.current, // Argument 1: targets
            {              // Argument 2: parameters
                easing: 'linear',
                duration: 5000,
                loop: true,
                ...svg.createMotionPath(pathRef.current)
            }
        );

        // Path drawing animation (two-argument form)
        const pathAnimation = animate(
            svg.createDrawable(pathRef.current), // Argument 1: targets (drawable)
            {                                   // Argument 2: parameters
                draw: '0 1',
                easing: 'linear',
                duration: 5000,
                loop: true
            }
        );

        return () => {
            carAnimation.pause();
            pathAnimation.pause();
        };
    }, []);

    return (
        <AnimationContainer>
            <Title>Suzuka Circuit Animation</Title>
            <AnimationWrapper>
                <svg viewBox="0 0 304 112" width="600" height="300">
                    <title>Suzuka</title>
                    <g stroke="none" fill="none" fillRule="evenodd">
                        <path
                            ref={pathRef}
                            d="M189.142857,4 C227.456875,4 248.420457,4.00974888 256.864191,4.00974888 C263.817211,4.00974888 271.61219,3.69583517 274.986231,6.63061513 C276.382736,7.84531176 279.193529,11.3814152 280.479499,13.4815847 C281.719344,15.5064248 284.841964,20.3571626 275.608629,20.3571626 C265.817756,20.3571626 247.262478,19.9013915 243.955117,19.9013915 C239.27946,19.9013915 235.350655,24.7304885 228.6344,24.7304885 C224.377263,24.7304885 219.472178,21.0304113 214.535324,21.0304113 C207.18393,21.0304113 200.882842,30.4798911 194.124187,30.4798911 C186.992968,30.4798911 182.652552,23.6245972 173.457298,23.6245972 C164.83277,23.6245972 157.191045,31.5424105 157.191045,39.1815359 C157.191045,48.466779 167.088672,63.6623005 166.666679,66.9065088 C166.378668,69.1206889 155.842137,79.2568633 151.508744,77.8570506 C145.044576,75.7689355 109.126667,61.6405346 98.7556561,52.9785141 C96.4766876,51.0750861 89.3680347,39.5769094 83.4195005,38.5221785 C80.6048001,38.0231057 73.0179337,38.7426555 74.4158694,42.6956376 C76.7088819,49.1796531 86.3280337,64.1214904 87.1781062,66.9065088 C88.191957,70.2280995 86.4690152,77.0567847 82.2060607,79.2503488 C79.2489435,80.7719756 73.1324132,82.8858479 64.7015706,83.0708761 C55.1604808,83.2802705 44.4254811,80.401884 39.1722168,80.401884 C25.7762119,80.401884 24.3280517,89.1260466 22.476679,94.4501705 C21.637667,96.8629767 20.4337535,108 33.2301959,108 C37.8976087,108 45.0757044,107.252595 53.4789069,103.876424 C61.8821095,100.500252 122.090049,78.119656 128.36127,75.3523302 C141.413669,69.5926477 151.190142,68.4987755 147.018529,52.0784879 C143.007818,36.291544 143.396957,23.4057975 145.221196,19.6589263 C146.450194,17.1346449 148.420955,14.8552817 153.206723,15.7880203 C155.175319,16.1716965 155.097637,15.0525421 156.757598,11.3860986 C158.417558,7.71965506 161.842736,4.00974888 167.736963,4.00974888 C177.205308,4.00974888 184.938832,4 189.142857,4 Z"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                    </g>
                    <g ref={carRef}>
                        <rect
                            x="-5"  // Center horizontally
                            y="-2.5" // Center vertically
                            width="10"
                            height="5"
                            rx="1"
                            fill="red"
                            style={{
                                // transform: 'translateX(189px) translateY(4px)', // REMOVE THIS LINE
                                transformOrigin: 'center center' // Keep this for proper rotation
                            }}
                        />
                    </g>
                </svg>
            </AnimationWrapper>
        </AnimationContainer>
    );
}