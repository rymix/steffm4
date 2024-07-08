import {
  StyledJupiterProgressLed,
  StyledJupiterProgressLedsItemsWrapper,
  StyledJupiterProgressLedsLabels,
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
    <StyledJupiterProgressLedsWrapper>
      <StyledJupiterProgressLedsItemsWrapper $displayLength={displayLength}>
        {Array.from({ length: displayLength }, (_, i) => (
          <StyledJupiterProgressLed key={i} $on={i < numLedsOn} />
        ))}
      </StyledJupiterProgressLedsItemsWrapper>
      <StyledJupiterProgressLedsLabels>
        <div>0</div>
        <div>25</div>
        <div>50</div>
        <div>75</div>
        <div>100</div>
      </StyledJupiterProgressLedsLabels>
    </StyledJupiterProgressLedsWrapper>
  );
};

export default JupiterProgressLeds;
