import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { isLeft, unwrapEither } from "@/infra/shared/either";
import { getLinkByShortUrl } from "@/app/functions/get-link-by-short-url";
import { incrementLinkAccess } from "@/app/functions/increment-link-access";

export const getLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/links/:shortUrl",
    {
      schema: {
        summary: "Redirect to original URL",
        tags: ["links"],
        params: z.object({
          shortUrl: z.string(),
        }),
        response: {
          302: z.null(),
          404: z.object({
            message: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params;

      const result = await getLinkByShortUrl({ shortUrl });

      if (isLeft(result)) {
        const error = result.left;

        switch (error.constructor.name) {
          case "LinkNotFoundError":
            return reply.status(404).send({ message: error.message });

          default:
            return reply.status(400).send({ message: error.message });
        }
      }

      const { link } = unwrapEither(result);
      await incrementLinkAccess({ shortUrl });

      return reply.redirect(link.originalUrl);
    }
  );
};
