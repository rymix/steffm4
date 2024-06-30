import styled from "styled-components";

export const StyledJupiterHeaderWrapper = styled.div`
  display: flex;
  height: 80px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const StyledJupiterSlats = styled.div`
  background-image: url("images/jupiter/slat2.png");
  background-repeat: repeat-x;
  background-position: left;
  flex-grow: 1;
  height: 100%;
  margin-left: 20px;
`;

export const StyledJupiterTitle = styled.div`
  color: white;
  font-family: "Sforzando";
  font-size: 92px;
  margin: 10px 40px;
  width: 300px;
  flex-shrink: 0;
  text-align: right;
  opacity: 0.9;
`;
