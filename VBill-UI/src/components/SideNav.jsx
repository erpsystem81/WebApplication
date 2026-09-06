import { useState } from "react";
import { NavLink } from "react-router-dom";

function SideNav({ collapsed }) {

  const [openMaster, setOpenMaster] = useState(true);
  const [openSetup, setOpenSetup] = useState(true);

  return (
    <aside
      className={`side-navigation ${collapsed ? "sidebar-collapsed" : "sidebar-expanded"
        }`}
    >

      {/* <div className="sidebar-title">
        {!collapsed && "MAIN NAVIGATION"}
      </div> */}

      <ul className="sidebar-menu">

        {/* MASTER */}
        <li>

          <div
            className="sidebar-parent"
            onClick={() => setOpenMaster(!openMaster)}
          >
            <span>📦 {!collapsed && "Master"}</span>

            {!collapsed && (
              <span>{openMaster ? "−" : "+"}</span>
            )}
          </div>

          {openMaster && !collapsed && (
            <ul className="sidebar-submenu">

              {/* SETUP */}
              <li>

                <div
                  className="sidebar-parent submenu-parent"
                  onClick={() => setOpenSetup(!openSetup)}
                >
                  <span>⚙ Setup</span>

                  <span>
                    {openSetup ? "−" : "+"}
                  </span>
                </div>

                {openSetup && (
                  <ul className="sidebar-submenu">

                    <li>
                      <NavLink
                        to="/businessinformation"
                        className="sidebar-link"
                      >
                        Business Information
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/regionalsettings"
                        className="sidebar-link"
                      >
                        Regional Settings
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/location"
                        className="sidebar-link"
                      >
                        Location
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/uom"
                        className="sidebar-link"
                      >
                        UOM
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/category"
                        className="sidebar-link"
                      >
                        Category
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/taxcode"
                        className="sidebar-link"
                      >
                        Tax Code
                      </NavLink>
                    </li>

                  </ul>
                )}
              </li>

              <li>
                <NavLink
                  to="/item"
                  className="sidebar-link"
                >
                  📦 Item Master
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/customer"
                  className="sidebar-link"
                >
                  👥 Customer Master
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/vendor"
                  className="sidebar-link"
                >
                  🚚 Vendor Master
                </NavLink>
              </li>

            </ul>
          )}
        </li>

        {/* TRANSACTION */}
        <li>
          <NavLink
            to="/transactions"
            className="sidebar-link top-link"
          >
            💳 {!collapsed && "Transactions"}
          </NavLink>
        </li>

        {/* REPORTS */}
        <li>
          <NavLink
            to="/reports"
            className="sidebar-link top-link"
          >
            📊 {!collapsed && "Reports"}
          </NavLink>
        </li>

      </ul>
    </aside>
  );
}

export default SideNav;