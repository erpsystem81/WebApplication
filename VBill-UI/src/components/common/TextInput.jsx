import T from "./MasterStyles";

function TextInput({
  value,
  onChange,
  placeholder = "",
  type = "text",
  focused,
  onFocus,
  onBlur,
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
      style={{
        width: "100%",
        boxSizing: "border-box",

        // ✅ Responsive padding
        padding: "clamp(8px, 1.5vw, 10px) 12px",

        border: `1px solid ${focused ? T.accent : T.border}`,
        borderRadius: "8px",
        backgroundColor: T.inputBg,
        color: "#3b1f0e",

        // ✅ Responsive + mobile safe font size (important for iOS)
        fontSize: "clamp(14px, 2vw, 16px)",

        outline: "none",
        transition: "all 0.2s ease",

        boxShadow: focused
          ? "0 0 0 3px rgba(192,120,48,0.12)"
          : "none",

        // ✅ Mobile usability
        minHeight: "40px",
      }}
    />
  );
}

export default TextInput;