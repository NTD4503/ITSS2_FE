import Loadable from "app/components/Loadable";
import { lazy } from "react";
import { authRoles } from "../../auth/authRoles";

const DataDetail = Loadable(lazy(() => import("./DataDetail")));

const datadetailRoutes = [
    {
        path: "/data/:id",
        element: <DataDetail />,
        auth: authRoles.admin,
    },
];

export default datadetailRoutes;
