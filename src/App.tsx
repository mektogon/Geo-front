import { useLocation } from "react-router-dom";

import { Layout } from "@layout";
import { ROUTES } from "@utils/constants";
import { AppRoutes } from "@utils/routes";

const App: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <div>
      {pathname === ROUTES.AUTH ? (
        <AppRoutes />
      ) : (
        <Layout>
          <AppRoutes />
        </Layout>
      )}
    </div>
  );
};

export default App;
