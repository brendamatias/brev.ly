import { z } from "zod";

export const createLinkSchema = z.object({
  originalUrl: z.url(),
  shortUrl: z.string().min(1),
});

export const getLinksSchema = z.object({
  id: z.string(),
  originalUrl: z.string(),
  shortUrl: z.string(),
  accessCount: z.number(),
  createdAt: z.date(),
});

export type LinkOutput = z.input<typeof getLinksSchema>;
