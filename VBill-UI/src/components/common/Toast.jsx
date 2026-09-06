function Toast({ type = "success", message }) {
  const success = type === "success";

  return (
    <div
      style={{
        backgroundColor: success ? "#f0faf0" : "#fff0f0",
        border: `1px solid ${success ? "#7db87d" : "#e07070"}`,
        borderRadius: "8px",

        // ✅ Responsive spacing
        padding: "clamp(10px, 2vw, 12px) clamp(12px, 2.5vw, 16px)",
        marginBottom: "clamp(12px, 2vw, 20px)",

        display: "flex",
        alignItems: "center",
        gap: "10px",

        // ✅ Responsive typography
        fontSize: "clamp(12px, 2vw, 14px)",
        fontWeight: "500",

        color: success ? "#2d6e2d" : "#8b2020",

        // ✅ Responsive width behavior
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      <span
        style={{
          fontSize: "16px",
          flexShrink: 0,
        }}
      >
        {success ? "✓" : "✕"}
      </span>

      <span style={{ wordBreak: "break-word" }}>
        {message}
      </span>
    </div>
  );
}

export default Toast;