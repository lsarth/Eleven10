import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { app } from "../../server";
import { getAllPublicacao } from "../../../functions/publicacao/get-all-publicacao";

export const getAllPublicacoes: FastifyPluginAsyncZod = async (app) => {
    app.get("/publicacao/2", async (_req, reply) => {
        const getAllAdresss = await getAllPublicacao();
        reply.status(200).send(getAllAdresss);
    });
};
