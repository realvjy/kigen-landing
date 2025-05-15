import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

interface CollapsibleProps {
  question: string;
  children: React.ReactNode;
}

const Collapsible: React.FC<CollapsibleProps> = ({ question, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <Wrapper>
      <ToggleButton onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span>{question}</span>
        <Chevron
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          viewBox="0 0 16 16"
        >
          <polyline
            points="4 6 8 10 12 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Chevron>
      </ToggleButton>
      <AnimatePresence initial={false}>
        {open && (
          <Content
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Inner>{children}</Inner>
          </Content>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default Collapsible;

const Wrapper = styled.div`
  padding: 12px 20px;
  width: 500px;
  min-width: 500px;
  max-width: 500px;
  background: var(--white);
  border: 1px solid var(--border-gray-1);
  border-radius: var(--radii-16);
  box-shadow: var(--shadow-sm);
  @media (max-width: 700px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`;

const ToggleButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 500;
  padding: 12px 0 12px 0;
  cursor: pointer;
  color: var(--foreground);
 
  transition: color 0.2s;
  &:hover {
    opacity: 0.8;
  }
`;

const Chevron = styled(motion.svg)`
  width: 20px;
  height: 20px;
  margin-left: 8px;
  color: var(--gray2);
  flex-shrink: 0;
`;

const Content = styled(motion.div)`
  overflow: hidden;
  width: 100%;
  min-width: 0;
  a{
    color: var(--foreground);
    text-decoration: underline;
  }
`;

const Inner = styled.div`
  padding: 0 0 12px 0;
  color: var(--gray2);
  font-size: 16px;
  letter-spacing: 0.1px;
  line-height: 24px;
`;