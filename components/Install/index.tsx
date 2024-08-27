// components/InstallInstructions.tsx
import React, { useEffect, useState } from "react";

import {
  InstallButton,
  InstallInstructionsWrapper,
  InstructionsList,
  InstructionsText,
} from "./StyledInstall";

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
    const userAgent = window.navigator.userAgent.toLowerCase();
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
      "standalone" in window.navigator &&
        (window.navigator as any).standalone === true,
    );

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", () => {});
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
        setShowInstallButton(false);
      });
    }
  };

  const getInstructions = () => {
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
            <li>Scroll down and select "Add to Home Screen"</li>
            <li>Tap "Add" in the top-right corner</li>
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
            <li>Select "Install app" or "Add to Home screen"</li>
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
              Hover over "Save and Share" and select "Install page as app..."
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
            <li>Click "File" in the menu bar</li>
            <li>Select "Add to Dock" from the dropdown menu</li>
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

  const getDebug = () => {
    console.log(userAgent);
    return (
      <pre>
        {`
        userAgent: ${userAgent}
        isIos: ${isIos}
        isStandalone: ${isStandalone}
        isSafari: ${isSafari}
        isChrome: ${isChrome}
        isMac: ${isMac}
        isAndroid: ${isAndroid}
        `}
      </pre>
    );
  };

  return (
    <InstallInstructionsWrapper>
      <InstructionsText>
        Enjoy <strong>Stef.FM</strong> as an app on your device. It's easier and
        funkier than those old fashioned web browsers.
      </InstructionsText>
      {getInstructions()}
    </InstallInstructionsWrapper>
  );
};

export default InstallInstructions;
