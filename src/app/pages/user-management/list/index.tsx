import UserTable from "./user-table";
import { usersMock } from "../../../../mock/user-mock";

export default function UserList() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Users List</h1>
      <UserTable data={usersMock} />
    </div>
  );
}
