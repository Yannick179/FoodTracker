import {json} from "@sveltejs/kit";
import { prisma } from "$lib/prisma";
import {requireUser} from "$lib/server/authHelper";

export type MealTemplateResponseDto = {
    name: string;
    id: number;
    foods: MealTemplateResponseDtoFood[];
}

export type MealTemplateResponseDtoFood = {
    name: string;
    protein: number;
    carbohydrates: number;
    fat: number,
    calories: number,
    amount: number,
}




export const GET = async ({ url, locals }) => {
    const user = requireUser(locals);

    const query = url.searchParams.get('q');
    console.log(query);

    if (query) {
        const foods = await searchMealTemplates(query);
        return json(foods);
    } else {
        const foods = await getDefaultMealTemplates();
        return json(foods);
    }
};


async function getDefaultMealTemplates() {
    // let result: MealTemplateResponseDto[] = await prisma.mealTemplate.findMany({
    //     select: {
    //         id: true,
    //         name: true,
    //         calories: true,
    //         protein: true,
    //         carbohydrates: true,
    //         fat: true,
    //     },
    //     take: 10
    // });
    //
    // return result;
    let results = await prisma.mealTemplate.findMany({
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
                        }
                    }
                }
            }
        },
        take: 10
    });

    //TODO: remove duplicate
    let mealTemplates: MealTemplateResponseDto[] = [];

    for (let result of results) {
        let mealTemplate: MealTemplateResponseDto = {
            id: result.id,
            name: result.name,
            foods: [],
        }
        for (let foodPortionTemplate of result.foodPortionTemplates) {
            let mealTemplateFood: MealTemplateResponseDtoFood = {
                amount: foodPortionTemplate.amount,
                name: foodPortionTemplate.food.name,
                protein: foodPortionTemplate.food.protein / 100 * foodPortionTemplate.amount,
                carbohydrates: foodPortionTemplate.food.carbohydrates / 100 * foodPortionTemplate.amount,
                fat: foodPortionTemplate.food.fat / 100 * foodPortionTemplate.amount,
                calories: foodPortionTemplate.food.calories / 100 * foodPortionTemplate.amount,
            }
            mealTemplate.foods.push(mealTemplateFood);
        }
        mealTemplates.push(mealTemplate);
    }
    console.log("mealtemplates");
    console.log(mealTemplates);
    return mealTemplates;
}



async function searchMealTemplates(query: string) {
    let results = await prisma.mealTemplate.findMany({
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
                        }
                    }
                }
            }
        },
        where: {
            name: {
                contains: query,
                mode: 'insensitive'
            }
        },
        take: 10
    });

    let mealTemplates: MealTemplateResponseDto[] = [];

    for (let result of results) {
        let mealTemplate: MealTemplateResponseDto = {
            id: result.id,
            name: result.name,
            foods: [],
        }
        for (let foodPortionTemplate of result.foodPortionTemplates) {
            let mealTemplateFood: MealTemplateResponseDtoFood = {
                amount: foodPortionTemplate.amount,
                name: foodPortionTemplate.food.name,
                protein: foodPortionTemplate.food.protein / 100 * foodPortionTemplate.amount,
                carbohydrates: foodPortionTemplate.food.carbohydrates / 100 * foodPortionTemplate.amount,
                fat: foodPortionTemplate.food.fat / 100 * foodPortionTemplate.amount,
                calories: foodPortionTemplate.food.calories / 100 * foodPortionTemplate.amount,
            }
            mealTemplate.foods.push(mealTemplateFood);
        }
        mealTemplates.push(mealTemplate);
    }
    console.log("mealtemplates");
    console.log(mealTemplates);
    return mealTemplates;
}
