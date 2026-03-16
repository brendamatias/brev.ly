import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { createLink } from "@/app/functions/create-link";
import { isLeft, isRight, unwrapEither } from "@/infra/shared/either";
import { createLinkSchema } from "@/schemas/link";

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/links",
    {
      schema: {
        summary: "Create a link",
        tags: ["links"],
        body: createLinkSchema,
        response: {
          201: z
            .object({
              link: z.object({
                id: z.string(),
                originalUrl: z.string(),
                shortUrl: z.string(),
                accessCount: z.number(),
                createdAt: z.date(),
              }),
            })
            .describe("Link created"),
          409: z.object({ message: z.string() }),
          400: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortUrl } = request.body;

      const result = await createLink({
        originalUrl,
        shortUrl,
      });

      if (isLeft(result)) {
        const error = result.left;

        switch (error.constructor.name) {
          case "LinkAlreadyExistsError":
            return reply.status(409).send({ message: error.message });

          default:
            return reply.status(400).send({ message: error.message });
        }
      }

      const { link } = unwrapEither(result);

      return reply.status(201).send({ link });
    }
  );
};
