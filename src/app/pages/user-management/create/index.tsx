import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createUserSchema } from "../schema";
import type { CreateUserForm } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createUser } from "@/mock";

export default function CreateUser() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: CreateUserForm) => {
    try {
      await createUser(data);
      toast.success("Create successfully")
      navigate("/admin/users");
    } catch (error) {
      toast.error((error as Error).message || 'Create user fail');
    }
  };

  return (
      <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        <div className="min-w-0">
          <h1 className="text-xl font-bold uppercase mb-4">Users Create</h1>
          <div className="mt-4 w-1/2 p-6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input {...register("name")} placeholder="Enter name" />
                  {errors.name && (
                    <span className="text-sm text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input {...register("email")} placeholder="Enter email" />
                  {errors.email && (
                    <span className="text-sm text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Input
                    type="password"
                    {...register("password")}
                    placeholder="Enter password"
                  />
                  {errors.password && (
                    <span className="text-sm text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" onClick={() => navigate("/admin/users")}
                    className="shadow-theme-xs inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-medium text-gray-700 ring-1 ring-gray-300 transition hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03]"
                    >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}
                  className="bg-green-500 shadow-theme-xs hover:bg-green-600 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition"
                  >
                    {isSubmitting ? "Creating..." : "Create user"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}
