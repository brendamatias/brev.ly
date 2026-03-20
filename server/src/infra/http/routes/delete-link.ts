import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { deleteLink } from "@/app/functions/delete-link";
import { isLeft } from "@/infra/shared/either";

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    "/links/:id",
    {
      schema: {
        summary: "Delete a link",
        tags: ["links"],
        params: z.object({
          id: z.uuid(),
        }),
        response: {
          204: z.null().describe("Link deleted"),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const result = await deleteLink({ id });

      if (isLeft(result)) {
        const error = result.left;

        switch (error.constructor.name) {
          case "LinkNotFoundError":
            return reply.status(404).send({ message: error.message });
        }
      }

      return reply.status(204).send(null);
    }
  );
};
