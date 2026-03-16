import { describe, it, expect } from "vitest";

import { deleteLink } from "@/app/functions/delete-link";
import { makeLink } from "@/test/factories/make-link";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq } from "drizzle-orm";
import { isRight, isLeft } from "@/infra/shared/either";
import { LinkNotFoundError } from "./errors/link-not-found";

describe("delete link", () => {
  it("should be able to delete a link", async () => {
    const link = await makeLink();

    const sut = await deleteLink({
      id: link.id,
    });

    expect(isRight(sut)).toBe(true);

    const result = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.id, link.id));

    expect(result.length).toBe(0);
  });

  it("should not delete a non existing link", async () => {
    const sut = await deleteLink({
      id: crypto.randomUUID(),
    });

    expect(isLeft(sut)).toBe(true);
    expect(sut.left).toBeInstanceOf(LinkNotFoundError);
  });
});
