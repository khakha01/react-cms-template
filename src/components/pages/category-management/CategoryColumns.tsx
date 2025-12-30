// CategoryColumns.ts
import { createColumnHelper } from "@tanstack/react-table";
import { formatTime } from "@/untils/formatTime";
import type { Category } from "@/app/pages/category-management/list/category-api";
import CategoryActions from "./CategoryActions";

const columnHelper = createColumnHelper<Category>();

export const categoryColumns = [
  columnHelper.accessor("id", {
    header: "ID",
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),

  columnHelper.accessor("slug", {
    header: "Slug",
  }),

  columnHelper.display({
  id: "type",
  header: "Type",
  cell: (info) => {
    const category = info.row.original;
    const isRoot = category.parent_id === null;

    return (
      <span
        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
          isRoot
            ? "bg-purple-100 text-purple-700"
            : "bg-orange-100 text-orange-700"
        }`}
      >
        {isRoot ? "Root" : "Child"}
      </span>
    );
  },
}),

  columnHelper.accessor("created_at", {
    header: "Created At",
    cell: (info) => {
      const row = info.row.original;

      return (
        <div className="flex">
          <div className="flex flex-col items-center">
            <span className="flex justify-center rounded-md border border-green-200 bg-green-50 px-2 py-1 text-sm font-medium text-green-700">
              {formatTime(row.created_at)}
            </span>

            {row.created_by?.email && (
              <span className="mt-1 text-sm text-gray-500">
                {row.created_by.email}
              </span>
            )}
          </div>
        </div>
      );
    },
  }),

  columnHelper.accessor("updated_at", {
    header: "Updated Date",
    cell: (info) => {
      const row = info.row.original;

      return (
        <div className="flex">
          <div className="flex flex-col items-center">
            <span className="flex justify-center rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700">
              {formatTime(row.updated_at)}
            </span>

            {row.updated_by?.email && (
              <span className="mt-1 text-sm text-gray-500">
                {row.updated_by.email}
              </span>
            )}
          </div>
        </div>
      );
    },
  }),

  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CategoryActions category={row.original} />,
  }),
];
