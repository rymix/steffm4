/* eslint-disable jsx-a11y/label-has-associated-control */
import bcrypt from "bcryptjs";
import AdminLayout from "components/Admin/AdminLayout";
import AdminMenu from "components/Admin/AdminMenu";
import {
  StyledAdminFormElements,
  StyledAdminWrapper,
} from "components/Admin/StyledAdmin";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MakePassword = (): JSX.Element => {
  const router = useRouter();
  const salt = bcrypt.genSaltSync(10);
  const [hashedPassword, setHashedPassword] = useState<string>("");

  /* Initial load */
  useEffect(() => {
    setHashedPassword(
      bcrypt.hashSync((router.query.password as string) || "", salt),
    );
  }, []);

  return (
    <AdminLayout>
      <StyledAdminWrapper>
        <h1>Password</h1>
        <AdminMenu />
        <StyledAdminFormElements>
          <label htmlFor="password-hash">Password Hash</label>
          <input
            id="password-hash"
            type="text"
            name="passwordHash"
            value={hashedPassword}
            style={{ width: "550px" }}
            readOnly
          />
        </StyledAdminFormElements>
      </StyledAdminWrapper>
    </AdminLayout>
  );
};

export default MakePassword;