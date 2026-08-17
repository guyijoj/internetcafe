import React from "react";
import { Route, Routes } from "react-router-dom";
import ClientPage from "../client/ClientPage";
import AdminPage from "../admin/AdminPage";
import KitchenPage from "../kitchen/kitchenPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/kitchen" element={<KitchenPage />} />
    </Routes>
  );
};

export default AppRoutes;
