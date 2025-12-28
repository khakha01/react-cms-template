import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/Layout";
import MemberList from "../pages/member-management";
import DashboardPage from "../pages/dashboard";
import UserList from "../pages/user-management/list";
import NotFoundPage from "../pages/404";
import LoginPage from "../pages/auth";
import AuthGuard from "../../middleware/AuthGuard";
import CreateUser from "../pages/user-management/create";
import EditUser from "../pages/user-management/edit";

/**
 * khai báo router (định tuyến URL) cho app
 */
export const router = createBrowserRouter([
  {
    element: <AuthGuard />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "members", element: <MemberList /> },
          {
            path: "users",
            children: [
              { index: true, element: <UserList /> },
              { path: "create", element: <CreateUser /> },
            ],
          },
          { path: "users", element: <UserList /> },
          { path: "users/create", element: <CreateUser /> },
          { path: "users/edit/:id", element: <EditUser /> },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
