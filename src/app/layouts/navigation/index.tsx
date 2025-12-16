import { LayoutDashboard, List, Plus, User2Icon } from "lucide-react";
import type { NavigationItem } from "../../../types/navigation";

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
    icon: <User2Icon/>,
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
];
