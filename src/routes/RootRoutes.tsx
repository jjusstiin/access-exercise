import { Navigate, type RouteObject } from "react-router-dom";
import DetailPage from "../pages/DetailPage";
import ListPage from "../pages/ListPage";

export const RootRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ListPage />,
  },
  {
    path: "detail",
    element: <DetailPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
