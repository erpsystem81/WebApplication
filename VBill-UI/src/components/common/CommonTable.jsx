import T from "./MasterStyles";

function CommonTable({
  columns = [],
  data = [],
}) {
  return (
    <>
      <div className="common-table-wrapper">
        <div className="table-responsive">
          <table className="table common-table align-middle mb-0">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((row, index) => (
                  <tr key={row.id || index}>
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        data-label={col.label}
                      >
                        {col.render
                          ? col.render(row)
                          : row[col.key] || "-"}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center empty-row"
                  >
                    No Records Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>
        {`
          .common-table-wrapper {
            width: 100%;
            overflow: hidden;
            border-radius: 12px;
            border: 1px solid ${T.border};
            background: ${T.white};
          }

          .common-table {
            margin: 0;
            width: 100%;
          }

          .common-table thead {
            background: ${T.tableHead};
          }

          .common-table th {
            color: ${T.menuText};
            font-size: 13px;
            font-weight: 700;
            padding: 14px 16px;
            border-bottom: 1px solid ${T.border};
            white-space: nowrap;
          }

          .common-table td {
            color: ${T.menuText};
            font-size: 13px;
            padding: 14px 16px;
            vertical-align: middle;
            border-bottom: 1px solid #f1e4d4;
          }

          .common-table tbody tr:hover {
            background-color: ${T.rowHover};
          }

          .empty-row {
            padding: 40px 20px !important;
            color: ${T.mutedText};
            font-size: 13px;
          }

          /* Tablet */
          @media (max-width: 991px) {
            .common-table th,
            .common-table td {
              padding: 12px;
              font-size: 12px;
            }
          }

          /* Mobile Card View */
          @media (max-width: 576px) {
            .common-table thead {
              display: none;
            }

            .common-table,
            .common-table tbody,
            .common-table tr,
            .common-table td {
              display: block;
              width: 100%;
            }

            .common-table tr {
              margin-bottom: 14px;
              border: 1px solid ${T.border};
              border-radius: 10px;
              overflow: hidden;
              background: ${T.white};
              box-shadow: 0 2px 8px ${T.shadow};
            }

            .common-table td {
              display: flex;
              justify-content: space-between;
              align-items: center;
              gap: 12px;
              text-align: right;
              padding: 12px 14px;
              border-bottom: 1px solid #f3e7da;
            }

            .common-table td:last-child {
              border-bottom: none;
            }

            .common-table td::before {
              content: attr(data-label);
              font-weight: 700;
              color: ${T.menuText};
              text-align: left;
            }

            .empty-row {
              text-align: center !important;
              display: block !important;
            }

            .empty-row::before {
              display: none;
            }
          }
        `}
      </style>
    </>
  );
}

export default CommonTable;