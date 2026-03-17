import { PrismaClient } from '@prisma/client';
import type {RequestHandler} from "../../../../.svelte-kit/types/src/routes/api/searchfood/$types";
import {json} from "@sveltejs/kit";
import {getDummyUser} from "$lib/server/DummyUser";

const prisma = new PrismaClient();

export const GET: RequestHandler = async ({ url }) => {
    let user = await getDummyUser();
    const date = url.searchParams.get('date');

    // let now = new Date().toString();

    //default for today
    let databaseFoodEntries = await getDataBaseFoodEntriesForDateX(date, user.id);

    let foodEntriesJsonList = [];

    for (const databaseFoodEntry of databaseFoodEntries) {
        let factor = databaseFoodEntry.amount / 100;
        const foodEntryJson = {
            name: databaseFoodEntry.food.name,
            amount: databaseFoodEntry.amount,
            eatenAt: databaseFoodEntry.eatenAt,
            calories: databaseFoodEntry.food.Calories * factor,
            protein: databaseFoodEntry.food.Protein * factor,
            carbs: databaseFoodEntry.food.Carbohydrates * factor,
            fat: databaseFoodEntry.food.Fat * factor
        };
        foodEntriesJsonList.push(foodEntryJson);
    }

    return json(foodEntriesJsonList);
};

async function getDataBaseFoodEntriesForDateX(date: Date, userid: number) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0); // start of the day

    const end = new Date(date);
    end.setHours(23, 59, 59, 999); //end of the day
    end.setDate(end.getDate() + 1);

    //TODO: make query smaller
    return prisma.foodEntry.findMany({
        where: {
            userId: userid,
            eatenAt: {
                gte: start,
                lt: end
            }
        },
        include: {
            food: true
        },
        orderBy: {
            eatenAt: 'desc'
        }
    });
}