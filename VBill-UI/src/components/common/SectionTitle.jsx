import T from "./MasterStyles";

function SectionTitle({ children }) {
  return (
    <h2
      style={{
        margin: 0,

        // ✅ Responsive font size
        fontSize: "clamp(16px, 2.2vw, 22px)",

        fontWeight: "700",
        color: T.menuText,
        fontFamily: "'Georgia', serif",

        // ✅ Better mobile handling
        lineHeight: 1.3,
        wordBreak: "break-word",
      }}
    >
      {children}
    </h2>
  );
}

export default SectionTitle;