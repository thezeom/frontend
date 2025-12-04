
import { Outlet } from "react-router-dom";
import { TopNavbar } from "./TopNavbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <main className="pt-20 p-6 lg:p-8 overflow-auto">
        <div className="max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
