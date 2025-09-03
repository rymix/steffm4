import DrivingMode from "components/DrivingMode";
import Dx7Button from "components/Dx7/Button";
import { StyledDx7Item } from "components/Dx7/Item/StyledDx7Item";
import { StyledDx7ScreenControls } from "components/Dx7/ScreenControls/StyledDx7ScreenControls";
import { useMixcloud } from "contexts/mixcloud";

const Dx7ScreenControls: React.FC = () => {
  const {
    session: { dx7ScreenLight, openModal, setDx7ScreenLight },
  } = useMixcloud();

  const toggleScreenLight = (): void => {
    setDx7ScreenLight(!dx7ScreenLight);
  };

  const handleDrivingModeClick = (): void => {
    openModal(<DrivingMode />);
  };

  return (
    <StyledDx7ScreenControls>
      <StyledDx7Item>
        <Dx7Button
          color="grey"
          label="Light"
          onClick={toggleScreenLight}
          on={dx7ScreenLight}
          size="tiny"
        />
      </StyledDx7Item>
      <StyledDx7Item>
        <Dx7Button
          color="grey"
          label="Driving"
          onClick={handleDrivingModeClick}
          momentary
          size="tiny"
        />
      </StyledDx7Item>
    </StyledDx7ScreenControls>
  );
};

export default Dx7ScreenControls;
