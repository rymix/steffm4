import axios from "axios";
import { useMixcloud } from "contexts/mixcloud";
import { UnknownTrack } from "db/types";
import React, { useEffect, useState } from "react";
import { convertTimeToSeconds, mcKeyFormatter } from "utils/functions";
import {
  StyledTrackPause,
  StyledTrackPlay,
  StyledUnknownTrack,
  StyledUnknownTrackDetails,
  StyledUnknownTrackMix,
  StyledUnknownTracks,
} from "./StyledUnknownTracks";

export const UnknownTracks: React.FC = () => {
  const [unknownTracks, setUnknownTracks] = useState<UnknownTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    mcKey,
    controls: { handleLoad, handlePause, handleSeek },
    widget: { playing },
  } = useMixcloud();

  useEffect(() => {
    const fetchUnknownTracks = async () => {
      try {
        const response = await axios.get("/api/unknownTracks");
        setUnknownTracks(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch unknown tracks.");
      } finally {
        setLoading(false);
      }
    };

    fetchUnknownTracks();
  }, []);

  const handleTrackClick = async (mixcloudKey: string, startTime: string) => {
    console.log("handleTrackClick", mixcloudKey, startTime, playing);
    if (!playing) {
      try {
        await handleLoad(mixcloudKey); // Load the mix
        const seconds = convertTimeToSeconds(startTime);
        await handleSeek(seconds); // Seek to the track's start time
      } catch (error) {
        console.error("Error loading or seeking mix:", error);
      }
    } else {
      handlePause();
    }
  };

  if (loading) {
    return <div>Loading unknown tracks...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <StyledUnknownTracks>
      {unknownTracks.length === 0 ? (
        <p>No unknown tracks found.</p>
      ) : (
        <>
          {unknownTracks.map((track, index) => (
            <div key={`${track.mixcloudKey}-${track.startTime}`}>
              <StyledUnknownTrack
                key={`${track.mixcloudKey}-${track.sectionNumber}`}
              >
                <img src={track.coverArtLarge} alt={track.trackName} />

                <StyledUnknownTrackDetails>
                  <div>
                    <strong>Track Name:</strong>
                  </div>
                  <div>{track.trackName || "Unknown Track Name"}</div>
                  <div>
                    <strong>Artist:</strong>
                  </div>
                  <div>{track.artistName || "Unknown"}</div>
                  <div>
                    <strong>Publisher:</strong>
                  </div>
                  <div> {track.publisher || "Unknown"}</div>
                </StyledUnknownTrackDetails>
                {mcKeyFormatter(mcKey) === mcKeyFormatter(track.mixcloudKey) &&
                playing ? (
                  <StyledTrackPause onClick={() => handlePause()} />
                ) : (
                  <StyledTrackPlay
                    onClick={() =>
                      handleTrackClick(track.mixcloudKey, track.startTime)
                    }
                  ></StyledTrackPlay>
                )}
              </StyledUnknownTrack>
              <StyledUnknownTrackMix>
                <img src={track.mixCoverArt} alt={track.mixName} />
                <div>
                  {track.mixName} at {track.startTime}
                </div>
              </StyledUnknownTrackMix>
            </div>
          ))}
        </>
      )}
    </StyledUnknownTracks>
  );
};

export default UnknownTracks;
