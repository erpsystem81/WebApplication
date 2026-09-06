function FormRow({ children }) {
  return (
    <>
      <div className="form-row-grid">
        {children}
      </div>

      <style>
        {`
          .form-row-grid {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 20px;
            margin-bottom: 18px;
            width: 100%;
          }

          /* Tablet */
          @media (max-width: 991px) {
            .form-row-grid {
              grid-template-columns: repeat(6, 1fr);
              gap: 16px;
            }
          }

          /* Mobile */
          @media (max-width: 576px) {
            .form-row-grid {
              grid-template-columns: repeat(1, 1fr);
              gap: 14px;
            }
          }
        `}
      </style>
    </>
  );
}

export default FormRow;