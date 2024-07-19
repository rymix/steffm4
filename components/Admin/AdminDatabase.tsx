// components/Admin/AdminDatabase.tsx

/* eslint-disable no-alert */
import AdminLayout from "components/Admin/AdminLayout";
import AdminMenu from "components/Admin/AdminMenu";
import {
  StyledAdminButton,
  StyledAdminHeader,
  StyledAdminWrapper,
} from "components/Admin/StyledAdmin";
import { ChangeEvent, useState } from "react";
import axiosInstance from "utils/axiosInstance";

const handleExport = async (): Promise<void> => {
  const token = localStorage.getItem("token");
  const response = await axiosInstance.get("/api/admin/downloadDatabase", {
    headers: { Authorization: `Bearer ${token}` },
    responseType: "blob",
  });
  if (response.status === 200) {
    const blob = new Blob([response.data], { type: response.data.type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mixes.json";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  } else {
    console.error("Failed to download the file.");
  }
};

const AdminDatabase = (): JSX.Element => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (): Promise<void> => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const confirmUpload = window.confirm(
      "Are you sure you want to upload this database? This will replace the existing database.",
    );
    if (!confirmUpload) {
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosInstance.post(
        "/api/admin/uploadDatabase",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.status === 200) {
        alert("Database successfully replaced");
      } else {
        console.error("Failed to upload the file.");
      }
    } catch (error) {
      console.error("Error uploading the database:", error);
    }
  };

  return (
    <AdminLayout>
      <StyledAdminWrapper>
        <h1>Database Management</h1>
        <AdminMenu />

        <StyledAdminHeader>
          <StyledAdminButton onClick={handleExport}>
            Download Database
          </StyledAdminButton>
          <br />
          <br />
          <input type="file" onChange={handleFileChange} />
          <StyledAdminButton onClick={handleUpload}>
            Upload Database
          </StyledAdminButton>
        </StyledAdminHeader>
      </StyledAdminWrapper>
    </AdminLayout>
  );
};

export default AdminDatabase;
