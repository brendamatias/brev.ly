import { eq, sql } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeLeft, makeRight } from "@/infra/shared/either";
import { LinkNotFoundError } from "./errors/link-not-found";
import { incrementLinkAccessSchema } from "@/schemas/link";

type IncrementLinkAccessInput = z.input<typeof incrementLinkAccessSchema>;

export async function incrementLinkAccess(
  input: IncrementLinkAccessInput
): Promise<Either<LinkNotFoundError, null>> {
  const { shortUrl } = incrementLinkAccessSchema.parse(input);

  const result = await db
    .update(schema.links)
    .set({
      accessCount: sql`${schema.links.accessCount} + 1`,
    })
    .where(eq(schema.links.shortUrl, shortUrl))
    .returning({
      id: schema.links.id,
    });

  if (result.length === 0) {
    return makeLeft(new LinkNotFoundError());
  }

  return makeRight(null);
}
