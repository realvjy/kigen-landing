import { Container } from "./ReusableUI";
import { DownloadIcon, HeartIcon } from "./icons";
import styled from "styled-components";

export default function SocialInfo() {
    return (
        <Section>
            <Container>
                <Stats><span><DownloadIcon /> 2.1k+ Usages</span>
                    <span className="dot" />
                    <span><HeartIcon />200+ Likes</span></Stats>
            </Container>
        </Section>


    )
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  
  @media (max-width: 768px) {
    margin-top: 100px;
  }

`

const Stats = styled.div`
    position: relative;
    width: fit-content;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    gap: 20px;
    align-items: center;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0.2px;
    padding: 12px 20px;
    border-radius: 20px;
    color: var(--gray2);
    opacity: 0.5;
    .dot{
      width: 6px;
      height: 6px;
      background-color: var(--gray);
      border-radius: 50%;
    }
    span{
      display: flex;
      align-items: center;
      gap: 6px;
    }
`