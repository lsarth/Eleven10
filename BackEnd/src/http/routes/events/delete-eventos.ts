import z from "zod";
import { app } from "../../server";
import deleteEventosbyid from "../../../functions/Events/delete-eventos";

 const deleteEventos = async () => {
    app.delete(
        "/eventos/:id",
        {
            schema: {
                params: z.object({
                    id: z.string({ message: "id is required" }),
                }),
            },
        },
        async (request, reply) => {
            const { id } = request.params;
            await deleteEventosbyid(id);

            reply.status(204).send({
                message: "Usuario deletada com sucesso",
            });
        },
    );
};

export default deleteEventos;
