import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';
import {json} from "@sveltejs/kit";

const prisma = new PrismaClient();

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
