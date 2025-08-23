import {
  StyledDx7Cartridge,
  StyledDx7CartridgeIcons,
  StyledDx7CartridgeRom,
  StyledDx7CartridgeSlot,
  StyledDx7CartridgeSticker,
  StyledDx7CartridgeTitle,
  StyledDx7HeaderLogo,
} from "components/Dx7/Cartridge/StyledDx7Cartridge";
import { useMixcloud } from "contexts/mixcloud";
import { useEffect, useState } from "react";

const Dx7Cartridge: React.FC = () => {
  const {
    filters: { categories = [], selectedCategory },
  } = useMixcloud();

  const [displaySelectedCategory, setDisplaySelectedCategory] = useState("");

  useEffect(() => {
    const categoryLookup =
      categories.find((cat) => cat.code === selectedCategory)?.name || "All";

    setDisplaySelectedCategory(categoryLookup);
  }, [categories, selectedCategory]);

  return (
    <StyledDx7CartridgeSlot>
      <StyledDx7Cartridge>
        <StyledDx7CartridgeSticker>
          <StyledDx7CartridgeTitle>
            {displaySelectedCategory}
          </StyledDx7CartridgeTitle>
          <StyledDx7CartridgeIcons>
            <StyledDx7HeaderLogo />
            <StyledDx7CartridgeRom>ROM</StyledDx7CartridgeRom>
          </StyledDx7CartridgeIcons>
        </StyledDx7CartridgeSticker>
      </StyledDx7Cartridge>
    </StyledDx7CartridgeSlot>
  );
};

export default Dx7Cartridge;
