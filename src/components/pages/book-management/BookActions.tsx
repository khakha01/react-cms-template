import { Link } from "react-router-dom";
import { EllipsisVerticalIcon, SquarePen, Trash } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState } from "react";
import { toast } from "sonner";

import ConfirmDeleteModal from "@/components/modal-confirm/ConfirmDeleteModal";
import type { Book } from "@/app/pages/book-management/list/book-api";
import { deleteBook } from "@/mock/book-mock";

interface BookActionsProps {
  book: Book;
}

export default function BookActions({ book }: BookActionsProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleCloseModal = () => {
    if (isLoading) return;
    setModalOpen(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteBook({ id: book.id });
      setModalOpen(false);
      toast.success("Delete book successfully");
    } catch (error) {
      toast.error((error as Error).message || "Delete book failed");
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
                to={`/admin/books/edit/${book.id}`}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <SquarePen className="w-4 h-4" />
                Edit
              </Link>
            </MenuItem>

            <MenuItem>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
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
        title="Delete Book"
        description={`Are you sure you want to delete book "${book.title}"? This action cannot be undone.`}
      />
    </>
  );
}
