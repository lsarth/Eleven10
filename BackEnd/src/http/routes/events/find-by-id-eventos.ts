import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getEventosBYId } from "../../../functions/Events/find-by-id-eventos";
import z from "zod";

export const getEventosBYid: FastifyPluginAsyncZod = async (app) => {
    app.get(
        "/eventos/:id",
        {
            schema: {
                params: z.object({
                    id: z.string(),
                }),
            },
        },
        async (req, reply) => {
            const { id } = req.params;
            const user = await getEventosBYId(id);
      
      reply.send(user);
        },
    );
};
