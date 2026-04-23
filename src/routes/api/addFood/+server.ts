import type {RequestHandler} from "../../../../.svelte-kit/types/src/routes/api/searchfood/$types";
import { prisma } from "$lib/prisma";

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { name, Calories, Protein, Carbohydrates, Fat } = await request.json();

        // Basic validation
        if (!name || (!Calories && Calories != 0) || (!Protein && Protein != 0) || (!Carbohydrates && Carbohydrates != 0) || (!Fat && Fat != 0)) {
            return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
        }
        console.log(name, Calories, Protein, Carbohydrates, Fat);
        const food = await prisma.food.create({
            data: {
                name,
                Calories,
                Protein,
                Carbohydrates,
                Fat
            }
        });

        return new Response(null, { status: 201 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Failed to add new food' }), { status: 500 });
    }
};

