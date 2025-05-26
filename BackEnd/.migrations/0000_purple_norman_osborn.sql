DO $$ BEGIN
 CREATE TYPE "public"."criterio" AS ENUM('Mais curtidos', 'Mais visualizados');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."genero" AS ENUM('Masculino', 'Feminino', 'Não binário');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."modalidade" AS ENUM('Masculino', 'Feminino');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."tipo_usuario" AS ENUM('Atleta', 'Olheiro');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "atleta" (
	"id_atleta" serial PRIMARY KEY NOT NULL,
	"modalidade" "modalidade",
	"biografia" text NOT NULL,
	"conquistas" text NOT NULL,
	"posicao" varchar(50) NOT NULL,
	"federacao" text NOT NULL,
	"usuario_id_atleta" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "curtidas" (
	"id_curtidas" serial PRIMARY KEY NOT NULL,
	"criado_em" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "destaques" (
	"id_destaques" serial PRIMARY KEY NOT NULL,
	"publicacoes_id_publicacoes" text,
	"criterio" "criterio" NOT NULL,
	"criado_em" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "eventos" (
	"id_eventos" serial PRIMARY KEY NOT NULL,
	"usuario_id_usuario" text,
	"nome" varchar(255) NOT NULL,
	"localizacao" varchar(255) NOT NULL,
	"data_1" timestamp NOT NULL,
	"data_2" timestamp NOT NULL,
	"criado_em" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "favoritos" (
	"id_favoritos" serial PRIMARY KEY NOT NULL,
	"criado_em" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "olheiro" (
	"id_olheiro" serial PRIMARY KEY NOT NULL,
	"usuario_id_usuario" text,
	"area_de_interesses" text NOT NULL,
	"verificar" integer DEFAULT 0 NOT NULL,
	"informacoes_contato" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "publicacoes" (
	"id_publicacoes" serial PRIMARY KEY NOT NULL,
	"usuario_id_usuario" text,
	"conteudo" text NOT NULL,
	"midia_url" varchar(255) NOT NULL,
	"criado_em" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "usuario" (
	"id_usuario" serial PRIMARY KEY NOT NULL,
	"username" varchar(45) NOT NULL,
	"senha" varchar(45) NOT NULL,
	"email" varchar(100) NOT NULL,
	"telefone" varchar(15),
	"tipo_usuario" "tipo_usuario" NOT NULL,
	"nome_completo" varchar(255) NOT NULL,
	"genero" "genero" NOT NULL,
	"data_de_aniversario" timestamp NOT NULL,
	"profile_picture" varchar(100) NOT NULL,
	"logradouro" varchar(100) NOT NULL,
	"verificado" boolean DEFAULT false NOT NULL,
	"criado_em" timestamp DEFAULT now() NOT NULL,
	"atualizado_em" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "usuario_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "usuario_has_curtidas" (
	"usuario_id_usuario" text,
	"curtidas_id_curtidas" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "usuario_has_favoritos" (
	"usuario_id_usuario" text,
	"favoritos_id_favoritos" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "atleta" ADD CONSTRAINT "atleta_usuario_id_atleta_usuario_id_usuario_fk" FOREIGN KEY ("usuario_id_atleta") REFERENCES "public"."usuario"("id_usuario") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "destaques" ADD CONSTRAINT "destaques_publicacoes_id_publicacoes_publicacoes_id_publicacoes_fk" FOREIGN KEY ("publicacoes_id_publicacoes") REFERENCES "public"."publicacoes"("id_publicacoes") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eventos" ADD CONSTRAINT "eventos_usuario_id_usuario_usuario_id_usuario_fk" FOREIGN KEY ("usuario_id_usuario") REFERENCES "public"."usuario"("id_usuario") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "olheiro" ADD CONSTRAINT "olheiro_usuario_id_usuario_usuario_id_usuario_fk" FOREIGN KEY ("usuario_id_usuario") REFERENCES "public"."usuario"("id_usuario") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "publicacoes" ADD CONSTRAINT "publicacoes_usuario_id_usuario_usuario_id_usuario_fk" FOREIGN KEY ("usuario_id_usuario") REFERENCES "public"."usuario"("id_usuario") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usuario_has_curtidas" ADD CONSTRAINT "usuario_has_curtidas_usuario_id_usuario_usuario_id_usuario_fk" FOREIGN KEY ("usuario_id_usuario") REFERENCES "public"."usuario"("id_usuario") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usuario_has_curtidas" ADD CONSTRAINT "usuario_has_curtidas_curtidas_id_curtidas_curtidas_id_curtidas_fk" FOREIGN KEY ("curtidas_id_curtidas") REFERENCES "public"."curtidas"("id_curtidas") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usuario_has_favoritos" ADD CONSTRAINT "usuario_has_favoritos_usuario_id_usuario_usuario_id_usuario_fk" FOREIGN KEY ("usuario_id_usuario") REFERENCES "public"."usuario"("id_usuario") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usuario_has_favoritos" ADD CONSTRAINT "usuario_has_favoritos_favoritos_id_favoritos_favoritos_id_favoritos_fk" FOREIGN KEY ("favoritos_id_favoritos") REFERENCES "public"."favoritos"("id_favoritos") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
