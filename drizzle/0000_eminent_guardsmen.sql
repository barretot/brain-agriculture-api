CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"cpf_cnpj" numeric NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_cpf_cnpj_unique" UNIQUE("cpf_cnpj")
);
--> statement-breakpoint
CREATE TABLE "crops" (
	"id" text PRIMARY KEY NOT NULL,
	"crop_name" text NOT NULL,
	"area" double precision NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "harvests" (
	"id" text PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "farm" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"total_area" double precision NOT NULL,
	"arable_area" double precision NOT NULL,
	"vegetation_area" double precision NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "farm_city_unique" UNIQUE("city"),
	CONSTRAINT "farm_state_unique" UNIQUE("state")
);
--> statement-breakpoint
CREATE TABLE "farm_harvests" (
	"id" text PRIMARY KEY NOT NULL,
	"farm_id" text NOT NULL,
	"harvests_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "farm_owner" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"farm_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "harvests_crops" (
	"id" text PRIMARY KEY NOT NULL,
	"harvests_id" text NOT NULL,
	"crop_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "farm_harvests" ADD CONSTRAINT "farm_harvests_farm_id_farm_id_fk" FOREIGN KEY ("farm_id") REFERENCES "public"."farm"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "farm_harvests" ADD CONSTRAINT "farm_harvests_harvests_id_harvests_id_fk" FOREIGN KEY ("harvests_id") REFERENCES "public"."harvests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "farm_owner" ADD CONSTRAINT "farm_owner_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "farm_owner" ADD CONSTRAINT "farm_owner_farm_id_farm_id_fk" FOREIGN KEY ("farm_id") REFERENCES "public"."farm"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "harvests_crops" ADD CONSTRAINT "harvests_crops_harvests_id_harvests_id_fk" FOREIGN KEY ("harvests_id") REFERENCES "public"."harvests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "harvests_crops" ADD CONSTRAINT "harvests_crops_crop_id_crops_id_fk" FOREIGN KEY ("crop_id") REFERENCES "public"."crops"("id") ON DELETE no action ON UPDATE no action;