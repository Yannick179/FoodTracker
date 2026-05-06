<script lang="ts">
    let {
        name = "Unknown Food",
        amount = 0,
        calories = 0,
        protein = 0,
        carbohydrates = 0,
        fats = 0
    } = $props();
</script>

<div class="group flex items-center justify-between p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all duration-200 w-full">
    <div class="flex flex-col gap-1">
        <h3 class="font-semibold text-zinc-100 group-hover:text-white transition-colors">
            {name}
        </h3>
        <div class="flex items-center gap-2 text-xs font-medium text-zinc-500">
            <span class=" px-2 py-0.5 rounded text-zinc-300">{amount}g</span>
            <span>•</span>
            <span class="text-zinc-400">{calories} kcal</span>
        </div>
    </div>

    <div class="flex items-center gap-4">
        <div class="flex flex-col items-center">
            <span class="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Prot</span>
            <span class="text-sm font-medium text-blue-400">{protein}g</span>
        </div>

        <div class="h-8 w-px"></div>

        <div class="flex flex-col items-center">
            <span class="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Carb</span>
            <span class="text-sm font-medium text-amber-400">{carbohydrates}g</span>
        </div>

        <div class="h-8 w-px"></div>

        <div class="flex flex-col items-center">
            <span class="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Fat</span>
            <span class="text-sm font-medium text-rose-400">{fats}g</span>
        </div>
    </div>
</div>