import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createBookSchema, type CreateBookForm } from "../schema";
import { createBook } from "@/mock";

export default function CreateBook() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
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

  const onSubmit = async (data: CreateBookForm) => {
    try {
      await createBook(data);
      toast.success("Create book successfully");
      navigate("/admin/books");
    } catch (error) {
      toast.error((error as Error).message || "Create book failed");
    }
  };

  return (
    <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
      <div className="min-w-0">
        <h1 className="text-xl font-bold uppercase mb-4">
          Book Create
        </h1>

        <div className="mt-4 w-1/2 p-6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* TITLE */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Title</label>
                <Input {...register("title")} placeholder="Enter book title" />
                {errors.title && (
                  <span className="text-sm text-red-500">
                    {errors.title.message}
                  </span>
                )}
              </div>

              {/* ISBN */}
              <div className="space-y-1">
                <label className="text-sm font-medium">ISBN</label>
                <Input {...register("isbn")} placeholder="Enter ISBN" />
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
                  className="shadow-theme-xs bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  {isSubmitting ? "Creating..." : "Create book"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
