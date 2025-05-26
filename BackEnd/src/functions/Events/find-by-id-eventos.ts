import { eq } from "drizzle-orm";
import { db } from "../../db";
import { eventos } from "../../db/schemas/index";

export const getEventosBYId = async (id: string) => {
	const events = await db
		.select({
		idEventos: eventos.idEventos,
		usuarioIdUsuario: eventos.usuarioIdUsuario,
		nome: eventos.nome,
		localizacao: eventos.nome,
		data1: eventos.data1,	
		data2: eventos.data2,
		criadoEm: eventos.data2,
		})
		.from(eventos)
		.where(eq(eventos.idEventos, id));

	return events;
};
