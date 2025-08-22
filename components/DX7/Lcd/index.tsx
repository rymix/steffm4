/* eslint-disable no-unused-vars */
/* eslint-disable unicorn/no-array-push-push */
/* eslint-disable no-unused-expressions */
import {
  StyledDx7Lcd,
  StyledDx7LcdWrapper,
} from "components/Dx7/Lcd/StyledDx7Lcd";
import { useMixcloud } from "contexts/mixcloud";
import { useEffect, useState } from "react";

const Dx7Lcd: React.FC = () => {
  const {
    filters: { categories = [], selectedCategory },
  } = useMixcloud();

  const [displaySelectedCategory, setDisplaySelectedCategory] =
    useState("farts");

  useEffect(() => {
    const categoryLookup =
      categories.find((cat) => cat.code === selectedCategory)?.code || "all";

    setDisplaySelectedCategory(categoryLookup.substring(0, 4));
  }, [selectedCategory]);

  return (
    <StyledDx7LcdWrapper>
      <StyledDx7Lcd>{displaySelectedCategory}</StyledDx7Lcd>
    </StyledDx7LcdWrapper>
  );
};

export default Dx7Lcd;
