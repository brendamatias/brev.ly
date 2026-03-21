import { randomUUID } from "node:crypto";
import { describe, expect, it, vi } from "vitest";
import { exportLinks } from "@/app/functions/export-links";
import { isRight, unwrapEither } from "@/infra/shared/either";
import * as upload from "@/infra/storage/upload-file-to-storage";
import { makeLink } from "@/test/factories/make-link";

describe("export links", () => {
  it("should be able to export links", async () => {
    const reportUrl = "http://example.com/file.csv";

    const linkStub = vi
      .spyOn(upload, "uploadFileToStorage")
      .mockImplementationOnce(async () => {
        return {
          key: `${randomUUID()}.csv`,
          url: reportUrl,
        };
      });

    const searchQuery = randomUUID();

    const link1 = await makeLink({ shortUrl: `${searchQuery}-1` });
    const link2 = await makeLink({ shortUrl: `${searchQuery}-2` });
    const link3 = await makeLink({ shortUrl: `${searchQuery}-3` });
    const link4 = await makeLink({ shortUrl: `${searchQuery}-4` });
    const link5 = await makeLink({ shortUrl: `${searchQuery}-5` });

    const sut = await exportLinks({
      searchQuery,
    });

    const generatedCSVStream = linkStub.mock.calls[0][0].contentStream;

    const csvAsString = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = [];

      generatedCSVStream.on("data", (chunk: Buffer) => {
        chunks.push(chunk);
      });

      generatedCSVStream.on("end", () => {
        resolve(Buffer.concat(chunks).toString("utf-8"));
      });

      generatedCSVStream.on("error", (err) => {
        reject(err);
      });
    });

    const csvAsArray = csvAsString
      .trim()
      .split("\n")
      .map((row) => row.split(","));

    expect(isRight(sut)).toBe(true);

    expect(unwrapEither(sut).reportUrl).toBe(reportUrl);
    expect(csvAsArray).toEqual([
      ["ID", "Original URL", "Short URL", "Access Count", "Created at"],
      [
        link1.id,
        link1.originalUrl,
        link1.shortUrl,
        link1.accessCount.toString(),
        expect.any(String),
      ],
      [
        link2.id,
        link2.originalUrl,
        link2.shortUrl,
        link2.accessCount.toString(),
        expect.any(String),
      ],
      [
        link3.id,
        link3.originalUrl,
        link3.shortUrl,
        link3.accessCount.toString(),
        expect.any(String),
      ],
      [
        link4.id,
        link4.originalUrl,
        link4.shortUrl,
        link4.accessCount.toString(),
        expect.any(String),
      ],
      [
        link5.id,
        link5.originalUrl,
        link5.shortUrl,
        link5.accessCount.toString(),
        expect.any(String),
      ],
    ]);
  });
});
