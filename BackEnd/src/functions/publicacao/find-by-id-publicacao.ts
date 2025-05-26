import { eq } from "drizzle-orm";
import { db } from "../../db";
import { publicacoes } from "../../db/schemas/index";

export const getPublicacaoBYId = async (id: string) => {
    const publicacao = await db
        .select({
            idPublicacoes: publicacoes.idPublicacoes,
            usuarioIdUsuario: publicacoes.usuarioIdUsuario,
            conteudo: publicacoes.conteudo,
            midiaUrl: publicacoes.midiaUrl,
            curtidas: publicacoes.curtidas,

        })
        .from(publicacoes)
        .where(eq(publicacoes.idPublicacoes, id));

    return publicacao;
};