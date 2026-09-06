import T from "./MasterStyles";

function FieldError({ error }) {
  if (!error) return null;

  return (
    <>
      <span className="field-error-text">
        {error}
      </span>

      <style>
        {`
          .field-error-text {
            color: ${T.errorColor};
            font-size: 11px;
            margin-top: 4px;
            line-height: 1.4;
            font-weight: 500;
            word-break: break-word;
            display: block;
            width: 100%;
          }

          /* Tablet */
          @media (max-width: 991px) {
            .field-error-text {
              font-size: 10.5px;
            }
          }

          /* Mobile */
          @media (max-width: 576px) {
            .field-error-text {
              font-size: 10px;
              margin-top: 5px;
            }
          }
        `}
      </style>
    </>
  );
}

export default FieldError;