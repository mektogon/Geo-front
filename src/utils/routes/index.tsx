import { Route, Routes } from "react-router-dom";

import { Auth, Home } from "@pages";
import { ROUTES } from "@utils/constants";

export const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.HOME} element={<Home />} />
    <Route path={ROUTES.AUTH} element={<Auth />} />
  </Routes>
);
