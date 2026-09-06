import Header from "../components/Header";
import SideNav from "../components/SideNav";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-layout">

      {/* HEADER */}
      <Header toggleSidebar={() => setCollapsed(!collapsed)} />

      {/* BODY */}
      <div className="admin-body">

        {/* SIDEBAR */}
        <SideNav collapsed={collapsed} />

        {/* CONTENT */}
        <main className="admin-content">
          <Outlet />
        </main>

      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default AdminLayout;