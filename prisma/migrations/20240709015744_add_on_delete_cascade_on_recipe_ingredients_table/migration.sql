-- DropForeignKey
ALTER TABLE `recipe_ingredients` DROP FOREIGN KEY `recipe_ingredients_recipe_id_fkey`;

-- AddForeignKey
ALTER TABLE `recipe_ingredients` ADD CONSTRAINT `recipe_ingredients_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE;
