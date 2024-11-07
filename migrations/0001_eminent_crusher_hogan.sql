CREATE TABLE `organizations` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`org_name` text NOT NULL,
	`org_site` text NOT NULL,
	`org_email` text NOT NULL,
	`org_phone` text NOT NULL,
	`org_address` text NOT NULL,
	`org_city` text NOT NULL,
	`org_state` text NOT NULL,
	`org_zip` text NOT NULL,
	`org_country` text NOT NULL,
	`org_description` text NOT NULL,
	`org_logo` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
