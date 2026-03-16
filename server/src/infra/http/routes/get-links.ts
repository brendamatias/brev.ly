import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { getLinks } from "@/app/functions/get-links";
import { unwrapEither } from "@/infra/shared/either";
import { getLinksSchema } from "@/schemas/link";
import { paginationSchema } from "@/schemas/pagination";

export const getLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/links",
    {
      schema: {
        summary: "Get links",
        tags: ["links"],
        querystring: z.object({
          searchQuery: z.string().optional(),
          sortBy: z.enum(["createdAt"]).optional(),
          sortDirection: z.enum(["asc", "desc"]).optional(),
          page: z.coerce.number().optional().default(1),
          pageSize: z.coerce.number().optional().default(20),
        }),
        response: {
          200: z.object({
            data: z.array(getLinksSchema),
            pagination: paginationSchema,
          }),
        },
      },
    },
    async (request, reply) => {
      const { page, pageSize, searchQuery, sortBy, sortDirection } =
        request.query;

      const result = await getLinks({
        page,
        pageSize,
        searchQuery,
        sortBy,
        sortDirection,
      });

      const { data, pagination } = unwrapEither(result);

      return reply.status(200).send({ data, pagination });
    }
  );
};
