import SidBar from "./SidBar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex">
      <SidBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;