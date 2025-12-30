// bookColumns.ts
import { createColumnHelper } from "@tanstack/react-table";
import { formatTime } from "@/untils/formatTime";
import type { Book } from "@/app/pages/book-management/list/book-api";
import BookActions from "./BookActions";

const columnHelper = createColumnHelper<Book>();

export const bookColumns = [
  columnHelper.accessor("id", {
    header: "ID",
  }),

  columnHelper.accessor("title", {
    header: "Title",
  }),

  columnHelper.accessor("isbn", {
    header: "ISBN",
  }),

  columnHelper.accessor("published_year", {
    header: "Published Year",
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => (
      <span
        className={`px-2 py-1 rounded text-sm font-medium ${
          info.getValue() === "available"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {info.getValue()}
      </span>
    ),
  }),

  columnHelper.accessor("created_at", {
    header: "Created At",
    cell: ({ row }) => (
      <div className="flex flex-col items-center">
        <span className="rounded-md border border-green-200 bg-green-50 px-2 py-1 text-sm text-green-700">
          {formatTime(row.original.created_at)}
        </span>
        {row.original.created_by?.email && (
          <span className="mt-1 text-xs text-gray-500">
            {row.original.created_by.email}
          </span>
        )}
      </div>
    ),
  }),

  columnHelper.accessor("updated_at", {
    header: "Updated At",
    cell: ({ row }) => (
      <div className="flex flex-col items-center">
        <span className="rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-sm text-blue-700">
          {formatTime(row.original.updated_at)}
        </span>
        {row.original.updated_by?.email && (
          <span className="mt-1 text-xs text-gray-500">
            {row.original.updated_by.email}
          </span>
        )}
      </div>
    ),
  }),

  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <BookActions book={row.original} />,
  }),
];
