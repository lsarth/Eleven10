import { and, eq } from "drizzle-orm"
import { db } from "../../db"
import { usuario } from "../../db/schemas"


interface LoginRequest {
    email: string,
    senha: string
}



export const LoginAction = async ({ email, senha }: LoginRequest) => {

    const user = await db.select({
        username: usuario.username
    }).from(usuario)
        .where(
            and(
                eq(usuario.email, email),
                eq(usuario.senha, senha)))



    return user
}