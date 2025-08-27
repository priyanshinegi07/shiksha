import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoutes = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsValid(false);
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/verify-token`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsValid(res.data.valid);
      } catch (err) {
        setIsValid(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);
  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }
  return isValid ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
