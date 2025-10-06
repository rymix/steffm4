import { StyledVoiceControlStatusProps } from "components/VoiceControl/types";
import styled from "styled-components";

const getStatusColour = (status: string): string => {
  switch (status) {
    case "wake-listening":
      return "#4ade80"; // green
    case "command-listening":
      return "#f59e0b"; // amber
    case "processing":
      return "#3b82f6"; // blue
    default:
      return "#6b7280"; // grey
  }
};

// TODO: Do we still need these keyframes?
// const keyframesPulse = keyframes`
//   0%,
//   50% {
//             opacity: 1;
//   }
//   100% {
//             opacity: 0.5;
//   }
// `;

export const StyledVoiceControlStatus = styled.div<StyledVoiceControlStatusProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;

  ${(props) =>
    props.$status &&
    `
      border: 2px solid ${getStatusColour(props.$status)};
    `}
`;

export const StyledVoiceControlStatusIcon = styled.div<StyledVoiceControlStatusProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  animation: ${(props) =>
    props.$status && props.$status !== "idle" ? "none" : "pulse 1.5s infinite"};

  ${(props) =>
    props.$status &&
    `
      border: 2px solid ${getStatusColour(props.$status)};
    `}
`;

export const StyledVoiceControlStatusMessage = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

export const StyledVoiceControlModeIndicator = styled.div`
  margin-bottom: 12px;
`;

export const StyledVoiceControlErrorMessage = styled.p`
  color: red;
`;

export const StyledVoiceControlControls = styled.div`
  margin-bottom: 12px;
`;
