/*
  Warnings:

  - You are about to drop the column `user_id` on the `family` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `family` DROP FOREIGN KEY `family_user_id_fkey`;

-- AlterTable
ALTER TABLE `family` DROP COLUMN `user_id`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `family_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_family_id_fkey` FOREIGN KEY (`family_id`) REFERENCES `family`(`family_id`) ON DELETE SET NULL ON UPDATE CASCADE;
