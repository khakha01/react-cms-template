// columns.ts
import { createColumnHelper } from "@tanstack/react-table";
import type { User } from "../../../app/pages/user-management/list/user-api";
import UserActions from "@/components/pages/user-management/UserActions";
import { formatTime } from "@/untils/formatTime";

const columnHelper = createColumnHelper<User>();
export const userColumns = [
  columnHelper.accessor("id", {
    header: "ID",
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.accessor("created_at", {
    header: "Created At",
    cell: (info) => {
      const row = info.row.original;
      return (
        <div className="flex ">
          <div className="flex items-center flex-col">
            <span className="flex justify-center rounded-md border border-green-200 bg-green-50 px-2 py-1 text-sm font-medium text-green-700">
              {formatTime(row.created_at)}
            </span>
            {row.created_by?.email ? (
              <span className="mt-1 text-sm text-gray-500">
                {row.created_by.email}
              </span>
            ) : (
              ""
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
            {row.updated_by?.email ? (
              <span className="mt-1 text-sm text-gray-500">
                {row.updated_by.email}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <UserActions user={row.original} />,
  }),
];
