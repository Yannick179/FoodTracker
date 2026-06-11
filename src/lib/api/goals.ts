import type {MacroGoalResponseDto} from "../../routes/api/calorie-tracker/goals/[date]/+server";


export async function getMacroGoal(fetch: typeof window.fetch, date: string): Promise<MacroGoalResponseDto> {

    const res = await fetch(`/api/calorie-tracker/goals/${date}`);
    if (!res.ok) throw new Error('failed to fetch macro goal');
    return res.json();


}