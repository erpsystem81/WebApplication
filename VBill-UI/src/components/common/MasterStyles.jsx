const T = {
  headerBg: "#7b3f00",
  sidebarBg: "#f5ebe0",
  contentBg: "#fdf8f3",

  menuText: "#7b3f00",
  accent: "#c07830",
  hover: "#5c2e00",

  border: "#d4b896",

  inputBg: "#fffdf9",

  labelColor: "#5c2e00",

  mutedText: "#a07040",

  errorColor: "#c0392b",

  white: "#ffffff",

  shadow: "rgba(123,63,0,0.10)",
};

export const cardStyle = {
  backgroundColor: T.white,
  borderRadius: "14px",
  border: `1px solid ${T.border}`,
  boxShadow: `0 4px 16px ${T.shadow}`,

  // ✅ Responsive padding
  padding: "clamp(12px, 2vw, 20px)",

  // ✅ responsive width behavior (important for mobile cards)
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
};

export const pageStyle = {
  minHeight: "100vh",
  backgroundColor: T.contentBg,

  // ✅ responsive page padding
  padding: "clamp(12px, 3vw, 24px)",

  fontFamily: "'Segoe UI', sans-serif",

  // optional improvement for layouts
  boxSizing: "border-box",
};

export default T;