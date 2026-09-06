import { cardStyle } from "./MasterStyles";

function MasterCard({ children }) {
  return (
    <div
      style={{
        ...cardStyle,

        // ✅ Responsive behavior
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",

        // spacing for mobile
        padding: "clamp(12px, 2vw, 24px)",

        // better box handling
        boxSizing: "border-box",

        // optional enhancement for mobile feel
        borderRadius: "10px",
      }}
    >
      {children}
    </div>
  );
}

export default MasterCard;