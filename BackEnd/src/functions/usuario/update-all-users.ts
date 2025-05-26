import { eq } from "drizzle-orm";
import { db } from "../../db";
import { usuario } from "../../db/schemas/index";
import type { UsuarioRequest } from "./create-users";

export const updateUsuario = async (
	usuarioRequest: UsuarioRequest,
	id: string,
) => {

	const date =  new Date(usuarioRequest.dataDeAniversario);
	const [updatedUsuario] = await db
		.update(usuario)
		.set({
			idUsuario: id,
			username: usuarioRequest.username,
			senha: usuarioRequest.senha,
			email: usuarioRequest.email,
			telefone: usuarioRequest.telefone,
			nomeCompleto: usuarioRequest.nomeCompleto,
			dataDeAniversario: date,
			logradouro: usuarioRequest.logradouro 
		})
		.where(eq(usuario.idUsuario, id))
		.returning();

	return updatedUsuario;
};
