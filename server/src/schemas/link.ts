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

export const deleteLinkSchema = z.object({
  id: z.uuid(),
});

export const getLinkByShortUrlSchema = z.object({
  shortUrl: z.string(),
});

export const incrementLinkAccessSchema = getLinkByShortUrlSchema;

export type LinkOutput = z.input<typeof getLinksSchema>;
