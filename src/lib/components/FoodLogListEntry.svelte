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



<div onclick={() => onClick(foodLog)} class="group hover:bg-light-accent-darker1 flex items-center transition-colors duration-150 ease-out hover:transition-none border-light-accent-darker1 border-t-[1px] justify-between p-3  cursor-pointer">
    <div class="flex flex-col gap-1">
        <h2 class="font-semibold text-dark-accent transition-colors">
            {foodLog.name}
        </h2>
        <div class="flex items-center gap-2 text-xs font-medium text-zinc-500">
            <span class=" px-2 py-0.5 rounded text-dark-accent">{foodLog.amount}g</span>
            <span>•</span>
            <span class="text-red-accent">{foodLog.calories} kcal</span>
        </div>
    </div>

    <div class="flex items-center gap-4">
        <div class="flex flex-col items-center">
            <span class="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Prot</span>
            <span class="text-sm font-medium text-blue-accent">{foodLog.protein}g</span>
        </div>

        <div class="h-8 w-px"></div>

        <div class="flex flex-col items-center">
            <span class="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Carb</span>
            <span class="text-sm font-medium text-orange-accent">{foodLog.carbohydrates}g</span>
        </div>

        <div class="h-8 w-px"></div>

        <div class="flex flex-col items-center">
            <span class="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Fat</span>
            <span class="text-sm font-medium text-red-accent">{foodLog.fat}g</span>
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