import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createUserSchema } from "../schema";
import type { CreateUserForm } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@/mock/user-mock";
import { toast } from "sonner";

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
    <div className="p-6">
      <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        <div className="min-w-0">
          <h1 className="text-xl font-bold uppercase mb-4">Users Create</h1>
          <div className="mt-6 w-1/2">
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
                  <Button onClick={() => navigate("/admin/users")}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create user"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
