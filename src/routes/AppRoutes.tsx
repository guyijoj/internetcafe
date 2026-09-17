import { Route, Routes } from "react-router-dom";
import ClientPage from "../client/ClientPage";
import AdminPage from "../admin/AdminPage";
import KitchenPage from "../kitchen/kitchenPage";
import LogInPage from "../auth/LogInPage";
import ProtectedRoutes from "../auth/ProtectedRoutes";
import { ROLES } from "../auth/roles";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientPage />} />
      <Route path="/login" element={<LogInPage />} />

      <Route element={<ProtectedRoutes allowedRoles={ROLES.ADMIN} />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>

      <Route element={<ProtectedRoutes allowedRoles={ROLES.KITCHEN} />}>
        <Route path="/kitchen" element={<KitchenPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
