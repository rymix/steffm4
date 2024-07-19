// components/Admin/AdminLayout.tsx

import axios from "axios";
import { AdminLayoutProps } from "components/Admin/types";
import { Router } from "next/router";
import { useEffect, useState } from "react";

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }): JSX.Element => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      setLoading(false);
    } else {
      Router.push("/admin/login");
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return <div>{children}</div>;
};

export default AdminLayout;
