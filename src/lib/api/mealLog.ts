import type {Food} from "../../routes/api/calorie-tracker/foods/+server";
import type {FoodLogInput} from "../../routes/api/calorie-tracker/meal-logs/+server";



export async function postMealLog(foodLogs: FoodLogInput[], date: Date) {
    if (!foodLogs.every((foodLog) => foodLog.amount > 0)) {
        throw new Error("Failed to track meal log because an amount must be greater than 0");
    }


    const res = await fetch('/api/calorie-tracker/meal-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            date: date,
            foodLogs: foodLogs,
        })
    });

    if (!res.ok) throw new Error('Failed to track meal log');
    // } else {
    //     console.log("Please enter a valid amount of food");
    // }
}