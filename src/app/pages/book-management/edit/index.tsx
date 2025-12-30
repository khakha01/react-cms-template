import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";

import { createBookSchema, type CreateBookForm } from "../schema";
import { detailBook, updateBook } from "@/mock";

export default function EditBook() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateBookForm>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      title: "",
      isbn: "",
      published_year: new Date().getFullYear(),
      status: "available",
    },
  });

  // Load book detail
  useEffect(() => {
    if (!id) return;

    detailBook(id)
      .then((book) => {
        reset({
          title: book.title,
          isbn: book.isbn,
          published_year: book.published_year,
          status: book.status,
        });
      })
      .catch((err) => {
        toast.error(err.message);
        navigate("/admin/books");
      });
  }, [id, reset, navigate]);

  const onSubmit = async (data: CreateBookForm) => {
    if (!id) return;

    try {
      await updateBook({ id, ...data });
      toast.success("Update book successfully");
      navigate("/admin/books");
    } catch (error) {
      toast.error((error as Error).message || "Update book failed");
    }
  };

  return (
    <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
      <div className="min-w-0">
        <h1 className="text-xl font-bold uppercase mb-4">
          Book Update
        </h1>

        <div className="mt-4 w-1/2 p-6 rounded-2xl border border-gray-200 bg-white">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* TITLE */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Title</label>
                <Input {...register("title")} />
                {errors.title && (
                  <span className="text-sm text-red-500">
                    {errors.title.message}
                  </span>
                )}
              </div>

              {/* ISBN */}
              <div className="space-y-1">
                <label className="text-sm font-medium">ISBN</label>
                <Input {...register("isbn")} />
                {errors.isbn && (
                  <span className="text-sm text-red-500">
                    {errors.isbn.message}
                  </span>
                )}
              </div>

              {/* PUBLISHED YEAR */}
              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Published Year
                </label>
                <Input
                  type="number"
                  {...register("published_year", {
                    valueAsNumber: true,
                  })}
                />
                {errors.published_year && (
                  <span className="text-sm text-red-500">
                    {errors.published_year.message}
                  </span>
                )}
              </div>

              {/* STATUS */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Status</label>
                <select
                  {...register("status")}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                >
                  <option value="available">Available</option>
                  <option value="loaned">Loaned</option>
                </select>
              </div>

              {/* ACTION */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  onClick={() => navigate("/admin/books")}
                  className="bg-white text-gray-700 ring-1 ring-gray-300"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-500 text-white"
                >
                  {isSubmitting ? "Updating..." : "Update book"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
