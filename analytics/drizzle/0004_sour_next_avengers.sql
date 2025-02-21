ALTER TABLE "creator_requests" DROP CONSTRAINT "creator_requests_user_id_unique";--> statement-breakpoint
ALTER TABLE "creator_requests" ALTER COLUMN "user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "creator_requests" ADD COLUMN "userId" varchar;--> statement-breakpoint
ALTER TABLE "creator_requests" ADD CONSTRAINT "creator_requests_userId_unique" UNIQUE("userId");