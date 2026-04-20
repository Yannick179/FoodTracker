<script lang="ts">
    import { onMount } from 'svelte';

    let name = '';
    let calories: number = 0;
    let fats: number = 0;
    let protein: number = 0;
    let carbs: number = 0;

    let loading = false;
    let error = '';
    let success = false;

    async function submitFood() {
        loading = true;
        error = '';
        success = false;

        const res = await fetch('/api/addFood', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                Calories: Number(calories),
                Protein: Number(protein),
                Carbohydrates: Number(carbs),
                Fat: Number(fats)
            })
        });

        if (!res.ok) {
            error = 'Failed to save meal';
        } else {
            success = true;
            name = "";
            calories = fats = protein = carbs = 0;
        }

        loading = false;
    }

    onMount(() => {});
</script>

<div class="min-h-screen flex items-center justify-center p-4">

    <div class="w-full max-w-md border rounded-lg p-4 space-y-4">

        <h1 class="text-xl font-medium">Tracker</h1>

        <form on:submit|preventDefault={submitFood} class="space-y-3">

            <div class="space-y-1">
                <label>Food name</label>
                <input class="w-full border px-2 py-1 rounded" bind:value={name} required />
            </div>

            <div class="space-y-1">
                <label>Calories</label>
                <input type="number" class="w-full border px-2 py-1 rounded" bind:value={calories} required />
            </div>

            <div class="space-y-1">
                <label>Protein (g)</label>
                <input type="number" class="w-full border px-2 py-1 rounded" bind:value={protein} required />
            </div>

            <div class="space-y-1">
                <label>Carbs (g)</label>
                <input type="number" class="w-full border px-2 py-1 rounded" bind:value={carbs} required />
            </div>

            <div class="space-y-1">
                <label>Fats (g)</label>
                <input type="number" class="w-full border px-2 py-1 rounded" bind:value={fats} required />
            </div>

            <button class="w-full border rounded py-1" disabled={loading}>
                {loading ? 'Saving…' : 'Add Meal'}
            </button>

        </form>

        {#if error}
            <p>{error}</p>
        {/if}

        {#if success}
            <p>Meal saved ✔</p>
        {/if}

    </div>
</div>
