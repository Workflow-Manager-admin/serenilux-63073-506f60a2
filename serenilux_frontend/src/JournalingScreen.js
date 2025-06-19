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

/**
 * Card container: Fades out when .fadeout is applied.
 */
const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0px);
  }
  to {
    opacity: 0;
    transform: scale(0.98) translateY(32px);
    filter: blur(4px);
  }
`;

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

  /* Fadeout animation */
  &.fadeout {
    animation: ${fadeOut} 0.85s cubic-bezier(0.65, 0, 0.36, 1) forwards;
    pointer-events: none;
  }

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

/**
 * Shred It Button styling with soft glow on hover/focus.
 */
const ShredItButton = styled.button`
  margin-top: 28px;
  min-width: 128px;
  min-height: 44px;
  padding: 0.6em 1.7em;
  border: none;
  font-size: 1.13rem;
  font-family: inherit;
  font-weight: 600;
  border-radius: 999px;
  background: linear-gradient(100deg, #4A90E2 45%, #50E3C2 98%);
  color: #fff;
  box-shadow: 0 2px 16px 0 rgba(80, 227, 194, 0.14), 0 0px 1px 0 #e8e8fa;
  cursor: pointer;
  outline: none;
  letter-spacing: 0.01em;
  transition: 
    box-shadow 0.22s cubic-bezier(.6,.1,.34,1),
    filter 0.20s cubic-bezier(.42,0,1,1),
    background 0.18s,
    color 0.15s;
  position: relative;
  z-index: 1;

  &:hover,
  &:focus-visible {
    box-shadow: 0 0 12px 2px #A7E3FA, 0 3px 33px 0 #50E3C2bb;
    filter: brightness(1.04) saturate(120%) drop-shadow(0 0 12px #F5A62355);
    background: linear-gradient(100deg, #50E3C2 45%, #4A90E2 98%);
    color: #fff;
  }
  &:active {
    filter: brightness(0.97);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.53;
    pointer-events: none;
  }

  @media (max-width: 600px) {
    min-height: 38px;
    font-size: 1rem;
    margin-top: 13px;
    padding: 0.5em 1.05em;
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

  // Animation state for fade-out on "Shred It" click
  const [shredded, setShredded] = useState(false);

  // Animate placeholder fade-in on mount
  useEffect(() => {
    // fade-in after slight delay for calming effect
    const timeout = setTimeout(() => setPlaceholderVisible(true), 130);
    return () => clearTimeout(timeout);
  }, []);

  // Hide placeholder once user starts typing or textarea has value
  const showPlaceholder = placeholderVisible && text.length === 0;

  // Handler for "Shred It" button
  const handleShred = () => {
    setShredded(true);
    // Optionally, clear textarea or do more after fade-out (not required in prompt)
  };

  return (
    <Background>
      <Card className={shredded ? "fadeout" : ""}>
        <TextareaWrapper>
          <AnimatedTextarea
            ref={textareaRef}
            value={text}
            aria-label="Journaling area"
            onChange={e => setText(e.target.value)}
            spellCheck={true}
            disabled={shredded}
          />
          {/* Custom animated placeholder */}
          <FadeInPlaceholder
            show={showPlaceholder}
            aria-hidden="true"
          >
            {"Type what’s bothering you…"}
          </FadeInPlaceholder>
        </TextareaWrapper>
        <MotivationalText />
        {/* Shred It Button placed below quote */}
        <ShredItButton
          onClick={handleShred}
          disabled={shredded}
          tabIndex={shredded ? -1 : 0}
          aria-label="Shred your journal entry"
        >
          Shred It
        </ShredItButton>
      </Card>
    </Background>
  );
}
