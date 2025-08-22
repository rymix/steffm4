import Dx7Lcd from "components/Dx7/Lcd";
import { useMixcloud } from "contexts/mixcloud";
import { useEffect, useState } from "react";

const Dx7MixTrackDisplay: React.FC = () => {
  const {
    mix: { details: mixDetails },
    track: { sectionNumber },
  } = useMixcloud();

  const [displaySelectedMixNumber, setDisplaySelectedMixNumber] =
    useState("000");
  const [displaySelectedTrackNumber, setDisplaySelectedTrackNumber] =
    useState("00");
  const [displayText, setDisplayText] = useState("000-00");

  useEffect(() => {
    setDisplaySelectedMixNumber(
      mixDetails ? mixDetails?.listOrder.toString().padStart(3, "0") : "000",
    );
  }, [mixDetails]);

  useEffect(() => {
    console.log(
      "sectionNumber changed:",
      sectionNumber,
      "type:",
      typeof sectionNumber,
    );
    const newTrackNumber = sectionNumber
      ? sectionNumber?.toString().padStart(2, "0")
      : "00";
    console.log("Setting track number to:", newTrackNumber);
    setDisplaySelectedTrackNumber(newTrackNumber);
  }, [sectionNumber]);

  useEffect(() => {
    const newDisplayText = `${displaySelectedMixNumber}-${displaySelectedTrackNumber}`;
    setDisplayText(newDisplayText);
  }, [displaySelectedMixNumber, displaySelectedTrackNumber]);

  return <Dx7Lcd characterCount={6} displayText={displayText} />;
};

export default Dx7MixTrackDisplay;
