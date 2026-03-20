

import App from "../App";
import Login from "../pages/login/Login";
import homeRoute from "./homeRoute";
import mainHomeRoutes from "./mainHomeRoute";

const mainRoutes = [
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Login
      },
      {
        path: "login",
        Component: Login
      },
      ...homeRoute,
      ...mainHomeRoutes
    ],
  },
];

export default mainRoutes;
