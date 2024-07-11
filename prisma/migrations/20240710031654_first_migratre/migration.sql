-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `first_name` VARCHAR(50) NULL DEFAULT '',
    `last_name` VARCHAR(50) NULL DEFAULT '',
    `reset_pass_token` INTEGER NULL DEFAULT 0,
    `reset_pass_token_expires` DATETIME(3) NULL,
    `date_of_birth` DATETIME(3) NULL,
    `created_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groceries` (
    `grocery_id` INTEGER NOT NULL AUTO_INCREMENT,
    `grocery_name` VARCHAR(50) NOT NULL,
    `date_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `target_date` DATETIME(3) NOT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'Pending',

    PRIMARY KEY (`grocery_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groceries_item` (
    `item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_name` VARCHAR(255) NOT NULL,
    `item_quantity` INTEGER NULL DEFAULT 0,
    `item_category` VARCHAR(50) NOT NULL,
    `is_purchase` BOOLEAN NOT NULL DEFAULT false,
    `user_id` INTEGER NOT NULL,
    `grocery_id` INTEGER NOT NULL,

    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recipes` (
    `recipe_id` INTEGER NOT NULL AUTO_INCREMENT,
    `recipe_name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `instruction` VARCHAR(255) NULL,
    `photo_path` VARCHAR(255) NULL,
    `cooking_time` VARCHAR(50) NULL,
    `date_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`recipe_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recipe_ingredients` (
    `recipe_ingredient_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ingredient_name` VARCHAR(50) NOT NULL,
    `ingredient_quantity` INTEGER NOT NULL DEFAULT 0,
    `recipe_id` INTEGER NOT NULL,

    PRIMARY KEY (`recipe_ingredient_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `groceries_item` ADD CONSTRAINT `groceries_item_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groceries_item` ADD CONSTRAINT `groceries_item_grocery_id_fkey` FOREIGN KEY (`grocery_id`) REFERENCES `groceries`(`grocery_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recipe_ingredients` ADD CONSTRAINT `recipe_ingredients_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE;
