-- CreateTable
CREATE TABLE `groceries_item` (
    `item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_name` VARCHAR(255) NOT NULL,
    `item_quantity` INTEGER NULL DEFAULT 0,
    `item_category` VARCHAR(50) NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `groceries_item` ADD CONSTRAINT `groceries_item_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
