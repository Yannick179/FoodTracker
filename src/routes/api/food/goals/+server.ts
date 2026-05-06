import {requireUser} from "$lib/server/authHelper";
import { prisma } from "$lib/prisma";

export const POST = async ({ request, locals }) => {
    const user = requireUser(locals);
    try {
        const { calories, protein, carbohydrates, fats } =
            await request.json();
        const goalEntry = await prisma.kcalGoal.create({
            data: {
                userId: user.id,
                protein: protein,
                kcal: calories,
                carbohydrates: carbohydrates,
                fats: fats,
            }
        });
        return new Response(null, { status: 201 });
    }
    catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ error: 'Failed to create new goal' }), { status: 500 });
    }
}

