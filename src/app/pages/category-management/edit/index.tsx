import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";
import { createCategorySchema, type CreateCategoryForm } from "../schema";
import {
  categoriesList,
  detailCategory,
  updateCategory,
} from "@/mock/category-mock";
import { slugify } from "@/untils/slugify";

export default function EditCategory() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
     watch,
    setValue
  } = useForm<CreateCategoryForm>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  // Load category detail
  useEffect(() => {
    if (!id) return;

    detailCategory(id)
      .then((category) => {
        reset({
          name: category.name,
          slug: category.slug,
          parent_id: category.parent_id ?? "",
        });
      })
      .catch((err) => {
        toast.error(err.message);
        navigate("/admin/categories");
      });
  }, [id, reset, navigate]);

  const onSubmit = async (data: CreateCategoryForm) => {
    if (!id) return;

    try {
      await updateCategory({ id, ...data });
      toast.success("Update category successfully");
      navigate("/admin/categories");
    } catch (error) {
      toast.error((error as Error).message || "Update category failed");
    }
  };

  // Danh sách category gốc để làm parent (loại trừ chính nó)
  const parentOptions = categoriesList.filter(
    (c) => c.parent_id === null && c.id !== id
  );

    const nameValue = watch("name");
    useEffect(() => {
      setValue("slug", slugify(nameValue));
    }, [nameValue, setValue]);

  return (
    <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
      <div className="min-w-0">
        <h1 className="text-xl font-bold uppercase mb-4">Category Update</h1>

        <div className="mt-4 w-1/2 p-6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* NAME */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Name</label>
                <Input {...register("name")} />
                {errors.name && (
                  <span className="text-sm text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* SLUG */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Slug</label>
                <Input {...register("slug")} />
                {errors.slug && (
                  <span className="text-sm text-red-500">
                    {errors.slug.message}
                  </span>
                )}
              </div>

              {/* PARENT CATEGORY */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Parent Category</label>
                <select
                  {...register("parent_id")}
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue=""
                >
                  <option value="">— Category gốc —</option>
                  {parentOptions.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.parent_id && (
                  <span className="text-sm text-red-500">
                    {errors.parent_id.message}
                  </span>
                )}
              </div>

              {/* ACTION */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  onClick={() => navigate("/admin/categories")}
                  className="bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  {isSubmitting ? "Updating..." : "Update category"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
