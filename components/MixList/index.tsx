/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import FilterAlt from "@mui/icons-material/FilterAlt";
import FilterAltOff from "@mui/icons-material/FilterAltOff";
import Search from "@mui/icons-material/Search";
import SearchOff from "@mui/icons-material/SearchOff";
import { CircularProgress } from "@mui/material";
import MixRow from "components/MixList/MixRow";
import {
  StyledControls,
  StyledMixListCategories,
  StyledMixListCategory,
  StyledNoResults,
  StyledSearchBox,
  StyledSearchButton,
  StyledSearchContainer,
  StyledToggle,
} from "components/MixList/StyledMixList";
import { useMixcloud } from "contexts/mixcloud";
import type { Category, Mix } from "db/types";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";

export const MixList: React.FC = () => {
  const {
    favourites: { favouritesList },
    filters: { categories },
  } = useMixcloud();
  const [filterCategory, setFilterCategory] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mixes, setMixes] = useState<Mix[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleFilterCategory = (category: string | undefined): void => {
    if (filterCategory === category || category === "all") {
      setFilterCategory(undefined);
      return;
    }

    setFilterCategory(category);
  };

  const handleToggleFilters = (): void => {
    setFilterCategory(undefined);
    setSearchQuery("");
    setSearchResults([]);
    setShowSearch(false);
    setShowFilters(!showFilters);
  };

  const handleToggleSearch = (): void => {
    setFilterCategory(undefined);
    setSearchQuery("");
    setSearchResults([]);
    setShowFilters(false);
    setShowSearch(!showSearch);
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
            (mix) => mix.category === filterCategory,
          );
        }

        mixesData = _.orderBy(
          mixesData,
          ["category", "listOrder"],
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

  const handleSearch = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/search?query=${searchQuery}`);
      if (!response.ok) throw new Error("Search fetch failed");
      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    if (!showSearch) {
      fetchMixes();
    }
  }, [filterCategory, showSearch]);

  useEffect(() => {
    fetchMixes();
  }, []);

  return (
    <>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <>
          <StyledControls>
            <StyledToggle onClick={handleToggleFilters}>
              {showFilters ? <FilterAltOff /> : <FilterAlt />}
            </StyledToggle>
            <StyledToggle onClick={handleToggleSearch}>
              {showSearch ? <SearchOff /> : <Search />}
            </StyledToggle>
          </StyledControls>
          {showFilters && (
            <StyledMixListCategories>
              <StyledMixListCategory
                onClick={() => handleFilterCategory("all")}
                $on={filterCategory === "all" || !filterCategory}
              >
                All Mixes
              </StyledMixListCategory>
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
          {showSearch && (
            <StyledSearchContainer>
              <StyledSearchBox
                ref={searchInputRef}
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <StyledSearchButton type="button" onClick={handleSearch}>
                Go
              </StyledSearchButton>
            </StyledSearchContainer>
          )}
        </>
      )}
      {!isLoading &&
        (showSearch ? (
          <div>
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <MixRow
                  key={result.mixcloudKey || result.trackMatch.trackName}
                  mix={result}
                  highlight={searchQuery}
                  matchType={result.matchType}
                  trackMatch={result.trackMatch}
                />
              ))
            ) : (
              <StyledNoResults>No search results found</StyledNoResults>
            )}
          </div>
        ) : (
          <div>
            {mixes.length > 0 ? (
              mixes.map((mix: Mix) => (
                <MixRow key={mix.mixcloudKey} mix={mix} />
              ))
            ) : (
              <StyledNoResults>No mixes found in this category</StyledNoResults>
            )}
          </div>
        ))}
    </>
  );
};

export default MixList;
