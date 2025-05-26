import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { app } from "../../server";
import { getAllEventos } from "../../../functions/Events/get-all-eventos";

export const getAllEvento: FastifyPluginAsyncZod = async (app) => {
    app.get("/eventos", async (_req, reply) => {
        const getAllEvents = await getAllEventos();
        reply.status(200).send(getAllEvents);
    });
};
