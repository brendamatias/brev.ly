import { z } from "zod";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeRight, makeLeft } from "@/infra/shared/either";
import { LinkOutput, deleteLinkSchema } from "@/schemas/link";
import { LinkNotFoundError } from "./errors/link-not-found";
import { eq } from "drizzle-orm";

type DeleteLinkInput = z.input<typeof deleteLinkSchema>;

export type CreateLinkOutput = {
  link: LinkOutput;
};

export async function deleteLink(
  input: DeleteLinkInput
): Promise<Either<LinkNotFoundError, null>> {
  const { id } = deleteLinkSchema.parse(input);

  const result = await db
    .delete(schema.links)
    .where(eq(schema.links.id, id))
    .returning({ id: schema.links.id });

  if (result.length === 0) {
    return makeLeft(new LinkNotFoundError());
  }

  return makeRight(null);
}
