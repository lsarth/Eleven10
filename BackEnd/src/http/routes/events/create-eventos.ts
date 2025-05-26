import z from "zod";
import { app } from "../../server";
import { createEventos } from "../../../functions/Events/create-eventos";


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

export const createdEventos = async () => {
    app.post(
        "/eventos",
        {
            schema: {
                body: z.object({
                    
                    usuarioIdUsuario: z.string( {message: "usuarioidusuario is required"}),
	                nome: z.string( {message:"nome is required"}),
	                localizacao: z.string({message: "localização is required"}),
	                data1: z.string({message: "data1 is required"}),	
	                data2: z.string({message: "data2 is required"}),
	                
                    
                    
                }),
            },
        },
        async (req, reply) => {
            const {
            usuarioIdUsuario,
	        nome,
	        localizacao,
	        data1,	
	        data2,
	       
              
            } = req.body;

            const createdeventos = await createEventos({
	        usuarioIdUsuario,
	        nome,
	        localizacao,
	        data1,	
	        data2,
            });
            reply
                .status(201)
                .send({ message: "Adress created successfully", id: createEventos });
        },
    );
};
