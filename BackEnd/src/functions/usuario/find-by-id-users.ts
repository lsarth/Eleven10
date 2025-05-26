import { eq } from "drizzle-orm";
import { db } from "../../db";
import { usuario } from "../../db/schemas/index";

export const getUserBYId = async (id: string) => {
	const users = await db
		.select({
			id: usuario.idUsuario,
			username: usuario.username,
			senha: usuario.senha,
			email: usuario.email,
			telefone: usuario.telefone,
			nome_completo: usuario.nomeCompleto,
			genero: usuario.genero,
			data_de_aniversario: usuario.dataDeAniversario,
			logradouro: usuario.logradouro 
		})
		.from(usuario)
		.where(eq(usuario.idUsuario, id));

	return users;
};


