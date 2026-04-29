import type {RequestHandler} from "../../../../.svelte-kit/types/src/routes/api/searchfood/$types";
import { prisma } from "$lib/prisma";
import {requireUser} from "$lib/server/authHelper";

export const POST: RequestHandler = async ({ request, locals  }) => {
    const user = requireUser(locals);

    try {

        const { name, calories, protein, carbohydrates, fat } = await request.json();

        // Basic validation
        if (!name || (!calories && calories != 0) || (!protein && protein != 0) || (!carbohydrates && carbohydrates != 0) || (!fat && fat != 0)) {
            return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
        }
        console.log(name, calories, protein, carbohydrates, fat);
        const food = await prisma.food.create({
            data: {
                name,
                calories,
                protein,
                carbohydrates,
                fat
            }
        });

        return new Response(null, { status: 201 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Failed to add new food' }), { status: 500 });
    }
};

