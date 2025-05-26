import { db } from '../../db'
import { usuario } from '../../db/schemas/index'

export interface UsuarioRequest {
  username: string;
  senha: string;
  email: string;
  telefone?: string;
  nomeCompleto: string;
  dataDeAniversario: Date | string;      
  logradouro: string;
  profilePicture: string;                 
}
export async function createUsuario({
  username,
  senha,
  email,
  telefone,
  nomeCompleto, 
  dataDeAniversario,
  logradouro,
  profilePicture,
}: UsuarioRequest) {
  const [novoUsuario] = await db
    .insert(usuario)
    .values({
      username,
      senha,
      email,
      telefone,
      nomeCompleto,
      genero: "Masculino",
      dataDeAniversario: new Date(dataDeAniversario),
      logradouro,
      profilePicture,
      tipoUsuario: "Olheiro",        
    })
    .returning()

  return novoUsuario.idUsuario
}

