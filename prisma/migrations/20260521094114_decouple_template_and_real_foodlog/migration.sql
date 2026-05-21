/*
  Warnings:

  - You are about to drop the column `mealTemplateId` on the `MealLog` table. All the data in the column will be lost.
  - You are about to drop the `FoodPortion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FoodPortion" DROP CONSTRAINT "FoodPortion_foodId_fkey";

-- DropForeignKey
ALTER TABLE "FoodPortion" DROP CONSTRAINT "FoodPortion_mealTemplateId_fkey";

-- DropForeignKey
ALTER TABLE "MealLog" DROP CONSTRAINT "MealLog_mealTemplateId_fkey";

-- AlterTable
ALTER TABLE "MealLog" DROP COLUMN "mealTemplateId";

-- DropTable
DROP TABLE "FoodPortion";

-- CreateTable
CREATE TABLE "FoodPortionTemplate" (
    "id" SERIAL NOT NULL,
    "foodId" INTEGER NOT NULL,
    "mealTemplateId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "FoodPortionTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodLog" (
    "id" SERIAL NOT NULL,
    "mealLogId" INTEGER NOT NULL,
    "foodId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "FoodLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FoodPortionTemplate_foodId_idx" ON "FoodPortionTemplate"("foodId");

-- CreateIndex
CREATE INDEX "FoodPortionTemplate_mealTemplateId_idx" ON "FoodPortionTemplate"("mealTemplateId");

-- AddForeignKey
ALTER TABLE "FoodPortionTemplate" ADD CONSTRAINT "FoodPortionTemplate_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodPortionTemplate" ADD CONSTRAINT "FoodPortionTemplate_mealTemplateId_fkey" FOREIGN KEY ("mealTemplateId") REFERENCES "MealTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodLog" ADD CONSTRAINT "FoodLog_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodLog" ADD CONSTRAINT "FoodLog_mealLogId_fkey" FOREIGN KEY ("mealLogId") REFERENCES "MealLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
