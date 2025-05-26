import z from "zod";
import { app } from "../../server";
import { deleteUsuariobyID } from "../../../functions/usuario/delete-users";

 const deleteUsuario = async () => {
	app.delete(
		"/usuario/:id",
		{
			schema: {
				params: z.object({
					id: z.string({ message: "id is required" }),
				}),
			},
		},
		async (request, reply) => {
			const { id } = request.params;
			await deleteUsuariobyID(id);

			reply.status(204).send({
				message: "Usuario deletada com sucesso",
			});
		},
	);
};

export default deleteUsuario;
