/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import FilterAlt from "@mui/icons-material/FilterAlt";
import FilterAltOff from "@mui/icons-material/FilterAltOff";
import { CircularProgress } from "@mui/material";
import {
  StyledBackgroundSelect,
  StyledPreviewBackground,
} from "components/BackgroundSelect/StyledBackgroundSelect";
import Macintosh from "components/Macintosh";
import {
  StyledFilterToggle,
  StyledMixListCategories,
  StyledMixListCategory,
} from "components/MixList/StyledMixList";
import { useMixcloud } from "contexts/mixcloud";
import type { Background, BackgroundCategory } from "db/types";
import _ from "lodash";
import React, { useEffect, useState } from "react";

export const BackgroundSelect: React.FC = () => {
  const {
    favourites: { favouritesList },
    filters: { categories },
  } = useMixcloud();
  const [filterBackgroundCategory, setFilterBackgroundCategory] = useState<
    string | undefined
  >();
  const [backgroundCategories, setBackgroundCategories] = useState<
    BackgroundCategory[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [background, setBackground] = useState<Background>();
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const handleFilterBackgroundCategory = (
    background: string | undefined,
  ): void => {
    if (filterBackgroundCategory === background) {
      setFilterBackgroundCategory(undefined);
      return;
    }

    setFilterBackgroundCategory(background);
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
      let backgroundsData: Background[] = await backgroundsResponse.json();

      if (filterBackgroundCategory) {
        backgroundsData = backgroundsData.filter(
          (background) => background.fileName === filterBackgroundCategory,
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

  const handleBackgroundPreviewLoad = (localBackground: Background): void => {
    setBackground(localBackground);
  };

  useEffect(() => {
    fetchBackgrounds();
  }, [filterBackgroundCategory]);

  useEffect(() => {
    fetchBackgroundCategories();
    fetchBackgrounds();
  }, []);

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
      <Macintosh>
        <StyledPreviewBackground
          $backgroundImage={`windows/${background?.backgroundCategory}/${background?.fileName}`}
          $tileType={background?.tileType}
        />
      </Macintosh>
      <ul>
        {!isLoading &&
          (backgrounds?.length ? (
            backgrounds.map((background: Background) => {
              return (
                <li
                  onClick={() => {
                    handleBackgroundPreviewLoad(background);
                  }}
                >
                  {background.name}
                </li>
              );
            })
          ) : (
            <div>No backgrounds found in this category</div>
          ))}
      </ul>
    </StyledBackgroundSelect>
  );
};

export default BackgroundSelect;
