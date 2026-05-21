/*
  Warnings:

  - Made the column `name` on table `MealTemplate` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MealTemplate" ALTER COLUMN "name" SET NOT NULL;
