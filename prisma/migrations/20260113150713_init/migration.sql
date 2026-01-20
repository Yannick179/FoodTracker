-- CreateTable
CREATE TABLE "Food" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,
    "protein" INTEGER NOT NULL,
    "carbs" INTEGER NOT NULL,
    "fats" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);
