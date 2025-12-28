import UserTable from "./user-table";
import { usersMock } from "../../../../mock/user-mock";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function UserList() {
  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold uppercase mb-4">Users List</h1>
      <Link to="/admin/users/create">
        <Button className="rounded-lg bg-gradient-to-r from-sky-400 to-blue-600 px-5 py-2 text-white duration-100 ease-out [contain:paint] hover:opacity-[.85] focus:opacity-[.85] active:translate-y-px">
          Add User
        </Button>
      </Link>
      </div>
      
      {/* List table */}
      <UserTable data={usersMock} />
    </div>
  );
}
