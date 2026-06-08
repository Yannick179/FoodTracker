<script lang="ts">
    import {Trash2} from "lucide-svelte";
    import type {FoodLogDto} from "../../routes/api/calorie-tracker/meal-logs/+server";

    //TODO: make foodlog Typed as FoodLogDto
    let {
        name,
        amount,
        calories,
        protein,
        carbohydrates,
        fat,
        onClick,
        onDelete,
    }: {
        name: string;
        amount: number;
        calories: number;
        protein: number;
        carbohydrates: number;
        fat: number;
        onClick: () => void;
        onDelete: () => void;
    } = $props();

</script>



<div onclick={onClick} class="group hover:bg-light-accent-darker1 flex items-center transition-colors duration-150 ease-out hover:transition-none border-light-accent-darker1 border-t-[1px] justify-between p-3  cursor-pointer">
    <div class="flex flex-col gap-1">
        <h2 class="font-semibold text-dark-accent transition-colors">
            {name}
        </h2>
        <div class="flex items-center gap-2 text-xs font-medium text-zinc-500">
            <span class=" px-2 py-0.5 rounded text-dark-accent">{amount}g</span>
            <span>•</span>
            <span class="text-red-accent">{Math.trunc(calories)} kcal</span>
        </div>
    </div>

    <div class="flex items-center gap-4">
        <div class="flex flex-col items-center">
            <span class="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Prot</span>
            <span class="text-sm font-medium text-blue-accent">{Math.trunc(protein)}g</span>
        </div>

        <div class="h-8 w-px"></div>

        <div class="flex flex-col items-center">
            <span class="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Carb</span>
            <span class="text-sm font-medium text-orange-accent">{Math.trunc(carbohydrates)}g</span>
        </div>

        <div class="h-8 w-px"></div>

        <div class="flex flex-col items-center">
            <span class="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Fat</span>
            <span class="text-sm font-medium text-red-accent">{Math.trunc(fat)}g</span>
        </div>

        <div class="flex flex-col items-center pl-2">
<!--            TODO: refactor the hover to only hover the trash icon and not the whole listentry when trash icon hovered-->
<!--           remove e.stroppropagation and implement it correct -->
            <button  onclick={(e) => {
                e.stopPropagation();
                onDelete();
            }}
                    class="group/btn cursor-pointer p-2 rounded-xl text-zinc-400 hover:text-red-accent transition"
            >
                <Trash2 class="w-5 h-5 transition-transform duration-150" />
            </button>
        </div>
    </div>
</div>