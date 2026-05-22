<script lang="ts">
    import type {Food} from "../../routes/api/food/searchFood/+server";

    export let onClose: () => void;
    export let selectedFood: Food;
    export let submit: (amount: number, food: Food) => void;
    import { createDate } from '$lib/dataStore.svelte';

    let amount = 100;
    const globalDate = createDate();

    function onKeyDown(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            submit(amount, selectedFood);
        }
        if (e.key === 'Escape') {
            onClose();
        }
    }
</script>

<svelte:window onkeydown={onKeyDown} />


<!-- Backdrop -->
<div class="fixed inset-0 bg-background/60 backdrop-blur-lg flex items-center justify-center z-50">

    <div class="w-full max-w-md bg-background border rounded-2xl border-2 border border-neutral-400 shadow-2xl p-6">

        <!-- Title -->
        <h2 class="text-lg font-semibold text-zinc-100 mb-1">
            {selectedFood.name}
        </h2>
        <span class="text-xs text-zinc-500 mb-5">Nutrition per 100g</span>

        <!-- Stats -->
        <div class="grid grid-cols-2 gap-3 text-sm mb-6">
            <div class="rounded-xl  border border-zinc-800 p-3">
                <h3 class="text-zinc-400 text-xs">Calories</h3>
                <span class="text-zinc-100 font-medium">{(selectedFood.calories * amount/100).toFixed(1)}</span>
            </div>

            <div class="rounded-xl border border-zinc-800 p-3">
                <h3 class="text-zinc-400 text-xs">Protein</h3>
                <span class="text-zinc-100 font-medium">{(selectedFood.protein * amount/100).toFixed(1)}g</span>
            </div>

            <div class="rounded-xl border border-zinc-800 p-3">
                <h3 class="text-zinc-400 text-xs">Carbohydrates</h3>
                <span class="text-zinc-100 font-medium">{(selectedFood.carbohydrates * amount/100).toFixed(1)}g</span>
            </div>

            <div class="rounded-xl border border-zinc-800 p-3">
                <h3 class="text-zinc-400 text-xs">Fats</h3>
                <span class="text-zinc-100 font-medium">{(selectedFood.fat * amount/100).toFixed(1)}g</span>
            </div>
        </div>

        <!-- Input -->
        <label class="block mb-5">
            <span class="text-xs text-zinc-400">Amount (g)</span>
            <input
                    type="number"
                    bind:value={amount}
                    class="mt-1 w-full rounded-xl border border-zinc-700 px-3 py-2 text-zinc-100
				focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
            />
        </label>

        <!-- Buttons -->
        <div class="flex justify-end gap-2">
            <button
                    onclick={onClose}
                    class="cursor-pointer px-4 py-2 rounded-xl text-sm hover:bg-zinc-700 text-zinc-200 transition"
            >
                Cancel
            </button>

            <button
                    onclick={() => submit(amount, selectedFood)}
                    class="cursor-pointer px-4 py-2 rounded-xl text-sm bg-white text-zinc-900 hover:bg-zinc-200 transition font-medium"
            >
                Add
            </button>
        </div>
    </div>
</div>