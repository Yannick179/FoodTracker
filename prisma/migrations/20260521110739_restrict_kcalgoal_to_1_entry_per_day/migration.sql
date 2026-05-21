/*
  Warnings:

  - A unique constraint covering the columns `[userId,createdAt]` on the table `KcalGoal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "KcalGoal_userId_createdAt_key" ON "KcalGoal"("userId", "createdAt");
