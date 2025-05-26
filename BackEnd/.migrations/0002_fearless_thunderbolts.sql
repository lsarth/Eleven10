ALTER TABLE "atleta" RENAME COLUMN "usuario_id_atleta" TO "atleta_id_usuario";--> statement-breakpoint
ALTER TABLE "atleta" DROP CONSTRAINT "atleta_usuario_id_atleta_usuario_id_usuario_fk";
--> statement-breakpoint
ALTER TABLE "atleta" ALTER COLUMN "id_atleta" SET DATA TYPE text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "atleta" ADD CONSTRAINT "atleta_atleta_id_usuario_usuario_id_usuario_fk" FOREIGN KEY ("atleta_id_usuario") REFERENCES "public"."usuario"("id_usuario") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
