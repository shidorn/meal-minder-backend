-- AlterTable
ALTER TABLE `users` ADD COLUMN `photo_path` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `family` (
    `family_id` INTEGER NOT NULL AUTO_INCREMENT,
    `family_name` VARCHAR(50) NOT NULL,
    `creator` VARCHAR(50) NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`family_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `family` ADD CONSTRAINT `family_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
