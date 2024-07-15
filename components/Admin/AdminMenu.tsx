import { StyledAdminButton } from "components/Admin/StyledAdmin";
import Link from "next/link";
import { useRouter } from "next/router";

const AdminMenu = (): JSX.Element => {
  const router = useRouter();

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  return (
    <ul>
      <li>
        <Link href="/admin">Admin Home</Link>
      </li>
      <li>
        <Link href="/admin/password?password=password">Make Password</Link>
      </li>
      <li>
        <Link href="/admin/categories">Categories</Link>
      </li>
      <li>
        <Link href="/admin/mixes">Mixes</Link>
      </li>
      <li>
        <Link href="/admin/database">Database Management</Link>
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
