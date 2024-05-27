import type {
  StyledBurgerProps,
  StyledMenuProps,
} from "components/BurgerMenu/types";
import styled from "styled-components";

export const StyledBurger = styled.button<StyledBurgerProps>`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 2rem;
  justify-content: space-around;
  left: 30px;
  padding: 0;
  position: absolute;
  top: 30px;
  width: 2rem;
  z-index: 100;

  &:focus {
    outline: none;
  }

  div {
    background: ${({ $open }) => ($open ? "black" : "darkgray")};
    border-radius: 10px;
    height: 0.25rem;
    position: relative;
    transform-origin: 1px;
    transition: all 0.15s linear;
    width: 2rem;

    &:first-child {
      transform: ${({ $open }) => ($open ? "rotate(45deg)" : "rotate(0)")};
    }

    &:nth-child(2) {
      opacity: ${({ $open }) => ($open ? "0" : "1")};
      transform: ${({ $open }) =>
        $open ? "translateX(20px)" : "translateX(0)"};
    }

    &:nth-child(3) {
      transform: ${({ $open }) => ($open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }

  &:hover > div {
    background: ${({ $open }) => ($open ? "lightgray" : "black")};
  }
`;

export const StyledMenu = styled.nav<StyledMenuProps>`
  background: grey;
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  height: 100vh;
  justify-content: flex-start;
  left: 0;
  padding: 6rem 2rem;
  position: absolute;
  text-align: left;
  top: 0;
  transform: ${({ $open }) => ($open ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.15s ease-in-out;
  z-index: 99;

  @media (max-width: 576px) {
    width: 100%;
  }

  li {
    color: black;
    cursor: pointer;
    margin: 0 0 1rem 0;
    text-decoration: none;
    transition: color 0.15s linear;

    @media (max-width: 576px) {
      text-align: center;
    }

    &:hover {
      color: lightgrey;
    }
  }
`;

export const StyledHeading = styled.h2`
  color: black;
  font-size: 2rem;
  margin: 0 0 1rem 0;
  text-decoration: none;
  transition: color 0.15s linear;

  @media (max-width: 576px) {
    text-align: center;
  }
`;
