import {
  StyledScreen,
  StyledScreenBanner,
  StyledScreenShadow,
} from "components/BackgroundSelect/Macintosh/Screen/StyledScreen";
import { useMixcloud } from "contexts/mixcloud";

export const Screen: React.FC = () => {
  const {
    session: { background },
  } = useMixcloud();

  return (
    <StyledScreen $background={background}>
      <StyledScreenBanner>
        {background?.name || ""}{" "}
        {background?.backgroundCategoryObject?.name || ""}
      </StyledScreenBanner>
      <StyledScreenShadow />
    </StyledScreen>
  );
};

export default Screen;
