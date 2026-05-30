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
    } from "../../../api/food/loadMealLogFromDateX/+server";

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


    let showModal = $state(false);
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

    const globalDate = createDate();

    let error = '';
    let loadingFoodEntries = $state(false);
    let loadingKcalGoal = $state(false);

    async function refetchPageInformation() {
        await LoadMealLogFromDateX();
        await LoadKcalGoalFromDateX();
    }

    function open(food: FoodLogDto) {
        selectedFoodLog = food;
        showModal = true;
    }

    async function handleClose() {
        showModal = false;
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

    async function LoadKcalGoalFromDateX() {
        try {
            loadingKcalGoal = true;
            const res = await fetch(`/api/food/loadKcalGoalFromDateX?date=${encodeURIComponent(globalDate.date)}`);
            if (res.ok){
                let resJson = await res.json();
                kcalGoal = resJson.goal.kcal;
                proteinGoal = resJson.goal.protein;
                carbohydrateGoal = resJson.goal.carbohydrates;
                fatsGoal = resJson.goal.fats;

            }
        }
        catch (e) {
            console.log(e);
        }
    }

    async function LoadMealLogFromDateX() {
        try {
            loadingFoodEntries = true;
            const res = await fetch(`/api/food/loadMealLogFromDateX?date=${encodeURIComponent(globalDate.date)}`);

            if (!res.ok) {
                throw new Error('failed to fetch food entries');
            }

            let resJson = await res.json();
            console.log("meallog + daystats");
            console.log(resJson);

            mealLogs = resJson.mealLogs;
            dayStats = resJson.dayStats;
            console.log("daystats", dayStats);

        } catch (err: any) {
            error = err.message;
        } finally {
            loadingFoodEntries = false;
        }
    }

    onMount( async () => {
        await refetchPageInformation();
    });

    $effect(() => {
        void refetchPageInformation();
    });

</script>


<div class="w-full h-full bg-main-background">
    <div class="grid grid-cols-[auto_1fr] h-full">
        <section class="app-main-food-left">
            <span class="text-2xl text-zinc-400 font-semibold flex">
                {convertNumberToDay(globalDate.date.getDay())}
            </span>
                <span class="flex text-2xl font-semibold text-blue-accent tracking-tight tabular-nums mb-5">
                {getDateNicelyFormatted(globalDate.date)}
            </span>
            <Calendar/>
        </section>

        <div class="overflow-auto w-full grid grid-cols-[auto_1fr] gap-6 px-5 pt-6">
            <div class="flex flex-col gap-6 h-[80vh] w-full">
                <section class="shadow-container min-w-[650px] min-h-[380px] h-[65%] max-w-[3000px] grid grid-rows">
                    <h2 class="text-xl font-semibold">Nutrition Overview</h2>
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
                            <ResultBarMacros value={dayStats.protein} max={220} />
                            <span class="flex text-base w-full">{dayStats.protein}/{proteinGoal}</span>
                        </div>

                        <div class="items-center pt-3 place-items-center">
                            <h3 class="mb-1 flex text-lg w-full">Carbohydrates</h3>
                            <ResultBarMacros value={dayStats.carbohydrates} max={400} />
                            <span class=" flex text-base w-full">{dayStats.carbohydrates}/{carbohydrateGoal}</span>
                        </div>

                        <div class="items-center pt-3 place-items-center">
                            <h3 class="mb-1 flex text-lg w-full">Fats</h3>
                            <ResultBarMacros value={dayStats.fat} max={80} />
                            <span class="flex text-base w-full">{dayStats.fat}/{fatsGoal}</span>
                        </div>
                    </div>
                </section>
                <section class="shadow-container max-h-[35%] h-[35%] shrink-0"></section>
            </div>
            <section class="shadow-container h-[80vh] flex flex-col max-h-full">
                <h2 class="text-xl font-semibold mb-3">Logged Items</h2>
                <div class="flex-1 overflow-y-auto w-full min-h-0 [scrollbar-gutter:stable]">
                    {#each mealLogs as mealLog}
                        {#each mealLog.foods as foodLog}
                            <FoodLogListEntry onClick={open}
                                              onDelete={refetchPageInformation}
                                              foodLog={foodLog}/>
                        {/each}
                    {/each}
                </div>
            </section>

        </div>

    </div>

</div>


{#if showModal}
    <EditFoodModal onClose={handleClose} bind:selectedFoodLog={selectedFoodLog}  />
{/if}