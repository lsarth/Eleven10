// import { eq } from "drizzle-orm";
// import { db } from "../../db";
// import { eventos } from "../../db/schemas/index";


// export const UpdateEventos = async (
//     eventosRequest: eventosRequest,
//     id: string,
// ) => {

//     const date =  new Date(eventosRequest.dataDeAniversario);
//     const [updatedUsuario] = await db
//         .update(eventos)
//         .set({
//            	idEventos: eventos.idEventos,
// 		    usuarioIdUsuario: eventos.usuarioIdUsuario,
// 		    nome: eventos.nome,
// 		    localizacao: eventos.nome,
// 		    data1: eventos.data1,	
// 		    data2: eventos.data2,
// 		    criadoEm: eventos.data2,
//         })
//         .where(eq(eventos.idEventos, id))
//         .returning();

//     return updatedUsuario;
// };



import { eq } from "drizzle-orm";
import { db } from "../../db";
import { eventos } from "../../db/schemas/index";


interface EventosRequest {
	usuarioIdUsuario: string;
	nome: string;
	localizacao: string;
	data1: Date | string;
	data2: Date | string;
}

export const UpdateEventos = async (
	eventosRequest: EventosRequest,
	id: string
) => {
	const [updatedEvento] = await db
		.update(eventos)
		.set({
			usuarioIdUsuario: eventosRequest.usuarioIdUsuario,
			nome: eventosRequest.nome,
			localizacao: eventosRequest.localizacao,
			data1: new Date(eventosRequest.data1),
			data2: new Date(eventosRequest.data2),
		})
		.where(eq(eventos.idEventos, id))
		.returning();

	return updatedEvento;
};
