export interface NavigationItem {
  id: string;
  title: string;           
  path?: string;
  icon?: React.ReactNode;
  roles?: string[];
  children?: NavigationItem[];
}