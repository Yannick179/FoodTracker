<script lang="ts">
    import type {Food} from "../../routes/api/calorie-tracker/foods/+server";

    let {
        selectedFood = $bindable(),
        onClose,
        submit,
    }: {
        selectedFood: Food,
        onClose: () => void;
        submit: (amount: number, food: Food) => void;
    } = $props();

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
    let submitDisabled = $state(false);
    let minNumberInput = 1;
    let maxNumberInput = 10000;

    function handleNumberInput() {
        submitDisabled = amount < minNumberInput || amount > maxNumberInput;
    }

    function onKeyDown(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            if (!submitDisabled) submit(amount, selectedFood);
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
            <NumberInput onInput={handleNumberInput} max={maxNumberInput} bind:value={amount} type="number" />
            <span class="validation-text" style:visibility={submitDisabled ? "visible" : "hidden"}>
                Please enter a valid amount
            </span>
        </label>

        <div class="flex justify-end gap-2">
            <SecondaryButton onclick={onClose}>Cancel</SecondaryButton>
            <PrimaryButton disabled={submitDisabled} onclick={() => submit(amount,selectedFood)}>Submit</PrimaryButton>
        </div>
    </div>

</Modal>