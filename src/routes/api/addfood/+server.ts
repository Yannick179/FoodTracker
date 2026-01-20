import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { name, calories, protein, carbs, fats } = await request.json();

        // Basic validation
        if (!name || (!calories && calories != 0) || (!protein && protein != 0) || (!carbs && carbs != 0) || (!fats && fats != 0)) {
            return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
        }
        console.log(name, calories, protein, carbs, fats);
        const food = await prisma.food.create({
            data: {
                name,
                calories,
                protein,
                carbs,
                fats
            }
        });

        return new Response(null, { status: 201 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Failed to add new food' }), { status: 500 });
    }
};

