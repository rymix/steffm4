import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import {
  StyledContact,
  StyledIconWrapper,
  StyledRow,
  StyledTextWrapper,
} from "components/Contact/StyledContact";
import Threads from "components/Contact/Threads";
import React from "react";

export const Contact: React.FC = () => {
  return (
    <StyledContact>
      <StyledRow href="mailto:webmaster@stef.fm">
        <StyledIconWrapper>
          <AlternateEmailIcon />
        </StyledIconWrapper>
        <StyledTextWrapper>
          <span>webmaster@stef.fm</span>
        </StyledTextWrapper>
      </StyledRow>
      <StyledRow
        href="https://www.instagram.com/stef.fm_music/"
        target="_blank"
      >
        <StyledIconWrapper>
          <InstagramIcon />
        </StyledIconWrapper>
        <StyledTextWrapper>
          <span>@stef.fm_music</span>
        </StyledTextWrapper>
      </StyledRow>
      <StyledRow
        href="https://www.threads.net/@stef.fm_music?hl=en"
        target="_blank"
      >
        <StyledIconWrapper>
          <Threads />
        </StyledIconWrapper>
        <StyledTextWrapper>
          <span>@stef.fm_music</span>
        </StyledTextWrapper>
      </StyledRow>
      <StyledRow href="https://github.com/rymix/steffm4" target="_blank">
        <StyledIconWrapper>
          <GitHubIcon />
        </StyledIconWrapper>
        <StyledTextWrapper>
          <span>GitHub</span>
        </StyledTextWrapper>
      </StyledRow>
    </StyledContact>
  );
};

export default Contact;
