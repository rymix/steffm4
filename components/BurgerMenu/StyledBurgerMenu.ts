import type {
  StyledBurgerProps,
  StyledBurgerStripesProps,
  StyledMenuProps,
} from "components/BurgerMenu/types";
import styled from "styled-components";

export const StyledBurger = styled.button<StyledBurgerProps>`
  position: absolute;
  top: 5%;
  left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ $open }) => ($open ? "black" : "darkgray")};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

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
`;

export const StyledBurgerStripes = styled.div<StyledBurgerStripesProps>`
  color: yellow;
  width: 2rem;
  height: 0.25rem;
  background: ${({ $open }) => ($open ? "black" : "blue")};
  border-radius: 10px;
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;

  &:first-child {
    transform: ${({ $open }) => ($open ? "rotate(45deg)" : "rotate(0)")};
  }

  &:nth-child(2) {
    opacity: ${({ $open }) => ($open ? "0" : "1")};
    transform: ${({ $open }) => ($open ? "translateX(20px)" : "translateX(0)")};
  }

  &:nth-child(3) {
    transform: ${({ $open }) => ($open ? "rotate(-45deg)" : "rotate(0)")};
  }
`;

export const StyledMenu = styled.nav<StyledMenuProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: grey;
  transform: ${({ $open }) => ($open ? "translateX(0)" : "translateX(-100%)")};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 576px) {
    width: 100%;
  }

  a {
    color: black;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: lightgrey;
    }
  }
`;
