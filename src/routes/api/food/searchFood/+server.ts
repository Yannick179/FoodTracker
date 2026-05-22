import {json} from "@sveltejs/kit";
import { prisma } from "$lib/prisma";
import {requireUser} from "$lib/server/authHelper";

export type Food = {
    name: string;
    id: number;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
}

export const GET = async ({ url, locals }) => {
    const user = requireUser(locals);

    const query = url.searchParams.get('q');
    console.log(query);

    if (query) {
        const foods = await searchFoods(query);
        return json(foods);
    } else {
        const foods = await getDefaultFoods();
        return json(foods);
    }
};


async function getDefaultFoods() {
    let result: Food[] = await prisma.food.findMany({
        select: {
            id: true,
            name: true,
            calories: true,
            protein: true,
            carbohydrates: true,
            fat: true,
        },
        orderBy: { createdAt: "desc" },
        take: 10
    });

    return result;
}

async function searchFoods(query: string) {
    let result: Food[] = await prisma.food.findMany({
        select: {
            id: true,
            name: true,
            calories: true,
            protein: true,
            carbohydrates: true,
            fat: true,
        },
        where: {
            name: {
                contains: query,
                mode: 'insensitive'
            }
        },
        orderBy: { createdAt: 'desc' },
        take: 30
    });


    return result;
}
