<script lang="ts">
    import {onMount, tick} from "svelte";
    import { Trash2 } from 'lucide-svelte';
    import type {FoodLogDto} from "../../routes/api/calorie-tracker/meal-logs/+server";
    import Modal from "$lib/components/organism/Modal.svelte";
    import Header from "$lib/components/atoms/Header.svelte";
    import MacroNutrientContainer from "$lib/components/atoms/MacroNutrientContainer.svelte";
    import SecondaryButton from "$lib/components/atoms/SecondaryButton.svelte";
    import PrimaryButton from "$lib/components/atoms/PrimaryButton.svelte";
    import Input from "$lib/components/atoms/Input.svelte";
    import Subheading from "$lib/components/atoms/Subheading.svelte";


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
<!--<Modal>-->
<!--    <div class="grid grid-cols-3 items-center mb-4">-->

<!--        &lt;!&ndash; left spacer (keeps title centered) &ndash;&gt;-->
<!--        <div></div>-->

<!--        &lt;!&ndash; centered title &ndash;&gt;-->
<!--        <h2 class="text-xl font-semibold  text-center">-->
<!--            Editing Entry-->
<!--        </h2>-->

<!--        &lt;!&ndash; right action &ndash;&gt;-->
<!--        <div class="flex justify-end">-->
<!--            <button onclick={deleteEntry}-->
<!--                    class=" cursor-pointer p-2 rounded-xl  hover:text-red-400 hover:bg-zinc-800 transition"-->
<!--            >-->
<!--                <Trash2 class="-->
<!--                    w-5 h-5 transition-transform duration-150 group-hover:scale-110" />-->
<!--            </button>-->
<!--        </div>-->

<!--    </div>-->

<!--    &lt;!&ndash; Title &ndash;&gt;-->
<!--    <h3 class="text-lg font-semibold  mb-1">-->
<!--        {editableFood.name}-->
<!--    </h3>-->
<!--    <p class="text-xs text-zinc-500 mb-5">Nutrition per 100g</p>-->

<!--    &lt;!&ndash; Stats &ndash;&gt;-->
<!--    <div class="grid grid-cols-2 gap-3 text-sm mb-6">-->
<!--        <div class="rounded-xl  border border-zinc-800 p-3">-->
<!--            <h4 class=" text-xs">Calories</h4>-->
<!--            <span class=" font-medium">{(caloriesPer100 * editableFood.amount/100).toFixed(1)} kcal</span>-->
<!--        </div>-->

<!--        <div class="rounded-xl border border-zinc-800 p-3">-->
<!--            <h4 class=" text-xs">Protein</h4>-->
<!--            <span class=" font-medium">{(proteinPer100 * editableFood.amount/100).toFixed(1)}g</span>-->
<!--        </div>-->

<!--        <div class="rounded-xl border border-zinc-800 p-3">-->
<!--            <h4 class=" text-xs">Carbohydrates</h4>-->
<!--            <span class=" font-medium">{(carbohydratesPer100 * editableFood.amount/100).toFixed(1)}g</span>-->
<!--        </div>-->

<!--        <div class="rounded-xl border border-zinc-800 p-3">-->
<!--            <h4 class=" text-xs">Fats</h4>-->
<!--            <span class=" font-medium">{(fatPer100 * editableFood.amount/100).toFixed(1)}g</span>-->
<!--        </div>-->
<!--    </div>-->

<!--    &lt;!&ndash; Input &ndash;&gt;-->
<!--    <label class="block mb-5">-->
<!--        <span class="text-xs ">Amount (g)</span>-->
<!--        <input-->
<!--                type="number"-->
<!--                bind:value={editableFood.amount}-->
<!--                class="mt-1 w-full rounded-xl border border-zinc-700 px-3 py-2-->
<!--				focus:outline-none focus:ring-2 focus:ring-zinc-500/50"-->
<!--        />-->
<!--    </label>-->

<!--    &lt;!&ndash; Buttons &ndash;&gt;-->
<!--    <div class="flex justify-end gap-2">-->
<!--        <button-->
<!--                onclick={onClose}-->
<!--                class="cursor-pointer px-4 py-2 rounded-xl text-sm hover:bg-zinc-700  transition"-->
<!--        >-->
<!--            Cancel-->
<!--        </button>-->

<!--        <button-->
<!--                onclick={submitChange}-->
<!--                class="cursor-pointer px-4 py-2 rounded-xl text-sm bg-white  hover:bg-zinc-200 transition font-medium">-->
<!--            Save-->
<!--        </button>-->
<!--    </div>-->
<!--</Modal>-->


<Modal>
    <div class="flex flex-col gap-6">

        <div class="grid grid-cols-3 items-center">

            <div></div>

            <Header text="Editing Entry"/>


            <div class="flex justify-end">
                <button onclick={deleteEntry}
                        class=" cursor-pointer p-2 rounded-xl hover:bg-light-accent-darker1 transition">
                    <Trash2 class="w-5 h-5 transition-transform duration-150 group-hover:scale-110" />
                </button>
            </div>

        </div>

        <div>
            <Header text={editableFood.name} />
            <Subheading text="Nutrition per amount"/>
        </div>


        <div class="grid grid-cols-4 gap-4">
            <MacroNutrientContainer header="Calories" amount="{(caloriesPer100 * editableFood.amount/100).toFixed(0)}"/>
            <MacroNutrientContainer header="Protein" amount="{(proteinPer100 * editableFood.amount/100).toFixed(0)}g"/>
            <MacroNutrientContainer header="Carbohydrates" amount="{(carbohydratesPer100 * editableFood.amount/100).toFixed(0)}g"/>
            <MacroNutrientContainer header="Fat" amount="{(fatPer100 * editableFood.amount/100).toFixed(0)}g"/>
        </div>
        <label class="grid grid-rows">
            <Subheading text="Amount (g)"/>
            <Input bind:value={editableFood.amount} type="number" />
        </label>

        <div class="flex justify-end gap-2">
            <SecondaryButton onclick={onClose}>Cancel</SecondaryButton>
            <PrimaryButton onclick={submitChange}>Save</PrimaryButton>
        </div>
    </div>

</Modal>