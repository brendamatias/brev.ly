import { describe, expect, it } from "vitest";

import { getLinkByShortUrl } from "@/app/functions/get-link-by-short-url";
import { makeLink } from "@/test/factories/make-link";
import { isLeft, isRight, unwrapEither } from "@/infra/shared/either";
import { randomUUID } from "crypto";
import { LinkNotFoundError } from "./errors/link-not-found";

describe("get link by short url", () => {
  it("should be able to get a link", async () => {
    const link = await makeLink();

    const sut = await getLinkByShortUrl({
      shortUrl: link.shortUrl,
    });

    expect(isRight(sut)).toBe(true);

    expect(unwrapEither(sut)).toMatchObject({ link });
  });

  it("should return error if link does not exist", async () => {
    const sut = await getLinkByShortUrl({
      shortUrl: randomUUID(),
    });

    expect(isLeft(sut)).toBe(true);
    expect(sut.left).toBeInstanceOf(LinkNotFoundError);
  });
});
