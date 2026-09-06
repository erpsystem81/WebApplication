import { inputStyle } from "./MasterStyles";

function FormSelect({
  value,
  onChange,
  options,
  focused,
  onFocus,
  onBlur,
  placeholder,
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      style={{
        ...inputStyle(focused),
        cursor: "pointer",

        // ✅ Responsive improvements
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        boxSizing: "border-box",

        // better mobile UX
        fontSize: "clamp(14px, 2.5vw, 16px)",
        padding: "10px 12px",
        borderRadius: "6px",
      }}
    >
      <option value="">{placeholder}</option>

      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

export default FormSelect;