import { z } from "zod";

export const createLinkSchema = z.object({
  originalUrl: z.url(),
  shortUrl: z.string().min(1),
});
