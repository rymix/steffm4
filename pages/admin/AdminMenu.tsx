import Link from "next/link";
import { useRouter } from "next/router";
import { StyledAdminButton } from "pages/admin/StyledAdmin";

const AdminMenu = (): JSX.Element => {
  const router = useRouter();

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <ul>
      <li>
        <Link href="/admin">Admin Home</Link>
      </li>
      <li>
        <Link href="/admin/MakePassword?password=yourpassword">
          Make Password
        </Link>
      </li>
      <li>
        <Link href="/admin/AdminCategories">Categories</Link>
      </li>
      <li>
        <Link href="/admin/AdminMixes">Mixes</Link>
      </li>
      <li>
        <StyledAdminButton
          onClick={handleLogout}
          onKeyDown={(e) => e.key === "Enter" && handleLogout()}
        >
          Logout
        </StyledAdminButton>
      </li>
    </ul>
  );
};

export default AdminMenu;
