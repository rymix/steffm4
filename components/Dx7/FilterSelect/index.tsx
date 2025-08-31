import Dx7Button from "components/Dx7/Button";
import { StyledDx7FilterSelect } from "components/Dx7/FilterSelect/StyledDx7FilterSelect";
import {
  StyledDx7Item,
  StyledDx7ItemGroup,
} from "components/Dx7/Item/StyledDx7Item";
import { useMixcloud } from "contexts/mixcloud";

const Dx7FilterSelect: React.FC = () => {
  const {
    controls: { handleLoadRandom, handleLoadRandomFavourite },
    filters: { selectedCategory, setSelectedCategory },
  } = useMixcloud();

  const handleFilterSelectChange = (newFilter: string): void => {
    if (newFilter === "fav") {
      handleLoadRandomFavourite();
    } else {
      handleLoadRandom(newFilter);
    }

    setSelectedCategory(newFilter);
  };

  return (
    <StyledDx7FilterSelect>
      <StyledDx7ItemGroup $alignment="right">
        <StyledDx7Item>
          <Dx7Button
            color="grey"
            label="All"
            onClick={() => {
              handleFilterSelectChange("all");
            }}
            on={selectedCategory === "all"}
            size="tiny"
          />
        </StyledDx7Item>
        <StyledDx7Item>
          <Dx7Button
            color="grey"
            label="Adv"
            onClick={() => {
              handleFilterSelectChange("aidm");
            }}
            on={selectedCategory === "aidm"}
            size="tiny"
          />
        </StyledDx7Item>
        <StyledDx7Item>
          <Dx7Button
            color="grey"
            label="Shoes"
            onClick={() => {
              handleFilterSelectChange("mpos");
            }}
            on={selectedCategory === "mpos"}
            size="tiny"
          />
        </StyledDx7Item>
      </StyledDx7ItemGroup>
      <StyledDx7ItemGroup $alignment="left">
        <StyledDx7Item>
          <Dx7Button
            color="grey"
            label="Cock"
            onClick={() => {
              handleFilterSelectChange("cocksoup");
            }}
            on={selectedCategory === "cocksoup"}
            size="tiny"
          />
        </StyledDx7Item>
        <StyledDx7Item>
          <Dx7Button
            color="grey"
            label="Spec"
            onClick={() => {
              handleFilterSelectChange("special");
            }}
            on={selectedCategory === "special"}
            size="tiny"
          />
        </StyledDx7Item>
        <StyledDx7Item>
          <Dx7Button
            color="grey"
            label="Fav"
            onClick={() => {
              handleFilterSelectChange("fav");
            }}
            on={selectedCategory === "fav"}
            size="tiny"
          />
        </StyledDx7Item>
      </StyledDx7ItemGroup>
    </StyledDx7FilterSelect>
  );
};

export default Dx7FilterSelect;
