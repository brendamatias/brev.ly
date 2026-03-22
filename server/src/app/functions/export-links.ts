import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { stringify } from "csv-stringify";
import { ilike } from "drizzle-orm";
import { z } from "zod";
import { db, pg } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeRight } from "@/infra/shared/either";
import { uploadFileToStorage } from "@/infra/storage/upload-file-to-storage";

const exportLinksInput = z.object({
  searchQuery: z.string().optional(),
});

type ExportLinksInput = z.input<typeof exportLinksInput>;

type ExportLinksOutput = {
  reportUrl: string;
};

export async function exportLinks(
  input: ExportLinksInput
): Promise<Either<never, ExportLinksOutput>> {
  const { searchQuery } = exportLinksInput.parse(input);

  const { sql, params } = db
    .select({
      id: schema.links.id,
      originalUrl: schema.links.originalUrl,
      shortUrl: schema.links.shortUrl,
      accessCount: schema.links.accessCount,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .where(
      searchQuery ? ilike(schema.links.shortUrl, `%${searchQuery}%`) : undefined
    )
    .toSQL();

  const cursor = pg.unsafe(sql, params as string[]).cursor(500);

  const csv = stringify({
    delimiter: ",",
    header: true,
    columns: [
      { key: "id", header: "ID" },
      { key: "original_url", header: "Original URL" },
      { key: "short_url", header: "Short URL" },
      { key: "access_count", header: "Access Count" },
      { key: "created_at", header: "Created at" },
    ],
  });

  const linkToStorageStream = new PassThrough();

  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk);
        }

        callback();
      },
    }),
    csv,
    linkToStorageStream
  );

  const linkToStorage = uploadFileToStorage({
    contentType: "text/csv",
    folder: "downloads",
    fileName: `${new Date().toISOString()}-links.csv`,
    contentStream: linkToStorageStream,
  });

  const [{ url }] = await Promise.all([linkToStorage, convertToCSVPipeline]);

  return makeRight({ reportUrl: url });
}
