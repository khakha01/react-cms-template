import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import type { NavigationItem } from "../../../types/navigation";
import type { ReactNode } from "react";

interface Props {
  item: NavigationItem;
  collapsed: boolean;
  isOpen: boolean;
  toggleMenu: (id: string) => void;
  t: (key: string) => string;
  renderChild: (item: NavigationItem) => ReactNode;
}

export default function SidebarNavItem({
  item,
  collapsed,
  isOpen,
  toggleMenu,
  t,
  renderChild,
}: Props) {
  const effectiveIsOpen = collapsed ? false : isOpen;
  const handleToggle = collapsed ? undefined : () => toggleMenu(item.id);

  // Class chung cho hover
  const hoverClass = "hover:bg-gray-100 hover:text-blue-600";

  // Class khi active: parent mở hoặc leaf active (sẽ xử lý riêng)
  const activeClass = "bg-blue-50 text-blue-600 font-medium";

  if (item.children?.length) {
    // ====== PARENT ITEM (có con) ======
    const isParentActive = effectiveIsOpen; // đơn giản: đang mở = active

    return (
      <div className="nav-group pb-3">
        <button
          className={`nav-parent flex items-center w-full text-sm rounded-lg px-3 py-2.5 transition-colors ${
            collapsed ? "justify-center" : "justify-between"
          } ${isParentActive ? activeClass : "text-gray-700"} ${hoverClass}`}
          onClick={handleToggle}
          style={{ cursor: collapsed ? "default" : "pointer" }}
        >
          <div className="flex gap-2 items-center text-sm">
            {item.icon}
            {!collapsed && <span>{t(item.title)}</span>}
          </div>
          {!collapsed && (
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${
                effectiveIsOpen ? "rotate-180" : ""
              }`}
            />
          )}
        </button>

        {!collapsed && (
          <div
            className={`nav-children transition-all duration-300 ease-in-out overflow-hidden ${
              effectiveIsOpen
                ? "max-h-96 opacity-100 pt-3 pl-6"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className={effectiveIsOpen ? "" : "h-0"}>
              {item.children.map(renderChild)}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ====== LEAF ITEM (không có con) ======
  return (
    <NavLink to={item.path!} end className="!p-0 !pb-4">
      {({ isActive }) => (
        <div
          className={`
        nav-link flex gap-2 items-center text-sm rounded-lg px-3 py-2.5 transition-colors
        ${collapsed ? "justify-center" : ""}
        ${isActive ? activeClass : "text-gray-700"}
        ${hoverClass}
      `}
        >
          {item.icon}
          {!collapsed && <span>{t(item.title)}</span>}
        </div>
      )}
    </NavLink>
  );
}
