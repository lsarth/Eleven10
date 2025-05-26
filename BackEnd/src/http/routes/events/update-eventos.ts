import z from "zod";
import { app } from "../../server";
import { UpdateEventos } from "../../../functions/Events/update-eventos";

export const updatedEventos = async () => {
    app.put(
        "/eventos/:id",
        {
            schema: {
                params: z.object({
                    id: z.string({ message: "id is required" }),
                }),
                body: z.object({
                    usuarioIdUsuario: z.string({ message: "usuarioidusuario is required" }),
                    nome: z.string({ message: "nome is required" }),
                    localizacao: z.string({ message: "localização is required" }),
                    data1: z.string({ message: "data1 is required" }),
                    data2: z.string({ message: "data2 is required" }),
                }),
            },
        },
        async (request, reply) => {
            const { id } = request.params;
            const {
                usuarioIdUsuario,
                nome,
                localizacao,
                data1,
                data2,

            } = request.body;
            const updatedAdress = await UpdateEventos (
                { usuarioIdUsuario,nome,localizacao,data1,data2,},
               id,
            );

            reply.status(204).send({
                message: "Endereco atualizado com sucesso",
                data: updatedAdress,
            });
        },
    );
};
