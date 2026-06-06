<script lang="ts">
    import Calendar from '$lib/components/Calendar.svelte';
    import {onMount} from "svelte";
    import ResultBarMacros from "$lib/components/ResultBarMacros.svelte";
    import ResultBarKcals from "$lib/components/ResultBarKcals.svelte";
    import FoodLogListEntry from "$lib/components/FoodLogListEntry.svelte";
    import { createDate } from "$lib/dataStore.svelte.js";
    import EditFoodModal from "$lib/components/EditFoodModal.svelte";
    import type {
        FoodLogDto,
        MealLogDto,
        DayStatsDto
    } from "../../../api/calorie-tracker/meal-logs/+server";
    import Header from "$lib/components/atoms/Header.svelte";
    import DateSelector from "$lib/components/organism/DateSelector.svelte";
    import SearchableList from "$lib/components/molecules/SearchableList.svelte";
    import FoodModal from "$lib/components/FoodModal.svelte";
    import type {Food} from "../../../api/calorie-tracker/foods/+server";

    let selectedFood: Food = $state({
        name: "",
        id: 0,
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0
    });

    let selectedFoodLog: FoodLogDto = $state({
        foodLogId: 0,
        foodId: 0,
        name: '',
        amount: 0,
        eatenAt: new Date(),
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0
    });
    let foods: Food[] = $state([]);
    let showEditFoodModal = $state(false);
    let mealLogs: MealLogDto[] = $state([]);
    let dayStats: DayStatsDto = $state({
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0
    });
    let kcalGoal =  $state(0);
    let proteinGoal = $state(0);
    let carbohydrateGoal = $state(0);
    let fatsGoal = $state(0);
    let showFoodModal = $state(false);

    const globalDate = createDate();

    let error = '';
    let loadingFoodEntries = $state(false);
    let loadingKcalGoal = $state(false);

    async function refetchPageInformation() {
        await LoadMealLogFromDateX();
        await LoadKcalGoalFromDateX();
    }

    function openFoodLog(food: FoodLogDto) {
        selectedFoodLog = food;
        showEditFoodModal = true;
    }

    function openFood(food: Food) {
        selectedFood = food;
        showFoodModal = true;
    }

    async function handleEditFoodModalClose() {
        showEditFoodModal = false;
        await refetchPageInformation();
    }

    async function handleFoodSearch(q: string = '') {
        // error = '';
        // if (q === '') return;
        if (q.length === 0) {
            foods = [];
        }

        try {
            const res = await fetch(`/api/calorie-tracker/foods?q=${encodeURIComponent(q)}`);
            if (!res.ok) throw new Error('Failed to fetch foods');
            foods = await res.json();
        } catch (err: any) {
            // error = err.message;
        }
    }

    async function submitFoodModal(amount: number, food: Food) {
        if (amount > 0) {
            const res = await fetch('/api/calorie-tracker/meal-logs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: globalDate.date,
                    foodLogs: [
                        { foodId: food.id, amount: amount }
                    ]
                })
            });

            if (!res.ok) throw new Error('Failed to track food');

            handleFoodModalClose();
        } else {
            console.log("Please enter a valid amount of food");
        }
    }

    async function handleFoodModalClose() {
        showFoodModal = false;
        selectedFood = {
            name: "",
            id: 0,
            calories: 0,
            protein: 0,
            carbohydrates: 0,
            fat: 0
        };
        await refetchPageInformation();
    }

    function getDateNicelyFormatted(selectedDate: Date) {
        let formattedDate = selectedDate.getDate() + " " + convertNumberToMonth(selectedDate.getMonth()) + " " + selectedDate.getFullYear() ;
        return formattedDate;
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

    function toDateParam(d: Date) {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    async function LoadKcalGoalFromDateX() {
        try {
            loadingKcalGoal = true;
            const res = await fetch(`/api/calorie-tracker/goals/${toDateParam(globalDate.date)}`);
            if (res.ok){
                let goal = await res.json();
                if (goal) {
                    kcalGoal = goal.kcal;
                    proteinGoal = goal.protein;
                    carbohydrateGoal = goal.carbohydrates;
                    fatsGoal = goal.fats;
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    async function LoadMealLogFromDateX() {
        try {
            loadingFoodEntries = true;
            const res = await fetch(`/api/calorie-tracker/meal-logs?date=${toDateParam(globalDate.date)}`);

            if (!res.ok) {
                throw new Error('failed to fetch food entries');
            }

            let resJson = await res.json();

            mealLogs = resJson.mealLogs;
            dayStats = resJson.dayStats;

        } catch (err: any) {
            error = err.message;
        } finally {
            loadingFoodEntries = false;
        }
    }

    onMount( async () => {
        await refetchPageInformation();
        // await handleFoodSearch();
    });

    $effect(() => {
        void refetchPageInformation();
    });

</script>

<div class="w-full h-full bg-main-background p-8 flex flex-col min-h-0">
    <div class="w-full grid grid-cols-3">
        <div></div>
        <div class="flex justify-center items-center">
            <SearchableList onSelect={openFood} onSearch={handleFoodSearch} items={foods} disabled={showFoodModal}/>
        </div>
        <div class="flex justify-center items-center">
            <DateSelector/>
        </div>
    </div>

    <div class="w-full flex-1  min-h-0 grid grid-cols-[25%_auto_30%] gap-6 pt-6">
        <div></div>

        <div class="flex flex-col w-full">
            <section class="overflow-x-auto shadow-container grid grid-rows">
                <Header text="Nutrition Overview"/>
                <div class="grid grid-cols-3 items-center ">
                    <div class="grid grid-rows items-center place-items-center">
                        <h3>Calories</h3>
                        <span class="">{dayStats.calories}</span>
                        <span class="">/ {kcalGoal} kcal</span>
                    </div>
                    <div>
                        <ResultBarKcals value={dayStats.calories} max={kcalGoal}/>

                    </div>
                    <div class="grid grid-rows items-center place-items-center">
                        <h3>Calories Left</h3>
                        <span class="">{Math.max(kcalGoal - dayStats.calories, 0)}</span>
                    </div>

                </div>
                <hr class="my-4 border-light-accent-darker1 rounded-2xl border-[1px]">
                <div class="w-full grid grid-cols-3 gap-16">
                    <div class="pt-3 place-items-center">
                        <h3 class="mb-1 flex text-lg w-full">Protein</h3>
                        <ResultBarMacros value={dayStats.protein} max={proteinGoal} />
                        <span class="flex text-base w-full">{dayStats.protein}/{proteinGoal}</span>
                    </div>

                    <div class="items-center pt-3 place-items-center">
                        <h3 class="mb-1 flex text-lg w-full">Carbohydrates</h3>
                        <ResultBarMacros value={dayStats.carbohydrates} max={carbohydrateGoal} />
                        <span class=" flex text-base w-full">{dayStats.carbohydrates}/{carbohydrateGoal}</span>
                    </div>

                    <div class="items-center pt-3 place-items-center">
                        <h3 class="mb-1 flex text-lg w-full">Fats</h3>
                        <ResultBarMacros value={dayStats.fat} max={fatsGoal} />
                        <span class="flex text-base w-full">{dayStats.fat}/{fatsGoal}</span>
                    </div>
                </div>
            </section>
        </div>

        <section class="shadow-container h-full min-h-0 flex flex-col">
            <h2 class="text-xl font-semibold mb-3">Logged Items</h2>
            <div class="flex-1 overflow-y-auto w-full min-h-0 [scrollbar-gutter:stable]">
                {#each mealLogs as mealLog}
                    {#each mealLog.foods as foodLog}
                        <FoodLogListEntry onClick={openFoodLog}
                                          onDelete={refetchPageInformation}
                                          foodLog={foodLog}/>
                    {/each}
                {/each}
            </div>
        </section>

    </div>

</div>


{#if showEditFoodModal}
    <EditFoodModal onClose={handleEditFoodModalClose} bind:selectedFoodLog={selectedFoodLog}  />
{/if}
{#if showFoodModal}
    <FoodModal onClose={handleFoodModalClose} submit={submitFoodModal} {selectedFood} />
{/if}
