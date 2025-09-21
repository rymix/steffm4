import type { Favourite } from "contexts/mixcloud/types";

import type { MixcloudCoreState } from "./useMixcloudCore";

/**
 * Hook for managing user favourites
 */
export const useFavourites = (coreState: MixcloudCoreState) => {
  const { preferences, data } = coreState;

  // Check if a mix is a favourite
  const isFavourite = (localMcKey: string): boolean => {
    return preferences.favouritesList.some(
      (favourite) => favourite.mcKey === localMcKey,
    );
  };

  // Add a mix to favourites
  const addFavourite = (localMcKey: string): void => {
    if (!isFavourite(localMcKey)) {
      const newFavourite: Favourite = { mcKey: localMcKey };
      preferences.setFavouritesList([
        ...preferences.favouritesList,
        newFavourite,
      ]);
    }
  };

  // Remove a mix from favourites
  const removeFavourite = (localMcKey: string): void => {
    const updatedFavourites = preferences.favouritesList.filter(
      (favourite) => favourite.mcKey !== localMcKey,
    );
    preferences.setFavouritesList(updatedFavourites);
  };

  // Get random favourite mix key
  const getRandomFavouriteMcKey = async (): Promise<string> => {
    if (preferences.favouritesList.length === 0) {
      throw new Error("No favourites available");
    }

    const randomIndex = Math.floor(
      Math.random() * preferences.favouritesList.length,
    );
    return preferences.favouritesList[randomIndex].mcKey;
  };

  // Check if current mix is favourite
  const mixIsFavourite = data.mixDetails
    ? isFavourite(data.mixDetails.mixcloudKey)
    : false;

  return {
    // State
    favouritesList: preferences.favouritesList,
    setFavouritesList: preferences.setFavouritesList,
    mixIsFavourite,

    // Actions
    addFavourite,
    removeFavourite,
    isFavourite,
    getRandomFavouriteMcKey,
  };
};

export type FavouritesState = ReturnType<typeof useFavourites>;
