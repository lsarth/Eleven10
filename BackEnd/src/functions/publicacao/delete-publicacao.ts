import { eq } from "drizzle-orm";
import { db } from "../../db";
import { publicacoes } from '../../db/schemas/index'

export const deletePublicacoesID = async (id: string) => {
    await db.delete(publicacoes).where(eq(publicacoes.idPublicacoes, id));
};
