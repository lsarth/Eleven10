import z from "zod";
import { createPublicacoes } from "../../../functions/publicacao/create-publicacao";
import { app } from "../../server";



export const createdPublicacao = async () => {
    app.post(
        "/publicacao",
        {
            schema: {
                body: z.object({

                    usuarioIdUsuario: z.string({ message: "usuarioIdusuario: is required" }),
                    conteudo: z.string({ message: "conteudo is required" }),
                    midiaUrl: z.string({ message: "conteudo is required" }),
                    


                }),
            },
        },
        async (req, reply) => {
            const {
                usuarioIdUsuario,
                conteudo,
                midiaUrl,
              
            } = req.body;

            const createdAdress = await createPublicacoes({
                usuarioIdUsuario,
                conteudo,
                midiaUrl,
            
            });
            reply
                .status(201)
                .send({ message: "publicacao created successfully", id: createdAdress });
        },
    );
};

