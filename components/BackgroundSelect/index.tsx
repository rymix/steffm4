import FilterAlt from "@mui/icons-material/FilterAlt";
import FilterAltOff from "@mui/icons-material/FilterAltOff";
import {
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import Macintosh from "components/BackgroundSelect/Macintosh";
import RetroPC from "components/BackgroundSelect/RetroPC";
import {
  StyledBackgroundAutoChangeToggle,
  StyledBackgroundButton,
  StyledBackgroundButtons,
  StyledBackgroundSelect,
} from "components/BackgroundSelect/StyledBackgroundSelect";
import {
  StyledMixListCategories,
  StyledMixListCategory,
  StyledToggle,
} from "components/MixList/StyledMixList";
import { useMixcloud } from "contexts/mixcloud";
import type { BackgroundCategory, BackgroundExtended } from "db/types";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { essentialLogger } from "utils/logger";

export const BackgroundSelect: React.FC = () => {
  const {
    session: {
      background,
      backgroundAutoChange,
      filterBackgroundCategory,
      setBackground,
      setBackgroundAutoChange,
      setFilterBackgroundCategory,
    },
  } = useMixcloud();

  const [backgroundCategories, setBackgroundCategories] = useState<
    BackgroundCategory[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [backgrounds, setBackgrounds] = useState<BackgroundExtended[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const handleToggleAutoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setBackgroundAutoChange(event.target.checked);
  };

  const handleFilterBackgroundCategory = (
    localBackground: string | undefined,
  ): void => {
    if (
      filterBackgroundCategory === localBackground ||
      localBackground === "all"
    ) {
      setFilterBackgroundCategory(undefined);
      return;
    }

    setFilterBackgroundCategory(localBackground);
  };

  const handleToggleFilters = (): void => {
    if (showFilters) {
      setFilterBackgroundCategory(undefined);
    }

    setShowFilters(!showFilters);
  };

  const fetchBackgroundCategories = async (): Promise<void> => {
    try {
      const response = await fetch("/api/background/categories");
      if (!response.ok)
        throw new Error("Failed to fetch background categories");

      const categoriesData = await response.json();
      setBackgroundCategories(categoriesData);
    } catch (error) {
      essentialLogger.error("Failed to fetch background categories:", error);
    }
  };

  const fetchBackgrounds = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const backgroundsResponse = await fetch(`/api/background/backgrounds`);
      if (!backgroundsResponse.ok) throw new Error("Data fetch failed");
      let backgroundsData: BackgroundExtended[] =
        await backgroundsResponse.json();

      if (filterBackgroundCategory) {
        backgroundsData = backgroundsData.filter(
          (localBackground) =>
            localBackground.backgroundCategory === filterBackgroundCategory,
        );
      }

      backgroundsData = _.orderBy(
        backgroundsData,
        ["backgroundCategory", "name"],
        ["asc", "asc"],
      );

      setBackgrounds(backgroundsData);

      if (backgroundsData.length > 0) {
        if (
          !backgroundsData.some((bg) => bg.fileName === background?.fileName)
        ) {
          let filteredBackgrounds = backgroundsData;
          if (filterBackgroundCategory) {
            filteredBackgrounds = backgroundsData.filter(
              (bg) => bg.backgroundCategory === filterBackgroundCategory,
            );
          }
          if (filteredBackgrounds.length > 0) {
            const randomIndex = Math.floor(
              Math.random() * filteredBackgrounds.length,
            );
            setBackground(filteredBackgrounds[randomIndex]);
          } else if (backgroundsData.length > 0) {
            const randomIndex = Math.floor(
              Math.random() * backgroundsData.length,
            );
            setBackground(backgroundsData[randomIndex]);
          }
        }
      } else {
        setBackground(undefined);
      }
    } catch (error) {
      essentialLogger.error("Failed to fetch background categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviousBackground = (): void => {
    if (backgrounds.length === 0) return;

    const currentIndex = backgrounds.findIndex(
      (bg) => bg.fileName === background?.fileName,
    );
    const newIndex =
      currentIndex === 0 ? backgrounds.length - 1 : currentIndex - 1;
    setBackground(backgrounds[newIndex]);
  };

  const handleNextBackground = (): void => {
    if (backgrounds.length === 0) return;

    const currentIndex = backgrounds.findIndex(
      (bg) => bg.fileName === background?.fileName,
    );
    const newIndex = (currentIndex + 1) % backgrounds.length;
    setBackground(backgrounds[newIndex]);
  };

  useEffect(() => {
    fetchBackgroundCategories();
    fetchBackgrounds();
  }, []);

  useEffect(() => {
    fetchBackgrounds();
  }, [filterBackgroundCategory]);

  return (
    <StyledBackgroundSelect>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <>
          <StyledToggle onClick={handleToggleFilters}>
            {showFilters ? <FilterAltOff /> : <FilterAlt />}
          </StyledToggle>
          {showFilters && backgroundCategories && (
            <StyledMixListCategories>
              <StyledMixListCategory
                onClick={() => handleFilterBackgroundCategory("all")}
                $on={
                  filterBackgroundCategory === "all" ||
                  !filterBackgroundCategory
                }
              >
                All Backgrounds
              </StyledMixListCategory>

              {backgroundCategories?.map(
                (backgroundCategory: BackgroundCategory) =>
                  backgroundCategory.code !== "all" && (
                    <StyledMixListCategory
                      key={backgroundCategory.code}
                      onClick={() =>
                        handleFilterBackgroundCategory(backgroundCategory.code)
                      }
                      $on={filterBackgroundCategory === backgroundCategory.code}
                    >
                      {backgroundCategory.name}
                    </StyledMixListCategory>
                  ),
              )}
            </StyledMixListCategories>
          )}
        </>
      )}
      <StyledBackgroundButtons>
        <StyledBackgroundButton
          type="button"
          onClick={handlePreviousBackground}
        >
          Previous
        </StyledBackgroundButton>
        <StyledBackgroundButton type="button" onClick={handleNextBackground}>
          Next
        </StyledBackgroundButton>
      </StyledBackgroundButtons>
      <StyledBackgroundAutoChangeToggle>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={backgroundAutoChange}
                onChange={handleToggleAutoChange}
              />
            }
            label="Auto-change background"
          />
        </FormGroup>
      </StyledBackgroundAutoChangeToggle>
      {background?.backgroundCategoryObject?.type === "Macintosh" ? (
        <Macintosh />
      ) : (
        <RetroPC />
      )}{" "}
    </StyledBackgroundSelect>
  );
};

export default BackgroundSelect;
