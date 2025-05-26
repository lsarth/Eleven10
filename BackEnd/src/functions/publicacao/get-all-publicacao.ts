import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { client, db } from "../../db/index";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { publicacoes } from "../../db/schemas/index";

export const getAllPublicacao = async () => {
    const getAllPublicacao = await db
        .select({
            idPublicacoes: publicacoes.idPublicacoes,
            usuarioIdUsuario: publicacoes.usuarioIdUsuario,
            conteudo: publicacoes.conteudo,
            midiaUrl: publicacoes.midiaUrl,
            curtidas: publicacoes.curtidas,
            
        })
        .from(publicacoes);

    return getAllPublicacao;
};