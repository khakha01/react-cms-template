import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CategoryTable from "@/components/pages/category-management/CategoryTable";
import { categoriesList } from "@/mock/category-mock";

export default function CategoryList() {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-xl font-bold uppercase mb-4">Categories</h1>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col justify-between gap-5 border-b border-gray-200 p-4 sm:flex-row sm:items-center dark:border-gray-800">
          <div>
            <h2 className="text-xl font-bold uppercase">Category List</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Manage all system categories.
            </span>
          </div>

          <Link to="/admin/categories/create">
            <Button className="bg-blue-500 shadow-theme-xs hover:bg-blue-600 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition">
              Add Category
            </Button>
          </Link>
        </div>

        {/* List table */}
        <CategoryTable data={categoriesList} />
      </div>
    </div>
  );
}
