import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import PageisLoading from "../pages/PageisLoading";
import DeadEndPage from "../pages/DeadEndPage";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(AppContext);

  if (loading) return <PageisLoading />; // ✅ Show this while loading
  return isLoggedIn ? children : <DeadEndPage />;
};

export default ProtectedRoute;
