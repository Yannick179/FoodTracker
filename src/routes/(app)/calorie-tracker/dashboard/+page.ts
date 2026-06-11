import {getMealLogs} from "$lib/api/mealLog";
import {formatDateToUrl} from "$lib/utils";
import {getMacroGoal} from "$lib/api/goals";
import {redirect} from "@sveltejs/kit";

export async function load({ fetch, depends, url }) {
    const param = url.searchParams.get('date');

    // No (or invalid) date in the URL → canonicalize to today and reflect it in the URL.
    // redirect() is the server- and client-safe way to navigate from load (goto is not).
    if (!param || isNaN(new Date(param).getTime())) {
        throw redirect(307, `${url.pathname}?date=${formatDateToUrl(new Date())}`);
    }

    depends('calorie-tracker:mealLogs');
    depends('calorie-tracker:macroGoal');

    return {
        mealLogs: await getMealLogs(fetch, param),
        macroGoal: await getMacroGoal(fetch, param),
    };
}