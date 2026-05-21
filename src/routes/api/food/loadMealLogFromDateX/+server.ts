import {json} from "@sveltejs/kit";
import { prisma } from "$lib/prisma";
import {requireUser} from "$lib/server/authHelper";

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


export const GET = async ({ url, locals }) => {
    const user = requireUser(locals);
    const date  = url.searchParams.get('date');

    //TODO: fix the ts-ignore if possible
    // @ts-ignore
    const start = new Date(date);
    start.setHours(0, 0, 0, 0); // start of the day

    // @ts-ignore
    const end = new Date(date);
    end.setHours(23, 59, 59, 999); //end of the day
    end.setDate(end.getDate() + 1);

    let mealLogs = await prisma.mealLog.findMany({
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
    console.log(mealLogs);

    let dayStatsDto: DayStatsDto = {
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0,
    };

    let mealLogsDto: MealLogDto[] = [];
    mealLogs.forEach((log, index) => {
        let mealLogDto: MealLogDto = {
            id: log.id,
            name: log.name,
            foods: [],
        };

        mealLogsDto.push(mealLogDto);
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

            mealLogsDto[index].foods.push(foodData);
        });
    });

    const response: MealLogResponseDto = {
        mealLogs: mealLogsDto,
        dayStats: dayStatsDto,
    }

    return json(response);
};
