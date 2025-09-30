import MobilePlayButton from "components/MobilePlayButton";
import React, { useCallback, useRef } from "react";
import { mcKeyFormatter, mcWidgetUrlFormatter } from "utils/functions";
import { essentialLogger, logger } from "utils/logger";
import {
  mobileAutoplayManager,
  useAutoplayInteractionTracking,
} from "utils/mobileAutoplayHelper";

import type { WidgetManagementReturn } from "../types";
import type { MixcloudAPIState } from "./useMixcloudAPI";
import type { MixcloudCoreState } from "./useMixcloudCore";
import type { ModalWithTimerState } from "./useModalWithTimer";

/**
 * Hook for managing Mixcloud widget functionality
 * Handles complex widget initialization, mobile autoplay detection, and event management
 */
export const useWidgetManagement = (
  coreState: MixcloudCoreState,
  api: MixcloudAPIState,
  modal: ModalWithTimerState,
  handleNext: () => void,
): WidgetManagementReturn => {
  const { refs, widget, data, core } = coreState;
  const { isMobile } = useAutoplayInteractionTracking();

  // Mobile autoplay detection ref
  const mobileAutoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const mobileAutoplayDetectionRef = useRef({
    isDetecting: false,
    wasPlaying: false,
    hasStartedPlaying: false,
    detectionStartTime: 0,
    shouldShowModal: false,
  });

  // ================================================================
  // CORE WIDGET FUNCTIONS
  // ================================================================

  // Setup event listeners for widget
  const setupEventListeners = useCallback(
    (widgetInstance: any): void => {
      logger.setup("Setting up event listeners");

      widgetInstance.events.play.on(() => {
        logger.play("PLAY event");
        widget.setPlaying(true);
        refs.endedEvent.current = false;
      });

      widgetInstance.events.pause.on(() => {
        logger.pause("PAUSE event");
        widget.setPlaying(false);

        if (refs.pauseTimeout.current) {
          clearTimeout(refs.pauseTimeout.current);
        }

        refs.pauseTimeout.current = setTimeout(() => {
          if (!refs.endedEvent.current) {
            logger.success("Genuine pause (not end-of-mix)");
          }
          refs.pauseTimeout.current = null;
        }, 500);
      });

      widgetInstance.events.progress.on((position: number, dur?: number) => {
        data.setMixProgress(position);
        if (dur && dur > 0) {
          data.setMixDuration(dur);
          data.setMixProgressPercent((position / dur) * 100);
        }
      });

      widgetInstance.events.ended.on(() => {
        logger.ended("ENDED event - auto-advancing");
        widget.setPlaying(false);
        refs.endedEvent.current = true;

        if (refs.pauseTimeout.current) {
          clearTimeout(refs.pauseTimeout.current);
          refs.pauseTimeout.current = null;
        }

        setTimeout(() => {
          handleNext();
        }, 500);
      });

      widgetInstance.events.error.on((error: any) => {
        essentialLogger.error(`ERROR: ${JSON.stringify(error)}`);
      });
    },
    [
      widget.setPlaying,
      refs.endedEvent,
      refs.pauseTimeout,
      data.setMixProgress,
      data.setMixDuration,
      data.setMixProgressPercent,
      handleNext,
    ],
  );

  // Main mix changing function with mobile autoplay detection
  const changeMix = useCallback(
    (mixKey: string, autoplay = true): void => {
      if (!refs.iframe.current) {
        essentialLogger.error("No iframe reference - cannot change mix");
        return;
      }

      // If temp route value is active, only allow widget initialization
      if (core.tempRouteValue) {
        logger.widget(
          `Temp route active - initializing widget without changing mix: ${core.tempRouteValue}`,
        );

        setTimeout(() => {
          if (!(globalThis as any).Mixcloud?.PlayerWidget) {
            logger.widget(
              "Mixcloud script not ready yet, skipping widget initialization",
            );
            return;
          }

          const freshWidget = (globalThis as any).Mixcloud.PlayerWidget(
            refs.iframe.current,
          );
          freshWidget.ready.then(() => {
            essentialLogger.widgetReady(
              `Widget ready for temp route: ${core.tempRouteValue}`,
            );
            widget.setPlayer(freshWidget);
            setupEventListeners(freshWidget);
            widget.setLoaded(true);
            widget.setPlaying(autoplay);
          });
        }, 1000);
        return;
      }

      logger.widget(`Changing mix to: ${mixKey}`);

      // Reset all state
      data.setMixProgress(0);
      data.setMixProgressPercent(0);
      data.setMixDuration(0);
      const wasPlaying = widget.playing;
      widget.setPlaying(false);
      refs.mcKey.current = mixKey;

      // Clear any existing mobile autoplay timer
      if (mobileAutoplayTimerRef.current) {
        clearTimeout(mobileAutoplayTimerRef.current);
        mobileAutoplayTimerRef.current = null;
      }

      // Start mobile autoplay detection if was playing on mobile
      if (isMobile() && wasPlaying && autoplay) {
        logger.widget(
          "Starting mobile autoplay detection - monitoring for start/stop pattern",
        );

        // Initialize detection state
        const detection = mobileAutoplayDetectionRef.current;
        detection.isDetecting = true;
        detection.wasPlaying = wasPlaying;
        detection.hasStartedPlaying = false;
        detection.detectionStartTime = Date.now();

        // Start polling to detect the "starts then stops" pattern
        let pollCount = 0;
        const maxPolls = 15; // Poll for 3 seconds (15 * 200ms)
        const pollInterval = 200; // Poll every 200ms

        const pollForAutoplayFailure = (): void => {
          pollCount += 1;
          const currentTime = Date.now();
          const elapsed = currentTime - detection.detectionStartTime;

          if (widget.playing && !detection.hasStartedPlaying) {
            // Audio started playing - mark it
            logger.widget("Mobile autoplay detection: Audio started playing");
            detection.hasStartedPlaying = true;
          }

          if (
            detection.hasStartedPlaying &&
            !widget.playing &&
            elapsed < 3000
          ) {
            // Audio started then stopped within 3 seconds - autoplay failed!
            logger.warning(
              "Mobile autoplay failed: Started then stopped within detection window",
            );

            // Clear polling timer
            if (mobileAutoplayTimerRef.current) {
              clearTimeout(mobileAutoplayTimerRef.current);
              mobileAutoplayTimerRef.current = null;
            }

            // Show recovery modal after a brief delay
            setTimeout(() => {
              modal.openModal(
                React.createElement(MobilePlayButton, {
                  mixName: data.mixDetails?.name,
                  onPlay: () => {
                    if (widget.player) {
                      widget.player.play();
                      widget.setPlaying(true);
                    }
                    modal.handleCloseModal();
                  },
                }),
                undefined, // no title
                undefined, // no timeout
                true, // hide chrome
              );
            }, 100);

            detection.isDetecting = false;
            return;
          }

          // Continue polling if we haven't reached max polls and still detecting
          if (pollCount < maxPolls && detection.isDetecting) {
            mobileAutoplayTimerRef.current = setTimeout(
              pollForAutoplayFailure,
              pollInterval,
            );
          } else {
            // Polling complete or detection stopped
            if (widget.playing) {
              logger.success(
                "Mobile autoplay succeeded - stable playback detected",
              );
            }
            detection.isDetecting = false;
            mobileAutoplayTimerRef.current = null;
          }
        };

        // Start the polling
        mobileAutoplayTimerRef.current = setTimeout(
          pollForAutoplayFailure,
          pollInterval,
        );
      }

      // Fetch mix details for the new key
      api.fetchMixDetails(mixKey).then((fetchedMixDetails) => {
        if (fetchedMixDetails) {
          data.setMixDetails(fetchedMixDetails);
        }
      });

      // Use mobile autoplay helper for better mobile compatibility
      if (isMobile() && autoplay) {
        const strategy = mobileAutoplayManager.getRecreationStrategy();
        logger.widget(`Mobile autoplay strategy:`, strategy);

        mobileAutoplayManager.recreateIframeWithBetterAutoplay(
          { current: refs.iframe.current },
          mixKey,
          (freshWidget) => {
            essentialLogger.widgetReady(`Widget ready: ${mixKey}`);
            widget.setPlayer(freshWidget);
            setupEventListeners(freshWidget);
            widget.setLoaded(true);
            if (strategy.shouldAttemptAutoplay) {
              widget.setPlaying(true);
            }

            // Get duration with retries
            const getDurationWithRetry = (retries = 3): void => {
              setTimeout(async () => {
                try {
                  const dur = await freshWidget.getDuration();
                  if (dur > 0) {
                    logger.load(`Duration loaded: ${dur}s`);
                    data.setMixDuration(dur);
                  } else if (retries > 0) {
                    logger.warning(
                      `Duration error, retrying... (${retries} attempts left)`,
                    );
                    getDurationWithRetry(retries - 1);
                  } else {
                    logger.warning(`Duration failed after all retries`);
                  }
                } catch (error) {
                  if (retries > 0) {
                    logger.warning(
                      `Duration error, retrying... (${retries} attempts left)`,
                    );
                    setTimeout(() => getDurationWithRetry(retries - 1), 500);
                  } else {
                    essentialLogger.error(
                      `Duration failed after all retries: ${error}`,
                    );
                  }
                }
              }, 1000);
            };
            getDurationWithRetry();
          },
          (error) => {
            essentialLogger.error(`Mobile widget recreation failed: ${error}`);
          },
        );
        return;
      }

      // Fallback to original approach for desktop or non-autoplay
      const newWidgetUrl = mcWidgetUrlFormatter(mixKey);

      // Update iframe source
      refs.iframe.current.src = newWidgetUrl;

      // Initialize new widget with longer delay for reliability
      setTimeout(() => {
        // Check if Mixcloud script is loaded
        if (!(globalThis as any).Mixcloud?.PlayerWidget) {
          logger.widget(
            "Mixcloud script not ready yet, skipping widget initialization",
          );
          return;
        }

        const freshWidget = (globalThis as any).Mixcloud.PlayerWidget(
          refs.iframe.current,
        );

        freshWidget.ready
          .then(() => {
            essentialLogger.widgetReady(`Widget ready for: ${mixKey}`);
            widget.setPlayer(freshWidget);
            setupEventListeners(freshWidget);
            widget.setLoaded(true);

            // Get duration with retry logic for reliability
            const getDurationWithRetry = async (retries = 3): Promise<void> => {
              try {
                const dur = await freshWidget.getDuration();
                if (dur && dur > 0) {
                  logger.load(`Duration loaded: ${dur}s`);
                  data.setMixDuration(dur);
                  if (autoplay) widget.setPlaying(true);
                } else if (retries > 0) {
                  logger.warning(
                    `Duration not ready, retrying... (${retries} attempts left)`,
                  );
                  setTimeout(() => getDurationWithRetry(retries - 1), 500);
                } else {
                  essentialLogger.error(`Failed to get duration after retries`);
                }
              } catch (error) {
                if (retries > 0) {
                  logger.warning(
                    `Duration error, retrying... (${retries} attempts left)`,
                  );
                  setTimeout(() => getDurationWithRetry(retries - 1), 500);
                } else {
                  essentialLogger.error(
                    `Duration failed after all retries: ${error}`,
                  );
                }
              }
            };

            getDurationWithRetry();
          })
          .catch((error: any) => {
            essentialLogger.error(`Widget ready failed: ${error}`);
          });
      }, 1500); // Increased from 1000ms to 1500ms for reliability
    },
    [
      refs.iframe,
      refs.mcKey,
      refs.endedEvent,
      refs.pauseTimeout,
      core.tempRouteValue,
      widget,
      data,
      isMobile,
      api.fetchMixDetails,
      setupEventListeners,
      modal,
    ],
  );

  // Load mix function with full logic
  const handleLoad = useCallback(
    (localMcKey?: string, isDynamicRoute = false): void => {
      if (!localMcKey) {
        essentialLogger.error("No mcKey provided to handleLoad");
        return;
      }

      if (isDynamicRoute) {
        refs.dynamicRouteHandled.current = true;
      }

      const formattedKey = mcKeyFormatter(localMcKey);
      logger.widget(`handleLoad called:`, {
        originalKey: localMcKey,
        formattedKey,
        currentMcKeyRef: refs.mcKey.current,
        isDynamicRoute,
      });

      // Update widget URL in core state
      const newWidgetUrl = mcWidgetUrlFormatter(formattedKey);
      widget.setWidgetUrl(newWidgetUrl);

      changeMix(formattedKey, true);
    },
    [refs, changeMix, widget.setWidgetUrl],
  );

  return {
    // Functions
    changeMix,
    setupEventListeners,
    handleLoad,

    // Mobile autoplay refs for external access if needed
    mobileAutoplayTimerRef,
    mobileAutoplayDetectionRef,
  };
};

export type WidgetManagementState = ReturnType<typeof useWidgetManagement>;
