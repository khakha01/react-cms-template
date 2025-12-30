import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(1, "Tiêu đề sách không được để trống"),

  isbn: z
    .string()
    .min(1, "ISBN không được để trống")
    .regex(/^[0-9\-]{10,17}$/, "ISBN không hợp lệ"),

   published_year: z
    .number()
    .int("Năm xuất bản phải là số nguyên")
    .min(1000, "Năm xuất bản không hợp lệ")
    .max(new Date().getFullYear() + 1, "Năm xuất bản không hợp lệ"),

     status: z.enum(["available", "loaned"]).optional(),
});

export type CreateBookForm = z.infer<typeof createBookSchema>;
