import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Name không được để trống"),

  slug: z
    .string()
    .min(1, "Slug không được để trống")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug chỉ gồm chữ thường, số và dấu gạch ngang"
    ),

    parent_id: z.string().optional().nullable(),
});

export type CreateCategoryForm = z.infer<typeof createCategorySchema>;
