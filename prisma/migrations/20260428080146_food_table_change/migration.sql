/*
  Warnings:

  - You are about to drop the column `Calories` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `Carbohydrates` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `Fat` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `Protein` on the `Food` table. All the data in the column will be lost.
  - Added the required column `calories` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carbohydrates` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fat` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protein` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Food" DROP COLUMN "Calories",
DROP COLUMN "Carbohydrates",
DROP COLUMN "Fat",
DROP COLUMN "Protein",
ADD COLUMN     "calories" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "carbohydrates" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "protein" DOUBLE PRECISION NOT NULL;
