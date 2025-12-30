import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/Layout";
import DashboardPage from "../pages/dashboard";
import UserList from "../pages/user-management/list";
import NotFoundPage from "../pages/404";
import LoginPage from "../pages/auth/login";
import AuthGuard from "../../middleware/AuthGuard";
import CreateUser from "../pages/user-management/create";
import EditUser from "../pages/user-management/edit";
import MemberList from "../pages/member-management/list";
import CreateMember from "../pages/member-management/create";
import EditMember from "../pages/member-management/edit";
import CategoryList from "../pages/category-management/list";
import CreateCategory from "../pages/category-management/create";
import EditCategory from "../pages/category-management/edit";
import BookList from "../pages/book-management/list";
import CreateBook from "../pages/book-management/create";
import EditBook from "../pages/book-management/edit";
import EditProfile from "../pages/auth/profile";
import PageSupport from "../pages/auth/support";

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
          {
            path: "users",
            children: [
              { index: true, element: <UserList /> },
              { path: "create", element: <CreateUser /> },
              { path: "edit/:id", element: <EditUser /> },
            ],
          },
          {
            path: "members",
            children: [
              { index: true, element: <MemberList /> },
              { path: "create", element: <CreateMember /> },
              { path: "edit/:id", element: <EditMember /> },
            ],
          },
          {
            path: "categories",
            children: [
              { index: true, element: <CategoryList /> },
              { path: "create", element: <CreateCategory /> },
              { path: "edit/:id", element: <EditCategory /> },
            ],
          },
          {
            path: "books",
            children: [
              { index: true, element: <BookList /> },
              { path: "create", element: <CreateBook /> },
              { path: "edit/:id", element: <EditBook /> },
            ],
          },
          {
            path: "edit-profile",
            element: <EditProfile />,
          },
          {
            path: "support",
            element: <PageSupport />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/admin" replace />,
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
