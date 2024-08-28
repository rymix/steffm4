import { StyledUserManualCoverProps } from "components/Manual/types";
import styled from "styled-components";

export const StyledUserManualCover = styled.div<StyledUserManualCoverProps>`
  cursor: pointer;
  box-shadow: -5px 8px 10px rgba(0, 0, 0, 0.5);
  position: relative;
  width: 320px;
  height: 400px;
  z-index: 1;
  transform: ${(props) => `rotate(${props.$rotation}deg)`};
  transition: transform 0.3s ease;
  text-align: left;
  padding: 30px;
  background-color: #f6f4ef;
  background-image: url("textures/rice-paper-2.png"); /* Textured image */
  background-size: cover;
  box-shadow:
    0 1px 1px rgba(0, 0, 0, 0.15),
    0 10px 0 -7px #eee,
    0 10px 1px -4px rgba(0, 0, 0, 0.15),
    0 20px 0 -13px #eee,
    0 20px 1px -9px rgba(0, 0, 0, 0.15);

  hr {
    border-top: 2px solid rgba(0, 0, 0, 0.4);
    margin: 22px 0;
  }

  p {
    font-size: 14px;
    line-height: 1.6;
    margin: 0 0 20px 0;
  }

  a {
    color: rgba(0, 0, 0, 0.8);

    &:hover {
      color: rgba(0, 0, 0, 1);
    }
  }

  &:hover {
    transform: rotate(0deg) scale(1.2);
  }

  /* @media (max-width: 700px) {
    transform: scale(0.6);
  } */
`;

export const StyledUserManualCoverTitle = styled.div`
  display: block;
  font-family: "Sforzando";
  font-size: 64.4px;
  flex-shrink: 0;
`;

export const StyledUserManualCoverSubTitle = styled.div`
  display: block;
  font-size: 34px;
  flex-shrink: 0;
  padding-bottom: 60px;
`;

export const StyledUserManualCoverSectionTitle = styled.div`
  display: block;
  font-size: 23.8px;
  flex-shrink: 0;
  margin-top: 40px;
`;
