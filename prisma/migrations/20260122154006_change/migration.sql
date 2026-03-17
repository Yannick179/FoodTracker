/*
  Warnings:

  - You are about to drop the column `carbs` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `fats` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `protein` on the `Food` table. All the data in the column will be lost.
  - Added the required column `Carbohydrates` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Protein` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fat` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Food" DROP COLUMN "carbs",
DROP COLUMN "fats",
DROP COLUMN "protein",
ADD COLUMN     "Carbohydrates" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Protein" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fat" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "calories" SET DATA TYPE DOUBLE PRECISION;
