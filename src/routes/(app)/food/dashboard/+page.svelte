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
    // let foodEntries: FoodEntryDto[] = $state([]);
    // let mealLogReponse: MealLogResponseDto[] = $state([]);
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

<div class="py-6 px-5 flex flex-col">
    <div class="grid h-full grid-cols-[3fr_10fr_5fr] gap-6 ">
        <!-- col 1-->
        <div>
            <div class="text-xl text-zinc-400 flex">
                {convertNumberToDay(globalDate.date.getDay())}
            </div>
            <div class="flex text-2xl font-semibold text-white tracking-tight tabular-nums mb-5">
                {getDateNicelyFormatted(globalDate.date)}
            </div>
            <Calendar/>
        </div>

        <!-- col 2-->
        <div>
            <div class="overflow-y-auto overflow-x-auto min-w-120 grid px-10 py-4 justify-items-center rounded-2xl text-xl border-[2px] border-card-border bg-card mb-6">
                <div class="w-full grid grid-rows-[70%_2px_30%]">
                    <div class="flex-row items-center justify-center pb-3">
                        <div class="text-xl font-bold">Nutrition Overview</div>
                        <div class="grid grid-cols-3 items-center place-items-center">
                            <div class="grid grid-rows-3 items-center place-items-center">
                                <div class="flex">Calories</div>
                                <div class="flex text-brand text-2xl font-bold">{dayStats.calories}</div>
                                <div class="flex text-zinc-400 text-base">/ {kcalGoal} kcal</div>
                            </div>
                            <ResultBarKcals value={dayStats.calories} max={kcalGoal}/>
                            <div class="grid grid-rows-2 items-center place-items-center">
                                <div class="flex">ate</div>
                                <div class="flex">{dayStats.calories}</div>
                            </div>
                        </div>
                    </div>

                    <!-- the line between -->
                    <div class="w-full h-full">
                        <div class="w-full bg-card-border h-full">
                        </div>
                    </div>


                    <div class="w-full grid grid-cols-3 gap-16">
                        <div class="pt-3 place-items-center">
                            <div class="mb-1 flex text-lg w-full">Protein</div>
                            <ResultBarMacros value={dayStats.protein} max={220} />
                            <div class="flex text-base w-full">{dayStats.protein}/{proteinGoal}</div>
                        </div>

                        <div class="items-center pt-3 place-items-center">
                            <div class="mb-1 flex text-lg w-full">Carbohydrates</div>
                            <ResultBarMacros value={dayStats.carbohydrates} max={400} />
                            <div class=" flex text-base w-full">{dayStats.carbohydrates}/{carbohydrateGoal}</div>
                        </div>

                        <div class="items-center pt-3 place-items-center">
                            <div class="mb-1 flex text-lg w-full">Fats</div>
                            <ResultBarMacros value={dayStats.fat} max={80} />
                            <div class="flex text-base w-full">{dayStats.fat}/{fatsGoal}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full flex flex-col px-10 py-6 gap-4 justify-items-center rounded-2xl justify-items-center text-xl border-[2px] border-card-border bg-card mb-6">
                <h3 class="text-xl font-bold">Logged Items</h3>
                <!--                <p class="text-zinc-600 text-sm">Your input/list content goes here...</p>-->
                <div class="overflow-y-auto w-full h-70 [scrollbar-gutter:stable]">
<!--                    TODO: REFACTOR-->
                    {#each mealLogs as mealLog}
                        <div>meallog name</div>
                        {#each mealLog.foods as foodLog}
                            <FoodLogListEntry onClick={open}
                                              onDelete={refetchPageInformation}
                                              foodLog={foodLog}/>
                        {/each}
                    {/each}
                    <div class="px-40">
                        <div class="cursor-pointer border-brand text-lg text-center py-2 border-2 rounded-2xl text-brand"> Add new Food +</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- col 3-->
        <div>
            <div class="flex w-full">
                <div class="border-[2px] px-6 py-3 w-full h-125 rounded-2xl border-card-border bg-card">
                    <div class="text-xl font-semibold">Recommendations</div>
                </div>
            </div>
        </div>

    </div>
</div>

{#if showModal}
    <EditFoodModal onClose={handleClose} bind:selectedFoodLog={selectedFoodLog}  />
{/if}
