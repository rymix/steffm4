/**
 * Mobile Autoplay Helper
 * Utilities to improve autoplay behavior on mobile devices across iframe reloads
 */

export type UserActivationState = {
  hasActivation: boolean;
  lastInteractionTime: number;
  interactionType: string;
};

class MobileAutoplayManager {
  private userActivationState: UserActivationState = {
    hasActivation: false,
    lastInteractionTime: 0,
    interactionType: "none",
  };

  private activationTimeout: NodeJS.Timeout | null = null;

  /**
   * Record user interaction that can enable autoplay
   */
  recordUserInteraction(interactionType: string): void {
    this.userActivationState = {
      hasActivation: true,
      lastInteractionTime: Date.now(),
      interactionType,
    };

    // Clear any existing timeout
    if (this.activationTimeout) {
      clearTimeout(this.activationTimeout);
    }

    // User activation typically expires after 5 seconds of inactivity on mobile
    // We'll be more conservative and assume 3 seconds
    this.activationTimeout = setTimeout(() => {
      this.userActivationState.hasActivation = false;
    }, 3000);
  }

  /**
   * Check if we likely have user activation for autoplay
   */
  canLikelyAutoplay(): boolean {
    const timeSinceInteraction =
      Date.now() - this.userActivationState.lastInteractionTime;
    return (
      this.userActivationState.hasActivation && timeSinceInteraction < 2500
    );
  }

  /**
   * Get recommendation for iframe recreation strategy
   */
  getRecreationStrategy(): {
    shouldAttemptAutoplay: boolean;
    shouldUseMediaGesture: boolean;
    delayBeforePlay: number;
  } {
    const canAutoplay = this.canLikelyAutoplay();

    return {
      shouldAttemptAutoplay: canAutoplay,
      shouldUseMediaGesture: canAutoplay, // Try to trigger within user gesture context
      delayBeforePlay: canAutoplay ? 100 : 0, // Short delay if we have activation
    };
  }

  /**
   * Create iframe URL with appropriate autoplay settings
   */
  static createWidgetUrl(mixKey: string, shouldAutoplay: boolean): string {
    const autoplayParam = shouldAutoplay ? "&autoplay=1" : "";
    return `https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&hide_tracklist=1&mini=1${autoplayParam}&feed=${encodeURIComponent(`https://www.mixcloud.com${mixKey}`)}`;
  }

  /**
   * Enhanced iframe recreation with mobile-optimized approach
   */

  recreateIframeWithBetterAutoplay(
    iframeRef: React.RefObject<HTMLIFrameElement>,
    mixKey: string,
    onWidgetReady: (_widget: any) => void,
    onError: (_error: any) => void,
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!iframeRef.current) {
        onError(new Error("No iframe reference"));
        reject(new Error("No iframe reference"));
        return;
      }

      const strategy = this.getRecreationStrategy();
      const newWidgetUrl = MobileAutoplayManager.createWidgetUrl(
        mixKey,
        strategy.shouldAttemptAutoplay,
      );

      // Update iframe source
      const iframe = iframeRef.current;
      iframe.src = newWidgetUrl;

      const setupWidget = async (): Promise<void> => {
        if (!(globalThis as any).Mixcloud?.PlayerWidget) {
          onError(new Error("Mixcloud script not ready"));
          resolve();
          return;
        }

        try {
          const freshWidget = (globalThis as any).Mixcloud.PlayerWidget(
            iframeRef.current,
          );

          await freshWidget.ready;

          if (
            strategy.shouldUseMediaGesture &&
            strategy.shouldAttemptAutoplay
          ) {
            // Try to trigger play within the user gesture context
            setTimeout(async () => {
              try {
                await freshWidget.play();
              } catch {
                // Fallback: just report widget as ready without auto-play
                console.log(
                  "🎵 Autoplay failed on mobile, widget ready for manual play",
                );
              }
            }, strategy.delayBeforePlay);
          }

          onWidgetReady(freshWidget);
          resolve();
        } catch (error) {
          onError(error);
          resolve();
        }
      };

      // Small delay to ensure iframe is ready
      setTimeout(setupWidget, 500);
    });
  }

  /**
   * Check if current environment is likely mobile
   */
  static isMobileEnvironment(): boolean {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile =
      /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent,
      );
    const isTouchDevice =
      "ontouchstart" in globalThis || navigator.maxTouchPoints > 0;

    return isMobile || isTouchDevice;
  }

  /**
   * Check if current browser has strict autoplay policies
   */
  static hasStrictAutoplayPolicy(): boolean {
    const userAgent = navigator.userAgent.toLowerCase();
    // Chrome, Safari, and most mobile browsers have strict policies
    return /chrome|safari|mobile/i.test(userAgent);
  }
}

// Singleton instance
export const mobileAutoplayManager = new MobileAutoplayManager();

/**
 * Hook to track user interactions for autoplay purposes
 */
const trackInteraction = (interactionType: string): void => {
  mobileAutoplayManager.recordUserInteraction(interactionType);
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAutoplayInteractionTracking = () => {
  return {
    trackInteraction,
    canLikelyAutoplay: (): boolean => mobileAutoplayManager.canLikelyAutoplay(),
    isMobile: (): boolean => MobileAutoplayManager.isMobileEnvironment(),
  };
};
