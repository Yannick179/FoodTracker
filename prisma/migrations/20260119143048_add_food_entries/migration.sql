-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodEntry" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "foodId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "eatenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FoodEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "FoodEntry_userId_idx" ON "FoodEntry"("userId");

-- CreateIndex
CREATE INDEX "FoodEntry_foodId_idx" ON "FoodEntry"("foodId");

-- CreateIndex
CREATE INDEX "FoodEntry_eatenAt_idx" ON "FoodEntry"("eatenAt");

-- AddForeignKey
ALTER TABLE "FoodEntry" ADD CONSTRAINT "FoodEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodEntry" ADD CONSTRAINT "FoodEntry_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
