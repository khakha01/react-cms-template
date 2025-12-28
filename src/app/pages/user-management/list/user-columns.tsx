// columns.ts
import { createColumnHelper } from "@tanstack/react-table";
import type { User } from "./user-api";
import { Link } from "react-router-dom";

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
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex gap-2">
          

          <Link to={`/admin/users/edit/${row.original.id}`}>
          <button
            onClick={() => {
              console.log("Edit user:", user);
            }}
            className="px-2 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Edit
          </button>
          </Link>

          <button
            onClick={() => {
              console.log("Delete user:", user.id);
            }}
            className="px-2 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      );
    },
  }),
];
