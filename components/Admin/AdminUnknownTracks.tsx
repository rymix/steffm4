// components/Admin/AdminUnknownTracks.tsx

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
import AdminLayout from "components/Admin/AdminLayout";
import AdminMenu from "components/Admin/AdminMenu";
import {
  StyledAdminTable,
  StyledAdminWrapper,
} from "components/Admin/StyledAdmin";
import { UnknownTrack } from "db/types";
import { useEffect, useState } from "react";
import axiosInstance from "utils/axiosInstance";

const AdminUnknownTracks = (): JSX.Element => {
  const [unknownTracks, setUnknownTracks] = useState<UnknownTrack[]>([]);

  useEffect(() => {
    const fetchUnknownTracks = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axiosInstance.get("/api/unknownTracks", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUnknownTracks(response.data);
        } catch (error) {
          console.error("Error fetching unknown tracks:", error);
          alert("Failed to fetch unknown tracks. Please try again.");
        }
      } else {
        alert("Authentication token not found. Please log in.");
      }
    };

    fetchUnknownTracks();
  }, []);

  return (
    <AdminLayout>
      <StyledAdminWrapper>
        <h1>Unknown Tracks</h1>
        <AdminMenu />
        <StyledAdminTable>
          <thead>
            <tr>
              <th>Mixcloud Key</th>
              <th>Artist Name</th>
              <th>Track Name</th>
              <th>Publisher</th>
              <th>Section Number</th>
              <th>Start Time</th>
            </tr>
          </thead>
          <tbody>
            {unknownTracks.length > 0 ? (
              unknownTracks.map((track, index) => (
                <tr key={index}>
                  <td>{track.mixcloudKey}</td>
                  <td>{track.artistName}</td>
                  <td>{track.trackName}</td>
                  <td>{track.publisher}</td>
                  <td>{track.sectionNumber}</td>
                  <td>{track.startTime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No unknown tracks found.</td>
              </tr>
            )}
          </tbody>
        </StyledAdminTable>
      </StyledAdminWrapper>
    </AdminLayout>
  );
};

export default AdminUnknownTracks;

