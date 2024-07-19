// pages/admin/login.tsx
import axios from "axios";
import {
  StyledAdminButton,
  StyledAdminFormElements,
  StyledAdminWrapper,
} from "components/Admin/StyledAdmin";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const LoginPage = (): JSX.Element => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/admin/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      router.push("/admin");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <StyledAdminWrapper>
      <h1>Stef.FM Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <StyledAdminFormElements>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledAdminButton type="submit">Login</StyledAdminButton>
        </StyledAdminFormElements>
      </form>
      {error && <p>{error}</p>}
    </StyledAdminWrapper>
  );
};

export default LoginPage;
