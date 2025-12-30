// AdminLayout.tsx
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./sidebar/Sidebar";

export default function AdminLayout() {
  return (
    <div>
      <div className="admin-layout min-h-screen bg-gray-50 dark:bg-gray-900 flex">
        {/* Sidebar - ẩn trên mobile, hiện trên desktop */}
        <Sidebar />

        {/* Main content */}
        <div className="admin-main flex-1 min-w-0 flex flex-col">
          <Header />

          {/* Content */}
          <main className="admin-content flex-1 px-4 py-6 md:px-8 lg:px-12">
            <Outlet />
          </main>

          {/* Footer (nếu có) */}
          <footer className="border-t border-gray-200 dark:border-gray-800 px-6 py-4 text-center text-sm text-gray-500">
            © 2025 Admin CMS. All rights reserved By Huynh Kha.
          </footer>
        </div>
      </div>
    </div>
  );
}
