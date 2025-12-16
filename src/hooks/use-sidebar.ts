import { useState } from "react";

export function useSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed(!collapsed);

  return { collapsed, toggle };
}
