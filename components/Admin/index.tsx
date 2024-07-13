// pages/admin/index.tsx

import AdminLayout from "components/Admin/AdminLayout";
import AdminMenu from "components/Admin/AdminMenu";
import { StyledAdminWrapper } from "components/Admin/StyledAdmin";

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
