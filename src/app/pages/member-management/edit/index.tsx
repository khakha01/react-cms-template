import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";
import { createMemberSchema, type CreateMemberForm } from "../schema";
import { detailMember, updateMember } from "@/mock";


export default function EditMember() {
const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateMemberForm>({
    resolver: zodResolver(createMemberSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      status: "active",
    },
  });

  // Load member detail
  useEffect(() => {
    if (!id) return;

    detailMember(id)
      .then((member) => {
        reset({
          name: member.name,
          email: member.email,
          phone: member.phone,
          status: member.status,
        });
      })
      .catch((err) => {
        toast.error(err.message);
        navigate("/admin/members");
      });
  }, [id, reset, navigate]);

  const onSubmit = async (data: CreateMemberForm) => {if (!id) return;
    try {
      await updateMember({id,...data});
      toast.success("Update member successfully");
      navigate("/admin/members");
    } catch (error) {
      toast.error((error as Error).message || "Update member failed");
    }
  };

  return (
    <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
      <div className="min-w-0">
        <h1 className="text-xl font-bold uppercase mb-4">
          Member Update
        </h1>

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

              {/* EMAIL */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Email</label>
                <Input {...register("email")} />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* PHONE */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Phone</label>
                <Input {...register("phone")} />
                {errors.phone && (
                  <span className="text-sm text-red-500">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              {/* ACTION */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  onClick={() => navigate("/admin/members")}
                  className="bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  {isSubmitting ? "Updating..." : "Update member"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
