-- CreateTable
CREATE TABLE `recipes` (
    `recipe_id` INTEGER NOT NULL AUTO_INCREMENT,
    `recipe_name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `instruction` VARCHAR(255) NULL,
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
ALTER TABLE `recipe_ingredients` ADD CONSTRAINT `recipe_ingredients_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`recipe_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
