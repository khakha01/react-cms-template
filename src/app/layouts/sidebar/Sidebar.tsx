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
    <aside className={`sidebar flex-col overflow-y-auto border-r border-gray-200 bg-white px-5 transition-all duration-300 xl:static xl:translate-x-0 dark:border-gray-800 dark:bg-black -translate-x-full ${collapsed ? "collapsed" : "fixed top-0 left-0 z-9999 flex min-h-screen w-[290px]"}`}>
      <div className={`flex items-center border-b border-gray-300 pb-4 ${collapsed ? "justify-center pt-3" : "justify-between"}`}>
        {!collapsed && <img src="/img/logo.png" alt="cms" className="object-cover w-32" />}
        <button
          className="collapse-btn border border-gray-300 p-1.5 mt-2 rounded-xl"
          onClick={toggle}
        >
          <Menu />
        </button>
      </div>
      <nav className="sidebar-nav pt-6">
        {NAVIGATION_MENU_ITEM.map(renderItem)}
      </nav>
    </aside>
  );
}
