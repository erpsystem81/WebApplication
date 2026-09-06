import T from "./MasterStyles";

function FieldLabel({ label, required }) {
  return (
    <label
      style={{
        display: "block",
        marginBottom: "6px",
        fontSize: "12px",
        fontWeight: "600",
        color: T.labelColor,
        letterSpacing: "0.3px",
      }}
    >
      {label}

      {required && (
        <span
          style={{
            color: T.accent,
            marginLeft: "2px",
          }}
        >
          *
        </span>
      )}
    </label>
  );
}

export default FieldLabel;