import axios from "axios";
import { useRouter } from "next/router";
import { JSX, useEffect, useState } from "react";

import { AdminLayoutProps } from "./types";

const AdminLayout = ({ children }: AdminLayoutProps): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      setLoading(false);
    } else {
      router.push("/admin/login");
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return <div>{children}</div>;
};

export default AdminLayout;
