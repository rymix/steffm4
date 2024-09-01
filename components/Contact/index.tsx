import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import InstagramIcon from "@mui/icons-material/Instagram";
import React from "react";

import {
  StyledContact,
  StyledIconWrapper,
  StyledRow,
  StyledTextWrapper,
} from "./StyledContact";
import Threads from "./Threads";

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
    </StyledContact>
  );
};

export default Contact;
