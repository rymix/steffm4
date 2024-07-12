/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from "axios";
import { Mix, Track } from "db/types";
import { useRouter } from "next/router";
import AdminMenu from "pages/admin/AdminMenu";
import {
  StyledAdminButton,
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

      const updatedMix = { ...mix, tracks: updatedTracks };
      const token = localStorage.getItem("token");
      await axios.post("/api/updateMix", updatedMix, {
        headers: { Authorization: token },
      });
      setMix(updatedMix);
      setTracks(updatedTracks);
      setFormData(null);
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
                <th>Artist Name</th>
                <th>Cover Art Date</th>
                <th>Cover Art Large</th>
                <th>Cover Art Small</th>
                <th>Publisher</th>
                <th>Remix Artist Name</th>
                <th>Section Number</th>
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
                  </td>
                  <td>{track.artistName}</td>
                  <td>{track.coverArtDate}</td>
                  <td>{track.coverArtLarge}</td>
                  <td>{track.coverArtSmall}</td>
                  <td>{track.publisher}</td>
                  <td>{track.remixArtistName}</td>
                  <td>{track.sectionNumber}</td>
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
