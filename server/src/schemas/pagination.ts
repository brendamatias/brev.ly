import { z } from "zod";

export const paginationSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  total: z.number(),
});

export type PaginationOutput = z.input<typeof paginationSchema>;
