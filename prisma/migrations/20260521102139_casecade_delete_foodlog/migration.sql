-- DropForeignKey
ALTER TABLE "FoodLog" DROP CONSTRAINT "FoodLog_mealLogId_fkey";

-- AddForeignKey
ALTER TABLE "FoodLog" ADD CONSTRAINT "FoodLog_mealLogId_fkey" FOREIGN KEY ("mealLogId") REFERENCES "MealLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
