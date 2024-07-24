// components/Background/Background.tsx

import { StyledBackground } from "components/Background/StyledBackground";
import { useMixcloud } from "contexts/mixcloud";
import { useEffect, useState } from "react";

const Background: React.FC = () => {
  const {
    session: { background },
  } = useMixcloud();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Ensure this effect only runs on the client
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Avoid rendering on the server to prevent mismatch
    return null;
  }

  return <StyledBackground $background={background} />;
};

export default Background;
