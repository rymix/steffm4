import { useMixcloud } from "contexts/mixcloud";
import { useEffect, useState, useRef } from "react";
import { StyledDx7Screen } from "./StyledDx7Screen";

const Dx7Screen: React.FC = () => {
  const {
    screen: { holdingMessage, temporaryMessage, setTemporaryMessage },
    session: { displayLength },
    widget: { playing },
    track: { details: trackDetails },
    mix: { details: mixDetails },
  } = useMixcloud();

  const [displayMessage, setDisplayMessage] = useState<string>(
    holdingMessage ?? "",
  );
  const [currentSliceIndex, setCurrentSliceIndex] = useState<number>(0);
  const [messageSlices, setMessageSlices] = useState<string[]>([]);
  const lastMixDetailsRef = useRef<typeof mixDetails | null>(null);
  const lastTrackDetailsRef = useRef<typeof trackDetails | null>(null);
  const rotationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to slice message into 40-character chunks
  const sliceMessage = (message: string): string[] => {
    if (message.length <= 40) return [message];
    
    const slices: string[] = [];
    for (let i = 0; i < message.length; i += 40) {
      slices.push(message.slice(i, i + 40));
    }
    return slices;
  };

  // Function to build the appropriate message based on context
  const buildMessage = (): string => {
    // If no mix or track details, show holding message
    if (!mixDetails || !trackDetails) {
      return holdingMessage ?? "";
    }

    const parts: string[] = [];
    
    // Check if this is a mix change (both mix and track changed)
    const mixChanged = lastMixDetailsRef.current?.name !== mixDetails.name;
    const trackChanged = lastTrackDetailsRef.current?.trackName !== trackDetails.trackName;
    
    if (mixChanged && trackChanged) {
      // Format for first track of new mix
      parts.push(mixDetails.name);
      if (mixDetails.notes) parts.push(mixDetails.notes);
      parts.push(trackDetails.trackName);
      parts.push(trackDetails.artistName);
      if (trackDetails.remixArtistName) parts.push(trackDetails.remixArtistName);
      if (trackDetails.publisher) parts.push(trackDetails.publisher);
    } else if (trackChanged && !mixChanged) {
      // Format for tracks 2+ of same mix
      parts.push(trackDetails.trackName);
      parts.push(trackDetails.artistName);
      if (trackDetails.remixArtistName) parts.push(trackDetails.remixArtistName);
      if (trackDetails.publisher) parts.push(trackDetails.publisher);
      parts.push(mixDetails.name);
      if (mixDetails.notes) parts.push(mixDetails.notes);
    } else {
      // No change, return current message
      return messageSlices.length > 0 ? messageSlices.join("") : holdingMessage ?? "";
    }

    return parts.filter(Boolean).join(" - ");
  };

  // Effect to handle message building and slicing
  useEffect(() => {
    const newMessage = buildMessage();
    const newSlices = sliceMessage(newMessage);
    
    // Only update if message actually changed
    if (JSON.stringify(newSlices) !== JSON.stringify(messageSlices)) {
      setMessageSlices(newSlices);
      setCurrentSliceIndex(0);
      
      // Clear existing rotation interval
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
        rotationIntervalRef.current = null;
      }
      
      // Start rotation if multiple slices
      if (newSlices.length > 1) {
        rotationIntervalRef.current = setInterval(() => {
          setCurrentSliceIndex(prev => (prev + 1) % newSlices.length);
        }, 3000);
      }
    }
    
    // Update refs for next comparison
    lastMixDetailsRef.current = mixDetails;
    lastTrackDetailsRef.current = trackDetails;
  }, [mixDetails, trackDetails, holdingMessage]);

  // Effect to update display message from current slice
  useEffect(() => {
    if (messageSlices.length > 0) {
      setDisplayMessage(messageSlices[currentSliceIndex] || "");
    }
  }, [currentSliceIndex, messageSlices]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
      }
    };
  }, []);

  return <StyledDx7Screen>{displayMessage}</StyledDx7Screen>;
};

export default Dx7Screen;
