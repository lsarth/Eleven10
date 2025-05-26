import { db } from '../../db'
import { publicacoes } from '../../db/schemas/index'

export interface publicacaoRequest {
    usuarioIdUsuario: string,
    conteudo: string,
    midiaUrl: string,
}
export async function createPublicacoes({
    usuarioIdUsuario,
    conteudo,
    midiaUrl,
    

}: publicacaoRequest) {
    const [novaPublicacao] = await db
        .insert(publicacoes)
        .values({
            usuarioIdUsuario,
            conteudo,
            midiaUrl,
        })
        .returning()

    return novaPublicacao.idPublicacoes
}
