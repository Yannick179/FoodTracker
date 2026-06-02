import { prisma } from "$lib/prisma";
import { requireUser } from "$lib/server/authHelper";
import { json } from "@sveltejs/kit";

export async function GET({ params, locals }) {
    requireUser(locals);

    const id = Number(params.id);
    if (!Number.isInteger(id)) {
        return new Response(JSON.stringify({ error: 'Invalid food id' }), { status: 400 });
    }

    try {
        const food = await prisma.food.findUnique({
            where: { id },
            select: {
                name: true,
                calories: true,
                protein: true,
                carbohydrates: true,
                fat: true,
            }
        });

        if (!food) {
            return new Response(JSON.stringify({ error: 'Food not found' }), { status: 404 });
        }

        return json(food);
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Failed to fetch food' }), { status: 500 });
    }
}