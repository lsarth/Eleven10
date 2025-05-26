// src/db/schema.ts
import { pgTable, integer, varchar, timestamp, boolean,  text, unique } from 'drizzle-orm/pg-core';
import { pgEnum } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2'

export const tipoUsuarioEnum = pgEnum('tipo_usuario', ['Atleta', 'Olheiro']);
export const generoEnum = pgEnum('genero', ['Masculino', 'Feminino', 'Não binário']);
export const modalidadeEnum = pgEnum('modalidade', ['Masculino', 'Feminino']);
export const criterioEnum = pgEnum('criterio', ['Mais curtidos', 'Mais visualizados']);

export const usuario = pgTable('usuario', {
  idUsuario: text('id_usuario').primaryKey().$defaultFn(() => createId()),
  username: varchar('username', { length: 45 }).notNull(),
  senha: varchar('senha', { length: 45 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  telefone: varchar('telefone', { length: 15 }),
  tipoUsuario: tipoUsuarioEnum('tipo_usuario').notNull(),
  nomeCompleto: varchar('nome_completo', { length: 255 }).notNull(),
  genero: generoEnum('genero').notNull(),
  dataDeAniversario: timestamp('data_de_aniversario').notNull(),
  profilePicture: varchar('profile_picture', { length: 100 }).notNull(),
  logradouro: varchar('logradouro', { length: 100 }).notNull(),
  verificado: boolean('verificado').notNull().default(false),
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
  atualizadoEm: timestamp('atualizado_em').notNull().defaultNow(),    
});

export const atleta = pgTable('atleta', {
  idAtleta: text('id_atleta').primaryKey().$defaultFn(() => createId()),
  modalidade: modalidadeEnum('modalidade'),
  biografia: text('biografia').notNull(),
  conquistas: text('conquistas').notNull(),
  posicao: varchar('posicao', { length: 50 }).notNull(),
  federacao: text('federacao').notNull(),
  usuarioIdUsuario:text('atleta_id_usuario').references(() => usuario.idUsuario),
});

export const olheiro = pgTable('olheiro', {
  idOlheiro: text('id_olheiro').primaryKey().$defaultFn(() => createId()),
  usuarioIdUsuario:text('usuario_id_usuario').references(() => usuario.idUsuario),
  areaDeInteresses: text('area_de_interesses').notNull(),
  verificar: integer('verificar').notNull().default(0),
  informacoesContato: text('informacoes_contato').notNull(),
});

export const eventos = pgTable('eventos', {
  idEventos: text('id_eventos').primaryKey().$defaultFn(() => createId()),
  usuarioIdUsuario: text('usuario_id_usuario').references(() => usuario.idUsuario),
  nome: varchar('nome', { length: 255 }).notNull(),
  localizacao: varchar('localizacao', { length: 255 }).notNull(),
  data1: timestamp('data_1').notNull(),
  data2: timestamp('data_2').notNull(),
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
});

export const publicacoes = pgTable('publicacoes', {
  idPublicacoes: text('id_publicacoes').primaryKey().$defaultFn(() => createId()),
  usuarioIdUsuario: text('usuario_id_usuario').references(() => usuario.idUsuario),
  conteudo: text('conteudo').notNull(),
  midiaUrl: varchar('midia_url', { length: 255 }).notNull(),
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
});

export const curtida = pgTable('curtida', {
  idCurtida: text('id_curtida').primaryKey().$defaultFn(() => createId()),
  usuarioIdUsuario: text('usuario_id_usuario').notNull().references(() => usuario.idUsuario),
  publicacoesIdPublicacoes: text('publicacoes_id_publicacoes').notNull().references(() => publicacoes.idPublicacoes),
  data: timestamp('data').notNull().defaultNow(),
});

export const favoritos = pgTable('favoritos', {
  idFavoritos: text('id_favoritos').primaryKey().$defaultFn(() => createId()),
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
});


export const usuarioHasFavoritos = pgTable('usuario_has_favoritos', {
 usuarioIdUsuario: text('usuario_id_usuario').notNull().references(() => usuario.idUsuario),
  favoritosIdFavoritos: text('favoritos_id_favoritos').notNull().references(() => favoritos.idFavoritos),
}, );

export const destaques = pgTable('destaques', {
  idDestaques: text('id_destaques').primaryKey().$defaultFn(() => createId()),
  publicacoesIdPublicacoes: text('publicacoes_id_publicacoes').notNull().references(() => publicacoes.idPublicacoes),
  criterio: criterioEnum('criterio').notNull(),
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
});
