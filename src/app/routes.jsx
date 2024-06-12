import AuthGuard from "app/auth/AuthGuard";
import chartsRoute from "app/views/charts/ChartsRoute";
import dashboardRoutes from "app/views/dashboard/DashboardRoutes";
import materialRoutes from "app/views/material-kit/MaterialRoutes";
import NotFound from "app/views/sessions/NotFound";
import sessionRoutes from "app/views/sessions/SessionRoutes";
import { Navigate } from "react-router-dom";
import MatxLayout from "./components/MatxLayout/MatxLayout";

import dataRoutes from "app/views/goi-data/DataRoutes";
import datadetailRoutes from "app/views/data-detail/DataDetailRoutes";
import tenantsRoutes from "./views/tenants/TenantsRoutes";
import invoicesRoutes from "app/views/invoices/InvoicesRoutes";

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...dashboardRoutes,
      ...chartsRoute,
      ...materialRoutes,
      ...dataRoutes,
      ...tenantsRoutes,
      ...datadetailRoutes,
      ...invoicesRoutes,
    ],
  },
  ...sessionRoutes,
  { path: "/", element: <Navigate to="dashboard/default" /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
