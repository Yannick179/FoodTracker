<script lang="ts">
    import { onMount } from 'svelte';

    let name = '';
    let calories: number | '' = '';
    let fats: number | '' = '';
    let protein: number | '' = '';
    let carbs: number | '' = '';

    let loading = false;
    let error = '';
    let success = false;

    async function submitFood() {
        loading = true;
        error = '';
        success = false;

        const res = await fetch('/api/addfood', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                calories: Number(calories),
                fats: Number(fats),
                protein: Number(protein),
                carbs: Number(carbs)
            })
        });

        if (!res.ok) {
            error = 'Failed to save meal';
        } else {
            success = true;
            name = calories = fats = protein = carbs = '';
        }

        loading = false;
    }

    onMount(() => {});
</script>

<h1>Tracker</h1>

<form on:submit|preventDefault={submitFood}>
    <label>
        Food name
        <input bind:value={name} required />
    </label>

    <label>
        Calories
        <input type="number" bind:value={calories} required />
    </label>

    <label>
        Protein (g)
        <input type="number" bind:value={protein} required />
    </label>

    <label>
        Carbs (g)
        <input type="number" bind:value={carbs} required />
    </label>

    <label>
        Fats (g)
        <input type="number" bind:value={fats} required />
    </label>

    <button disabled={loading}>
        {loading ? 'Saving…' : 'Add Meal'}
    </button>
</form>

{#if error}
    <p style="color:red">{error}</p>
{/if}

{#if success}
    <p style="color:green">Meal saved ✔</p>
{/if}

<style>
    form {
        max-width: 400px;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    label {
        display: flex;
        flex-direction: column;
    }
</style>
