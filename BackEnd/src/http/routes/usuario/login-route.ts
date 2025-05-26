import z from "zod";
import { createUsuario } from "../../../functions/usuario/create-users";
import { app } from "../../server";
import { LoginAction } from "../../../functions/usuario/login";


// username: string;
// senha: string;
// email: string;
// telefone?: string;
// nomeCompleto: string;
// genero: 'Masculino' | 'Feminino' | 'Não binário';
// dataDeAniversario: Date | string;      
// logradouro: string;
// profilePicture: string;                 
// tipoUsuario: 'Atleta' | 'Olheiro';   

export const loginUser = async () => {
    app.post(
        "/login",
        {
            schema: {
                body: z.object({
                    email: z.string({ message: "email is required" }),
                    senha: z.string({ message: "senha is required" }),
                }),
            },
        },
        async (req, reply) => {
            const {
                email,
                senha,
            } = req.body;


            const createdAdress = await LoginAction({
                senha,
                email

            });

            reply
                .status(201)
                .send({
                    message: createdAdress.length == 0 ? "Usuario nao encontrado" : createdAdress[0].username, status: createdAdress.length == 0
                        ? "Email ou Senha errado"
                        : "Logado"
                });
        },
    );
};