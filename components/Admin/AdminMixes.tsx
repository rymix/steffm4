// components/Admin/AdminMixes.tsx

/* eslint-disable no-alert */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import AdminLayout from "components/Admin/AdminLayout";
import AdminMenu from "components/Admin/AdminMenu";
import {
  StyledAdminButton,
  StyledAdminCoverArtImage,
  StyledAdminFormElements,
  StyledAdminHeader,
  StyledAdminTable,
  StyledAdminWrapper,
} from "components/Admin/StyledAdmin";
import { Mix, Track } from "db/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosInstance from "utils/axiosInstance";

const AdminMixes = (): JSX.Element => {
  const router = useRouter();
  const [mixes, setMixes] = useState<Mix[]>([]);
  const [selectedMix, setSelectedMix] = useState<Mix | null>(null);
  const [formData, setFormData] = useState<Mix | null>(null);
  const [originalTracks, setOriginalTracks] = useState<Track[]>([]);
  const [categoryCode, setCategoryCode] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosInstance
        .get("/api/mixes", { headers: { Authorization: token } })
        .then((response) => setMixes(response.data))
        .catch(() => router.push("/admin/login"));
    } else {
      router.push("/admin/login");
    }
  }, []);

  const handleEdit = (mix: Mix): void => {
    setSelectedMix(mix);
    setFormData({ ...mix, category: mix.category });
    setOriginalTracks(mix.tracks || []);
    setCategoryCode(mix.category); // Set the category code
  };

  const handleDelete = async (): Promise<void> => {
    if (selectedMix) {
      const token = localStorage.getItem("token");
      await axiosInstance.post(
        "/api/admin/deleteMix",
        { mixcloudKey: selectedMix.mixcloudKey },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setMixes(
        mixes.filter((mix) => mix.mixcloudKey !== selectedMix.mixcloudKey),
      );
      setSelectedMix(null);
      setFormData(null);
      setOriginalTracks([]);
    }
  };

  const handleAddNew = (): void => {
    setSelectedMix(null);
    setFormData({
      category: "",
      coverArtDate: "",
      coverArtLarge: "",
      coverArtSmall: "",
      duration: "",
      fileName: "",
      listOrder: mixes.length + 1,
      mixcloudKey: "",
      name: "",
      notes: "",
      releaseDate: "",
      shortName: "",
      tags: [],
      tracks: [], // Initialize an empty array for tracks
    });
    setOriginalTracks([]);
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

    if (name === "category") {
      setCategoryCode(value); // Update the category code
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (formData) {
      const token = localStorage.getItem("token");
      const updatedFormData = {
        ...formData,
        category: categoryCode, // Ensure category code is used
        tracks: originalTracks, // Ensure tracks are preserved
      };
      console.log("updatedFormData", updatedFormData);
      await axiosInstance.post("/api/admin/updateMix", updatedFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (selectedMix) {
        setMixes(
          mixes.map((mix) =>
            mix.mixcloudKey === formData.mixcloudKey ? updatedFormData : mix,
          ),
        );
      } else {
        setMixes([...mixes, updatedFormData]);
      }
      setSelectedMix(null);
      setFormData(null);
      setOriginalTracks([]);
    }
  };

  const handleExport = async (mixcloudKey: string): Promise<void> => {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.post(
      "/api/admin/exportMix",
      { mixcloudKey },
      {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob", // This is important for handling binary data
      },
    );
    if (response.status === 200) {
      const blob = new Blob([response.data], { type: response.data.type });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${mixcloudKey}.cue`;
      link.click();
    }
  };

  const handleUpdateCoverArt = async (mixcloudKey: string): Promise<void> => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.post(
        "/api/admin/updateMixcloudCoverArt",
        { mixcloudKey },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.status === 200) {
        const updatedMix = response.data;
        setMixes(
          mixes.map((mix) =>
            mix.mixcloudKey === updatedMix.mixcloudKey
              ? {
                  ...mix,
                  coverArtLarge: updatedMix.coverArtLarge,
                  coverArtSmall: updatedMix.coverArtSmall,
                  coverArtDate: updatedMix.coverArtDate,
                }
              : mix,
          ),
        );
      }
    } catch (error) {
      console.error("Failed to update cover art:", error); // Log the error for debugging
    }
  };

  const handleUpdateAllMixesCoverArt = async (): Promise<void> => {
    const token = localStorage.getItem("token");
    for (const mix of mixes) {
      try {
        const response = await axiosInstance.post(
          "/api/admin/updateMixcloudCoverArt",
          { mixcloudKey: mix.mixcloudKey },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        if (response.status === 200) {
          const updatedMix = response.data;
          setMixes((prevMixes) =>
            prevMixes.map((m) =>
              m.mixcloudKey === updatedMix.mixcloudKey
                ? {
                    ...m,
                    coverArtLarge: updatedMix.coverArtLarge,
                    coverArtSmall: updatedMix.coverArtSmall,
                    coverArtDate: updatedMix.coverArtDate,
                  }
                : m,
            ),
          );
        }
        await new Promise((resolve) => setTimeout(resolve, 500)); // Delay between requests
      } catch (error) {
        console.error(`Failed to update cover art for mix ${mix.name}:`, error);
      }
    }
  };

  const handleUpdateAllTracksCoverArt = async (): Promise<void> => {
    const token = localStorage.getItem("token");
    for (const mix of mixes) {
      for (const track of mix.tracks) {
        try {
          const response = await axiosInstance.post(
            "/api/admin/updateTrackCoverArt",
            {
              artistName: track.artistName,
              trackName: track.trackName,
              mixcloudKey: mix.mixcloudKey,
              sectionNumber: track.sectionNumber,
            },
            { headers: { Authorization: `Bearer ${token}` } },
          );
          if (response.status === 200) {
            const updatedTrack = {
              ...track,
              coverArtDate: response.data.coverArtDate,
              coverArtLarge: response.data.coverArtLarge,
              coverArtSmall: response.data.coverArtSmall,
              localCoverArtLarge: response.data.localCoverArtLarge,
              localCoverArtSmall: response.data.localCoverArtSmall,
            };
            setMixes((prevMixes) =>
              prevMixes.map((m) =>
                m.mixcloudKey === mix.mixcloudKey
                  ? {
                      ...m,
                      tracks: m.tracks.map((t) =>
                        t.sectionNumber === track.sectionNumber
                          ? updatedTrack
                          : t,
                      ),
                    }
                  : m,
              ),
            );
          }
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay between requests
        } catch (error) {
          console.error(
            `Failed to fetch cover art for track ${track.trackName}:`,
            error,
          );
        }
      }
    }
  };

  return (
    <AdminLayout>
      <StyledAdminWrapper>
        <h1>Mixes</h1>
        <AdminMenu />
        <StyledAdminHeader>
          <StyledAdminButton onClick={handleAddNew}>
            Add New Mix
          </StyledAdminButton>
          <StyledAdminButton onClick={handleUpdateAllMixesCoverArt}>
            Update All Mixes Cover Art
          </StyledAdminButton>
          <StyledAdminButton onClick={handleUpdateAllTracksCoverArt}>
            Update All Tracks Cover Art
          </StyledAdminButton>
        </StyledAdminHeader>
        <StyledAdminTable>
          <thead>
            <tr>
              <th>Actions</th>
              <th>Category Code</th>
              <th>Name</th>
              <th>Mixcloud Key</th>
              <th>Notes</th>
              <th>Cover Art Date</th>
              <th>Cover Art Large</th>
              <th>Cover Art Small</th>
              <th>Duration</th>
              <th>File Name</th>
              <th>List Order</th>
              <th>Release Date</th>
              <th>Short Name</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {mixes.map((mix) => (
              <tr key={mix.mixcloudKey}>
                <td>
                  <StyledAdminButton onClick={() => handleEdit(mix)}>
                    Edit
                  </StyledAdminButton>
                  <StyledAdminButton
                    onClick={() =>
                      router.push(
                        `/admin/tracks?mixcloudKey=${mix.mixcloudKey}`,
                      )
                    }
                  >
                    Edit Tracks
                  </StyledAdminButton>
                  <StyledAdminButton
                    onClick={() => handleExport(mix.mixcloudKey)}
                  >
                    Export to .cue
                  </StyledAdminButton>
                  <StyledAdminButton
                    onClick={() => handleUpdateCoverArt(mix.mixcloudKey)}
                  >
                    Update Cover Art
                  </StyledAdminButton>
                </td>
                <td>{mix.category}</td>
                <td>{mix.name}</td>
                <td>{mix.mixcloudKey}</td>
                <td>{mix.notes}</td>
                <td>{mix.coverArtDate}</td>
                <td>
                  <StyledAdminCoverArtImage
                    src={mix.coverArtLarge}
                    alt={mix.coverArtLarge}
                  />
                </td>
                <td>
                  <StyledAdminCoverArtImage
                    src={mix.coverArtSmall}
                    alt={mix.coverArtSmall}
                  />
                </td>
                <td>{mix.duration}</td>
                <td>{mix.fileName}</td>
                <td>{mix.listOrder}</td>
                <td>{mix.releaseDate}</td>
                <td>{mix.shortName}</td>
                <td>{mix.tags.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </StyledAdminTable>

        {formData && (
          <form onSubmit={handleSubmit}>
            <StyledAdminFormElements>
              <h3>{selectedMix ? "Edit Mix" : "Add Mix"}</h3>
              <div>
                <label htmlFor="category">Category Code</label>
                <input
                  id="category"
                  type="text"
                  name="category"
                  value={formData.category}
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
                <label htmlFor="duration">Duration</label>
                <input
                  id="duration"
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="file-name">File Name</label>
                <input
                  id="file-name"
                  type="text"
                  name="fileName"
                  value={formData.fileName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="list-order">List Order</label>
                <input
                  id="list-order"
                  type="number"
                  name="listOrder"
                  value={formData.listOrder}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="mixcloud-key">Mixcloud Key</label>
                <input
                  id="mixcloud-key"
                  type="text"
                  name="mixcloudKey"
                  value={formData.mixcloudKey}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="notes">Notes</label>
                <input
                  id="notes"
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="release-date">Release Date</label>
                <input
                  id="release-date"
                  type="text"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="short-name">Short Name</label>
                <input
                  id="short-name"
                  type="text"
                  name="shortName"
                  value={formData.shortName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="tags">Tags</label>
                <input
                  id="tags"
                  type="text"
                  name="tags"
                  value={formData.tags.join(", ")}
                  onChange={(e) => {
                    const tags = e.target.value
                      .split(",")
                      .map((tag) => tag.trim());
                    setFormData((prevFormData) => {
                      if (prevFormData === null) {
                        return null;
                      }
                      return {
                        ...prevFormData,
                        tags,
                      };
                    });
                  }}
                />
              </div>
              <StyledAdminButton type="submit">Save</StyledAdminButton>
              <StyledAdminButton
                type="button"
                onClick={() => {
                  setSelectedMix(null);
                  setFormData(null);
                  setOriginalTracks([]);
                }}
              >
                Cancel
              </StyledAdminButton>
              {selectedMix && (
                <StyledAdminButton
                  type="button"
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this mix?")) {
                      handleDelete();
                    }
                  }}
                >
                  Delete
                </StyledAdminButton>
              )}
            </StyledAdminFormElements>
          </form>
        )}
      </StyledAdminWrapper>
    </AdminLayout>
  );
};

export default AdminMixes;
