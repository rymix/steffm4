import StefFmDx7Logo from "public/svg/stef-fm-dx7.svg";
import StefFmRolandLogo from "public/svg/stef-fm-roland.svg";
import styled from "styled-components";

export const StyledPlayerChooserItem = styled.div<{ $isSelected: boolean }>`
  flex: 0 0 50%;
  max-width: 50%;
  min-height: 200px;
  box-sizing: border-box;
  padding: 10px;
  container-type: inline-size;
  cursor: pointer;
  opacity: ${({ $isSelected }) => ($isSelected ? 0.8 : 0.6)};
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    flex: 0 0 100%;
    max-width: 100%;
  }

  p {
    margin-top: 1em;
  }
`;

export const StyledPlayerChooserIndicator = styled.div<{
  $isSelected: boolean;
  $isOtherHovered: boolean;
}>`
  margin-top: 1em;
  opacity: ${({ $isSelected, $isOtherHovered }) => {
    if ($isOtherHovered && $isSelected) return 0.3;
    if ($isSelected) return 0.8;
    return 0;
  }};
  transition: opacity 0.3s ease;

  ${StyledPlayerChooserItem}:hover & {
    opacity: 1;
  }
`;

export const StyledPlayerChooser = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const StyledStefFmJupiterLogo = styled(StefFmRolandLogo).attrs({
  preserveAspectRatio: "xMidYMid meet",
})`
  display: block;
  width: 100% !important;
  height: auto !important;
  aspect-ratio: 4.2 / 1;
  max-width: 100%;
  fill: rgba(0, 0, 0, 1);
  padding: 10px 0 0 0;
  cursor: pointer;
`;

export const StyledStefFmDx7Logo = styled(StefFmDx7Logo).attrs({
  preserveAspectRatio: "xMidYMid meet",
})`
  display: block;
  width: 100% !important;
  height: auto !important;
  aspect-ratio: 4.2 / 1;
  max-width: 100%;
  fill: rgba(0, 0, 1);
  padding: 10px 0 0 0;
  cursor: pointer;
`;
