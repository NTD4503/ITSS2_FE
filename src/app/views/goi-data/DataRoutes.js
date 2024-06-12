import Loadable from "app/components/Loadable";
import { lazy } from "react";
import { authRoles } from "../../auth/authRoles";

const DataList = Loadable(lazy(() => import("./DataList")));
const DataCart = Loadable(lazy(() => import("./DataCart")));

const dataListRoutes = [
  {
    path: "/data",
    element: <DataList />,
    auth: authRoles.admin,
  },
  { path: '/datacart', element: <DataCart /> },
];

export default dataListRoutes;
