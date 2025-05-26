import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import cors from "@fastify/cors";

import { createdUsuario } from "./routes/usuario/create-usuario-router";
import deleteUsuario from "./routes/usuario/delete-usuario-route";
import { getUsuario } from "./routes/usuario/get-all-usuario-route";
import { getUsersByID } from "./routes/usuario/find-by-id-usuario-route";
import { updatedUsuario } from "./routes/usuario/update-usuario-route";

// Rotas de eventos (esses DEVEM ser plugins, veja nota abaixo)
import { createEventos } from "../functions/Events/create-eventos";
import deleteEventos from "../http/routes/events/delete-eventos"
import { getAllEventos } from "../functions/Events/get-all-eventos";
import { UpdateEventos } from "../functions/Events/update-eventos";
import  {getEventosBYid}  from "../http/routes/events/find-by-id-eventos";
import { createdEventos } from "./routes/events/create-eventos";
import { getAllEvento } from "./routes/events/get-all-eventos";
import { updatedEventos } from "./routes/events/update-eventos";
import { createdPublicacao } from "./routes/publicacoes/create-publicacao";
import deletePublicacao from "./routes/publicacoes/delete-publicacao";
import { getpublicacaoByID } from "./routes/publicacoes/find-by-id-publicacao";
import { getAllPublicacoes } from "./routes/publicacoes/get-all-publicacao";
import { createdCurtida } from "./routes/curtidas/create-curtidas";
import { loginUser } from "./routes/usuario/login-route";


export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "ngrok-skip-browser-warning",
    ],
});

app.listen({ port: 3333, host: "0.0.0.0" }, (err, address) => {
    if (err) {
        console.error("Erro ao iniciar o servidor:", err);
        process.exit(1);
    }
    console.log(`Servidor HTTP rodando em ${address}`);
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Registro das rotas
app.register(createdUsuario);
app.register(deleteUsuario);
app.register(getUsuario);
app.register(getUsersByID);
app.register(updatedUsuario);

//  Atenção: As funções abaixo devem exportar plugins do tipo: (app) => { app.get(...); }
app.register(createdEventos);
app.register(deleteEventos);
app.register (getEventosBYid);
app.register (getAllEvento);
app.register (updatedEventos);

app.register(createdPublicacao);
app.register(deletePublicacao);
app.register(getpublicacaoByID);
app.register(getAllPublicacoes);

app.register(createdCurtida);
app.register(loginUser)