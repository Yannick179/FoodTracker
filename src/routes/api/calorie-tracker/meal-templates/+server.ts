import { prisma } from "$lib/prisma";
import { requireUser } from "$lib/server/authHelper";
import { json } from "@sveltejs/kit";

export type FoodPortionTemplateInput = {
    foodId: number;
    amount: number;
};

export type CreateMealTemplateRequest = {
    mealName: string;
    foodTemplates: FoodPortionTemplateInput[];
};

export type MealTemplateResponseDtoFood = {
    name: string;
    protein: number;
    carbohydrates: number;
    fat: number;
    calories: number;
    amount: number;
};

export type MealTemplateResponseDto = {
    name: string;
    id: number;
    foods: MealTemplateResponseDtoFood[];
};

export const POST = async ({ request, locals }) => {
    const user = requireUser(locals);

    try {
        const { mealName, foodTemplates } = (await request.json()) as CreateMealTemplateRequest;

        if (!mealName || !Array.isArray(foodTemplates) || foodTemplates.length === 0) {
            return new Response(JSON.stringify({ error: 'mealName and at least one foodTemplate are required' }), { status: 400 });
        }

        const hasInvalidEntry = foodTemplates.some(
            (ft) => ft?.foodId == null || ft?.amount == null
        );
        if (hasInvalidEntry) {
            return new Response(JSON.stringify({ error: 'each foodTemplate needs a foodId and amount' }), { status: 400 });
        }

        // make sure every referenced food actually exists before creating
        const foodIds = [...new Set(foodTemplates.map((ft) => ft.foodId))];
        const existing = await prisma.food.findMany({
            where: { id: { in: foodIds } },
            select: { id: true },
        });
        if (existing.length !== foodIds.length) {
            const existingIds = new Set(existing.map((f) => f.id));
            const missing = foodIds.filter((id) => !existingIds.has(id));
            return new Response(JSON.stringify({ error: `Unknown foodId(s): ${missing.join(', ')}` }), { status: 400 });
        }

        const mealTemplate = await prisma.mealTemplate.create({
            data: {
                name: mealName,
                userId: user.id,
                foodPortionTemplates: {
                    create: foodTemplates.map((ft) => ({
                        foodId: ft.foodId,
                        amount: ft.amount,
                    })),
                },
            },
            include: { foodPortionTemplates: true },
        });

        return json(mealTemplate, {
            status: 201,
            headers: { Location: `/api/calorie-tracker/meal-templates/${mealTemplate.id}` },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to save meal template' }), { status: 500 });
    }
};

export const GET = async ({ url, locals }) => {
    const user = requireUser(locals);

    const query = url.searchParams.get('q');

    const results = await prisma.mealTemplate.findMany({
        where: {
            userId: user.id,
            ...(query ? { name: { contains: query, mode: 'insensitive' } } : {}),
        },
        select: {
            id: true,
            name: true,
            foodPortionTemplates: {
                select: {
                    id: true,
                    amount: true,
                    food: {
                        select: {
                            name: true,
                            calories: true,
                            protein: true,
                            carbohydrates: true,
                            fat: true,
                        },
                    },
                },
            },
        },
        take: 10,
    });

    const mealTemplates: MealTemplateResponseDto[] = results.map((result) => ({
        id: result.id,
        name: result.name,
        foods: result.foodPortionTemplates.map((fpt) => ({
            amount: fpt.amount,
            name: fpt.food.name,
            protein:       (fpt.food.protein       / 100) * fpt.amount,
            carbohydrates: (fpt.food.carbohydrates / 100) * fpt.amount,
            fat:           (fpt.food.fat           / 100) * fpt.amount,
            calories:      (fpt.food.calories      / 100) * fpt.amount,
        })),
    }));

    return json(mealTemplates);
};