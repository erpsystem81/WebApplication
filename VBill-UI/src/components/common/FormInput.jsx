import { inputStyle } from "./MasterStyles";

function FormInput({
  value,
  onChange,
  placeholder,
  focused,
  onFocus,
  onBlur,
  type = "text",
  disabled = false,
}) {
  return (
    <>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        className="responsive-form-input"
        style={{
          ...inputStyle(focused),
          opacity: disabled ? 0.7 : 1,
          cursor: disabled
            ? "not-allowed"
            : "text",
        }}
      />

      <style>
        {`
          .responsive-form-input {
            width: 100%;
            min-width: 0;
            box-sizing: border-box;
            transition: all 0.2s ease;
          }

          .responsive-form-input::placeholder {
            opacity: 0.7;
          }

          /* Tablet */
          @media (max-width: 991px) {
            .responsive-form-input {
              font-size: 13px !important;
              padding: 10px 12px !important;
            }
          }

          /* Mobile */
          @media (max-width: 576px) {
            .responsive-form-input {
              font-size: 14px !important;
              padding: 11px 12px !important;
              min-height: 42px;
            }
          }
        `}
      </style>
    </>
  );
}

export default FormInput;