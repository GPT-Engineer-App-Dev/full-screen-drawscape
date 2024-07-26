import { navItems } from "@/nav-items";
import { Outlet } from "react-router-dom";
import { DesktopNavbar } from "./_components/DesktopNavbar";
import { MobileSheet } from "./_components/MobileSheet";
import { UserMenu } from "./_components/UserMenu";
import { PenTool } from "lucide-react";

const Layout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
        <div className="flex items-center gap-2">
          <PenTool className="h-6 w-6" />
          <span className="font-semibold text-lg">DrawingApp</span>
        </div>
        <DesktopNavbar navItems={navItems} />
        <div className="flex items-center gap-4">
          <MobileSheet navItems={navItems} />
          <UserMenu />
        </div>
      </header>
      <main className="flex-grow overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
