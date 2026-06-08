<script lang="ts">
    import type {Food} from "../../routes/api/calorie-tracker/foods/+server";

    export let onClose: () => void;
    export let selectedFood: Food;
    export let submit: (amount: number, food: Food) => void;
    import { createDate } from '$lib/dataStore.svelte';
    import PrimaryButton from "$lib/components/atoms/PrimaryButton.svelte";
    import SecondaryButton from "$lib/components/atoms/SecondaryButton.svelte";
    import Modal from "$lib/components/organism/Modal.svelte";
    import Header from "$lib/components/atoms/Header.svelte";
    import NumberInput from "$lib/components/atoms/NumberInput.svelte";
    import Subheading from "$lib/components/atoms/Subheading.svelte";
    import MacroNutrientContainer from "$lib/components/atoms/MacroNutrientContainer.svelte";

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


<Modal>
    <div class="flex flex-col gap-6">

        <div>
            <Header text={selectedFood.name} />
            <Subheading text="Nutrition per amount"/>
        </div>


        <div class="grid grid-cols-4 gap-4">
            <MacroNutrientContainer header="Calories" text={Math.trunc(selectedFood.calories * amount/100)}/>
            <MacroNutrientContainer header="Protein" text="{Math.trunc(selectedFood.protein * amount/100)}g"/>
            <MacroNutrientContainer header="Carbohydrates" text="{Math.trunc(selectedFood.carbohydrates * amount/100)}g"/>
            <MacroNutrientContainer header="Fat" text="{Math.trunc(selectedFood.fat * amount/100)}g"/>
        </div>
        <label class="grid grid-rows">
            <Subheading text="Amount (g)"/>
            <NumberInput bind:value={amount} type="number" />
        </label>

        <div class="flex justify-end gap-2">
            <SecondaryButton onclick={onClose}>Cancel</SecondaryButton>
            <PrimaryButton onclick={() => submit(amount,selectedFood)}>Submit</PrimaryButton>
        </div>
    </div>

</Modal>