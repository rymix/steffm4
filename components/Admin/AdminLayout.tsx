// pages/admin/AdminLayout.tsx

import axios from "axios";
import { AdminLayoutProps } from "components/Admin/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("no token");
          router.push("/admin/login");
          return;
        }

        await axios.get("/api/auth/check", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("got here");
        setLoading(false);
      } catch {
        console.log("catch");
        router.push("/admin/login");
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
