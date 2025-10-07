import { StyledDx7VoiceLed } from "components/Dx7/Voice/StyledDx7Voice";

import Dx7Label from "../Label";

const Dx7Voice: React.FC = () => {
  const ledOn = true;

  return (
    <div>
      <StyledDx7VoiceLed $on={ledOn} />
      <Dx7Label
        label="Hey Stef"
        labelPosition="above"
        paddingTop={0}
        paddingBottom={4}
        textColor="white"
        size="normal"
      />
    </div>
  );
};

export default Dx7Voice;
