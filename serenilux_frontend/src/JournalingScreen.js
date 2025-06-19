import React, { useRef, useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import MotivationalText from "./MotivationalText";

/*
  PUBLIC_INTERFACE
  JournalingScreen
  A full viewport, mobile-first layout featuring:
    - a background with a smoothly animated gradient,
    - a flex-centered, glassmorphic card container,
    - a large textarea for journaling with calming animated placeholder
      and scale-up microanimation on focus.
*/

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Fade-in animation for placeholder
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Background = styled.div`
  min-height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  overflow-x: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(-45deg,
    #4A90E2 0%,
    #50E3C2 40%,
    #F5A623 70%,
    #e2b8fd 100%
  );
  background-size: 200% 200%;
  animation: ${gradientAnimation} 12s ease-in-out infinite;
`;

// Card container
const Card = styled.div`
  background: rgba(255, 255, 255, 0.22);
  box-shadow: 0 4px 32px 0 rgba(60, 60, 100, 0.10), 0 1.5px 4px 0 rgba(100,120,190,0.09);
  border-radius: 24px;
  border: 1.2px solid rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  padding: 2.2rem 1.6rem;
  min-width: 320px;
  max-width: 410px;
  width: 90vw;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: box-shadow 0.23s cubic-bezier(.76,0,.24,1);

  @media (max-width: 600px) {
    padding: 1.15rem 0.6rem;
    min-width: unset;
    max-width: 98vw;
  }
`;

// The animated placeholder text - not native placeholder, to allow animation
const FadeInPlaceholder = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 26px 24px 18px 26px;
  pointer-events: none;
  font-size: 1.13rem;
  line-height: 1.8;
  color: #97b4c9;
  opacity: 0.77;
  transition: opacity 0.2s;
  user-select: none;
  white-space: pre-wrap;

  ${({ show }) =>
    show &&
    css`
      animation: ${fadeIn} 0.9s cubic-bezier(.4,0,.22,1);
      opacity: 1;
    `
  };

  @media (max-width: 600px) {
    padding: 20px 14px 12px 15px;
    font-size: 0.98rem;
  }
`;

// Responsive, animated textarea
const AnimatedTextarea = styled.textarea`
  width: 100%;
  min-height: 180px;
  max-height: 260px;
  font-size: 1.11rem;
  color: #234870;
  background: rgba(255,255,255,0.72);
  border: 1.5px solid rgba(74,144,226,0.13);
  border-radius: 14px;
  padding: 26px 24px 18px 26px;
  outline: none;
  resize: vertical;
  font-family: inherit;
  font-weight: 426;
  box-shadow: 0 4px 28px 0 rgba(100, 190, 225, 0.10);
  transition: 
    transform 0.22s cubic-bezier(.76,0,.24,1), 
    box-shadow 0.22s cubic-bezier(.76,0,.24,1);

  /* Scale up and stronger shadow on focus */
  &:focus {
    transform: scale(1.015);
    box-shadow: 0 2px 34px 2px rgba(100, 180, 225, 0.17);
    border: 1.6px solid #97b4c9;
    background: rgba(255,255,255,0.86);
  }

  /* Hide scrollbar on webkit for a softer look */
  &::-webkit-scrollbar {
    width: 0.36em;
    background: transparent;
  }

  @media (max-width: 600px) {
    font-size: 0.98rem;
    min-height: 105px;
    max-height: 160px;
    padding: 20px 14px 12px 15px;
  }
`;

// Container for positioning placeholder over textarea
const TextareaWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: stretch;
`;

export default function JournalingScreen() {
  // state to handle fade-in placeholder
  const [placeholderVisible, setPlaceholderVisible] = useState(false);
  const [text, setText] = useState("");
  const textareaRef = useRef();

  // Animate placeholder fade-in on mount
  useEffect(() => {
    // fade-in after slight delay for calming effect
    const timeout = setTimeout(() => setPlaceholderVisible(true), 130);
    return () => clearTimeout(timeout);
  }, []);

  // Hide placeholder once user starts typing or textarea has value
  const showPlaceholder = placeholderVisible && text.length === 0;

  return (
    <Background>
      <Card>
        <TextareaWrapper>
          <AnimatedTextarea
            ref={textareaRef}
            value={text}
            // aria-label for accessibility
            aria-label="Journaling area"
            onChange={e => setText(e.target.value)}
            spellCheck={true}
          />
          {/*
            Custom animated placeholder for fade-in and softer look,
            not the native HTML placeholder!
          */}
          <FadeInPlaceholder
            show={showPlaceholder}
            aria-hidden="true"
          >
            {"Type what’s bothering you…"}
          </FadeInPlaceholder>
        </TextareaWrapper>
      </Card>
    </Background>
  );
}
