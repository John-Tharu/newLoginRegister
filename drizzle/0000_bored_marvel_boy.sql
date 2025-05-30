CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`deleted_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
