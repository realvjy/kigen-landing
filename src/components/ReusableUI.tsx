import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components'

const StyledContainer = styled.div<{ maxWidth?: string; padding?: string }>`
  width: 100%;
  max-width: ${(props) => props.maxWidth || '1100px'};
  margin: 0 auto;
  padding: ${(props) => props.padding || '0 1rem'};
  position: relative;
  
`;

interface ContainerProps {
    maxWidth?: string;
    padding?: string;
    className?: string;
    children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ maxWidth, padding, children, className }) => {
    return (
        <StyledContainer maxWidth={maxWidth} padding={padding} className={className}>
            {children}
        </StyledContainer>
    )
}

export const Gradient = styled.span<{ $variant?: 'blue' | 'orange' | 'green' }>`
  background: ${({ $variant }) => {
        switch ($variant) {
            case 'blue':
                return 'var(--blue-grad)';
            case 'orange':
                return 'var(--orange-grad)';
            default:
                return `linear-gradient(
          90deg,
          #A142FF 0%,
          #42D0FF 20.67%,
          #42A1FF 44.71%,
          #A1FF42 75%,
          #FF4242 100%
        )`;
        }
    }};
  
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const SmallTag = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  line-height: 16px;
  font-weight: 500;
  letter-spacing: -0.2px;
  padding: 4px 12px;
  border-radius: var(--radii-full);
  box-shadow: var(--shadow-border);
  background-color: var(--light-gray);
  color: var(--dark-gray);
  &.blue{
    background-color: var(--light-blue);
    color: var(--dark-blue);
  }
  &.pink{
    background-color: var(--light-pink);
    color: var(--dark-pink);
  }
  &.teal{
    background-color: var(--light-teal);
    color: var(--dark-teal);
  }
  &.green{
    background-color: var(--light-green);
    color: var(--dark-green);
  }
  &.white{
    background-color: var(--white);
    color: var(--foreground);
  }
`;

export const TagWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;


export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;


// Add this component
export const LinkScroll = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const target = document.querySelector(href);
        target?.scrollIntoView({ behavior: 'smooth' });
    };

    return <a href={href} onClick={handleClick}>{children}</a>;
};


export const AnimatedButtonGlobalStyle = createGlobalStyle`
  @property --border-angle {
    syntax: "<angle>";
    inherits: false;
    initial-value: 0turn;
  }
`;

type AnimatedConicButtonProps = {
    children: ReactNode;
    href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Glow = styled.div`
  position: absolute;
  inset: 0; 
  z-index: 0;
top: -8px;
left: -12px;
right: -12px;
bottom: -8px;
  border-radius: inherit;
  pointer-events: none;
  transform: scale(0.7);
  background: linear-gradient(
    90deg,
    #ff4242,
    #a1ff42,
    #42a1ff,
    #42d0ff,
    #a142ff
  );
  filter: blur(20px);
  opacity: 0.7;
  animation: glowSlide 6s linear infinite;
  background-size: 400%;
  @keyframes glowSlide {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 400% 50%;
    }
  }
`;


const ConicButton = styled.button`
  position: relative;
  font-size: 16px;
  font-weight: 500;
  color: white;
  text-shadow: 0 1px 0 #000;
  padding: 12px 20px;
  border-radius: 16px;
  border: 1px solid transparent;
  cursor: pointer;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  overflow: visible;
  z-index: 0;

  --border-angle: 0turn;

  background:
    conic-gradient(
      from var(--border-angle),
      #111,
      #222 5%,
      #222 60%,
      #111 95%
    ) padding-box,
    conic-gradient(
      from var(--border-angle),
      transparent 25%,
      #0088ff38,
      #f03 99%,
      transparent
    ) border-box;

  animation: spinBorder 4s linear infinite;

  


  @keyframes spinBorder {
    to {
      --border-angle: 1turn;
    }
  }

  &:hover {
    animation-play-state: paused;
  }
`;

const ConicButtonWrapper = styled.div`
  position: relative;
  display: inline-flex; /* Ensures wrapper shrinks to button size */
  align-items: center;
  justify-content: center;
  vertical-align: middle; /* Helps with inline alignment in text */
`;

export const AnimatedConicButton = ({ children, href, ...props }: AnimatedConicButtonProps) => (
    <ConicButtonWrapper>
        <Glow />
        {href ? (
            <ConicButton as="a" href={href} {...props}>
                {children}
            </ConicButton>
        ) : (
            <ConicButton {...props}>
                {children}
            </ConicButton>
        )}
    </ConicButtonWrapper>
);