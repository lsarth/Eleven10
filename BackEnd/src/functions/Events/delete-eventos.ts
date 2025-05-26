 import { eq } from 'drizzle-orm'
 import { db } from '../../db'
 import { eventos } from '../../db/schemas/index'

 const deleteEventosbyid = async (id: string) => {
   await db.delete(eventos).where(eq(eventos.idEventos, id))
 }

export default deleteEventosbyid
