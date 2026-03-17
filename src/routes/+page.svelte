<script lang="ts">
    import Calendar from '$lib/components/Calendar.svelte';
    import {onMount, tick} from "svelte";

    let foodEntries: any[] = [];
    let error = '';
    let loadingFoodEntries = false;
    let selectedDate = new Date();

    async function LoadFoodEntriesFromDateX(selectedDate: Date) {
        try {
            loadingFoodEntries = true;
            const res = await fetch(`/api/loadFoodEntriesFromDateX?date=${encodeURIComponent(selectedDate)}`);

            if (!res.ok) {
                throw new Error('failed to fetch food entries');
            }

            foodEntries = await res.json();
        } catch (err: any) {
            error = err.message;
        } finally {
            loadingFoodEntries = false;
        }
    }

    $: console.log("Homepage: selected Data:" + selectedDate);
    $: if (selectedDate) {
        LoadFoodEntriesFromDateX(selectedDate);
    }
    onMount(() => {
        LoadFoodEntriesFromDateX(selectedDate);
    });
</script>

<Calendar bind:selectedDate />
<p class="mt-4">
    Selected:
    {selectedDate.toDateString()}
</p>

<h1>Hello (User)</h1>
<div>today is xyz</div>
<div>insert chart with stats</div>
<div>stats for today:</div>
<div>calories: placeholder</div>
<div>Protein: placeholder</div>
<div>Carbohydrates: placeholder</div>
<div>Fats: placeholder</div>

{#if loadingFoodEntries}
    <p>Loading food entries...</p>
{:else}
    <h1>Foodlist of {selectedDate.toDateString()}:</h1>
    <ul>
        {#each foodEntries as foodEntry}
            <li>
                <div class="grid">
                    <div class="item">Name: {foodEntry.name}</div>
                    <div class="item">Amount: {foodEntry.amount}</div>
                    <div class="item">Calories: {foodEntry.calories}</div>
                    <div class="item">Protein: {foodEntry.protein}</div>
                    <div class="item">Carbohydrates: {foodEntry.carbs}</div>
                    <div class="item">Fats: {foodEntry.fat}</div>
                </div>
            </li>
        {/each}
    </ul>
{/if}