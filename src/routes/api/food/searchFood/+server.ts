import {json} from "@sveltejs/kit";
import { prisma } from "$lib/prisma";
import {requireUser} from "$lib/server/authHelper";

export const GET = async ({ url, locals }) => {
    const user = requireUser(locals);


    const query = url.searchParams.get('q');

    if (query) {
        const foods = await searchFoods(query);
        return json(foods);
    } else {
        const foods = await getDefaultFoods();
        return json(foods);
    }
};


async function getDefaultFoods() {
    return prisma.food.findMany({
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
}

async function searchFoods(query: string) {
    return prisma.food.findMany({
        where: {
            name: {
                contains: query,
                mode: 'insensitive'
            }
        },
        orderBy: { createdAt: 'desc' },
        take: 30
    });
}
