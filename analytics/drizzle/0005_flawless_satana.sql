ALTER TABLE "creator_requests" DROP CONSTRAINT "creator_requests_userId_unique";--> statement-breakpoint
ALTER TABLE "creator_requests" DROP CONSTRAINT "creator_requests_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "creator_requests" ALTER COLUMN "user_id" SET DATA TYPE varchar;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "creator_requests" ADD CONSTRAINT "creator_requests_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "creator_requests" DROP COLUMN IF EXISTS "userId";