import type { Mix } from "db/types";
import themes from "styles/themes";
import { copyToClipboard } from "utils/functions";

import type { ThemeAndSessionReturn } from "../types";
import type { MixcloudCoreState } from "./useMixcloudCore";

/**
 * Hook for managing theme and session-related functionality
 */
export const useThemeAndSession = (
  coreState: MixcloudCoreState,
): ThemeAndSessionReturn => {
  const { preferences, data } = coreState;

  // ================================================================
  // THEME MANAGEMENT
  // ================================================================

  // Get current theme object
  const theme = themes[preferences.themeName] || themes.defaultTheme;

  // ================================================================
  // SESSION HELPERS
  // ================================================================

  // Copy shareable link to clipboard
  const copySharableLink = (localMix?: Mix): void => {
    const mix = localMix || data.mixDetails;
    if (!mix) return;

    const shareUrl = `${globalThis.location.origin}/${mix.mixcloudKey}`;
    copyToClipboard(shareUrl);
  };

  // Get category name for current mix
  const getCategoryName = (): string => {
    if (!data.mixDetails) return "";

    // This would typically look up the category name from the mix data
    // For now, returning the category code or empty string
    return data.mixDetails.category || "";
  };

  return {
    // Theme
    theme,
    themeName: preferences.themeName,
    setThemeName: preferences.setThemeName,

    // Player Theme
    playerTheme: preferences.playerTheme,
    setPlayerTheme: preferences.setPlayerTheme,

    // Background
    background: preferences.background,
    setBackground: preferences.setBackground,
    backgroundAutoChange: preferences.backgroundAutoChange,
    setBackgroundAutoChange: preferences.setBackgroundAutoChange,
    filterBackgroundCategory: preferences.filterBackgroundCategory,
    setFilterBackgroundCategory: preferences.setFilterBackgroundCategory,

    // Display settings
    displayLength: 42, // This will come from responsive hook
    dx7ScreenLight: preferences.dx7ScreenLight,
    setDx7ScreenLight: preferences.setDx7ScreenLight,

    // Audio settings
    enableAudio: preferences.enableAudio,
    setEnableAudio: preferences.setEnableAudio,

    // Keyboard shortcuts
    keyboardShortcutsEnabled: preferences.keyboardShortcutsEnabled,
    setKeyboardShortcutsEnabled: preferences.setKeyboardShortcutsEnabled,

    // Helper functions
    copySharableLink,
    categoryName: getCategoryName(),
  };
};

export type ThemeAndSessionState = ReturnType<typeof useThemeAndSession>;
