/*
  Warnings:

  - You are about to drop the `FoodEntry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeFood` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FoodEntry" DROP CONSTRAINT "FoodEntry_foodId_fkey";

-- DropForeignKey
ALTER TABLE "FoodEntry" DROP CONSTRAINT "FoodEntry_userId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeFood" DROP CONSTRAINT "RecipeFood_foodId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeFood" DROP CONSTRAINT "RecipeFood_recipeId_fkey";

-- DropTable
DROP TABLE "FoodEntry";

-- DropTable
DROP TABLE "Recipe";

-- DropTable
DROP TABLE "RecipeFood";

-- CreateTable
CREATE TABLE "FoodPortion" (
    "id" SERIAL NOT NULL,
    "foodId" INTEGER NOT NULL,
    "mealTemplateId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "FoodPortion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealLog" (
    "id" SERIAL NOT NULL,
    "mealTemplateId" INTEGER NOT NULL,
    "eatenAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "MealLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealTemplate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "MealTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FoodPortion_foodId_idx" ON "FoodPortion"("foodId");

-- CreateIndex
CREATE INDEX "FoodPortion_mealTemplateId_idx" ON "FoodPortion"("mealTemplateId");

-- AddForeignKey
ALTER TABLE "FoodPortion" ADD CONSTRAINT "FoodPortion_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodPortion" ADD CONSTRAINT "FoodPortion_mealTemplateId_fkey" FOREIGN KEY ("mealTemplateId") REFERENCES "MealTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealLog" ADD CONSTRAINT "MealLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealLog" ADD CONSTRAINT "MealLog_mealTemplateId_fkey" FOREIGN KEY ("mealTemplateId") REFERENCES "MealTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealTemplate" ADD CONSTRAINT "MealTemplate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
