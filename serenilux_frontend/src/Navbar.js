import React from "react";
import styled from "styled-components";

/*
  PUBLIC_INTERFACE
  Navbar
  A fixed, minimalistic, and unobtrusive top navigation bar for the SereniLux journaling experience.

  Left: app title "Thought Detox" with 💭 emoji.
  Right: placeholder settings/toggle icon.
*/

// Height of navbar for layout compensation
const NAVBAR_HEIGHT = 56;

const NavBarWrapper = styled.nav`
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
  height: ${NAVBAR_HEIGHT}px;
  background: rgba(10, 18, 36, 0.87);
  backdrop-filter: blur(12px) saturate(135%);
  border-bottom: 1px solid var(--border-color, rgba(255,255,255,0.1));
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  box-sizing: border-box;
  box-shadow: 0 1.5px 14px 0 rgba(50,80,120,0.04);
  /* Subtle fade in on mount */
  opacity: 1;
  transition: opacity 0.30s;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.53em;
  font-size: 1.24rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: #f8fafc;
  user-select: none;
`;

const LogoEmoji = styled.span`
  font-size: 1.4em;
  filter: saturate(115%) drop-shadow(0 0 2px #d0fff5bb);
`;

const PlaceholderButton = styled.button`
  background: none;
  border: none;
  outline: none;
  padding: 6px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.13s;
  /* Soft hover effect */
  &:hover, &:focus {
    background: rgba(90, 200, 230, 0.11);
  }
`;

// Simple SVG gear icon for placeholder
const GearIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" aria-label="Settings" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="4.1" stroke="#7be7df" strokeWidth="1.5"/>
    <path d="M11 2v1.6M11 18.4V20M3.24 5.24l1.13 1.13M15.63 16.86l1.13 1.13M2 11h1.6M18.4 11H20M5.24 16.86l1.13-1.13M16.86 5.24l-1.13 1.13" stroke="#60c3be" strokeWidth="1.0" strokeLinecap="round"/>
  </svg>
);

// PUBLIC_INTERFACE
function Navbar() {
  /**
   * Navbar is a minimal, fixed top navigation bar for the app.
   */
  return (
    <NavBarWrapper>
      <Logo>
        <LogoEmoji role="img" aria-label="thought bubble">💭</LogoEmoji>
        Thought Detox
      </Logo>
      <PlaceholderButton aria-label="Settings">
        <GearIcon />
      </PlaceholderButton>
    </NavBarWrapper>
  );
}

export default Navbar;
export { NAVBAR_HEIGHT };
