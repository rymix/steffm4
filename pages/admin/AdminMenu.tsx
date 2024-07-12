import Link from "next/link";

const AdminMenu = (): JSX.Element => {
  return (
    <ul>
      <li>
        <Link href="/admin">Admin Home</Link>
      </li>
      <li>
        <Link href="/admin/AdminCategories">Categories</Link>
      </li>
      <li>
        <Link href="/admin/AdminMixes">Mixes</Link>
      </li>
    </ul>
  );
};

export default AdminMenu;
