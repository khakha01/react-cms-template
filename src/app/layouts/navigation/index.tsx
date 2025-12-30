import { BookOpen, LayoutDashboard, LayoutGrid, List, Plus, User2Icon, UserStar } from "lucide-react";
import type { NavigationItem } from "../../../types/navigation";


/**
 * khai báo cấu hình (config) cho menu điều hướng
 */
export const NAVIGATION_MENU_ITEM: NavigationItem[] = [
  {
    id: "common.dashboard",
    title: "common.dashboard",
    path: "/admin",
    icon: <LayoutDashboard/>
  },
  {
    id: "common.users",
    title: "common.users",
    icon: <User2Icon/>,
    children: [
      {
        id: "users.list",
        title: "user.list",
        path: "/admin/users",
        icon: <List />,
      },
      {
        id: "users.create",
        title: "user.create",
        path: "/admin/users/create",
        icon: <Plus />,
      },
    ],
  },
  {
    id: "common.members",
    title: "common.members",
    icon: <UserStar />,
    children: [
      {
        id: "members.list",
        title: "member.list",
        path: "/admin/members",
        icon: <List />,
      },
      {
        id: "members.create",
        title: "member.create",
        path: "/admin/members/create",
        icon: <Plus />,
      },
    ],
  },
  {
    id: "common.categories",
    title: "common.categories",
    icon: <LayoutGrid />,
    children: [
      {
        id: "categories.list",
        title: "category.list",
        path: "/admin/categories",
        icon: <List />,
      },
      {
        id: "categories.create",
        title: "category.create",
        path: "/admin/categories/create",
        icon: <Plus />,
      },
    ],
  },
  {
    id: "common.books",
    title: "common.books",
    icon: <BookOpen />,
    children: [
      {
        id: "books.list",
        title: "book.list",
        path: "/admin/books",
        icon: <List />,
      },
      {
        id: "books.create",
        title: "book.create",
        path: "/admin/books/create",
        icon: <Plus />,
      },
    ],
  },
  
];
