import Dx7Lcd from "components/Dx7/Lcd";
import { useMixcloud } from "contexts/mixcloud";
import { useEffect, useState } from "react";

const Dx7MixTrackDisplay: React.FC = () => {
  const {
    mix: { details: mixDetails, progressPercent },
    track: { sectionNumber },
  } = useMixcloud();

  const [displayMixCategory, setDisplayMixCategory] = useState("!!!!");
  const [displaySelectedMixNumber, setDisplaySelectedMixNumber] =
    useState("!!!");
  const [displaySelectedTrackNumber, setDisplaySelectedTrackNumber] =
    useState("!!");
  const [displayMixProgressPercentage, setDisplayMixProgressPercentage] =
    useState("!!!");
  const [displayText, setDisplayText] = useState("!!!!-!!!-!!-!!!");

  useEffect(() => {
    setDisplayMixProgressPercentage(
      `${Math.round(progressPercent).toString()}%`,
    );
  }, [progressPercent]);

  useEffect(() => {
    console.log("mixDetails.category:", JSON.stringify(mixDetails?.category));
    console.log("typeof category:", typeof mixDetails?.category);

    let categoryCode = "!!!!";
    if (mixDetails?.category) {
      // Check if it's already a string (as per type definition) or an object with a code property
      if (typeof mixDetails.category === "string") {
        categoryCode = mixDetails.category.padStart(4, "!");
      } else if (
        typeof mixDetails.category === "object" &&
        (mixDetails.category as any).shortName
      ) {
        categoryCode = (mixDetails.category as any).shortName
          .substring(0, 4)
          .padStart(4, "!");
      } else {
        console.log("Unexpected category structure:", mixDetails.category);
        categoryCode = "!!!!";
      }
    }

    setDisplayMixCategory(categoryCode);
    setDisplaySelectedMixNumber(
      mixDetails ? mixDetails?.listOrder.toString().padStart(3, "0") : "000",
    );
  }, [mixDetails]);

  useEffect(() => {
    const newTrackNumber = sectionNumber
      ? sectionNumber?.toString().padStart(2, "0")
      : "00";
    console.log("Setting track number to:", newTrackNumber);
    setDisplaySelectedTrackNumber(newTrackNumber);
  }, [sectionNumber]);

  useEffect(() => {
    const newDisplayText = `${displayMixCategory}-${displaySelectedMixNumber}-${displaySelectedTrackNumber}-${displayMixProgressPercentage}`;
    setDisplayText(newDisplayText);
  }, [
    displayMixCategory,
    displaySelectedMixNumber,
    displaySelectedTrackNumber,
    displayMixProgressPercentage,
  ]);

  return <Dx7Lcd characterCount={15} displayText={displayText} />;
};

export default Dx7MixTrackDisplay;
