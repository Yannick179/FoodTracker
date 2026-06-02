import { prisma } from "$lib/prisma";
import { requireUser } from "$lib/server/authHelper";
import { json } from "@sveltejs/kit";

export type FoodLogInput = {
    foodId: number;
    amount: number;
};

export type CreateMealLogRequest = {
    date: string;
    foodLogs: FoodLogInput[];
};

export type FoodLogDto = {
    foodId: number;
    foodLogId: number;
    name: string;
    amount: number;
    eatenAt: Date;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
};

export type DayStatsDto = {
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
};

export type MealLogDto = {
    id: number;
    name: string;
    foods: FoodLogDto[];
};

export type MealLogResponseDto = {
    mealLogs: MealLogDto[];
    dayStats: DayStatsDto;
};

export const POST = async ({ request, locals }) => {
    const user = requireUser(locals);

    try {
        const { date, foodLogs } = (await request.json()) as CreateMealLogRequest;

        if (!date || !Array.isArray(foodLogs) || foodLogs.length === 0) {
            return new Response(JSON.stringify({ error: 'date and at least one foodLog are required' }), { status: 400 });
        }

        const hasInvalidEntry = foodLogs.some(
            (fl) => fl?.foodId == null || fl?.amount == null
        );
        if (hasInvalidEntry) {
            return new Response(JSON.stringify({ error: 'each foodLog needs a foodId and amount' }), { status: 400 });
        }

        // make sure every referenced food actually exists before creating
        const foodIds = [...new Set(foodLogs.map((fl) => fl.foodId))];
        const existing = await prisma.food.findMany({
            where: { id: { in: foodIds } },
            select: { id: true },
        });
        if (existing.length !== foodIds.length) {
            const existingIds = new Set(existing.map((f) => f.id));
            const missing = foodIds.filter((id) => !existingIds.has(id));
            return new Response(JSON.stringify({ error: `Unknown foodId(s): ${missing.join(', ')}` }), { status: 400 });
        }

        const mealLog = await prisma.mealLog.create({
            data: {
                userId: user.id,
                eatenAt: new Date(date),
                name: "",
                foodLogs: {
                    create: foodLogs.map((fl) => ({
                        foodId: fl.foodId,
                        amount: fl.amount,
                    })),
                },
            },
            include: { foodLogs: true },
        });

        return json(mealLog, {
            status: 201,
            headers: { Location: `/api/calorie-tracker/meal-logs/${mealLog.id}` },
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Failed to save meal log' }), { status: 500 });
    }
};



export const GET = async ({ url, locals }) => {
    const user = requireUser(locals);

    const dateParam = url.searchParams.get('date');
    const start = dateParam ? new Date(dateParam) : new Date(NaN);
    if (isNaN(start.getTime())) {
        return new Response(JSON.stringify({ error: 'valid date is required' }), { status: 400 });
    }
    start.setHours(0, 0, 0, 0); // start of the day

    const end = new Date(start);
    end.setDate(start.getDate() + 1); // next midnight

    const mealLogs = await prisma.mealLog.findMany({
        where: {
            userId: user.id,
            eatenAt: {
                gte: start,
                lt: end
            }
        },
        include: {
            foodLogs: {
                include: {
                    food: true
                }
            }
        }
    });

    const dayStatsDto: DayStatsDto = {
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0,
    };

    const mealLogsDto: MealLogDto[] = mealLogs.map((log) => {
        const mealLogDto: MealLogDto = {
            id: log.id,
            name: log.name,
            foods: [],
        };

        log.foodLogs.forEach(foodLog => {
            const foodData: FoodLogDto = {
                foodId: foodLog.food.id,
                foodLogId: foodLog.id,
                name: foodLog.food.name,
                amount: foodLog.amount,
                eatenAt: log.eatenAt,
                calories: (foodLog.food.calories * foodLog.amount) / 100,
                protein: (foodLog.food.protein * foodLog.amount) / 100,
                carbohydrates: (foodLog.food.carbohydrates * foodLog.amount) / 100,
                fat: (foodLog.food.fat * foodLog.amount) / 100,
            };

            // totals
            dayStatsDto.calories += foodData.calories;
            dayStatsDto.protein += foodData.protein;
            dayStatsDto.carbohydrates += foodData.carbohydrates;
            dayStatsDto.fat += foodData.fat;

            mealLogDto.foods.push(foodData);
        });

        return mealLogDto;
    });

    const response: MealLogResponseDto = {
        mealLogs: mealLogsDto,
        dayStats: dayStatsDto,
    }

    return json(response);
};


