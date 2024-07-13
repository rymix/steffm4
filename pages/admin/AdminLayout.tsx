// pages/admin/AdminLayout.tsx

import axios from "axios";
import { useRouter } from "next/router";
import { AdminLayoutProps } from "pages/admin/types";
import { useEffect, useState } from "react";

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        await axios.get("/api/auth/check", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoading(false);
      } catch {
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return <div>{children}</div>;
};

export default AdminLayout;
