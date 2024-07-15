import axios from "axios";
import AdminLayout from "components/Admin/AdminLayout";
import AdminMenu from "components/Admin/AdminMenu";
import {
  StyledAdminButton,
  StyledAdminHeader,
  StyledAdminWrapper,
} from "components/Admin/StyledAdmin";
import { useRef } from "react";

const handleExport = async (): Promise<void> => {
  console.log("Exporting database...");
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get("/api/admin/downloadDatabase", {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob", // This is important for handling binary data
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
  } catch (error) {
    console.error("Error downloading the file:", error);
  }
};

const AdminDatabase = (): JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    if (
      fileInputRef.current &&
      fileInputRef.current.files &&
      fileInputRef.current.files.length > 0
    ) {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", fileInputRef.current.files[0]);

      try {
        const response = await axios.post(
          "/api/admin/uploadDatabase",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 200) {
          console.log("Database uploaded successfully");
        } else {
          console.error("Failed to upload the database.");
        }
      } catch (error) {
        console.error("Error uploading the database:", error);
      }
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
        </StyledAdminHeader>
        <form
          onSubmit={handleUpload}
          encType="multipart/form-data"
          style={{ marginTop: "20px" }}
        >
          <input type="file" name="file" ref={fileInputRef} />
          <StyledAdminButton type="submit">Upload Database</StyledAdminButton>
        </form>
      </StyledAdminWrapper>
    </AdminLayout>
  );
};

export default AdminDatabase;
