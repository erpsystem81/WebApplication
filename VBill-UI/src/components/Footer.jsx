function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        textAlign: "center",

        // ✅ Responsive padding
        padding: "clamp(10px, 2vw, 16px)",

        // ✅ Responsive font size
        fontSize: "clamp(12px, 1.8vw, 14px)",

        color: "#7b3f00",
        backgroundColor: "#f5ebe0",

        boxSizing: "border-box",

        // optional polish
        borderTop: "1px solid #d4b896",
      }}
    >
      © 2026 V-Bill Billing Software
    </footer>
  );
}

export default Footer;