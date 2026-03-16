import { describe, expect, it } from "vitest";
import { CreateLinkOutput, createLink } from "@/app/functions/create-link";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { isLeft, isRight, unwrapEither } from "@/infra/shared/either";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

describe("create link", () => {
  it("should be able to create a link", async () => {
    const originalUrl = "https://www.exemplo.com.br";
    const shortUrl = `brev.ly/${randomUUID()}`;

    const sut = await createLink({
      originalUrl,
      shortUrl,
    });

    expect(isRight(sut)).toBe(true);

    const result = unwrapEither(sut) as CreateLinkOutput;

    expect(result.link).toEqual({
      id: expect.any(String),
      originalUrl,
      shortUrl,
      accessCount: 0,
      createdAt: expect.any(Date),
    });

    const [linkOnDatabase] = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.id, result.link.id));

    expect(linkOnDatabase).toBeTruthy();
    expect(linkOnDatabase).toMatchObject({
      id: result.link.id,
      originalUrl,
      shortUrl,
      accessCount: 0,
    });
  });

  it.each([
    {
      name: "originalUrl is not provided",
      input: { shortUrl: "brev.ly/exemplo" },
    },
    {
      name: "shortUrl is not provided",
      input: { originalUrl: "https://www.exemplo.com.br" },
    },
    {
      name: "originalUrl is invalid",
      input: {
        originalUrl: "url-invalida",
        shortUrl: "brev.ly/exemplo",
      },
    },
  ])("should throw an error if $name", async ({ input }) => {
    await expect(createLink(input as any)).rejects.toThrow();
  });
});
