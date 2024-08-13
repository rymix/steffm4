/* eslint-disable react/no-unescaped-entities */
import {
  StyledGrid,
  StyledGridDetail,
  StyledGridHeader,
  StyledIconSection,
  StyledManual,
  StyledManualSectionTitle,
  StyledManualSubTitle,
  StyledManualTitle,
  StyledWarningIcon,
} from "components/Manual/StyledManual";
import React from "react";

export const Manual: React.FC = () => {
  return (
    <StyledManual>
      <StyledManualTitle>Stef.fM</StyledManualTitle>
      <hr />
      <StyledManualSubTitle>User Manual</StyledManualSubTitle>
      <StyledManualSectionTitle>Introduction</StyledManualSectionTitle>
      <hr />
      <p>
        The <strong>Stef.FM</strong> funky, funky house music player is
        polyphonic streaming audio virtual device built for your listening
        pleasure. Press buttons, rotate knobs and move sliders to make the music
        happen.
      </p>
      <p>
        This manual explains how to make the most of your{" "}
        <strong>Stef.FM</strong> experience.
      </p>
      <StyledIconSection>
        <StyledWarningIcon /> Warning! The funk is strong. Proceed with caution.
      </StyledIconSection>
      <StyledManualSectionTitle>Select</StyledManualSectionTitle>
      <hr />
      <p>
        The <strong>SELECT</strong> knob allows you to dial in the sounds of
        your preference. Rotate it to choose between:
      </p>
      <StyledGrid>
        <StyledGridHeader>ADV</StyledGridHeader>
        <StyledGridDetail>
          <strong>ADVENTURES IN DECENT MUSIC</strong>
          <br />
          It's soulful, it's groovy, it's low-volume. But most of all it's{" "}
          <strong>DECENT</strong>.
        </StyledGridDetail>
        <StyledGridHeader>SHOES</StyledGridHeader>
        <StyledGridDetail>
          <strong>MY PAIR OF SHOES</strong>
          <br />
          It can be deep, it can but funkier than holy hell, it can be jazzy.
          It's always <strong>HOUSE</strong> and them shoes, they be{" "}
          <strong>COMFY</strong>.
        </StyledGridDetail>
        <StyledGridHeader>SPEC</StyledGridHeader>
        <StyledGridDetail>
          <strong>SPECIAL MIXES</strong>
          <br />
          It's different, it's exceptional, it's <strong>SPECIAL</strong>. You
          won't guess what's coming next and that's why you love it.
        </StyledGridDetail>
        <StyledGridHeader>COCK</StyledGridHeader>
        <StyledGridDetail>
          <strong>COCKSOUP DJ COLLECTIVE</strong>
          <br />
          The fuse is lit and I'm about to go <strong>BOOM!</strong> Put on your
          loafers, run your fingers through your flowing mullett and relax to
          some soothing, beautiful <strong>JAZZ FUSION</strong>.
        </StyledGridDetail>
        <StyledGridHeader>FAV</StyledGridHeader>
        <StyledGridDetail>
          <strong>FAVOURITES</strong>
          <br />
          All your favourite mixes all in one place.
        </StyledGridDetail>
        <StyledGridHeader>ALL</StyledGridHeader>
        <StyledGridDetail>
          <strong>ALL THE MUSIC</strong>
          <br />
          No filters, no holds barred. This is what you came here for. Dial up{" "}
          <strong>EVERYTHING</strong> and listen until tomorrow.
        </StyledGridDetail>
      </StyledGrid>
      <StyledManualSectionTitle>Control</StyledManualSectionTitle>
      <hr />
      <StyledGrid>
        <StyledGridHeader>STOP</StyledGridHeader>
        <StyledGridDetail>
          <strong>CEASE THE MUSIC</strong>
          <br />
          <strong>NEVER</strong> press this button. If you press this, sadness
          will ensue. You have been warned.
        </StyledGridDetail>
        <StyledGridHeader>PLAY</StyledGridHeader>
        <StyledGridDetail>
          <strong>MAKE BEAUTIFUL MUSIC</strong>
          <br />
          Press this button to make the music begin. You will not be
          disappointed.
        </StyledGridDetail>
        <StyledGridHeader>PREV</StyledGridHeader>
        <StyledGridDetail>
          <strong>PREVIOUS MIX</strong>
          <br />
          Go to the previous mix in the current selection.
        </StyledGridDetail>
        <StyledGridHeader>NEXT</StyledGridHeader>
        <StyledGridDetail>
          <strong>NEXT MIX</strong>
          <br />
          Go to the next mix in the current selection.
        </StyledGridDetail>
        <StyledGridHeader>RAND</StyledGridHeader>
        <StyledGridDetail>
          <strong>RANDOM MIX</strong>
          <br />
          Play a random mix in the current selection.
        </StyledGridDetail>
        <StyledGridHeader>LATEST</StyledGridHeader>
        <StyledGridDetail>
          <strong>LATEST MIX</strong>
          <br />
          Play the mix most recently uploaded to <strong>Stef.FM</strong>. Use
          this to keep up to date with the newest music.
          <br />
          <strong>NOTE:</strong> This button ignores the current selection.
        </StyledGridDetail>
      </StyledGrid>
      <StyledManualSectionTitle>Control</StyledManualSectionTitle>
      <hr />
      <StyledGrid>
        <StyledGridHeader>FAV</StyledGridHeader>
        <StyledGridDetail>
          <strong>ADD MIX TO FAVOURITES</strong>
          <br />
          Keep track of your favourite mixes. Click the <strong>
            FAV
          </strong>{" "}
          button and <strong>Stef.FM</strong> will remember how much you love
          this mix. Your favourited mixes will appear under the{" "}
          <strong>FAV</strong> selection as well as in the{" "}
          <strong>Favourites</strong> section of the <strong>LIST</strong> mode.
        </StyledGridDetail>
        <StyledGridHeader>SHARE</StyledGridHeader>
        <StyledGridDetail>
          <strong>SHARE THE CURRENT MIX</strong>
          <br />
          Click the <strong>SHARE</strong> button to copy a shareable link to
          your clipboard. Paste this into your social posts or send the link to
          a friend. Share the music and share the love.
        </StyledGridDetail>
      </StyledGrid>
    </StyledManual>
  );
};

export default Manual;
