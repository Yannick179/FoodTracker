-- AlterTable
ALTER TABLE "FoodEntry" ALTER COLUMN "eatenAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "KcalGoal" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "kcal" INTEGER NOT NULL,
    "protein" INTEGER NOT NULL,
    "carbohydrates" INTEGER NOT NULL,
    "fats" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KcalGoal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KcalGoal" ADD CONSTRAINT "KcalGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
