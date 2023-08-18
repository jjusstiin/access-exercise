import { Navigate, type RouteObject } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ListPage from "../pages/ListPage";

export const RootRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ListPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
