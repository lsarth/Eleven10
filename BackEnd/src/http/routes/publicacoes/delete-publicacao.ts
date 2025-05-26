import z from "zod";
import { app } from "../../server";
import { deletePublicacoesID } from "../../../functions/publicacao/delete-publicacao";

 const deletePublicacao = async () => {
    app.delete(
        "/publicacoes/:id",
        {
            schema: {
                params: z.object({
                    id: z.string({ message: "id is required" }),
                }),
            },
        },
        async (request, reply) => {
            const { id } = request.params;
            await deletePublicacoesID(id);

            reply.status(204).send({
                message: "Usuario deletada com sucesso",
            });
        },
    );
};

export default deletePublicacao;