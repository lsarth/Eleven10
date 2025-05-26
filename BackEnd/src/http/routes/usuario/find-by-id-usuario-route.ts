import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getUserBYId } from "../../../functions/usuario/find-by-id-users";
import z from "zod";

export const getUsersByID: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/usuario/:id",
		{
			schema: {
				params: z.object({
					id: z.string(),
				}),
			},
		},
		async (req, reply) => {
			const { id } = req.params;
			const user = await getUserBYId(id);
      
      reply.send(user);
		},
	);
};
