import { Navigate, type RouteObject } from "react-router-dom";
import DetailPage from "../pages/DetailPage";
import ListPage from "../pages/ListPage";

export const RootRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ListPage />,
  },
  {
    path: "login",
    element: <DetailPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
