import T from "./MasterStyles";

export function PrimaryButton({
  children,
  loading,
  style = {},
  ...props
}) {
  return (
    <>
      <button
        {...props}
        disabled={loading}
        className="responsive-btn primary-btn"
        style={{
          backgroundColor: loading
            ? "#b08060"
            : T.headerBg,

          color: T.white,

          border: "none",

          cursor: loading
            ? "not-allowed"
            : "pointer",

          opacity: loading ? 0.7 : 1,

          boxShadow: `0 2px 8px ${T.shadow}`,

          ...style,
        }}
      >
        {children}
      </button>

      <style>
        {`
          .responsive-btn {
            border-radius: 8px;
            padding: 11px 32px;
            font-size: 13px;
            font-weight: 600;
            transition: all 0.2s ease;
            min-height: 42px;
            white-space: nowrap;
          }

          /* Tablet */
          @media (max-width: 991px) {
            .responsive-btn {
              padding: 10px 24px;
              font-size: 13px;
            }
          }

          /* Mobile */
          @media (max-width: 576px) {
            .responsive-btn {
              width: 100%;
              padding: 11px 18px;
              font-size: 14px;
            }
          }
        `}
      </style>
    </>
  );
}

export function SecondaryButton({
  children,
  style = {},
  ...props
}) {
  return (
    <>
      <button
        {...props}
        className="responsive-btn secondary-btn"
        style={{
          backgroundColor: "transparent",

          color: T.menuText,

          border: `1.5px solid ${T.accent}`,

          cursor: "pointer",

          ...style,
        }}
      >
        {children}
      </button>

      <style>
        {`
          .responsive-btn {
            border-radius: 8px;
            padding: 11px 32px;
            font-size: 13px;
            font-weight: 600;
            transition: all 0.2s ease;
            min-height: 42px;
            white-space: nowrap;
          }

          /* Tablet */
          @media (max-width: 991px) {
            .responsive-btn {
              padding: 10px 24px;
              font-size: 13px;
            }
          }

          /* Mobile */
          @media (max-width: 576px) {
            .responsive-btn {
              width: 100%;
              padding: 11px 18px;
              font-size: 14px;
            }
          }
        `}
      </style>
    </>
  );
}