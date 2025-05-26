import z from "zod";
import { app } from "../../server";
import { updateUsuario } from "../../../functions/usuario/update-all-users";

export const updatedUsuario = async () => {
	app.put(
		"/usuario/:id",
		{
			schema: {
				params: z.object({
					id: z.string({ message: "id is required" }),
				}),
				body: z.object({
					username: z.string({ message: "username is required" }),
					senha: z.string({ message: "senha is required" }),
					email: z.string({ message: "email is required" }),
					telefone: z.string({ message: "telefone is required" }),
					nomeCompleto: z.string({ message: "nomeCompleto is required" }),
					dataDeAniversario: z.string({ message: "dataDeAniversario is required" }),
					logradouro: z.string({ message: "logradouro is required" }),
					profilePicture: z.string({ message: "profilePicture is required" }),
				}),
			},
		},
		async (request, reply) => {
			const { id } = request.params;
			const {
				username,
				senha,
				email,
				telefone,
				nomeCompleto,
				dataDeAniversario,
				logradouro,
				profilePicture
			} = request.body;
			const updatedAdress = await updateUsuario(
				{   username,senha,email,telefone,nomeCompleto,dataDeAniversario,logradouro, profilePicture  },
				id,
			);

      reply.status(204).send({
        message: "Endereco atualizado com sucesso",
        data: updatedAdress,
      });
		},
	);
};
