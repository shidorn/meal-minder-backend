/*
  Warnings:

  - Added the required column `grocery_id` to the `groceries_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `groceries_item` ADD COLUMN `grocery_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `groceries_item` ADD CONSTRAINT `groceries_item_grocery_id_fkey` FOREIGN KEY (`grocery_id`) REFERENCES `groceries`(`grocery_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
