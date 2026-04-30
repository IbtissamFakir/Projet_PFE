import { useState } from "react";
import SidBar from "./SidBar";
import { Outlet } from "react-router-dom";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="md:hidden bg-slate-900 text-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold transition hover:bg-white/20"
          >
            Menu
          </button>
          <div className="text-base font-semibold">Centre AL Fadl</div>
        </div>
      </div>

      <SidBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="min-h-screen bg-gray-100 md:pl-64">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;