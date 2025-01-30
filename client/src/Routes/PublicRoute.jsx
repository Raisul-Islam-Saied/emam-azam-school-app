import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

function PublicRoute({ children }) {
  const { currentUser, authLoading } = useAuth();
  if (authLoading) {
    <Loader />;
  }
  if (!currentUser) {
    return <>{children}</>;
  } else {
    window.location.replace("/");
  }
}

export default PublicRoute;
