import type {Food} from "../../routes/api/calorie-tracker/foods/+server";


export async function searchFoods(query: string): Promise<Food[]> {
    let foods: Food[] = [];

    try {
        const res = await fetch(`/api/calorie-tracker/foods?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error('Failed to fetch foods');
        foods = await res.json();
        return foods;
    } catch (err: any) {
        console.log("searchFoods failed:", err);
        return [];
    }
}
