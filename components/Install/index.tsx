// components/InstallInstructions.tsx
import {
  InstallButton,
  InstallInstructionsWrapper,
  InstructionsList,
  InstructionsText,
} from "components/Install/StyledInstall";
import React, { JSX, useEffect, useState } from "react";
import { logger } from "utils/logger";

const InstallInstructions: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isChrome, setIsChrome] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [userAgent, setUserAgent] = useState("");

  useEffect(() => {
    setUserAgent(globalThis.navigator.userAgent.toLowerCase());
    const vendor = navigator.vendor?.toLowerCase();

    setIsIos(/iphone|ipad|ipod/.test(userAgent));
    setIsMac(/macintosh|mac os x/.test(userAgent));
    setIsAndroid(/android/.test(userAgent));

    const isChromeBrowser =
      /chrome/.test(userAgent) &&
      /google inc/.test(vendor) &&
      !/edg\//.test(userAgent);

    setIsSafari(/safari/.test(userAgent) && !/chrome/.test(userAgent));
    setIsChrome(isChromeBrowser);

    setIsStandalone(
      "standalone" in globalThis.navigator &&
        (globalThis.navigator as any).standalone === true,
    );

    const handleBeforeInstallPrompt = (e: Event): void => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    globalThis.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt,
    );

    return () => {
      globalThis.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstallClick = (): void => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          logger.info("User accepted the install prompt");
        } else {
          logger.info("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
        setShowInstallButton(false);
      });
    }
  };

  const getInstructions = (): JSX.Element => {
    if (isIos && !isStandalone && isSafari) {
      return (
        <>
          <InstructionsText>
            To install this app on your iPhone or iPad:
          </InstructionsText>
          <InstructionsList>
            <li>
              Tap the share icon{" "}
              <span role="img" aria-label="share icon">
                📤
              </span>
              .
            </li>
            <li>Scroll down and select &quot;Add to Home Screen&quot;</li>
            <li>Tap &quot;Add&quot; in the top-right corner</li>
          </InstructionsList>
        </>
      );
    }
    if (isChrome && isAndroid) {
      return (
        <>
          <InstructionsText>
            To install this app on your Android device using Chrome:
          </InstructionsText>
          <InstructionsList>
            <li>Tap the three-dot menu in the top-right corner</li>
            <li>
              Select &quot;Install app&quot; or &quot;Add to Home screen&quot;
            </li>
            <li>Follow the on-screen instructions</li>
          </InstructionsList>
          {showInstallButton && (
            <InstallButton onClick={handleInstallClick}>Install</InstallButton>
          )}
        </>
      );
    }
    if (isChrome && isMac) {
      return (
        <>
          <InstructionsText>
            To install this app on your Mac using Chrome:
          </InstructionsText>
          <InstructionsList>
            <li>Click the three-dot menu in the top-right corner of Chrome</li>
            <li>
              Hover over &quot;Save and Share&quot; and select &quot;Install
              page as app...&quot;
            </li>
            <li>Follow the prompts to install the app</li>
          </InstructionsList>
          {showInstallButton && (
            <InstallButton onClick={handleInstallClick}>Install</InstallButton>
          )}
        </>
      );
    }
    if (isSafari && isMac) {
      return (
        <>
          <InstructionsText>
            To install this app on your Mac using Safari:
          </InstructionsText>
          <InstructionsList>
            <li>Click &quot;File&quot; in the menu bar</li>
            <li>Select &quot;Add to Dock&quot; from the dropdown menu</li>
            <li>Follow the prompts to add the app to your Dock</li>
          </InstructionsList>
        </>
      );
    }
    return (
      <>
        <InstructionsText>
          To install this app, use the instructions specific to your device and
          browser.
        </InstructionsText>
      </>
    );
  };

  return (
    <InstallInstructionsWrapper>
      <InstructionsText>
        Enjoy <strong>Stef.FM</strong> as an app on your device. It&apos;s
        easier and funkier than those old fashioned web browsers.
      </InstructionsText>
      {getInstructions()}
    </InstallInstructionsWrapper>
  );
};

export default InstallInstructions;
