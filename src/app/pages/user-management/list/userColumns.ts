// columns.ts
import { createColumnHelper } from "@tanstack/react-table";
import type { User } from "./user-api";

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
];
