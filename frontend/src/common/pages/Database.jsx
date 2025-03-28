import { useEffect } from "react";
import { useNavigate } from "react-router";

export const Database = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return <h1>Database</h1>;
};
