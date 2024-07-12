/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from "axios";
import { Mix, Track } from "db/types";
import { useRouter } from "next/router";
import AdminMenu from "pages/admin/AdminMenu";
import {
  StyledAdminButton,
  StyledAdminCoverArtImage,
  StyledAdminFormElements,
  StyledAdminTable,
  StyledAdminWrapper,
} from "pages/admin/StyledAdmin";
import { useEffect, useState } from "react";

const AdminTracks = (): JSX.Element => {
  const router = useRouter();
  const { mixcloudKey } = router.query;
  const [mix, setMix] = useState<Mix | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [formData, setFormData] = useState<Track | null>(null);
  const [categoryCode, setCategoryCode] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && mixcloudKey) {
      axios
        .get(`/api/mixes`, { headers: { Authorization: token } })
        .then((response) => {
          const mixData = response.data.find(
            (mix: Mix) => mix.mixcloudKey === mixcloudKey,
          );
          if (mixData) {
            console.log("Mix Data:", mixData); // Debugging: Check mix data
            setMix(mixData);
            setTracks(mixData.tracks || []);
            setCategoryCode(mixData.category); // Set category code
          } else {
            router.push("/admin/mixes");
          }
        })
        .catch(() => router.push("/login"));
    } else {
      router.push("/login");
    }
  }, [mixcloudKey]);

  const handleEdit = (track: Track): void => {
    setFormData(track);
  };

  const handleAddNew = (): void => {
    setFormData({
      artistName: "",
      coverArtDate: "",
      coverArtLarge: "",
      coverArtSmall: "",
      publisher: "",
      remixArtistName: "",
      sectionNumber: tracks.length + 1,
      startTime: "",
      trackName: "",
    });
  };

  const handleDelete = async (sectionNumber: number): Promise<void> => {
    if (mix) {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/deleteTrack",
        { mixcloudKey: mix.mixcloudKey, sectionNumber },
        { headers: { Authorization: token } },
      );
      const updatedTracks = tracks.filter(
        (track) => track.sectionNumber !== sectionNumber,
      );
      setTracks(updatedTracks);
      setFormData(null);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      if (prevFormData === null) {
        return null;
      }
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (mix && formData) {
      const updatedTracks =
        formData.sectionNumber <= tracks.length
          ? tracks.map((track) =>
              track.sectionNumber === formData.sectionNumber ? formData : track,
            )
          : [...tracks, formData];

      const updatedMix = {
        ...mix,
        tracks: updatedTracks,
        category: categoryCode, // Ensure category code is used
      };
      const token = localStorage.getItem("token");
      await axios.post("/api/updateMix", updatedMix, {
        headers: { Authorization: token },
      });
      setMix(updatedMix);
      setTracks(updatedTracks);
      setFormData(null);
    }
  };

  const handleFetchCoverArt = async (track: Track): Promise<void> => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "/api/updateTrackCoverArt",
        { artistName: track.artistName, trackName: track.trackName },
        { headers: { Authorization: token } },
      );
      if (response.status === 200) {
        const updatedTrack = {
          ...track,
          coverArtDate: response.data.coverArtDate,
          coverArtLarge: response.data.coverArtLarge,
          coverArtSmall: response.data.coverArtSmall,
        };
        const updatedTracks = tracks.map((t) =>
          t.sectionNumber === track.sectionNumber ? updatedTrack : t,
        );
        setTracks(updatedTracks);
      }
    } catch (error) {
      console.error("Failed to fetch cover art:", error);
    }
  };

  return (
    <StyledAdminWrapper>
      <h1>Tracks</h1>
      <AdminMenu />
      {mix ? (
        <>
          <h2>{mix.name}</h2>
          <StyledAdminButton onClick={handleAddNew}>
            Add New Track
          </StyledAdminButton>
          <StyledAdminTable>
            <thead>
              <tr>
                <th>Actions</th>
                <th>Section Number</th>
                <th>Artist Name</th>
                <th>Cover Art Date</th>
                <th>Cover Art Large</th>
                <th>Cover Art Small</th>
                <th>Publisher</th>
                <th>Remix Artist Name</th>
                <th>Start Time</th>
                <th>Track Name</th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((track) => (
                <tr key={track.sectionNumber}>
                  <td>
                    <StyledAdminButton onClick={() => handleEdit(track)}>
                      Edit
                    </StyledAdminButton>
                    <StyledAdminButton
                      onClick={() => {
                        if (
                          confirm("Are you sure you want to delete this track?")
                        ) {
                          handleDelete(track.sectionNumber);
                        }
                      }}
                    >
                      Delete
                    </StyledAdminButton>
                    <StyledAdminButton
                      onClick={() => handleFetchCoverArt(track)}
                    >
                      Fetch Cover Art
                    </StyledAdminButton>
                  </td>
                  <td>{track.sectionNumber}</td>
                  <td>{track.artistName}</td>
                  <td>{track.coverArtDate}</td>
                  <td>
                    <StyledAdminCoverArtImage
                      src={track.coverArtLarge}
                      alt={track.coverArtLarge}
                    />
                  </td>
                  <td>
                    <StyledAdminCoverArtImage
                      src={track.coverArtSmall}
                      alt={track.coverArtSmall}
                    />
                  </td>
                  <td>{track.publisher}</td>
                  <td>{track.remixArtistName}</td>
                  <td>{track.startTime}</td>
                  <td>{track.trackName}</td>
                </tr>
              ))}
            </tbody>
          </StyledAdminTable>

          {formData && (
            <form onSubmit={handleSubmit}>
              <StyledAdminFormElements>
                <h3>
                  {formData.sectionNumber <= tracks.length
                    ? "Edit Track"
                    : "Add Track"}
                </h3>
                <div>
                  <label htmlFor="artist-name">Artist Name</label>
                  <input
                    id="artist-name"
                    type="text"
                    name="artistName"
                    value={formData.artistName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="cover-art-date">Cover Art Date</label>
                  <input
                    id="cover-art-date"
                    type="text"
                    name="coverArtDate"
                    value={formData.coverArtDate}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="cover-art-large">Cover Art Large</label>
                  <input
                    id="cover-art-large"
                    type="text"
                    name="coverArtLarge"
                    value={formData.coverArtLarge}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="cover-art-small">Cover Art Small</label>
                  <input
                    id="cover-art-small"
                    type="text"
                    name="coverArtSmall"
                    value={formData.coverArtSmall}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="publisher">Publisher</label>
                  <input
                    id="publisher"
                    type="text"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="remix-artist-name">Remix Artist Name</label>
                  <input
                    id="remix-artist-name"
                    type="text"
                    name="remixArtistName"
                    value={formData.remixArtistName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="section-number">Section Number</label>
                  <input
                    id="section-number"
                    type="number"
                    name="sectionNumber"
                    value={formData.sectionNumber}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="start-time">Start Time</label>
                  <input
                    id="start-time"
                    type="text"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="track-name">Track Name</label>
                  <input
                    id="track-name"
                    type="text"
                    name="trackName"
                    value={formData.trackName}
                    onChange={handleChange}
                  />
                </div>
              </StyledAdminFormElements>
              <StyledAdminButton type="submit">Save</StyledAdminButton>
              <StyledAdminButton
                type="button"
                onClick={() => setFormData(null)}
              >
                Cancel
              </StyledAdminButton>
            </form>
          )}
        </>
      ) : (
        <p>Loading mix...</p>
      )}
    </StyledAdminWrapper>
  );
};

export default AdminTracks;
