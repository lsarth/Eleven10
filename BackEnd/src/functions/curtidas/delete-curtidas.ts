 import { eq } from 'drizzle-orm'
 import { db } from '../../db'
 import { curtida } from '../../db/schemas/index'

 const deleteEventosbyid = async (id: string) => {
   await db.delete(curtida).where(eq(curtida.idCurtida, id))
 }

export default deleteEventosbyid