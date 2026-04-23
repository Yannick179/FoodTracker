import type {RequestHandler} from "../../../../.svelte-kit/types/src/routes/api/searchfood/$types";
import {json} from "@sveltejs/kit";
import { prisma } from "$lib/prisma";

export const GET: RequestHandler = async ({ url }) => {
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
        orderBy: { createdAt: 'desc' },
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
