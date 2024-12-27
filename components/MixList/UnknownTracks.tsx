import axios from "axios";
import { useMixcloud } from "contexts/mixcloud";
import React, { useEffect, useState } from "react";
import { convertTimeToSeconds } from "utils/functions";

interface UnknownTrack {
  artistName: string;
  trackName: string;
  publisher: string;
  mixcloudKey: string;
  startTime: string; // Assuming this is added to track start times
}

export const UnknownTracks: React.FC = () => {
  const [unknownTracks, setUnknownTracks] = useState<UnknownTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    controls: { handleLoad, handleSeek },
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
    try {
      await handleLoad(mixcloudKey); // Load the mix
      const seconds = convertTimeToSeconds(startTime);
      await handleSeek(seconds); // Seek to the track's start time
    } catch (error) {
      console.error("Error loading or seeking mix:", error);
    }
  };

  if (loading) {
    return <div>Loading unknown tracks...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Unknown Tracks</h1>
      {unknownTracks.length === 0 ? (
        <p>No unknown tracks found.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {unknownTracks.map((track, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3>{track.trackName || "Unknown Track Name"}</h3>
              <p>
                <strong>Artist:</strong> {track.artistName || "Unknown"}
              </p>
              <p>
                <strong>Publisher:</strong> {track.publisher || "Unknown"}
              </p>
              <p>
                <strong>Mixcloud Key:</strong> {track.mixcloudKey}
              </p>
              <p>
                <strong>Start Time:</strong> {track.startTime}
              </p>
              <button
                style={{
                  padding: "10px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleTrackClick(track.mixcloudKey, track.startTime)
                }
              >
                Play Track
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UnknownTracks;
