// pages/admin/index.tsx

import AdminLayout from "pages/admin/AdminLayout";
import AdminMenu from "pages/admin/AdminMenu";
import { StyledAdminWrapper } from "pages/admin/StyledAdmin";

const AdminPage = (): JSX.Element => {
  return (
    <AdminLayout>
      <StyledAdminWrapper>
        <h1>Admin</h1>
        <AdminMenu />
      </StyledAdminWrapper>
    </AdminLayout>
  );
};

export default AdminPage;
