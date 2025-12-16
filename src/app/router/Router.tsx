import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layouts/Layout";
import MemberList from "../pages/member-management";
import DashboardPage from "../pages/dashboard";
import UserList from "../pages/user-management";

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "members", element: <MemberList /> },
      { path: "users", element: <UserList /> },
    ],
  },
  {
    path: "/login",
    element: "<LoginPage />",
  },
]);
