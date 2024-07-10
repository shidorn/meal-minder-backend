/*
  Warnings:

  - You are about to drop the column `expiry_date` on the `groceries_item` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `groceries_item` DROP COLUMN `expiry_date`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `profileImage`;
