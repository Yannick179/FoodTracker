<script lang="ts">
    import { onMount } from 'svelte';
    import FoodModal from "$lib/components/FoodModal.svelte";

    let foods: any[] = [];
    let query = '';
    let loading = false;
    let error = '';
    let selectedFood: any = null;
    let showModal = false;

    async function loadFoods(q: string = '') {
        loading = true;
        error = '';
        try {
            const url = q ? `/api/searchfood?q=${encodeURIComponent(q)}` : '/api/searchfood';
            const res = await fetch(url);
            if (!res.ok) throw new Error('Failed to fetch foods');
            foods = await res.json();
        } catch (err: any) {
            error = err.message;
        }
        loading = false;
    }

    function open(food: any) {
        selectedFood = food;
        showModal = true;
    }

    function close() {
        showModal = false;
        selectedFood = null;
        loadFoods(); // refresh after submit
    }

    onMount(() => loadFoods());

    const handleSearch = (q: string) => {
        loadFoods(q);
    };
</script>

<label>
    Search foods:
    <input
            type="text"
            bind:value={query}
            placeholder="Type to search…"
            on:input={() => handleSearch(query)}
    />
</label>

{#if loading}
    <p>Loading…</p>
{:else if error}
    <p style="color:red">{error}</p>
{:else if foods.length === 0}
    <p>No foods found.</p>
{:else}
    <ul>
        {#each foods as food}
            <li>
                <button on:click={() => open(food)}>
                    {food.name}
                </button>
            </li>
        {/each}
    </ul>
{/if}
{#if showModal}
    <FoodModal {selectedFood} on:close={close} />
{/if}


