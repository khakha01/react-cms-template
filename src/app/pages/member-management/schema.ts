import { z } from "zod";

export const createMemberSchema = z.object({
  name: z.string().min(1, "Name không được để trống"),
  email: z
    .string()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ"),
  phone: z
    .string()
    .min(1, "Số điện thoại không được để trống")
    .regex(/^[0-9]{9,11}$/, "Số điện thoại không hợp lệ"),
  status: z.enum(["active", "inactive"]).optional(),
});

export type CreateMemberForm = z.infer<typeof createMemberSchema>;
