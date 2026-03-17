/*
  Warnings:

  - You are about to drop the column `fat` on the `Food` table. All the data in the column will be lost.
  - Added the required column `Fat` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Food" DROP COLUMN "fat",
ADD COLUMN     "Fat" DOUBLE PRECISION NOT NULL;
