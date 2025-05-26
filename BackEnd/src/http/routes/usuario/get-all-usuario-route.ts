import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { app } from "../../server";
import { getAllUsuario } from "../../../functions/usuario/get-all-users";

export const getUsuario: FastifyPluginAsyncZod = async (app) => {
	app.get("/usuarios", async (_req, reply) => {
		const getAllAdresss = await getAllUsuario();
		reply.status(200).send(getAllAdresss);
	});
};
