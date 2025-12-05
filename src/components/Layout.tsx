
import { Outlet } from "react-router-dom";
import { TopNavbar } from "./TopNavbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
