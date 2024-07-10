/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import FilterAlt from "@mui/icons-material/FilterAlt";
import FilterAltOff from "@mui/icons-material/FilterAltOff";
import { CircularProgress } from "@mui/material";
import MixRow from "components/MixList/MixRow";
import {
  StyledFilterToggle,
  StyledMixListCategories,
  StyledMixListCategory,
} from "components/MixList/StyledMixList";
import { useMixcloud } from "contexts/mixcloud";
import type { Category, Mix } from "db/types";
import _ from "lodash";
import React, { useEffect, useState } from "react";

export const MixList: React.FC = () => {
  const {
    favourites: { favouritesList },
    filters: { categories },
  } = useMixcloud();
  const [filterCategory, setFilterCategory] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mixes, setMixes] = useState<Mix[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const handleFilterCategory = (category: string | undefined): void => {
    if (filterCategory === category) {
      setFilterCategory(undefined);
      return;
    }

    setFilterCategory(category);
  };

  const handleToggleFilters = (): void => {
    if (showFilters) {
      setFilterCategory(undefined);
    }

    setShowFilters(!showFilters);
  };

  const fetchFavouriteMixes = async (): Promise<Mix[]> => {
    try {
      if (favouritesList.length === 0) {
        return [];
      }

      const mixPromises = favouritesList.map((favourite) =>
        fetch(`/api/mix/${favourite.mcKey}`).then((response) => {
          if (!response.ok) throw new Error("Data fetch failed");
          return response.json();
        }),
      );

      const favouriteMixes = await Promise.all(mixPromises);
      return favouriteMixes;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const fetchMixes = async (): Promise<void> => {
    try {
      setIsLoading(true);
      if (filterCategory === "fav") {
        const favouriteMixes = await fetchFavouriteMixes();
        setMixes(favouriteMixes);
      } else {
        const mixesResponse = await fetch(`/api/mixes`);
        if (!mixesResponse.ok) throw new Error("Data fetch failed");
        let mixesData: Mix[] = await mixesResponse.json();

        if (filterCategory) {
          mixesData = mixesData.filter(
            (mix) => (mix.category as any).code === filterCategory,
          );
        }

        mixesData = _.orderBy(
          mixesData,
          ["category.code", "listOrder"],
          ["asc", "asc"],
        );

        setMixes(mixesData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMixes();
  }, [filterCategory]);

  useEffect(() => {
    fetchMixes();
  }, []);

  return (
    <>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <>
          <StyledFilterToggle onClick={handleToggleFilters}>
            {showFilters ? <FilterAltOff /> : <FilterAlt />}
          </StyledFilterToggle>
          {showFilters && (
            <StyledMixListCategories>
              {categories?.map(
                (category: Category) =>
                  category.code !== "all" && (
                    <StyledMixListCategory
                      key={category.code}
                      onClick={() => handleFilterCategory(category.code)}
                      $on={filterCategory === category.code}
                    >
                      {category.name}
                    </StyledMixListCategory>
                  ),
              )}
            </StyledMixListCategories>
          )}
        </>
      )}
      {!isLoading &&
        filterCategory !== "fav" &&
        mixes?.map((mix: Mix) => <MixRow key={mix.mixcloudKey} mix={mix} />)}
      {!isLoading &&
        filterCategory === "fav" &&
        mixes?.map((mix: Mix) => <MixRow key={mix.mixcloudKey} mix={mix} />)}
    </>
  );
};

export default MixList;
