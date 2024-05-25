import styled from "styled-components";

export const CoverFlowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 400px; /* Adjust this value according to your needs */
  position: relative;
`;

export const ControlPanel = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
`;
