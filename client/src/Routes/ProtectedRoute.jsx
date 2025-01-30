import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

function ProtectedRoute({ children }) {
  const { currentUser, authLoading } = useAuth();
  if (authLoading) {
    <Loader />;
  } if ( 1 === 1) {
    return <>{children}</>;
  } else {
    window.location.replace("/login");
  }
}

export default ProtectedRoute;
