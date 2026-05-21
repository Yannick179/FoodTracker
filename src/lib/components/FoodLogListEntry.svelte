<script lang="ts">
    import {Trash2} from "lucide-svelte";
    import type {FoodLogDto} from "../../routes/api/food/loadMealLogFromDateX/+server";

    //TODO: make foodlog Typed as FoodLogDto
    let {
        foodLog,
        onClick,
        onDelete,
    }: {
        foodLog: FoodLogDto;
        onClick: (foodLog: FoodLogDto) => void;
        onDelete: () => void;
    } = $props();

    async function deleteEntry() {
        const res = await fetch('/api/food/deleteFoodLog', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                foodLogId: foodLog.foodLogId,
            })
        });

        if (!res.ok) throw new Error('Failed to delete entry');
        onDelete();
    }

</script>



<div onclick={() => onClick(foodLog)} class="group flex items-center justify-between p-4 m-1 cursor-pointer rounded-2xl border-[2px] border-card-border bg-card transition-all duration-200">
    <div class="flex flex-col gap-1">
        <h3 class="font-semibold text-zinc-100 group-hover:text-white transition-colors">
            {foodLog.name}
        </h3>
        <div class="flex items-center gap-2 text-xs font-medium text-zinc-500">
            <span class=" px-2 py-0.5 rounded text-zinc-300">{foodLog.amount}g</span>
            <span>•</span>
            <span class="text-zinc-400">{foodLog.calories} kcal</span>
        </div>
    </div>

    <div class="flex items-center gap-4">
        <div class="flex flex-col items-center">
            <span class="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Prot</span>
            <span class="text-sm font-medium text-blue-400">{foodLog.protein}g</span>
        </div>

        <div class="h-8 w-px"></div>

        <div class="flex flex-col items-center">
            <span class="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Carb</span>
            <span class="text-sm font-medium text-amber-400">{foodLog.carbohydrates}g</span>
        </div>

        <div class="h-8 w-px"></div>

        <div class="flex flex-col items-center">
            <span class="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Fat</span>
            <span class="text-sm font-medium text-rose-400">{foodLog.fat}g</span>
        </div>

        <div class="flex flex-col items-center pl-2">
<!--            TODO: refactor the hover to only hover the trash icon and not the whole listentry when trash icon hovered-->
<!--           remove e.stroppropagation and implement it correct -->
            <button  onclick={(e) => {
                e.stopPropagation();
                deleteEntry();
            }}
                    class="group/btn cursor-pointer p-2 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-zinc-700 transition"
            >
                <Trash2 class="w-5 h-5 transition-transform duration-150" />
            </button>
        </div>
    </div>
</div>