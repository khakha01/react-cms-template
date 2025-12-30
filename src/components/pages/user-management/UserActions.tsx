// src/components/table/UserActions.tsx (hoặc bất kỳ nơi nào bạn thích)
import { Link } from "react-router-dom";
import { EllipsisVerticalIcon, SquarePen, Trash } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState } from "react";
import type { User } from "@/app/pages/user-management/list/user-api";
import ConfirmDeleteModal from "@/components/modal-confirm/ConfirmDeleteModal";
import { toast } from "sonner";
import { deleteUser } from "@/mock";

interface UserActionsProps {
  user: User; 
}

export default function UserActions({ user}: UserActionsProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleCloseModal = () => {
    if (isLoading) return;
    setModalOpen(false); 
  };
  
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteUser({ id: user.id });
      setModalOpen(false);
      toast.success("Delete  successfully");
    } catch (error) {
      toast.error((error as Error).message || "Delete user fail");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton className="p-2 rounded-md hover:bg-gray-100 focus:outline-none transition-colors">
          <EllipsisVerticalIcon className="w-5 h-5 text-gray-500" />
        </MenuButton>

        <MenuItems
          transition
          className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20 overflow-hidden"
        >
          <div className="py-1">
            <MenuItem>
              <Link
                to={`/admin/users/edit/${user.id}`}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 data-[focus]:bg-gray-100 transition-colors"
              >
                <SquarePen className="w-4 h-4" />
                Edit
              </Link>
            </MenuItem>

            <MenuItem>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 data-[focus]:bg-red-50 transition-colors"
              >
                <Trash className="w-4 h-4" />
                Delete
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
        isLoading={isLoading}
        title="Delete User"
        description={`Are you sure you want to delete user "${user.name}"? This action cannot be undone.`}
      />
    </>
  );
}
