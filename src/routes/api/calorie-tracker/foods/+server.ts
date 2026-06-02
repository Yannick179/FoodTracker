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
    requireUser(locals);

    //TODO: edit the amount to take because take is hardcoded right now

    const query = url.searchParams.get('q');

    if (query) {
        const foods = await searchFoods(query);
        return json(foods);
    } else {
        const foods = await getDefaultFoods();
        return json(foods);
    }
};

export const POST = async ({ request, locals }) => {
    requireUser(locals);

    try {
        const { name, calories, protein, carbohydrates, fat } = await request.json();

        if (!name || calories == null || protein == null || carbohydrates == null || fat == null) {
            return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
        }

        const food = await prisma.food.create({
            data: {
                name,
                calories,
                protein,
                carbohydrates,
                fat
            }
        });

        return json(food, {
            status: 201,
            headers: { Location: `/api/calorie-tracker/foods/${food.id}` }
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Failed to add new food' }), { status: 500 });
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