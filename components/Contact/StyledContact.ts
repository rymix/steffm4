import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import InstagramIcon from "@mui/icons-material/Instagram";
import styled from "styled-components";

export const StyledEmail = styled(AlternateEmailIcon)`
  font-size: 2em;
`;

export const StyledInstagram = styled(InstagramIcon)`
  font-size: 2em;
`;

export const StyledSocialsWrapper = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 2em;
`;

export const StyledContact = styled.div`
  text-align: center;

  p {
    line-height: 1.6;
    margin: 0 0 20px 0;
  }

  a {
    color: rgba(0, 0, 0, 0.7);
    text-decoration: none;
    font-weight: 600;
    font-size: 1.2em;
    transition: 0.3s;

    &:hover {
      color: rgba(0, 0, 0, 1);
    }
  }
`;
