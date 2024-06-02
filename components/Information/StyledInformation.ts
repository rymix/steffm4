import InfoIcon from "@mui/icons-material/Info";
import styled from "styled-components";

export const StyledInformation = styled(InfoIcon)`
  color: ${({ theme }) => theme.colors.socials.information};
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.socials.informationHover};
  }
`;
