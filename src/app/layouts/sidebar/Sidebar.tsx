import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "lucide-react";
import { useSidebar } from "../../../hooks/use-sidebar";
import { NAVIGATION_MENU_ITEM } from "../navigation";
import type { NavigationItem } from "../../../types/navigation";
import SidebarNavItem from "./SidebarNavItem";

export default function Sidebar() {
  const { collapsed, toggle } = useSidebar();
  const { t } = useTranslation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const toggleMenu = (id: string) => {
    setOpenKeys((prev) => (prev.includes(id) ? [] : [id]));
  };

  const renderItem = (item: NavigationItem) => (
    <SidebarNavItem
      key={item.id}
      item={item}
      collapsed={collapsed}
      isOpen={openKeys.includes(item.id)}
      toggleMenu={toggleMenu}
      t={t}
      renderChild={renderItem}
    />
  );

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <button className="collapse-btn" onClick={toggle}>
        <Menu />
      </button>

      <nav className="sidebar-nav">{NAVIGATION_MENU_ITEM.map(renderItem)}</nav>
    </aside>
  );
}
