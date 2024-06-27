-- CreateTable
CREATE TABLE `groceries` (
    `grocery_id` INTEGER NOT NULL AUTO_INCREMENT,
    `grocery_name` VARCHAR(50) NOT NULL,
    `date_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `target_date` DATETIME(3) NOT NULL,
    `status` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`grocery_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
