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

  useEffect(() => {
    const checkScreenAndOrientation = (): void => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isPortraitOrientation = height > width;
      const isLandscapeOrientation = width > height;

      // Detect device types - simplified without tablet mode
      const isMobileDevice = width <= 768 && "ontouchstart" in globalThis;
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
