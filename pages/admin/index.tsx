import AdminMenu from "pages/admin/AdminMenu";
import { StyledAdminWrapper } from "pages/admin/StyledAdmin";

const AdminPage = (): JSX.Element => {
  return (
    <StyledAdminWrapper>
      <h1>Admin</h1>
      <AdminMenu />
    </StyledAdminWrapper>
  );
};

export default AdminPage;
