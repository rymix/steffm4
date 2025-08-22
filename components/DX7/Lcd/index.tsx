import {
  StyledDx7Lcd,
  StyledDx7LcdWrapper,
} from "components/Dx7/Lcd/StyledDx7Lcd";
import type { Dx7LcdProps } from "components/Dx7/Lcd/types";

const Dx7Lcd: React.FC<Dx7LcdProps> = ({ characterCount, displayText }) => {
  const truncatedText = displayText
    ? displayText.substring(0, characterCount)
    : "";

  return (
    <StyledDx7LcdWrapper $characterCount={characterCount}>
      <StyledDx7Lcd $characterCount={characterCount}>
        {truncatedText}
      </StyledDx7Lcd>
    </StyledDx7LcdWrapper>
  );
};

export default Dx7Lcd;
