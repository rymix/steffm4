import {
  StyledJupiterProgressLed,
  StyledJupiterProgressLedsWrapper,
} from "components/Jupiter/ProgressLeds/StyledJupiterProgressLeds";
import { useMixcloud } from "contexts/mixcloud";

const JupiterProgressLeds: React.FC = () => {
  const {
    mix: { progressPercent },
    session: { displayLength },
  } = useMixcloud();

  let numLedsOn = 0;

  if (progressPercent > 0) {
    numLedsOn = 1;
  }

  if (progressPercent > 3) {
    numLedsOn += Math.floor(((progressPercent - 3) / 97) * (displayLength - 2));
  }

  if (progressPercent >= 97) {
    numLedsOn = displayLength;
  }

  return (
    <StyledJupiterProgressLedsWrapper $displayLength={displayLength}>
      {Array.from({ length: displayLength }, (_, i) => (
        <StyledJupiterProgressLed key={i} $on={i < numLedsOn} />
      ))}
    </StyledJupiterProgressLedsWrapper>
  );
};

export default JupiterProgressLeds;
