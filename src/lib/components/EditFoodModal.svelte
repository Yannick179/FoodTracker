<script lang="ts">
    import {onMount, tick} from "svelte";
    import { Trash2 } from 'lucide-svelte';
    import type {FoodLogDto} from "../../routes/api/calorie-tracker/meal-logs/+server";
    import Modal from "$lib/components/organism/Modal.svelte";


    let caloriesPer100 = $state(0);
    let proteinPer100 = $state(0);
    let carbohydratesPer100 = $state(0);
    let fatPer100 = $state(0);

    //TODO: implement more elegant solution that
    function cloneFoodEntry(food: FoodLogDto): FoodLogDto {
        return {
            foodLogId: food.foodLogId,
            foodId: food.foodId,
            name: food.name,
            amount: food.amount,
            eatenAt: new Date(food.eatenAt),
            calories: food.calories,
            protein: food.protein,
            carbohydrates: food.carbohydrates,
            fat: food.fat
        };
    }

    let {
        selectedFoodLog = $bindable(),
        onClose
    }: {
        selectedFoodLog: FoodLogDto;
        onClose: () => void;
    } = $props();

    let editableFood: FoodLogDto = $state({
        foodId: 0,
        foodLogId: 0,
        name: '',
        amount: 0,
        eatenAt: new Date(),
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0
    });

    $effect(() => {
        if (selectedFoodLog) {
            editableFood = cloneFoodEntry(selectedFoodLog);
        }
    });

    //TODO: CHANGE THIS TO REFLECT USEFULL STUFF
    async function submitChange() {
        if (editableFood.amount > 0) {
            const res = await fetch(`/api/calorie-tracker/food-logs/${editableFood.foodLogId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: editableFood.amount,
                })
            });

            if (!res.ok) throw new Error('Failed to update food log');
            onClose();
        }
    }

    async function deleteEntry() {
        const res = await fetch(`/api/calorie-tracker/food-logs/${editableFood.foodLogId}`, {
            method: 'DELETE',
        });

        if (!res.ok) throw new Error('Failed to delete entry');

        onClose();
    }

    async function fetchFoodInformation(id: number) {
        const res = await fetch(`/api/calorie-tracker/foods/${id}`);
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
        fetchFoodInformation(editableFood.foodId)
        });

    function onKeyDown(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            submitChange();
        }
        if (e.key === 'Escape') {
            onClose();
        }
    }
</script>

<svelte:window onkeydown={onKeyDown} />


<!-- Backdrop -->
<Modal>
    <div class="grid grid-cols-3 items-center mb-4">

        <!-- left spacer (keeps title centered) -->
        <div></div>

        <!-- centered title -->
        <h2 class="text-xl font-semibold  text-center">
            Editing Entry
        </h2>

        <!-- right action -->
        <div class="flex justify-end">
            <button onclick={deleteEntry}
                    class=" cursor-pointer p-2 rounded-xl  hover:text-red-400 hover:bg-zinc-800 transition"
            >
                <Trash2 class="
                    w-5 h-5 transition-transform duration-150 group-hover:scale-110" />
            </button>
        </div>

    </div>

    <!-- Title -->
    <h3 class="text-lg font-semibold  mb-1">
        {editableFood.name}
    </h3>
    <p class="text-xs text-zinc-500 mb-5">Nutrition per 100g</p>

    <!-- Stats -->
    <div class="grid grid-cols-2 gap-3 text-sm mb-6">
        <div class="rounded-xl  border border-zinc-800 p-3">
            <h4 class=" text-xs">Calories</h4>
            <span class=" font-medium">{(caloriesPer100 * editableFood.amount/100).toFixed(1)} kcal</span>
        </div>

        <div class="rounded-xl border border-zinc-800 p-3">
            <h4 class=" text-xs">Protein</h4>
            <span class=" font-medium">{(proteinPer100 * editableFood.amount/100).toFixed(1)}g</span>
        </div>

        <div class="rounded-xl border border-zinc-800 p-3">
            <h4 class=" text-xs">Carbohydrates</h4>
            <span class=" font-medium">{(carbohydratesPer100 * editableFood.amount/100).toFixed(1)}g</span>
        </div>

        <div class="rounded-xl border border-zinc-800 p-3">
            <h4 class=" text-xs">Fats</h4>
            <span class=" font-medium">{(fatPer100 * editableFood.amount/100).toFixed(1)}g</span>
        </div>
    </div>

    <!-- Input -->
    <label class="block mb-5">
        <span class="text-xs ">Amount (g)</span>
        <input
                type="number"
                bind:value={editableFood.amount}
                class="mt-1 w-full rounded-xl border border-zinc-700 px-3 py-2
				focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
        />
    </label>

    <!-- Buttons -->
    <div class="flex justify-end gap-2">
        <button
                onclick={onClose}
                class="cursor-pointer px-4 py-2 rounded-xl text-sm hover:bg-zinc-700  transition"
        >
            Cancel
        </button>

        <button
                onclick={submitChange}
                class="cursor-pointer px-4 py-2 rounded-xl text-sm bg-white  hover:bg-zinc-200 transition font-medium">
            Save
        </button>
    </div>
</Modal>
<!--<div class="fixed inset-0 bg-background/60 backdrop-blur-lg flex items-center justify-center z-200">-->

<!--    <div class="w-full max-w-md bg-background border rounded-2xl border-2 border border-neutral-400 shadow-2xl p-6">-->

<!--        <div class="grid grid-cols-3 items-center mb-4">-->

<!--            &lt;!&ndash; left spacer (keeps title centered) &ndash;&gt;-->
<!--            <div></div>-->

<!--            &lt;!&ndash; centered title &ndash;&gt;-->
<!--            <h2 class="text-xl font-semibold text-zinc-100 text-center">-->
<!--                Editing Entry-->
<!--            </h2>-->

<!--            &lt;!&ndash; right action &ndash;&gt;-->
<!--            <div class="flex justify-end">-->
<!--                <button onclick={deleteEntry}-->
<!--                        class=" cursor-pointer p-2 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition"-->
<!--                >-->
<!--                    <Trash2 class="-->
<!--                    w-5 h-5 transition-transform duration-150 group-hover:scale-110" />-->
<!--                </button>-->
<!--            </div>-->

<!--        </div>-->

<!--        &lt;!&ndash; Title &ndash;&gt;-->
<!--        <h3 class="text-lg font-semibold text-zinc-100 mb-1">-->
<!--            {editableFood.name}-->
<!--        </h3>-->
<!--        <p class="text-xs text-zinc-500 mb-5">Nutrition per 100g</p>-->

<!--        &lt;!&ndash; Stats &ndash;&gt;-->
<!--        <div class="grid grid-cols-2 gap-3 text-sm mb-6">-->
<!--            <div class="rounded-xl  border border-zinc-800 p-3">-->
<!--                <h4 class="text-zinc-400 text-xs">Calories</h4>-->
<!--                <span class="text-zinc-100 font-medium">{(caloriesPer100 * editableFood.amount/100).toFixed(1)} kcal</span>-->
<!--            </div>-->

<!--            <div class="rounded-xl border border-zinc-800 p-3">-->
<!--                <h4 class="text-zinc-400 text-xs">Protein</h4>-->
<!--                <span class="text-zinc-100 font-medium">{(proteinPer100 * editableFood.amount/100).toFixed(1)}g</span>-->
<!--            </div>-->

<!--            <div class="rounded-xl border border-zinc-800 p-3">-->
<!--                <h4 class="text-zinc-400 text-xs">Carbohydrates</h4>-->
<!--                <span class="text-zinc-100 font-medium">{(carbohydratesPer100 * editableFood.amount/100).toFixed(1)}g</span>-->
<!--            </div>-->

<!--            <div class="rounded-xl border border-zinc-800 p-3">-->
<!--                <h4 class="text-zinc-400 text-xs">Fats</h4>-->
<!--                <span class="text-zinc-100 font-medium">{(fatPer100 * editableFood.amount/100).toFixed(1)}g</span>-->
<!--            </div>-->
<!--        </div>-->

<!--        &lt;!&ndash; Input &ndash;&gt;-->
<!--        <label class="block mb-5">-->
<!--            <span class="text-xs text-zinc-400">Amount (g)</span>-->
<!--            <input-->
<!--                    type="number"-->
<!--                    bind:value={editableFood.amount}-->
<!--                    class="mt-1 w-full rounded-xl border border-zinc-700 px-3 py-2 text-zinc-100-->
<!--				focus:outline-none focus:ring-2 focus:ring-zinc-500/50"-->
<!--            />-->
<!--        </label>-->

<!--        &lt;!&ndash; Buttons &ndash;&gt;-->
<!--        <div class="flex justify-end gap-2">-->
<!--            <button-->
<!--                    onclick={onClose}-->
<!--                    class="cursor-pointer px-4 py-2 rounded-xl text-sm hover:bg-zinc-700 text-zinc-200 transition"-->
<!--            >-->
<!--                Cancel-->
<!--            </button>-->

<!--            <button-->
<!--                    onclick={submitChange}-->
<!--                    class="cursor-pointer px-4 py-2 rounded-xl text-sm bg-white text-zinc-900 hover:bg-zinc-200 transition font-medium">-->
<!--                Save-->
<!--            </button>-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->