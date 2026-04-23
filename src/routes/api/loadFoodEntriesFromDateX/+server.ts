import type {RequestHandler} from "../../../../.svelte-kit/types/src/routes/api/searchfood/$types";
import {json} from "@sveltejs/kit";
import {getDummyUser} from "$lib/server/DummyUser";
import { prisma } from "$lib/prisma";


export const GET: RequestHandler = async ({ url }) => {
    let user = await getDummyUser();
    const date = url.searchParams.get('date');

    // let now = new Date().toString();

    //default for today
    let result = await getDataBaseFoodEntriesForDateX(date, user.id);
    let databaseFoodEntries = result.entries ? result.entries : [];
    let dayStats = result.totals;
    let dayCals = 0;
    let dayProtein = 0;
    let dayCarbs = 0;
    let dayFats = 0;
    let foodEntriesJsonList = [];

    for (const databaseFoodEntry of databaseFoodEntries) {
        let factor = databaseFoodEntry.amount / 100;
        const foodEntryJson = {
            name: databaseFoodEntry.food.name,
            amount: Math.round(databaseFoodEntry.amount),
            eatenAt: databaseFoodEntry.eatenAt,
            calories: Math.round(databaseFoodEntry.food.Calories * factor),
            protein: Math.round(databaseFoodEntry.food.Protein * factor),
            carbs: Math.round(databaseFoodEntry.food.Carbohydrates * factor),
            fat: Math.round(databaseFoodEntry.food.Fat * factor)
        };
        foodEntriesJsonList.push(foodEntryJson);
    }
    console.log(foodEntriesJsonList, dayStats)
    return json({
        foodEntries: foodEntriesJsonList,
        dayStats: dayStats
    });
};

// function combineFoodEntries(foodEntriesJsonList: PrismaClient[]) {}

async function getDataBaseFoodEntriesForDateX(date: Date, userid: number) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0); // start of the day

    const end = new Date(date);
    end.setHours(23, 59, 59, 999); //end of the day
    end.setDate(end.getDate() + 1);

    //TODO: make query smaller
    const entries = await prisma.foodEntry.findMany({
        where: {
            userId: userid,
            eatenAt: { gte: start, lt: end }
        },
        include: { food: true },
        orderBy: { eatenAt: 'desc' }
    });

    const totals = entries.reduce(
        (acc, entry) => {
            acc.protein += Math.round(entry.food.Protein * entry.amount / 100);
            acc.carbs += Math.round(entry.food.Carbohydrates * entry.amount / 100);
            acc.fat += Math.round(entry.food.Fat * entry.amount / 100);
            acc.calories += Math.round(entry.food.Calories * entry.amount / 100);
            return acc;
        },
        { protein: 0, carbs: 0, fat: 0, calories: 0 }
    );

    return {
        entries,
        totals
    };
}