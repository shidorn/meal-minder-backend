/*
  Warnings:

  - You are about to alter the column `photo` on the `recipes` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `recipes` MODIFY `photo` VARCHAR(191) NULL;
