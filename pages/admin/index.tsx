import axios from "axios";
import { useRouter } from "next/router";
import {
  StyledAdminButton,
  StyledAdminButtonBlock,
  StyledAdminForm,
  StyledAdminTable,
} from "pages/admin/StyledAdmin";
import { useEffect, useState } from "react";

type Category = {
  index: number;
  code: string;
  name: string;
  shortName: string;
  x: number;
  y: number;
};

const AdminPage = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [formData, setFormData] = useState<Category | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/api/categories", { headers: { Authorization: token } })
        .then((response) => setCategories(response.data))
        .catch(() => router.push("/login"));
    } else {
      router.push("/login");
    }
  }, []);

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setFormData(category);
  };

  const handleDelete = async () => {
    if (selectedCategory) {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/deleteCategory",
        { index: selectedCategory.index },
        {
          headers: { Authorization: token },
        },
      );
      setCategories(
        categories.filter((cat) => cat.index !== selectedCategory.index),
      );
      setSelectedCategory(null);
      setFormData(null);
    }
  };

  const handleAddNew = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      const token = localStorage.getItem("token");
      await axios.post("/api/updateCategory", formData, {
        headers: { Authorization: token },
      });
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
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <h2>Categories</h2>
      <StyledAdminButton onClick={handleAddNew}>
        Add New Category
      </StyledAdminButton>
      <StyledAdminTable>
        <thead>
          <tr>
            <th>Index</th>
            <th>Code</th>
            <th>Name</th>
            <th>Short Name</th>
            <th>X</th>
            <th>Y</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.index}>
              <td>{category.index}</td>
              <td>{category.code}</td>
              <td>{category.name}</td>
              <td>{category.shortName}</td>
              <td>{category.x}</td>
              <td>{category.y}</td>
              <td>
                <StyledAdminButton onClick={() => handleEdit(category)}>
                  Edit
                </StyledAdminButton>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledAdminTable>

      {formData && (
        <StyledAdminForm onSubmit={handleSubmit}>
          <h3>{selectedCategory ? "Edit Category" : "Add Category"}</h3>
          <div>
            <label>Index</label>
            <input
              type="number"
              name="index"
              value={formData?.index}
              onChange={handleChange}
              readOnly={!!selectedCategory}
            />
          </div>
          <div>
            <label>Code</label>
            <input
              type="text"
              name="code"
              value={formData?.code}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData?.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Short Name</label>
            <input
              type="text"
              name="shortName"
              value={formData?.shortName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>X</label>
            <input
              type="number"
              name="x"
              value={formData?.x}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Y</label>
            <input
              type="number"
              name="y"
              value={formData?.y}
              onChange={handleChange}
            />
          </div>
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
        </StyledAdminForm>
      )}
    </div>
  );
};

export default AdminPage;
