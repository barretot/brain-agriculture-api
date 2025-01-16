ALTER TABLE "harvests" RENAME COLUMN "date" TO "year";--> statement-breakpoint
ALTER TABLE "farm_owner" ALTER COLUMN "farm_id" DROP NOT NULL;