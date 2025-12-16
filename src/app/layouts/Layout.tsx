import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import "../../styles/layout.css";
import Header from "./Header";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Header />
        <main className="admin-content">
          <Outlet />
        </main>
        <footer />
      </div>
    </div>
  );
}
