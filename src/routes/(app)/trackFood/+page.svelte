<script lang="ts">
    import { onMount } from 'svelte';
    import FoodModal from "$lib/components/FoodModal.svelte";
    import {globalDate} from "$lib/dataStore.svelte.js";
    import Calendar from "$lib/components/Calendar.svelte";
    import ResultBarMacros from "$lib/components/ResultBarMacros.svelte";
    import ResultsBarKcals from "$lib/components/ResultsBarKcals.svelte";

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

    function convertNumberToDay(number: number) {
        //starts with 0 as sunday and 1-6 for monday-saturday
        switch (number) {
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
            case 0:
                return "Sunday";
        }
    }


    function convertNumberToMonth(number: number) {
        switch (number) {
            case 0:
                return "January";
            case 1:
                return "February";
            case 2:
                return "March";
            case 3:
                return "April";
            case 4:
                return "May";
            case 5:
                return "June";
            case 6:
                return "July";
            case 7:
                return "August";
            case 8:
                return "September";
            case 9:
                return "October";
            case 10:
                return "November";
            case 11:
                return "December";
        }
    }

    function getDateNicelyFormatted(selectedDate: Date) {
        let formattedDate = selectedDate.getDate() + " " + convertNumberToMonth(selectedDate.getMonth()) + " " + selectedDate.getFullYear() ;
        return formattedDate;
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

<div class="p-6">

    <!-- left side-->
    <div>
        <div class="grid grid-cols-[4fr_11fr_4fr] ">
            <!-- col-1 -->
            <div class="grid justify-items-center">
                <!-- date -->
                <div class="mb-6 grid-rows-2">
                    <div class="text-sm text-zinc-400 mb-1 flex">
                        {convertNumberToDay(globalDate.val.getDay())}
                    </div>

                    <div class="flex text-2xl font-semibold text-white tracking-tight tabular-nums">
                        {getDateNicelyFormatted(globalDate.val)}
                    </div>
                </div>

                <!-- Calender -->
                <div class="flex">
                    <Calendar/>
                </div>
            </div>

            <!-- col-2 -->
            <div class="grid  justify-items-center">
                <!-- Grid for the tracking search -->
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
                                        class="cursor-pointer w-full text-left rounded-xl border border-zinc-800 bg-zinc-900/40
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

            <!-- col-3 -->
            <div class="flex bg-red-950">
                recommendations
            </div>
        </div>
    </div>


    <!--{@render data()}-->

</div>

{#if showModal}
    <FoodModal onClose={handleClose} {selectedFood} />
{/if}