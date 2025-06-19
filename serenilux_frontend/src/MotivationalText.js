import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

/*
  PUBLIC_INTERFACE
  MotivationalText
  Renders a motivational message with a gentle fade-in animation, after a delay.
  Props:
    - text (string): the motivational message to display (optional, default provided)
    - delay (number): ms until animation begins (optional, default 600ms)
*/

const fadeInMotivation = keyframes`
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Motivational = styled.div`
  font-size: 1.14rem;
  color: #297f6c;
  font-weight: 500;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 6px;
  opacity: 0;
  /* Space and style should blend with the card */
  letter-spacing: 0.01em;
  transition: opacity 0.18s;
  /* Animation shown only when mounted and after delay */
  &.show {
    animation: ${fadeInMotivation} 1.18s cubic-bezier(.4,0,.22,1) forwards;
  }

  @media (max-width: 600px) {
    font-size: 1rem;
    margin-top: 20px;
    margin-bottom: 2px;
    padding: 0 7px;
  }
`;

// PUBLIC_INTERFACE
function MotivationalText({ text = "Let it go. You’ve taken the first step.", delay = 600 }) {
  /**
   * MotivationalText component displays a motivational message with fade-in after a delay.
   * @param {string} text - The message to display.
   * @param {number} delay - Delay before animation in ms.
   */
  const [show, setShow] = useState(false);

  useEffect(() => {
    const to = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(to);
  }, [delay]);

  return (
    <Motivational className={show ? "show" : ""} role="status" aria-live="polite">
      {text}
    </Motivational>
  );
}

export default MotivationalText;
