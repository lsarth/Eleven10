
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { client, db } from "../../db/index";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { eventos } from "../../db/schemas/index";

 export const getAllEventos = async () => {
   const getAllEventoss = await db
     .select({
            idEventos: eventos.idEventos,
            usuarioIdUsuario: eventos.usuarioIdUsuario,
            nome: eventos.nome,
            localizacao: eventos.nome,
            data1: eventos.data1,	
            data2: eventos.data2,
            criadoEm: eventos.data2,
     }).from(eventos)
    

  return getAllEventoss
 }
