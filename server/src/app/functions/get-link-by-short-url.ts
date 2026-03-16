import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeLeft, makeRight } from "@/infra/shared/either";
import { LinkNotFoundError } from "./errors/link-not-found";
import { LinkOutput, getLinkByShortUrlSchema } from "@/schemas/link";

type GetLinkInput = z.input<typeof getLinkByShortUrlSchema>;

export type GetLinkByShortUrlOutput = {
  link: LinkOutput;
};

export async function getLinkByShortUrl(
  input: GetLinkInput
): Promise<Either<LinkNotFoundError, GetLinkByShortUrlOutput>> {
  const { shortUrl } = getLinkByShortUrlSchema.parse(input);

  const link = await db.query.links.findFirst({
    where: eq(schema.links.shortUrl, shortUrl),
  });

  if (!link) {
    return makeLeft(new LinkNotFoundError());
  }

  return makeRight({ link });
}
