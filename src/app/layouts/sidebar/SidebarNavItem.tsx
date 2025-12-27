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
  // Nếu sidebar collapsed → ép buộc không mở submenu nào
  const effectiveIsOpen = collapsed ? false : isOpen;

  // Nếu collapsed → không cho click để mở submenu
  const handleToggle = collapsed ? undefined : () => toggleMenu(item.id);

  if (item.children?.length) {
    return (
      <div className="nav-group pb-3">
        <button
          className={`nav-parent flex items-center w-full text-sm ${collapsed ? "justify-center" : "justify-between"}`}
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

        {/* Chỉ render children khi không collapsed */}
        {!collapsed && (
          <div
            className={`nav-children pt-3 pl-6 transition-all duration-300 ease-in-out overflow-hidden ${
              effectiveIsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {item.children.map(renderChild)}
          </div>
        )}
      </div>
    );
  }

  // Leaf item
  return (
    <NavLink to={item.path!} className="!p-0 !pb-6">
     <div className={`nav-link flex gap-2 items-center text-sm text-black ${collapsed && "justify-center"}`}>
       {item.icon}
      {!collapsed && <span>{t(item.title)}</span>}
     </div>
    </NavLink>
  );
}
