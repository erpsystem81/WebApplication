import { useState } from "react";
import { NavLink } from "react-router-dom";

function Header({ toggleSidebar }) {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        padding: "clamp(10px, 2vw, 14px) clamp(12px, 3vw, 20px)",
        background: "#7b3f00",
        color: "#fff",

        boxSizing: "border-box",
        position: "sticky",
        top: 0,
        zIndex: 1000,

        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      {/* LEFT */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          minWidth: 0,
        }}
      >
        <button
          onClick={toggleSidebar}
          style={{
            fontSize: "20px",
            background: "transparent",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            padding: "6px 10px",
          }}
        >
          ☰
        </button>

        <NavLink
          to="/"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: "700",
            fontSize: "clamp(16px, 2.5vw, 20px)",
            whiteSpace: "nowrap",
          }}
        >
          V-BILL
        </NavLink>
      </div>

      {/* RIGHT */}
      <div
        style={{
          position: "relative",
          marginLeft: "auto",
        }}
      >
        <button
    onClick={() => setOpen(!open)}
    style={{
        background: "#c07830",
        border: "none",
        color: "#fff",
        padding: "8px 12px",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "16px",
    }}
>
    <i className="fas fa-user"></i> 
</button>

        {open && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "110%",

              background: "#fff",
              color: "#000",
              borderRadius: "8px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",

              minWidth: "150px",
              overflow: "hidden",
              zIndex: 999,
            }}
          >
            <button style={dropItem}>Profile</button>
            <button style={dropItem}>Settings</button>
            <button style={{ ...dropItem, color: "#c0392b" }}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

const dropItem = {
  width: "100%",
  padding: "10px",
  border: "none",
  background: "transparent",
  textAlign: "left",
  cursor: "pointer",
  fontSize: "14px",
};

export default Header;