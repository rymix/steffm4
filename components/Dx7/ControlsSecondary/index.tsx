import About from "components/About";
import Dx7Button from "components/Dx7/Button";
import { StyledDx7Controls } from "components/Dx7/Controls/StyledDx7Controls";
import { StyledDx7Item } from "components/Dx7/Item/StyledDx7Item";
import MixInformation from "components/MixInformation";
import MixList from "components/MixList";
import { useMixcloud } from "contexts/mixcloud";

const Dx7ControlsSecondary: React.FC = () => {
  const {
    mcKey,
    favourites: { addFavourite, isFavourite, removeFavourite },
    mix: { copySharableLink, favourite },
    session: { openModal },
  } = useMixcloud();

  const handleFavouriteClick = async (): Promise<void> => {
    if (isFavourite(mcKey)) {
      removeFavourite(mcKey);
    } else {
      addFavourite(mcKey);
    }
  };

  const handleShareClick = (): void => {
    copySharableLink();
  };

  const handleInfoClick = (): void => {
    openModal(<MixInformation />);
  };

  const handleListClick = (): void => {
    openModal(<MixList />, undefined, undefined, undefined, true);
  };

  const handleAboutClick = (): void => {
    openModal(<About />);
  };

  return (
    <StyledDx7Controls>
      <StyledDx7Item>
        <Dx7Button
          color="yellow"
          label="Favourite"
          onClick={handleFavouriteClick}
          on={favourite}
        />
      </StyledDx7Item>
      <StyledDx7Item>
        <Dx7Button
          color="yellow"
          label="Share"
          onClick={handleShareClick}
          momentary
        />
      </StyledDx7Item>
      <StyledDx7Item>
        <Dx7Button
          color="orange"
          label="Mix Info"
          onClick={handleInfoClick}
          momentary
        />
      </StyledDx7Item>
      <StyledDx7Item>
        <Dx7Button
          color="orange"
          label="List All"
          onClick={handleListClick}
          momentary
        />
      </StyledDx7Item>
      <StyledDx7Item>
        <Dx7Button
          color="orange"
          label="About"
          onClick={handleAboutClick}
          momentary
        />
      </StyledDx7Item>
    </StyledDx7Controls>
  );
};

export default Dx7ControlsSecondary;
