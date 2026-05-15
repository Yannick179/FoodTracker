import { json } from '@sveltejs/kit';
import { prisma } from "$lib/prisma";
import {requireUser} from "$lib/server/authHelper";


export async function GET({ params, locals }) {
    const user = requireUser(locals);
    console.log(params);
    const id = params.id;

    const food = await prisma.food.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            name: true,
            calories: true,
            protein: true,
            carbohydrates: true,
            fat: true,
        }
    });

    return json(food);
}