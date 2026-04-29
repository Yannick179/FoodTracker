import type {RequestHandler} from "../../../../.svelte-kit/types/src/routes/api/searchfood/$types";
import {json} from "@sveltejs/kit";
import { prisma } from "$lib/prisma";
import {requireUser} from "$lib/server/authHelper";


export const GET: RequestHandler = async ({ url, locals }) => {
    const user = requireUser(locals);



    const date = url.searchParams.get('date');
    console.log("date in serverside loadFoodEntries: " + date);

    // let now = new Date().toString();

    //default for today
    let result = await getDataBaseFoodEntriesForDateX(date, user.id);
    let databaseFoodEntries = result.entries ? result.entries : [];
    let dayStats = result.totals;
    let dayCals = 0;
    let dayProtein = 0;
    let dayCarbohydrates = 0;
    let dayFats = 0;
    let foodEntriesJsonList = [];

    for (const databaseFoodEntry of databaseFoodEntries) {
        let factor = databaseFoodEntry.amount / 100;
        const foodEntryJson = {
            name: databaseFoodEntry.food.name,
            amount: Math.round(databaseFoodEntry.amount),
            eatenAt: databaseFoodEntry.eatenAt,
            calories: Math.round(databaseFoodEntry.food.calories * factor),
            protein: Math.round(databaseFoodEntry.food.protein * factor),
            carbohydrates: Math.round(databaseFoodEntry.food.carbohydrates * factor),
            fat: Math.round(databaseFoodEntry.food.fat * factor)
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
            acc.protein += Math.round(entry.food.protein * entry.amount / 100);
            acc.carbohydrates += Math.round(entry.food.carbohydrates * entry.amount / 100);
            acc.fat += Math.round(entry.food.fat * entry.amount / 100);
            acc.calories += Math.round(entry.food.calories * entry.amount / 100);
            return acc;
        },
        { protein: 0, carbohydrates: 0, fat: 0, calories: 0 }
    );

    return {
        entries,
        totals
    };
}