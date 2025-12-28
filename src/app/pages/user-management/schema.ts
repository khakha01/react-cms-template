import z from "zod";

export const createUserSchema = z.object({
    name: z.string().min(1,"Name is required"),
    email: z.string().min(1, "Email không được để trống").email("Invalid email"),
    password: z.string().min(1, "Password không được để trống"),
});

/**
 * lấy TYPE TypeScript tự động từ schema Zod
 * Viết schema 1 lần
 * Dùng cho validate + type luôn
 * Không phải viết type tay lại
 */
export type CreateUserForm = z.infer<typeof createUserSchema>;