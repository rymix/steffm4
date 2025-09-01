import { useEffect, useState } from "react";

export interface DeviceOrientationState {
  isSmallScreen: boolean;
  isMobile: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
  windowWidth: number;
  windowHeight: number;
}

export const useDeviceOrientation = (): DeviceOrientationState => {
  const [orientationState, setOrientationState] =
    useState<DeviceOrientationState>({
      isSmallScreen: false,
      isMobile: false,
      isPortrait: false,
      isLandscape: false,
      windowWidth: 0,
      windowHeight: 0,
    });

  // eslint-disable-next-line unicorn/consistent-function-scoping
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
    const hasSmallScreen = window.innerWidth <= 1024; // Includes tablets and phones

    // Method 3: User Agent string patterns (fallback)
    const mobileUserAgentPattern =
      /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|webOS/i;
    const isMobileUserAgent = mobileUserAgentPattern.test(navigator.userAgent);

    // Method 4: CSS Media Query check
    const isMobileMediaQuery = globalThis.matchMedia(
      "(max-width: 1024px) and (hover: none)",
    ).matches;

    // Combine methods: device is mobile if any of these conditions are true
    return (
      isMobileUserAgent ||
      (hasTouchCapability && hasSmallScreen) ||
      isMobileMediaQuery
    );
  };

  useEffect(() => {
    const checkScreenAndOrientation = (): void => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isPortraitOrientation = height > width;
      const isLandscapeOrientation = width > height;

      // Improved mobile detection using multiple methods
      const isMobileDevice = detectMobileDevice();
      const isSmallScreenDevice = width <= 480;

      setOrientationState({
        isSmallScreen: isSmallScreenDevice,
        isMobile: isMobileDevice,
        isPortrait: isMobileDevice && isPortraitOrientation,
        isLandscape: isMobileDevice && isLandscapeOrientation,
        windowWidth: width,
        windowHeight: height,
      });
    };

    checkScreenAndOrientation();
    window.addEventListener("resize", checkScreenAndOrientation);
    globalThis.addEventListener("orientationchange", checkScreenAndOrientation);

    return () => {
      window.removeEventListener("resize", checkScreenAndOrientation);
      globalThis.removeEventListener(
        "orientationchange",
        checkScreenAndOrientation,
      );
    };
  }, []);

  return orientationState;
};
