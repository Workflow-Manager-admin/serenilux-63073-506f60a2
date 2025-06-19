import React from "react";
import styled, { keyframes } from "styled-components";

/*
  PUBLIC_INTERFACE
  JournalingScreen
  A full viewport, mobile-first layout featuring:
    - a background with a smoothly animated gradient,
    - a flex-centered, glassmorphic card container.
  This is a presentational scaffold for future content.
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

// The animated background container covers the viewport.
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

// Glassmorphic card: supports flex/grid for future content.
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

export default function JournalingScreen() {
  // No content for now, just card background
  return (
    <Background>
      <Card>{/* Future journaling UI goes here */}</Card>
    </Background>
  );
}
