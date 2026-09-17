import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkToken, refreshAccessToken } from "./api/auth";
import type { UserInfoFromToken } from "./types/schema";

type Props = {
  allowedRoles: string[];
};

const ProtectedRoutes = ({ allowedRoles }: Props) => {
  const [user, setUser] = useState<UserInfoFromToken | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function auth() {
      try {
        let accessToken = sessionStorage.getItem("access_token");
        if (!accessToken) {
          accessToken = await refreshAccessToken();
        }
        let response = await checkToken(accessToken);

        if (!response?.success) {
          accessToken = await refreshAccessToken();
          response = await checkToken(accessToken);
        }

        if (response.success) {
          setUser(response.userInfo);
        }
      } catch {
        sessionStorage.removeItem("access_token");
      } finally {
        setLoading(false);
      }
    }

    auth();
  }, []);
  if (loading) {
    return <h1>Checking authorization</h1>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
