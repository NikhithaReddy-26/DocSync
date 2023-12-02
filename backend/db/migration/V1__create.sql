CREATE TABLE IF NOT EXISTS `contiq`.`usr` (
  `usr_id` varchar(255) NOT NULL,
  `first_name` varchar(35) NOT NULL,
  `last_name` varchar(35) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(95) NOT NULL,
  `avatar_path` varchar(255) NOT NULL,
  `created_on` timestamp NOT NULL,
  `updated_on` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`usr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `contiq`.`notification` (
  `notification_id` varchar(255) NOT NULL,
  `action` varchar(10) NOT NULL,
  `is_read` binary(1) NOT NULL,
  `file_id` varchar(255) NOT NULL,
  `usr_id` varchar(255) NOT NULL,
  `created_by` varchar(255) NOT NULL,
  `created_on` timestamp NOT NULL,
  `updated_on` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `FK_1` (`usr_id`),
  KEY `FK_3` (`created_by`),
  CONSTRAINT `FK_1` FOREIGN KEY (`usr_id`) REFERENCES `usr` (`usr_id`),
  CONSTRAINT `FK_4` FOREIGN KEY (`created_by`) REFERENCES `usr` (`usr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;