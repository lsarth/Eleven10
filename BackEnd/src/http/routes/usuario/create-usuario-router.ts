import z from "zod";
import { createUsuario } from "../../../functions/usuario/create-users";
import { app } from "../../server";


  // username: string;
  // senha: string;
  // email: string;
  // telefone?: string;
  // nomeCompleto: string;
  // genero: 'Masculino' | 'Feminino' | 'Não binário';
  // dataDeAniversario: Date | string;      
  // logradouro: string;
  // profilePicture: string;                 
  // tipoUsuario: 'Atleta' | 'Olheiro';   

export const createdUsuario = async () => {
	app.post(
		"/usuario",
		{
			schema: {
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
		async (req, reply) => {
			const {
				username,
				senha,
				email,
				telefone,
				nomeCompleto,
				dataDeAniversario,
				logradouro,
				profilePicture,
			} = req.body;

			const createdAdress = await createUsuario({
				username,
				senha,
				profilePicture,
				email,
				telefone,
				nomeCompleto,
				dataDeAniversario,
				logradouro,
			});
			reply
				.status(201)
				.send({ message: "Adress created successfully", id: createdAdress });
		},
	);
};
