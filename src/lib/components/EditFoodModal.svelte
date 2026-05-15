<script lang="ts">
    import {onMount, tick} from "svelte";
    let caloriesPer100 = $state(0);
    let proteinPer100 = $state(0);
    let carbohydratesPer100 = $state(0);
    let fatPer100 = $state(0);
    import { Trash2 } from 'lucide-svelte';


    let {
        selectedFood,
        onClose,
    } = $props();
    import { createDate } from '$lib/dataStore.svelte';

    let amount = 0;
    const globalDate = createDate();
    //TODO: CHANGE THIS TO REFLECT USEFULL STUFF
    async function submit() {
        // if (amount > 0) {
        //     await fetch('/api/food/trackFood', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({
        //             foodId: selectedFood.id,
        //             amount: amount,
        //             userid: 1,
        //             date: globalDate.date
        //         })
        //     });
        //
        //     onClose();
        // } else {
        //     console.log("Please enter a valid amount of food");
        // }
    }
    async function fetchFoodInformation(id: number) {
        const res = await fetch(`/api/food/getFoodInformationById/${id}`);
        if (!res.ok) {
            throw new Error('failed to fetch food information');
        }
        let resJson = await res.json();

        caloriesPer100 = resJson.calories;
        proteinPer100 = resJson.protein;
        carbohydratesPer100 = resJson.carbohydrates;
        fatPer100 = resJson.fat;
    }

    onMount(() => {
        console.log(selectedFood);
        fetchFoodInformation(selectedFood.id)
        });

</script>

<!-- Backdrop -->
<div class="fixed inset-0 bg-neutral-900/60 backdrop-blur-lg flex items-center justify-center z-50">

    <div class="w-full max-w-md bg-neutral-900 border rounded-2xl border-2 border border-neutral-400 shadow-2xl p-6">

        <div class="grid grid-cols-3 items-center mb-4">

            <!-- left spacer (keeps title centered) -->
            <div></div>

            <!-- centered title -->
            <div class="text-xl font-semibold text-zinc-100 text-center">
                Editing Entry
            </div>

            <!-- right action -->
            <div class="flex justify-end">
                <button
                        class=" cursor-pointer p-2 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition"
                >
                    <Trash2 class="
                    w-5 h-5 transition-transform duration-150 group-hover:scale-110" />
                </button>
            </div>

        </div>

        <!-- Title -->
        <h2 class="text-lg font-semibold text-zinc-100 mb-1">
            {selectedFood.name}
        </h2>
        <p class="text-xs text-zinc-500 mb-5">Nutrition per 100g</p>

        <!-- Stats -->
        <div class="grid grid-cols-2 gap-3 text-sm mb-6">
            <div class="rounded-xl  border border-zinc-800 p-3">
                <div class="text-zinc-400 text-xs">Calories</div>
                <div class="text-zinc-100 font-medium">{(caloriesPer100 * selectedFood.amount/100).toFixed(1)} kcal</div>
            </div>

            <div class="rounded-xl border border-zinc-800 p-3">
                <div class="text-zinc-400 text-xs">Protein</div>
                <div class="text-zinc-100 font-medium">{(proteinPer100 * selectedFood.amount/100).toFixed(1)}g</div>
            </div>

            <div class="rounded-xl border border-zinc-800 p-3">
                <div class="text-zinc-400 text-xs">Carbohydrates</div>
                <div class="text-zinc-100 font-medium">{(carbohydratesPer100 * selectedFood.amount/100).toFixed(1)}g</div>
            </div>

            <div class="rounded-xl border border-zinc-800 p-3">
                <div class="text-zinc-400 text-xs">Fats</div>
                <div class="text-zinc-100 font-medium">{(fatPer100 * selectedFood.amount/100).toFixed(1)}g</div>
            </div>
        </div>

        <!-- Input -->
        <label class="block mb-5">
            <span class="text-xs text-zinc-400">Amount (g)</span>
            <input
                    type="number"
                    bind:value={selectedFood.amount}
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
                    onclick={submit}
                    class="cursor-pointer px-4 py-2 rounded-xl text-sm bg-white text-zinc-900 hover:bg-zinc-200 transition font-medium"
            >
                Save
            </button>
        </div>
    </div>
</div>