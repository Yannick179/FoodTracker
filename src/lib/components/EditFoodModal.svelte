<script lang="ts">
    import {onMount, tick} from "svelte";
    import { Trash2 } from 'lucide-svelte';
    import Modal from "$lib/components/organism/Modal.svelte";
    import Header from "$lib/components/atoms/Header.svelte";
    import MacroNutrientContainer from "$lib/components/atoms/MacroNutrientContainer.svelte";
    import SecondaryButton from "$lib/components/atoms/SecondaryButton.svelte";
    import PrimaryButton from "$lib/components/atoms/PrimaryButton.svelte";
    import NumberInput from "$lib/components/atoms/NumberInput.svelte";
    import Subheading from "$lib/components/atoms/Subheading.svelte";


    let caloriesPer100 = $state(0);
    let proteinPer100 = $state(0);
    let carbohydratesPer100 = $state(0);
    let fatPer100 = $state(0);
    let saveDisabled = $state(false);
    let maxNumberInput = 10000;
    let minNumberInput = 1;

    let {
        amount = $bindable(),
        name,
        foodId,
        onCancel,
        onDelete,
        onSave,
    }: {
        amount: number,
        name: string,
        foodId: number,
        onCancel: () => void;
        onDelete: () => void;
        onSave: () => void;
    } = $props();

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

    function handleNumberInput() {
        saveDisabled = amount < minNumberInput || amount > maxNumberInput;
    }

    onMount(() => {
        fetchFoodInformation(foodId)
        });

    function onKeyDown(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            if (!saveDisabled) onSave();
        }
        if (e.key === 'Escape') {
            onCancel();
        }
    }
</script>

<svelte:window onkeydown={onKeyDown} />


<Modal>
    <div class="flex flex-col gap-6">

        <div class="grid grid-cols-3 items-center">

            <div></div>

            <Header text="Editing Entry"/>


            <div class="flex justify-end">
                <button onclick={onDelete}
                        class=" cursor-pointer p-2 rounded-xl hover:bg-light-accent-darker1 transition">
                    <Trash2 class="w-5 h-5 transition-transform duration-150 group-hover:scale-110" />
                </button>
            </div>

        </div>

        <div>
            <Header text={name} />
            <Subheading text="Nutrition per amount"/>
        </div>


        <div class="grid grid-cols-4 gap-4">
            <MacroNutrientContainer header="Calories" text={Math.trunc(caloriesPer100 * amount/100)}/>
            <MacroNutrientContainer header="Protein" text="{Math.trunc(proteinPer100 * amount/100)}g"/>
            <MacroNutrientContainer header="Carbohydrates" text="{Math.trunc(carbohydratesPer100 * amount/100)}g"/>
            <MacroNutrientContainer header="Fat" text="{Math.trunc(fatPer100 * amount/100)}g"/>
        </div>
        <label class="grid grid-rows">
            <Subheading text="Amount (g)"/>
            <NumberInput bind:value={amount} max={maxNumberInput} type="number" onInput={handleNumberInput}/>
            <span class="validation-text" style:visibility={saveDisabled ? "visible" : "hidden"}>
                Please enter a valid amount
            </span>
        </label>

        <div class="flex justify-end gap-2">
            <SecondaryButton onclick={onCancel}>Cancel</SecondaryButton>
            <PrimaryButton disabled={saveDisabled} onclick={onSave}>Save</PrimaryButton>
        </div>
    </div>

</Modal>