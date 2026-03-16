import { fakerPT_BR as faker } from "@faker-js/faker";
import type { InferInsertModel } from "drizzle-orm";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";

export async function makeLink(
  overrides?: Partial<InferInsertModel<typeof schema.links>>
) {
  const originalUrl = faker.internet.url();
  const shortUrl = faker.string.alphanumeric(6);

  const result = await db
    .insert(schema.links)
    .values({
      originalUrl,
      shortUrl,
      ...overrides,
    })
    .returning();

  return result[0];
}
