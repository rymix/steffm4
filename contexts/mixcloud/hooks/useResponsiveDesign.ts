import type { Scale } from "contexts/mixcloud/types";
import { useEffect, useState } from "react";
import { DISPLAY_LENGTH } from "utils/constants";
import { DEBUG } from "utils/logger";

import type { MixcloudCoreState } from "./useMixcloudCore";

// Mobile device detection function
const detectMobileDevice = (): boolean => {
  // Method 1: User Agent Client Hints (modern browsers)
  if (
    "userAgentData" in navigator &&
    (navigator as any).userAgentData?.mobile
  ) {
    return true;
  }

  // Method 2: Touch capabilities and screen size
  const hasTouchCapability =
    "ontouchstart" in globalThis || navigator.maxTouchPoints > 0;
  const hasSmallScreen = window.innerWidth <= 1024;

  // Method 3: User Agent string patterns (fallback)
  const mobileUserAgentPattern =
    /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|webOS/i;
  const isMobileUserAgent = mobileUserAgentPattern.test(navigator.userAgent);

  // Method 4: CSS Media Query check
  const isMobileMediaQuery = globalThis.matchMedia(
    "(max-width: 1024px) and (hover: none)",
  ).matches;

  return (
    isMobileUserAgent ||
    (hasTouchCapability && hasSmallScreen) ||
    isMobileMediaQuery
  );
};

/**
 * Hook for managing responsive design and screen calculations
 */
export const useResponsiveDesign = (
  coreState: MixcloudCoreState,
): ResponsiveDesignState => {
  const { refs } = coreState;

  // ================================================================
  // STATE
  // ================================================================

  const [scale, setScale] = useState<Scale>({ x: 1, y: 1 });
  const [displayLength, setDisplayLength] = useState<number>(DISPLAY_LENGTH);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [swipeDistance, setSwipeDistance] = useState(0);

  // #region Responsive Screen Component State
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [screenComponentWidth, setScreenComponentWidth] = useState<number>(640);
  const [screenComponentCharsPerLine, setScreenComponentCharsPerLine] =
    useState<number>(42);
  // #endregion

  // ================================================================
  // HELPER FUNCTIONS
  // ================================================================

  // Handle window resize
  const handleResize = (): void => {
    const windowWidth = window.innerWidth;

    setIsResizing(true);

    // Detect mobile device
    const isMobile = detectMobileDevice();
    setIsMobileDevice(isMobile);

    // Jupiter case scaling and responsive behavior
    if (refs.jupiterCase.current) {
      const jupiterCaseRect = refs.jupiterCase.current.getBoundingClientRect();
      const caseActualWidth = jupiterCaseRect.width;

      // Calculate scale based on actual rendered size
      const newScale: Scale = {
        x: caseActualWidth / 1220, // 1220 is the base case width
        y: caseActualWidth / 1220,
      };

      setScale(newScale);

      // Calculate displayLength based on scale
      const calculatedDisplayLength = Math.round(DISPLAY_LENGTH / newScale.x);
      setDisplayLength(calculatedDisplayLength);

      // Screen component width calculation based on Dx7 responsive breakpoints
      let calculatedScreenComponentWidth: number;

      if (windowWidth > 900) {
        // Large screens: case is between 890-1220px, width is 90% of viewport
        // Screen component is 52% of case width
        const caseWidth = Math.max(890, Math.min(windowWidth * 0.9, 1220));
        calculatedScreenComponentWidth = caseWidth * 0.52;
      } else if (windowWidth > 480) {
        // Medium screens: width: 95%
        calculatedScreenComponentWidth = windowWidth * 0.95 * 0.52;
      } else {
        // Small screens: min-width: 300px; max-width: 400px; width: 80%
        const clampedWidth = Math.max(300, Math.min(windowWidth * 0.8, 400));
        calculatedScreenComponentWidth = clampedWidth * 0.52;
      }

      // Calculate characters per line based on 7.5% of screen component width or 5% on tiny screens
      const calculatedCharsPerLine =
        calculatedScreenComponentWidth <= 200
          ? 10
          : Math.round(calculatedScreenComponentWidth * 0.075);

      // Enforce minimum/maximum character limits for usability
      const finalCharsPerLine = Math.max(
        10,
        Math.min(calculatedCharsPerLine, 50),
      );

      DEBUG &&
        console.log("🔄 Screen component resize calculation:", {
          windowWidth,
          calculatedScreenComponentWidth,
          calculatedCharsPerLine,
          finalCharsPerLine,
        });

      setScreenComponentWidth(calculatedScreenComponentWidth);
      setScreenComponentCharsPerLine(finalCharsPerLine);
    }

    // Reset resize flag after a delay
    setTimeout(() => setIsResizing(false), 150);
  };

  // ================================================================
  // EFFECTS
  // ================================================================

  // Window resize listener
  useEffect(() => {
    handleResize(); // Initial calculation
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Scroll detection effect
  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isBottom = scrollTop + windowHeight >= documentHeight - 10;
      setIsAtBottom(isBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    // State
    scale,
    setScale,
    displayLength,
    setDisplayLength,
    isMobileDevice,
    setIsMobileDevice,
    isAtBottom,
    setIsAtBottom,
    touchStartY,
    setTouchStartY,
    swipeDistance,
    setSwipeDistance,

    // Screen component responsive state
    screen: {
      isResizing,
      screenComponentWidth,
      screenComponentCharsPerLine,
    },

    // Helper functions
    detectMobileDevice,
    handleResize,
  };
};

export type ResponsiveDesignState = ReturnType<typeof useResponsiveDesign>;
