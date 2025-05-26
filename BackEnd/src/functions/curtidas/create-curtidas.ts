import { db } from '../../db'
import { curtida } from '../../db/schemas/index'

export interface curtidaRequest {
    usuarioIdUsuario: string,
    publicacoesIdPublicacoes: string,
}
export async function createCurtida({
    usuarioIdUsuario,
    publicacoesIdPublicacoes,


}: curtidaRequest) {
    const [novacurtida] = await db
        .insert(curtida)
        .values({
            usuarioIdUsuario,
            publicacoesIdPublicacoes,
        })
        .returning()

    return novacurtida.idCurtida
}
