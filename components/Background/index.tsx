import {
  StyledBackgroundLayerA,
  StyledBackgroundLayerB,
} from "components/Background/StyledBackground";
import { useMixcloud } from "contexts/mixcloud";
import { useEffect, useState } from "react";

const Background: React.FC = () => {
  const {
    session: {
      background,
      backgroundAutoChange,
      filterBackgroundCategory,
      setBackground,
    },
    track: { details: trackDetails },
  } = useMixcloud();

  const trackName = trackDetails?.trackName;

  const [hydrated, setHydrated] = useState(false);
  const [activeBackground, setActiveBackground] = useState<"A" | "B">("A");
  const [backgroundA, setBackgroundA] = useState(background);
  const [backgroundB, setBackgroundB] = useState(background);

  useEffect(() => {
    setHydrated(true); // Ensure this effect only runs on the client
  }, []);

  useEffect(() => {
    if (!backgroundAutoChange) return; // Disable auto-change if backgroundAutoChange is false

    const setRandomBackground = async (): Promise<void> => {
      try {
        const response = await fetch(
          `/api/background/randomBackground${
            filterBackgroundCategory === "undefined" ||
            !filterBackgroundCategory
              ? ""
              : `?backgroundCategory=${filterBackgroundCategory}`
          }`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch random background");
        }

        const randomBackground = await response.json();
        setBackground(randomBackground); // Update the state with the fetched background
      } catch (error) {
        console.error("Error setting random background:", error);
      }
    };

    setRandomBackground();
  }, [trackName, backgroundAutoChange]);

  useEffect(() => {
    if (!hydrated || !backgroundAutoChange) return; // Skip transition logic if auto-change is disabled

    if (activeBackground === "A") {
      // When Layer A is active, update Layer B and start transition
      setBackgroundB(background);
      setTimeout(() => {
        setActiveBackground("B");
      }, 1500); // 1.5s matches the CSS transition time
    } else {
      // When Layer B is active, update Layer A and start transition
      setBackgroundA(background);
      setTimeout(() => {
        setActiveBackground("A");
      }, 1500);
    }
  }, [background, hydrated, backgroundAutoChange]);

  if (!hydrated) {
    return null; // Avoid rendering on the server to prevent mismatch
  }

  return (
    <>
      <StyledBackgroundLayerA
        $background={backgroundA}
        $isActive={activeBackground === "A"}
      />
      <StyledBackgroundLayerB
        $background={backgroundB}
        $isActive={activeBackground === "B"}
      />
    </>
  );
};

export default Background;
