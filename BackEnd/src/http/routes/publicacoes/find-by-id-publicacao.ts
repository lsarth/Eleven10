import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getPublicacaoBYId } from "../../../functions/publicacao/find-by-id-publicacao";
import z from "zod";

export const getpublicacaoByID: FastifyPluginAsyncZod = async (app) => {
    app.get(
        "/publicacao/:id",
        {
            schema: {
                params: z.object({
                    id: z.string(),
                }),
            },
        },
        async (req, reply) => {
            const { id } = req.params;
            const user = await getPublicacaoBYId (id);
      
      reply.send(user);
        },
    );
};