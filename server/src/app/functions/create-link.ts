import { z } from "zod";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeRight, makeLeft } from "@/infra/shared/either";
import { LinkOutput, createLinkSchema } from "@/schemas/link";
import { LinkAlreadyExistsError } from "./errors/link-already-exists";
import { PostgresError } from "postgres";

type CreateLinkInput = z.input<typeof createLinkSchema>;

export type CreateLinkOutput = {
  link: LinkOutput;
};

export async function createLink(
  input: CreateLinkInput
): Promise<Either<LinkAlreadyExistsError, CreateLinkOutput>> {
  const { originalUrl, shortUrl } = createLinkSchema.parse(input);

  try {
    const [link] = await db
      .insert(schema.links)
      .values({
        originalUrl: originalUrl,
        shortUrl: shortUrl,
        accessCount: 0,
      })
      .returning({
        id: schema.links.id,
        originalUrl: schema.links.originalUrl,
        shortUrl: schema.links.shortUrl,
        accessCount: schema.links.accessCount,
        createdAt: schema.links.createdAt,
      });

    return makeRight({ link });
  } catch (error) {
    if (error instanceof PostgresError && error.code === "23505") {
      return makeLeft(new LinkAlreadyExistsError());
    }

    throw error;
  }
}
