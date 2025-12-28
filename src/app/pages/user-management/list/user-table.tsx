import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState } from "react";
import type { User } from "./user-api";
import { userColumns } from "./user-columns";

type UserTableProps = {
  data: User[];
};

export default function UserTable({ data }: UserTableProps) {
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns: userColumns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      {/* Search */}
      <input
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search users..."
        className="border px-3 py-2 rounded-xl mb-4"
      />

      {/* Table */}
      <table className="table-auto w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border px-2 py-1 text-left">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border px-2 py-1">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 gap-4 flex-wrap">
        {/* LEFT: Page size */}
        <div className="flex items-center gap-2">
          <span>Show</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="border px-2 py-1 rounded"
          >
            {[10, 20, 30].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span>entries</span>
        </div>

        {/* CENTER: Page numbers */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            ‹
          </button>

          {Array.from({ length: table.getPageCount() }, (_, index) => (
            <button
              key={index}
              onClick={() => table.setPageIndex(index)}
              className={`px-3 py-1 border rounded
          ${
            table.getState().pagination.pageIndex === index
              ? "bg-blue-500 text-white"
              : "bg-white"
          }
        `}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            ›
          </button>
        </div>

        {/* RIGHT: Showing info */}
        <div className="text-sm text-gray-600">
          {(() => {
            const { pageIndex, pageSize } = table.getState().pagination;
            const total = table.getFilteredRowModel().rows.length;
            const start = pageIndex * pageSize + 1;
            const end = Math.min(start + pageSize - 1, total);

            return `Showing ${start}–${end} of ${total} entries`;
          })()}
        </div>
      </div>
    </div>
  );
}
