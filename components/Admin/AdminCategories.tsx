// components/Admin/AdminCategories.tsx
import axiosInstance from "axiosConfig.mjs";
import AdminLayout from "components/Admin/AdminLayout";
import AdminMenu from "components/Admin/AdminMenu";
import {
  StyledAdminButton,
  StyledAdminButtonBlock,
  StyledAdminFormElements,
  StyledAdminHeader,
  StyledAdminTable,
  StyledAdminWrapper,
} from "components/Admin/StyledAdmin";
import { Category } from "db/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AdminCategories = (): JSX.Element => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [formData, setFormData] = useState<Category | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosInstance
        .get("/api/categories", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setCategories(response.data))
        .catch(() => router.push("/admin/login"));
    } else {
      router.push("/admin/login");
    }
  }, []);

  const handleEdit = (category: Category): void => {
    setSelectedCategory(category);
    setFormData(category);
  };

  const handleDelete = async (): Promise<void> => {
    if (selectedCategory) {
      const token = localStorage.getItem("token");
      await axiosInstance.post(
        "/api/admin/deleteCategory",
        { index: selectedCategory.index },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setCategories(
        categories.filter((cat) => cat.index !== selectedCategory.index),
      );
      setSelectedCategory(null);
      setFormData(null);
    }
  };

  const handleAddNew = (): void => {
    setSelectedCategory(null);
    setFormData({
      index: categories.length + 1,
      code: "",
      name: "",
      shortName: "",
      x: 0,
      y: 0,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
    if (formData) {
      const token = localStorage.getItem("token");
      console.log("Sending token:", token);
      try {
        const response = await axiosInstance.post(
          "/api/admin/updateCategory",
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        console.log("Response from updateCategory:", response.data);
        if (selectedCategory) {
          setCategories(
            categories.map((cat) =>
              cat.index === formData.index ? formData : cat,
            ),
          );
        } else {
          setCategories([...categories, formData]);
        }
        setSelectedCategory(null);
        setFormData(null);
      } catch (error) {
        console.error("Error updating category:", error);
      }
    }
  };

  return (
    <AdminLayout>
      <StyledAdminWrapper>
        <h1>Categories</h1>
        <AdminMenu />
        <StyledAdminHeader>
          <StyledAdminButton onClick={handleAddNew}>
            Add New Category
          </StyledAdminButton>
        </StyledAdminHeader>
        <StyledAdminTable>
          <thead>
            <tr>
              <th>Actions</th>
              <th>Index</th>
              <th>Code</th>
              <th>Name</th>
              <th>Short Name</th>
              <th>X</th>
              <th>Y</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.index}>
                <td>
                  <StyledAdminButton onClick={() => handleEdit(category)}>
                    Edit
                  </StyledAdminButton>
                </td>
                <td>{category.index}</td>
                <td>{category.code}</td>
                <td>{category.name}</td>
                <td>{category.shortName}</td>
                <td>{category.x}</td>
                <td>{category.y}</td>
              </tr>
            ))}
          </tbody>
        </StyledAdminTable>

        {formData && (
          <form onSubmit={handleSubmit}>
            <StyledAdminFormElements>
              <h3>{selectedCategory ? "Edit Category" : "Add Category"}</h3>
              <div>
                <label htmlFor="index">Index</label>
                <input
                  id="index"
                  type="number"
                  name="index"
                  value={formData?.index}
                  onChange={handleChange}
                  readOnly={!!selectedCategory}
                />
              </div>
              <div>
                <label htmlFor="code">Code</label>
                <input
                  id="code"
                  type="text"
                  name="code"
                  value={formData?.code}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData?.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="shortName">Short Name</label>
                <input
                  id="shortName"
                  type="text"
                  name="shortName"
                  value={formData?.shortName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="x">X</label>
                <input
                  id="x"
                  type="number"
                  name="x"
                  value={formData?.x}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="y">Y</label>
                <input
                  id="y"
                  type="number"
                  name="y"
                  value={formData?.y}
                  onChange={handleChange}
                />
              </div>
            </StyledAdminFormElements>
            <StyledAdminButtonBlock>
              <StyledAdminButton type="submit">Save</StyledAdminButton>
              <StyledAdminButton
                type="button"
                onClick={() => {
                  setSelectedCategory(null);
                  setFormData(null);
                }}
              >
                Cancel
              </StyledAdminButton>
              {selectedCategory && (
                <StyledAdminButton
                  type="button"
                  onClick={() => {
                    if (
                      confirm("Are you sure you want to delete this category?")
                    ) {
                      handleDelete();
                    }
                  }}
                >
                  Delete
                </StyledAdminButton>
              )}
            </StyledAdminButtonBlock>
          </form>
        )}
      </StyledAdminWrapper>
    </AdminLayout>
  );
};

export default AdminCategories;
