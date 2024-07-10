/*
  Warnings:

  - Added the required column `expiry_date` to the `groceries_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `groceries_item` ADD COLUMN `expiry_date` DATETIME(3) NOT NULL;
