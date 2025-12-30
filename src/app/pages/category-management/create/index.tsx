import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCategorySchema, type CreateCategoryForm } from "../schema";
import { categoriesList, createCategory } from "@/mock/category-mock";
import { useEffect } from "react";
import { slugify } from "@/untils/slugify";

export default function CreateCategory() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue
  } = useForm<CreateCategoryForm>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      slug: "",
      parent_id: "",
    },
  });

  const onSubmit = async (data: CreateCategoryForm) => {
    try {
      await createCategory(data);
      toast.success("Create category successfully");
      navigate("/admin/categories");
    } catch (error) {
      toast.error((error as Error).message || "Create category failed");
    }
  };

  const categories = categoriesList.filter((c) => c.parent_id === null);

  const nameValue = watch("name");
  useEffect(() => {
    setValue("slug", slugify(nameValue));
  }, [nameValue, setValue]);

  return (
    <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
      <div className="min-w-0">
        <h1 className="text-xl font-bold uppercase mb-4">Category Create</h1>

        <div className="mt-4 w-1/2 p-6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* NAME */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Name</label>
                <Input
                  {...register("name")}
                  placeholder="Enter category name"
                />
                {errors.name && (
                  <span className="text-sm text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* SLUG */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Slug</label>
                <Input
                  {...register("slug")}
                  placeholder="enter-category-slug"
                />
                {errors.slug && (
                  <span className="text-sm text-red-500">
                    {errors.slug.message}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Parent Category</label>
                <select
                  {...register("parent_id")}
                  className="w-full border rounded px-3 py-2 text-sm"
                  defaultValue=""
                >
                  <option value="">— Category gốc —</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* ACTION */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  onClick={() => navigate("/admin/categories")}
                  className="shadow-theme-xs bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  {isSubmitting ? "Creating..." : "Create category"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
