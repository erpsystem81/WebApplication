import React from "react";
import T from "./MasterStyles";

function SelectInput({
  value,
  onChange,
  options = [],
  placeholder = "Select",
  focused,
  onFocus,
  onBlur,
}) {

  return (
    <select
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      style={{
        width: "100%",
        padding: "8px 10px",
        border: `1px solid ${
          focused ? T.accent : T.border
        }`,
        borderRadius: "6px",
        backgroundColor: T.inputBg,
        color: T.menuText,
        fontSize: "13px",
        outline: "none",
        boxSizing: "border-box",
      }}
    >
      <option value="">
        {placeholder}
      </option>

      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SelectInput;