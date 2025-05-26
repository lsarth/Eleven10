import { db } from "../../db";
import { eventos } from "../../db/schemas/index";

interface CreateEventosRequest {
	usuarioIdUsuario: string;
	nome: string;
	localizacao: string;
	data1: Date | string;
	data2: Date | string;
}

export async function createEventos({
	usuarioIdUsuario,
	nome,
	localizacao,
	data1,	
	data2,
}: CreateEventosRequest) {
	const [novoEvento] = await db
		.insert(eventos)
		.values({
			usuarioIdUsuario,
			nome,
			localizacao,
			data1: new Date(data1),
			data2: new Date(data2),
			
		})
		.returning();

	return novoEvento.idEventos;
}