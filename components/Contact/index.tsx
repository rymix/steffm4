/* eslint-disable react/no-unescaped-entities */
import {
  StyledContact,
  StyledEmail,
  StyledInstagram,
  StyledSocialsWrapper,
} from "components/Contact/StyledContact";
import React from "react";

export const Contact: React.FC = () => {
  return (
    <StyledContact>
      <a href="mailto:webmaster@stef.fm">
        <StyledSocialsWrapper>
          <StyledEmail />
          webmaster@stef.fm
        </StyledSocialsWrapper>
      </a>
      <a href="https://www.instagram.com/stef.fm_music/" target="_blank">
        <StyledSocialsWrapper>
          <StyledInstagram />
          @stef.fm_music
        </StyledSocialsWrapper>
      </a>
    </StyledContact>
  );
};

export default Contact;
