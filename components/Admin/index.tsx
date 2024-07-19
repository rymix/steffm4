// components/Admin/index.tsx

import AdminMenu from "components/Admin/AdminMenu";
import { StyledAdminWrapper } from "components/Admin/StyledAdmin";

const AdminPage = (): JSX.Element => {
  return (
    <StyledAdminWrapper>
      <h1>Admin</h1>
      <AdminMenu />
    </StyledAdminWrapper>
  );
};

export default AdminPage;
