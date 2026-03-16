import { describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";

import { incrementLinkAccess } from "@/app/functions/increment-link-access";
import { makeLink } from "@/test/factories/make-link";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { isLeft, isRight } from "@/infra/shared/either";
import { randomUUID } from "crypto";
import { LinkNotFoundError } from "./errors/link-not-found";

describe("increment link access", () => {
  it("should increment access count", async () => {
    const link = await makeLink({
      accessCount: 0,
    });

    const sut = await incrementLinkAccess({
      shortUrl: link.shortUrl,
    });

    expect(isRight(sut)).toBe(true);

    const [linkOnDatabase] = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.id, link.id));

    expect(linkOnDatabase.accessCount).toBe(1);
  });

  it("should return error if link does not exist", async () => {
    const sut = await incrementLinkAccess({
      shortUrl: randomUUID(),
    });

    expect(isLeft(sut)).toBe(true);
    expect(sut.left).toBeInstanceOf(LinkNotFoundError);
  });
});
