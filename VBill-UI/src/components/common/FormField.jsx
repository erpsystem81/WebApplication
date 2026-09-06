import FieldLabel from "./FieldLabel";
import FieldError from "./FieldError";

function FormField({
  label,
  required,
  error,
  children,
  col = 12,
  md = 6,
  lg,
}) {
  return (
    <>
      <div
        className="responsive-form-field"
        style={{
          "--col": col,
          "--md": md,
          "--lg": lg || md,
        }}
      >
        <FieldLabel
          label={label}
          required={required}
        />

        {children}

        <FieldError error={error} />
      </div>

      <style>
        {`
          .responsive-form-field {
            grid-column: span var(--lg);
            display: flex;
            flex-direction: column;
            width: 100%;
            min-width: 0;
          }

          /* Tablet */
          @media (max-width: 991px) {
            .responsive-form-field {
              grid-column: span var(--md);
            }
          }

          /* Mobile */
          @media (max-width: 576px) {
            .responsive-form-field {
              grid-column: span var(--col);
            }
          }
        `}
      </style>
    </>
  );
}

export default FormField;