import z from "zod";
import  {createCurtida}  from "../../../functions/curtidas/create-curtidas";
import { app } from "../../server";



export const createdCurtida = async () => {
    app.post(
        "/curtida",
        {
            schema: {
                body: z.object({

                    usuarioIdUsuario: z.string({ message: "usuarioIdusuario: is required" }),
                    publicacoesIdPublicacoes: z.string({ message: "publicacoesIdPublicacoes is required" }),
                }),
            },
        },
        async (req, reply) => {
            const {
                usuarioIdUsuario,
                publicacoesIdPublicacoes,
            } = req.body;

            const createdAdress = await createCurtida({
                usuarioIdUsuario,
                publicacoesIdPublicacoes,
            
            });
            reply
                .status(201)
                .send({ message: "curtida created successfully", id: createdAdress });
        },
    );
};

