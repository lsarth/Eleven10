import { eq } from "drizzle-orm";
import { db } from "../../db";
import { usuario } from '../../db/schemas/index'

export const deleteUsuariobyID = async (id: string) => {
	await db.delete(usuario).where(eq(usuario.idUsuario, id));
};

