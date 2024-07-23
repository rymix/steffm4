/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import FilterAlt from "@mui/icons-material/FilterAlt";
import FilterAltOff from "@mui/icons-material/FilterAltOff";
import { CircularProgress } from "@mui/material";
import { StyledBackgroundSelect } from "components/BackgroundSelect/StyledBackgroundSelect";
import Macintosh from "components/Macintosh";
import {
  StyledFilterToggle,
  StyledMixListCategories,
  StyledMixListCategory,
} from "components/MixList/StyledMixList";
import { useMixcloud } from "contexts/mixcloud";
import type { BackgroundCategory, BackgroundExtended } from "db/types";
import _ from "lodash";
import React, { useEffect, useState } from "react";

export const BackgroundSelect: React.FC = () => {
  const {
    session: { background, setBackground },
  } = useMixcloud();
  const [filterBackgroundCategory, setFilterBackgroundCategory] = useState<
    string | undefined
  >();
  const [backgroundCategories, setBackgroundCategories] = useState<
    BackgroundCategory[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [backgrounds, setBackgrounds] = useState<BackgroundExtended[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const handleFilterBackgroundCategory = (
    localBackground: string | undefined,
  ): void => {
    if (filterBackgroundCategory === localBackground) {
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
      console.error(error);
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
    } catch (error) {
      console.error(error);
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
          <StyledFilterToggle onClick={handleToggleFilters}>
            {showFilters ? <FilterAltOff /> : <FilterAlt />}
          </StyledFilterToggle>
          {showFilters && backgroundCategories && (
            <StyledMixListCategories>
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
      <button type="button" onClick={handlePreviousBackground}>
        Previous
      </button>
      <button type="button" onClick={handleNextBackground}>
        Next
      </button>
      <Macintosh background={background || undefined} />
    </StyledBackgroundSelect>
  );
};

export default BackgroundSelect;
