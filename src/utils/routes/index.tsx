import { Navigate, Route, Routes } from "react-router-dom";

import { AddPage,Auth, CategoryPage, DetailsPage, HomePage } from "@pages";
import { ROUTES } from "@utils/constants";

export const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.HOME} element={<HomePage />} />
    <Route path={ROUTES.AUTH} element={<Auth />} />
    <Route path={ROUTES.CATEGORY} element={<CategoryPage />} />
    <Route path={ROUTES.DETAILS} element={<DetailsPage />} />
    <Route path={ROUTES.ADD} element={<AddPage />} />
    <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
  </Routes>
);
