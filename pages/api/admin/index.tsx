import axios from "axios";
import Router from "next/router";
import { useEffect } from "react";

const AdminHome = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      Router.push("/admin/login");
    }
  }, []);

  return <div>Admin Home</div>;
};

export default AdminHome;
