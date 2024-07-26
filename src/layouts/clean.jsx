import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="w-screen h-screen overflow-hidden">
      <Outlet />
    </main>
  );
};

export default Layout;
