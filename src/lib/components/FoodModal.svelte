<script lang="ts">
    export let onClose: () => void;
    export let selectedFood: any;
    import { createDate } from '$lib/dataStore.svelte';

    let amount = 100;
    const globalDate = createDate();

    async function submit() {
        if (amount > 0) {
            await fetch('/api/food/trackFood', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    foodId: selectedFood.id,
                    amount: amount,
                    date: globalDate.date
                })
            });

            onClose();
        } else {
            console.log("Please enter a valid amount of food");
        }
    }
</script>

<!-- Backdrop -->
<div class="fixed inset-0 bg-neutral-900/60 backdrop-blur-lg flex items-center justify-center z-50">

    <div class="w-full max-w-md bg-neutral-900 border rounded-2xl border-2 border border-neutral-400 shadow-2xl p-6">

        <!-- Title -->
        <h2 class="text-lg font-semibold text-zinc-100 mb-1">
            {selectedFood.name}
        </h2>
        <p class="text-xs text-zinc-500 mb-5">Nutrition per 100g</p>

        <!-- Stats -->
        <div class="grid grid-cols-2 gap-3 text-sm mb-6">
            <div class="rounded-xl  border border-zinc-800 p-3">
                <div class="text-zinc-400 text-xs">Calories</div>
                <div class="text-zinc-100 font-medium">{(selectedFood.calories * amount/100).toFixed(1)}</div>
            </div>

            <div class="rounded-xl border border-zinc-800 p-3">
                <div class="text-zinc-400 text-xs">Protein</div>
                <div class="text-zinc-100 font-medium">{(selectedFood.protein * amount/100).toFixed(1)}g</div>
            </div>

            <div class="rounded-xl border border-zinc-800 p-3">
                <div class="text-zinc-400 text-xs">Carbohydrates</div>
                <div class="text-zinc-100 font-medium">{(selectedFood.carbohydrates * amount/100).toFixed(1)}g</div>
            </div>

            <div class="rounded-xl border border-zinc-800 p-3">
                <div class="text-zinc-400 text-xs">Fats</div>
                <div class="text-zinc-100 font-medium">{(selectedFood.fat * amount/100).toFixed(1)}g</div>
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
                    on:click={onClose}
                    class="cursor-pointer px-4 py-2 rounded-xl text-sm hover:bg-zinc-700 text-zinc-200 transition"
            >
                Cancel
            </button>

            <button
                    on:click={submit}
                    class="cursor-pointer px-4 py-2 rounded-xl text-sm bg-white text-zinc-900 hover:bg-zinc-200 transition font-medium"
            >
                Add
            </button>
        </div>
    </div>
</div>