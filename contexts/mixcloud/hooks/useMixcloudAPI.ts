import type { Category, Mix } from "db/types";
import { useCallback, useEffect } from "react";
import { logger } from "utils/logger";

import type { MixcloudAPIReturn } from "../types";
import type { MixcloudCoreState } from "./useMixcloudCore";

/**
 * Hook for managing Mixcloud API calls and data fetching
 */
export const useMixcloudAPI = (
  coreState: MixcloudCoreState,
): MixcloudAPIReturn => {
  const { filters } = coreState;

  // ================================================================
  // API FUNCTIONS
  // ================================================================

  // Fetch random mix key
  const fetchRandomMcKey = useCallback(async (): Promise<string> => {
    try {
      const response = await fetch("/api/randomMix");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.mcKey;
    } catch (error) {
      logger.warning(`Failed to fetch random mix: ${error}`);
      throw error;
    }
  }, []);

  // Fetch random mix key by category
  const fetchRandomMcKeyByCategory = useCallback(
    async (category: string | null): Promise<string> => {
      try {
        const url = category
          ? `/api/randomMix/${encodeURIComponent(category)}`
          : "/api/randomMix";

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.mcKey;
      } catch (error) {
        logger.warning(`Failed to fetch random mix by category: ${error}`);
        throw error;
      }
    },
    [],
  );

  // Fetch latest mix key
  const fetchLatestMcKey = useCallback(async (): Promise<string> => {
    try {
      const response = await fetch("/api/latestMixes?limit=1");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.mixes || data.mixes.length === 0) {
        throw new Error("No latest mixes found");
      }
      return data.mixes[0].mcKey;
    } catch (error) {
      logger.warning(`Failed to fetch latest mix: ${error}`);
      throw error;
    }
  }, []);

  // Fetch mix details
  const fetchMixDetails = useCallback(async (mcKey: string): Promise<Mix> => {
    try {
      const response = await fetch(`/api/mix/${encodeURIComponent(mcKey)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      logger.warning(`Failed to fetch mix details for ${mcKey}: ${error}`);
      throw error;
    }
  }, []);

  // Fetch categories
  const fetchCategories = useCallback(async (): Promise<Category[]> => {
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.categories || [];
    } catch (error) {
      logger.warning(`Failed to fetch categories: ${error}`);
      throw error;
    }
  }, []);

  // Fetch mixes for filters
  const fetchMixes = useCallback(async (): Promise<Mix[]> => {
    try {
      const response = await fetch("/api/mixes");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.mixes || [];
    } catch (error) {
      logger.warning(`Failed to fetch mixes: ${error}`);
      throw error;
    }
  }, []);

  // ================================================================
  // EFFECTS
  // ================================================================

  // Load categories on mount
  useEffect(() => {
    const loadCategories = async (): Promise<void> => {
      try {
        const categoriesData = await fetchCategories();
        filters.setCategories(categoriesData);
      } catch (error) {
        logger.warning(`Failed to load categories: ${error}`);
      }
    };

    if (!filters.categories) {
      loadCategories();
    }
  }, [fetchCategories, filters.categories, filters.setCategories]);

  // Load mixes on mount
  useEffect(() => {
    const loadMixes = async (): Promise<void> => {
      try {
        const mixesData = await fetchMixes();
        filters.setMixes(mixesData);
      } catch (error) {
        logger.warning(`Failed to load mixes: ${error}`);
      }
    };

    if (filters.mixes.length === 0) {
      loadMixes();
    }
  }, [fetchMixes, filters.mixes.length, filters.setMixes]);

  return {
    // API functions
    fetchRandomMcKey,
    fetchRandomMcKeyByCategory,
    fetchLatestMcKey,
    fetchMixDetails,
    fetchCategories,
    fetchMixes,

    // State from core
    categories: filters.categories,
    mixes: filters.mixes,
  };
};

export type MixcloudAPIState = ReturnType<typeof useMixcloudAPI>;
