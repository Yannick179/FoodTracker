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
            const url = q ? `/api/searchFood?q=${encodeURIComponent(q)}` : '/api/searchFood';
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

    function handleClose() {
        showModal = false;
        selectedFood = null;
        loadFoods();
    }

    onMount(() => loadFoods());

    const handleSearch = (q: string) => {
        loadFoods(q);
    };
</script>

<div class="min-h-screen bg-zinc-800 text-zinc-100 p-6">

    <div class="max-w-2xl mx-auto">

        <!-- Search -->
        <div class="mb-6">
            <label class="text-xs text-zinc-500">Search foods</label>
            <input
                    type="text"
                    bind:value={query}
                    placeholder="Search..."
                    on:input={() => handleSearch(query)}
                    class="mt-1 w-full rounded-xl bg-zinc-900/70 border border-zinc-800 px-4 py-2 text-zinc-100
				placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-600/40"
            />
        </div>

        <!-- States -->
        {#if loading}
            <p class="text-zinc-500 text-sm">Loading...</p>

        {:else if error}
            <p class="text-red-400 text-sm">{error}</p>

        {:else if foods.length === 0}
            <p class="text-zinc-600 text-sm">No results found</p>

        {:else}
            <div class="space-y-2">
                {#each foods as food}
                    <button
                            on:click={() => open(food)}
                            class="w-full text-left rounded-xl border border-zinc-800 bg-zinc-900/40
						px-4 py-3 hover:bg-zinc-800/50 transition flex justify-between items-center"
                    >
                        <span class="text-zinc-100">{food.name}</span>
                        <span class="text-zinc-500 text-sm">Add</span>
                    </button>
                {/each}
            </div>
        {/if}

    </div>
</div>

{#if showModal}
    <FoodModal onClose={handleClose} {selectedFood} />
{/if}