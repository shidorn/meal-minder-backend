-- DropForeignKey
ALTER TABLE `groceries_item` DROP FOREIGN KEY `groceries_item_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `groceries_item` ADD CONSTRAINT `groceries_item_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
