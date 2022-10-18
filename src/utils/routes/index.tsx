import { Navigate, Route, Routes } from "react-router-dom";

import { Auth, Home } from "@pages";
import { ROUTES } from "@utils/constants";

export const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.HOME} element={<Home />} />
    <Route path={ROUTES.AUTH} element={<Auth />} />
    <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
  </Routes>
);
