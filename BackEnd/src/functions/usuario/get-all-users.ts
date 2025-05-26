import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { client, db } from "../../db/index";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { usuario } from "../../db/schemas/index";

export const getAllUsuario = async () => {
	const getAllUsuario = await db
		.select({
			id: usuario.idUsuario,
			username: usuario.username,
			senha: usuario.username,
			email: usuario.email,
			telefone: usuario.telefone,
			nome_completo: usuario.nomeCompleto,
			genero: usuario.genero,
			data_de_aniversario: usuario.dataDeAniversario,
			logradouro: usuario.logradouro 
		})
		.from(usuario);

	return getAllUsuario;
};
