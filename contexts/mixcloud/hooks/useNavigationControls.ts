import { useCallback } from "react";
import useSound from "use-sound";
import { logger } from "utils/logger";

import type { FavouritesState } from "./useFavourites";
import type { MixcloudCoreState } from "./useMixcloudCore";

/**
 * Hook for managing navigation controls (next, previous, random)
 */
export const useNavigationControls = (
  coreState: MixcloudCoreState,
  favourites: FavouritesState,
  // We'll need these functions from other hooks - they'll be passed in
  loadMix: (_mcKey: string) => void,
  fetchRandomMcKey: (_category: string | null) => Promise<string>,
  fetchLatestMcKey: () => Promise<string>,
): NavigationControlsState => {
  const { preferences, filters } = coreState;

  // ================================================================
  // SOUND EFFECTS
  // ================================================================

  const [playNext] = useSound("/audio/next.mp3", {
    volume: preferences.enableAudio ? 0.5 : 0,
  });
  const [playPrevious] = useSound("/audio/previous.mp3", {
    volume: preferences.enableAudio ? 0.5 : 0,
  });
  const [playRandom] = useSound("/audio/random.mp3", {
    volume: preferences.enableAudio ? 0.5 : 0,
  });

  // ================================================================
  // NAVIGATION FUNCTIONS
  // ================================================================

  // Handle random mix loading
  const handleRandom = useCallback(
    async (category?: string): Promise<void> => {
      try {
        logger.random(
          `Loading random mix${category ? ` from category: ${category}` : ""}`,
        );

        if (preferences.enableAudio) {
          playRandom();
        }

        const randomMcKey = await fetchRandomMcKey(
          category || preferences.selectedCategory || null,
        );
        loadMix(randomMcKey);
      } catch (error) {
        logger.warning(`Random mix loading failed: ${error}`);
      }
    },
    [
      preferences.enableAudio,
      preferences.selectedCategory,
      playRandom,
      fetchRandomMcKey,
      loadMix,
    ],
  );

  // Handle next mix
  const handleNext = useCallback((): void => {
    logger.next("Next mix requested");

    if (preferences.enableAudio) {
      playNext();
    }

    // For now, load a random mix - could be enhanced with playlist logic
    handleRandom();
  }, [preferences.enableAudio, playNext, handleRandom]);

  // Handle previous mix
  const handlePrevious = useCallback((): void => {
    logger.previous("Previous mix requested");

    if (preferences.enableAudio) {
      playPrevious();
    }

    // For now, load a random mix - could be enhanced with history logic
    handleRandom();
  }, [preferences.enableAudio, playPrevious, handleRandom]);

  // Handle loading latest mix
  const handleLoadLatest = useCallback(async (): Promise<void> => {
    try {
      logger.info("Loading latest mix");
      const latestMcKey = await fetchLatestMcKey();
      loadMix(latestMcKey);
    } catch (error) {
      logger.warning(`Latest mix loading failed: ${error}`);
    }
  }, [fetchLatestMcKey, loadMix]);

  // Handle loading random favourite
  const handleLoadRandomFavourite = useCallback(async (): Promise<void> => {
    try {
      logger.favourite("Loading random favourite");

      if (preferences.enableAudio) {
        playRandom();
      }

      const randomFavouriteMcKey = await favourites.getRandomFavouriteMcKey();
      loadMix(randomFavouriteMcKey);
    } catch (error) {
      logger.warning(`Random favourite loading failed: ${error}`);
    }
  }, [
    preferences.enableAudio,
    playRandom,
    favourites.getRandomFavouriteMcKey,
    loadMix,
  ]);

  // Update selected category
  const updateSelectedCategory = useCallback(
    (index: number): void => {
      if (
        filters.categories &&
        index >= 0 &&
        index < filters.categories.length
      ) {
        const category = filters.categories[index];
        preferences.setSelectedCategory(category.code);
      }
    },
    [filters.categories, preferences.setSelectedCategory],
  );

  return {
    // Actions
    handleNext,
    handlePrevious,
    handleRandom,
    handleLoadLatest,
    handleLoadRandomFavourite,
    updateSelectedCategory,

    // Derived state
    selectedCategory: preferences.selectedCategory,
    categories: filters.categories,
  };
};

export type NavigationControlsState = ReturnType<typeof useNavigationControls>;
