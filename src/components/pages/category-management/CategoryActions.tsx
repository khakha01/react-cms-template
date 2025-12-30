import { Link } from "react-router-dom";
import { EllipsisVerticalIcon, SquarePen, Trash } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState } from "react";
import ConfirmDeleteModal from "@/components/modal-confirm/ConfirmDeleteModal";
import { toast } from "sonner";
import { deleteCategory } from "@/mock/category-mock";
import type { Category } from "@/app/pages/category-management/list/category-api";

interface CategoryActionsProps {
  category: Category;
}

export default function CategoryActions({ category }: CategoryActionsProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleCloseModal = () => {
    if (isLoading) return;
    setModalOpen(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteCategory({ id: category.id });
      setModalOpen(false);
      toast.success("Delete successfully");
    } catch (error) {
      toast.error((error as Error).message || "Delete category failed");
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
                to={`/admin/categories/edit/${category.id}`}
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
        title="Delete Category"
        description={`Are you sure you want to delete category "${category.name}"? This action cannot be undone.`}
      />
    </>
  );
}
