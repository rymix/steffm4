import FilterAlt from "@mui/icons-material/FilterAlt";
import FilterAltOff from "@mui/icons-material/FilterAltOff";
import HeadsetIcon from "@mui/icons-material/Headset";
import HeadsetOffIcon from "@mui/icons-material/HeadsetOff";
import Search from "@mui/icons-material/Search";
import SearchOff from "@mui/icons-material/SearchOff";
import Update from "@mui/icons-material/Update";
import UpdateDisabled from "@mui/icons-material/UpdateDisabled";
import { CircularProgress } from "@mui/material";
import MixRow from "components/MixList/MixRow";
import {
  StyledControls,
  StyledMixListCategories,
  StyledMixListCategory,
  StyledMixUploadedDateTitle,
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
  const [latestMixes, setLatestMixes] = useState<Mix[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showLatest, setShowLatest] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showUnplayed, setShowUnplayed] = useState<boolean>(false);
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

  const resetViews = (): void => {
    setShowFilters(false);
    setShowLatest(false);
    setShowSearch(false);
    setShowUnplayed(false);
    setFilterCategory(undefined);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleToggleFilters = (): void => {
    resetViews();
    setShowFilters(!showFilters);
  };

  const handleToggleSearch = (): void => {
    resetViews();
    setShowSearch(!showSearch);
  };

  const handleToggleLatest = (): void => {
    resetViews();
    setShowLatest(!showLatest);
  };

  const handleToggleUnplayed = (): void => {
    resetViews();
    setShowUnplayed(!showUnplayed);
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

  const fetchLatestMixes = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/latestMixes`);
      if (!response.ok) throw new Error("Data fetch failed");
      const latestMixesData = await response.json();
      setLatestMixes(latestMixesData);
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
    if (!showSearch && !showLatest) {
      fetchMixes();
    }
  }, [filterCategory, showSearch, showLatest]);

  useEffect(() => {
    if (showLatest) {
      fetchLatestMixes();
    } else {
      fetchMixes();
    }
  }, [showLatest]);

  useEffect(() => {
    fetchMixes();
  }, []);

  return (
    <>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <>
          <StyledControls>
            <StyledToggle
              onClick={handleToggleFilters}
              $on={showFilters}
              $default={!showSearch && !showLatest && !showUnplayed}
            >
              {showFilters ? <FilterAltOff /> : <FilterAlt />}
              <div>Categoriers</div>
            </StyledToggle>
            <StyledToggle onClick={handleToggleSearch} $on={showSearch}>
              {showSearch ? <SearchOff /> : <Search />}
              <div>Search</div>
            </StyledToggle>
            <StyledToggle onClick={handleToggleLatest} $on={showLatest}>
              {showLatest ? <UpdateDisabled /> : <Update />}
              <div>New Mixes</div>
            </StyledToggle>
            <StyledToggle onClick={handleToggleUnplayed} $on={showUnplayed}>
              {showUnplayed ? <HeadsetOffIcon /> : <HeadsetIcon />}
              <div>Unplayed</div>
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
      {!isLoading && showSearch && (
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
      )}
      {!isLoading && showLatest && (
        <div>
          <h2>Latest mixes</h2>
          {latestMixes.length > 0 ? (
            latestMixes.map((mix: Mix) => (
              <div key={mix.mixcloudKey}>
                <StyledMixUploadedDateTitle>
                  Uploaded on {mix.uploadedDate}
                </StyledMixUploadedDateTitle>
                <MixRow mix={mix} />
              </div>
            ))
          ) : (
            <StyledNoResults>No recent mixes found</StyledNoResults>
          )}
        </div>
      )}
      {!isLoading && showFilters && (
        <div>
          {mixes.length > 0 ? (
            mixes.map((mix: Mix) => <MixRow key={mix.mixcloudKey} mix={mix} />)
          ) : (
            <StyledNoResults>No mixes found in this category</StyledNoResults>
          )}
        </div>
      )}
      {!isLoading && showUnplayed && (
        <div>
          {mixes.length > 0 ? (
            mixes.map((mix: Mix) => <MixRow key={mix.mixcloudKey} mix={mix} />)
          ) : (
            <StyledNoResults>No mixes found in this category</StyledNoResults>
          )}
        </div>
      )}
      {!isLoading &&
        !showFilters &&
        !showSearch &&
        !showLatest &&
        !showUnplayed && (
          <div>
            {mixes.length > 0 ? (
              mixes.map((mix: Mix) => (
                <MixRow key={mix.mixcloudKey} mix={mix} />
              ))
            ) : (
              <StyledNoResults>No mixes found</StyledNoResults>
            )}
          </div>
        )}
    </>
  );
};

export default MixList;
