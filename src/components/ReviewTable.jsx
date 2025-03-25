import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { exportToCSV } from "../helpers/exportToCSV";
import Loader from "./Loader";

function Table({
  title,
  subTitle,
  columns,
  data,
  exportData = false,
  isLoading = false,
  hasNumber = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange
}) {
  const [processedColumns, setProcessedColumns] = useState(columns);

  useEffect(() => {
    if (hasNumber) {
      setProcessedColumns([{ key: "number", label: "#" }, ...columns]);
    } else {
      setProcessedColumns(columns);
    }
  }, [hasNumber, columns]);

  const handleExport = () => {
    const exportColumns = hasNumber ? columns : processedColumns;
    exportToCSV(exportColumns, data, `export-${title || "data"}`);
  };

  return (
    <div className="md:px-5 px-3 pt-6 pb-12 md:rounded-lg overflow-hidden bg-white">
      <div className="flex justify-between items-center mb-4">
        <div>
          {title && <p className="text-base font-medium mb-2">{title}</p>}
          {subTitle && <h3 className="text-lg font-semibold">{subTitle}</h3>}
        </div>
        
        {exportData && (
          <button
            onClick={handleExport}
            className="px-3 py-2 flex gap-2 items-center rounded-md bg-blue-900 text-white hover:bg-blue-800 transition-colors"
          >
            <span className="text-xs">Export data</span>
            <svg
              width="10"
              height="12"
              viewBox="0 0 10 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.00122 1V11M0.909424 6.9082L5.00033 10.9991L9.09124 6.9082"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="overflow-hidden border rounded-lg">
        <table className="table-auto text-left w-full overflow-x-scroll">
          <thead className="bg-gray-50">
            <tr>
              {processedColumns.map((column) => (
                <th
                  key={column.key}
                  className="px-3 py-4 text-sm font-medium text-gray-700"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={processedColumns.length} className="text-center py-6">
                  <Loader size={24} />
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={processedColumns.length} className="text-center py-6 text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  {processedColumns.map((column) => (
                    <td
                      key={column.key}
                      className="px-3 py-4 text-sm text-gray-900"
                    >
                      {column.key === "number" ? (
                        rowIndex + 1
                      ) : column.render ? (
                        column.render(row[column.key], row)
                      ) : (
                        row[column.key]
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && onPageChange && (
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-gray-100 disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

Table.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.node,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      render: PropTypes.func
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  exportData: PropTypes.bool,
  isLoading: PropTypes.bool,
  hasNumber: PropTypes.bool,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func
};

export default Table;