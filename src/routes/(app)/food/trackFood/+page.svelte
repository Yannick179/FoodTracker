<script lang="ts">
    import { onMount } from 'svelte';
    import FoodModal from "$lib/components/FoodModal.svelte";
    import {createDate } from "$lib/dataStore.svelte.js";
    import Calendar from "$lib/components/Calendar.svelte";
    import type { Food } from "../../../api/food/searchFood/+server";
    import type { MealTemplateResponseDto } from "../../../api/food/searchMealTemplates/+server";
    import SearchInput from "$lib/components/atoms/SearchInput.svelte";
    import ListItemButton from "$lib/components/atoms/ListItemButton.svelte";
    import SearchableList from "$lib/components/molecules/SearchableList.svelte";

    let foods: Food[] = $state([]);
    let mealTemplates: MealTemplateResponseDto[] = $state([]);
    let query = $state('');
    let loading = $state(false);
    let error = $state('');
    let selectedFood: Food = $state({
        name: "",
        id: 0,
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0
    });
    let showFoodModal = $state(false);
    const globalDate = createDate();


    async function submit(amount: number, food: Food) {
        if (amount > 0) {
            const res = await fetch('/api/food/trackFood', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    foodId: food.id,
                    amount: amount,
                    date: globalDate.date
                })
            });

            if (!res.ok) throw new Error('Failed to track food');

            handleClose();
        } else {
            console.log("Please enter a valid amount of food");
        }
    }

    async function loadFoods(q: string = '') {
        loading = true;
        error = '';
        try {
            const url = q ? `/api/food/searchFood?q=${encodeURIComponent(q)}` : '/api/food/searchFood';
            const res = await fetch(url);
            if (!res.ok) throw new Error('Failed to fetch foods');
            foods = await res.json();
        } catch (err: any) {
            error = err.message;
        }
        loading = false;
    }

    async function loadMeals(q: string = '') {
        try {
            const url = q ? `/api/food/searchMealTemplates?q=${encodeURIComponent(q)}` : '/api/food/searchMealTemplates';
            const res = await fetch(url);
            if (!res.ok) throw new Error('Failed to fetch meal templates');
            mealTemplates = await res.json();
        } catch (err: any) {
            error = err.message;
        }
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

    function openFood(food: Food) {
        selectedFood = food;
        showFoodModal = true;
    }


    function openMeal(meal: MealTemplateResponseDto) {
        // selectedFood = food;
        // showFoodModal = true;
    }

    function handleClose() {
        showFoodModal = false;
        selectedFood = {
            name: "",
            id: 0,
            calories: 0,
            protein: 0,
            carbohydrates: 0,
            fat: 0
        };
    }

    onMount(() => {
        loadFoods();
        loadMeals();
        }
    );

    const handleFoodSearch = (q: string) => {
        loadFoods(q);
    };

    const handleMealSearch = (q: string) => {
        loadMeals(q);
    };

</script>

<div class="p-10">

    <!-- left side-->
    <div>
        <section class="grid grid-cols-[4fr_8fr_5fr] gap-x-8 ">
            <!-- col-1 -->
            <div class="grid justify-items-center">
<!--                &lt;!&ndash; date &ndash;&gt;-->
<!--                <div class="mb-6 grid-rows-2">-->
<!--                    <div class="text-sm text-zinc-400 mb-1 flex">-->
<!--                        {convertNumberToDay(globalDate.date.getDay())}-->
<!--                    </div>-->

<!--                    <div class="flex text-2xl font-semibold text-white tracking-tight tabular-nums">-->
<!--                        {getDateNicelyFormatted(globalDate.date)}-->
<!--                    </div>-->
<!--                </div>-->

<!--                &lt;!&ndash; Calender &ndash;&gt;-->
<!--                <div class="flex">-->
<!--                    <Calendar/>-->
<!--                </div>-->
            </div>

            <!-- col-2 -->
            <div class="grid  justify-items-center">
<!--                <section class="max-w-2xl mx-auto date-selector-wrapper" bind:this={searchSection} onkeydown={handleListKeydown} role="button"-->
<!--                         tabindex="0">-->
<!--                    <SearchInput  type="text" placeholder="Search foods..." oninput={() => handleFoodSearch(query)} bind:value={query} />-->

<!--                    {#if loading}-->
<!--                        <p class="text-zinc-500 text-sm">Loading...</p>-->
<!--                    {:else if error}-->
<!--                        <p class="text-red-400 text-sm">{error}</p>-->
<!--                    {:else if foods.length === 0}-->
<!--                        <p class="text-zinc-600 text-sm">No results found</p>-->
<!--                    {:else}-->
<!--                        <div class="list-container-popover">-->
<!--                            {#each foods as food}-->
<!--                                <ListItemButton onclick={() => openFood(food)} calories={food.calories} protein={food.protein} name={food.name} carbohydrates={food.carbohydrates} fats={food.carbohydrates} amount={100}/>-->
<!--                            {/each}-->
<!--                        </div>-->
<!--                    {/if}-->

<!--                </section>-->

                <SearchableList onSelect={openFood} onSearch={handleFoodSearch} items={foods}>

                </SearchableList>
            </div>

            <!-- col-3 -->
            <section class="flex">
<!--                <div class="mb-6">-->
<!--                    <label class="text-xs text-zinc-500">Search Meals</label>-->
<!--                    <input-->
<!--                            type="text"-->
<!--                            bind:value={query}-->
<!--                            placeholder="Search..."-->
<!--                            oninput={() => handleFoodSearch(query)}-->
<!--                            class="mt-1 w-full rounded-2xl border-2 border border-neutral-400 px-4 py-2 text-zinc-100-->
<!--				placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-600/40"-->
<!--                    />-->

<!--                    <div class="space-y-2">-->
<!--                        {#each mealTemplates as mealTemplate}-->
<!--                            <button-->
<!--                                    onclick={() => openMeal(mealTemplate)}-->
<!--                                    class="cursor-pointer w-full text-left rounded-2xl border-2 border border-neutral-400 tansition-200-->
<!--						px-4 py-3 hover:bg-neutral-800 transition flex justify-between items-center"-->
<!--                            >-->
<!--                                <span class="text-zinc-100">{mealTemplate.name}</span>-->
<!--                                <span class="text-zinc-500 text-sm">Add</span>-->
<!--                            </button>-->
<!--                        {/each}-->
<!--                    </div>-->
<!--                </div>-->
            </section>
        </section>
    </div>


    <!--{@render data()}-->

</div>

{#if showFoodModal}
    <FoodModal onClose={handleClose} submit={submit} {selectedFood} />
{/if}