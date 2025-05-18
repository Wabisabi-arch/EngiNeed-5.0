// components/Layout.jsx
import { Outlet } from "react-router-dom";
import Sidebar, { SidebarItem } from "./Sidebar";
import {
  Home,
  Info,
  Phone,
  Package,
  User,
  LogIn,
  LogOut,
  LayoutDashboard,
  Settings,
  LifeBuoy,
  Boxes,
  Receipt,
} from "lucide-react";

export default function Layout() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{ backgroundImage: "url('/src/assets/images/bg.svg')" }}
    >
      <Sidebar>
        <SidebarItem icon={<Home size={20} />} text="Home" to="/app/home" />
        <SidebarItem icon={<Info size={20} />} text="About" to="/app/about" />
        <SidebarItem
          icon={<Package size={20} />}
          text="Features"
          to="/app/features"
        />
        <hr className="my-3 text-gold-100" />
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          to="/app/dashboard"
        />
        <SidebarItem
          icon={<Boxes size={20} />}
          text="Orders"
          to="/app/orders"
        />
        <SidebarItem
          icon={<Receipt size={20} />}
          text="History"
          to="/app/history"
        />
        <hr className="my-3 text-gold-100" />
        <SidebarItem
          icon={<Settings size={20} />}
          text="Settings"
          to="/app/settings"
        />
      </Sidebar>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
