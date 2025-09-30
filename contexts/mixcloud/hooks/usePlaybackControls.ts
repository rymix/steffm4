import { useCallback } from "react";
import useSound from "use-sound";
import { logger } from "utils/logger";

import type { PlaybackControlsReturn } from "../types";
import type { MixcloudCoreState } from "./useMixcloudCore";

/**
 * Hook for managing playback controls (play, pause, seek, volume)
 */
export const usePlaybackControls = (
  coreState: MixcloudCoreState,
): PlaybackControlsReturn => {
  const { widget, preferences, refs, data } = coreState;

  // ================================================================
  // SOUND EFFECTS
  // ================================================================

  const [playClick] = useSound("/audio/click.mp3", {
    volume: preferences.enableAudio ? 0.5 : 0,
  });
  const [playSeek] = useSound("/audio/seek.mp3", {
    volume: preferences.enableAudio ? 0.3 : 0,
  });

  // ================================================================
  // PLAYBACK CONTROL FUNCTIONS
  // ================================================================

  // Handle play action
  const handlePlay = useCallback((): void => {
    if (widget.player && widget.loaded) {
      logger.play("Play requested");

      if (preferences.enableAudio) {
        playClick();
      }

      widget.player.play();
      widget.setPlaying(true);

      // Clear any pending pause timeout
      if (refs.pauseTimeout.current) {
        clearTimeout(refs.pauseTimeout.current);
        refs.pauseTimeout.current = null;
      }
    }
  }, [
    widget.player,
    widget.loaded,
    preferences.enableAudio,
    playClick,
    widget.setPlaying,
    refs.pauseTimeout,
  ]);

  // Handle pause action
  const handlePause = useCallback((): void => {
    if (widget.player && widget.loaded) {
      logger.pause("Pause requested");

      if (preferences.enableAudio) {
        playClick();
      }

      widget.player.pause();
      widget.setPlaying(false);
    }
  }, [
    widget.player,
    widget.loaded,
    preferences.enableAudio,
    playClick,
    widget.setPlaying,
  ]);

  // Handle seek action
  const handleSeek = useCallback(
    async (seconds: number): Promise<boolean> => {
      if (!widget.player || !widget.loaded) {
        logger.warning("Seek attempted but player not ready");
        return false;
      }

      try {
        logger.seek(`Seeking to ${seconds}s`);

        if (preferences.enableAudio) {
          playSeek();
        }

        await widget.player.seek(seconds);

        // Update progress states
        data.setMixProgress(seconds);
        if (data.mixDuration > 0) {
          const progressPercent = Math.round(
            (seconds / data.mixDuration) * 100,
          );
          data.setMixProgressPercent(progressPercent);
        }

        return true;
      } catch (error) {
        logger.warning(`Seek failed: ${error}`);
        return false;
      }
    },
    [
      widget.player,
      widget.loaded,
      preferences.enableAudio,
      playSeek,
      data.setMixProgress,
      data.setMixProgressPercent,
      data.mixDuration,
    ],
  );

  // Handle volume change
  const handleVolumeChange = useCallback(
    (newVolume: number): void => {
      const clampedVolume = Math.max(0, Math.min(1, newVolume));
      preferences.setVolume(clampedVolume);

      if (widget.player && widget.loaded) {
        widget.player.setVolume(clampedVolume);
      }
    },
    [widget.player, widget.loaded, preferences.setVolume],
  );

  // Toggle play/pause
  const togglePlayPause = useCallback((): void => {
    if (widget.playing) {
      handlePause();
    } else {
      handlePlay();
    }
  }, [widget.playing, handlePlay, handlePause]);

  return {
    // Actions
    handlePlay,
    handlePause,
    handleSeek,
    handleVolumeChange,
    togglePlayPause,

    // State (from core)
    playing: widget.playing,
    volume: preferences.volume,
    loaded: widget.loaded,
  };
};

export type PlaybackControlsState = ReturnType<typeof usePlaybackControls>;
