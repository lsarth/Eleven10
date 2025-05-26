CREATE TABLE IF NOT EXISTS "curtida" (
	"id_curtida" text PRIMARY KEY NOT NULL,
	"usuario_id_usuario" text NOT NULL,
	"publicacoes_id_publicacoes" text NOT NULL,
	"data" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "curtida_usuario_id_usuario_publicacoes_id_publicacoes_unique" UNIQUE("usuario_id_usuario","publicacoes_id_publicacoes")
);
--> statement-breakpoint
DROP TABLE "curtidas";--> statement-breakpoint
DROP TABLE "usuario_has_curtidas";--> statement-breakpoint
ALTER TABLE "destaques" ALTER COLUMN "publicacoes_id_publicacoes" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "usuario_has_favoritos" ALTER COLUMN "usuario_id_usuario" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "usuario_has_favoritos" ALTER COLUMN "favoritos_id_favoritos" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "curtida" ADD CONSTRAINT "curtida_usuario_id_usuario_usuario_id_usuario_fk" FOREIGN KEY ("usuario_id_usuario") REFERENCES "public"."usuario"("id_usuario") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "curtida" ADD CONSTRAINT "curtida_publicacoes_id_publicacoes_publicacoes_id_publicacoes_fk" FOREIGN KEY ("publicacoes_id_publicacoes") REFERENCES "public"."publicacoes"("id_publicacoes") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
