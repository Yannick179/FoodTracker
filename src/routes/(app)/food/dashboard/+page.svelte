<script lang="ts">
    import Calendar from '$lib/components/Calendar.svelte';
    import {onMount} from "svelte";
    import ResultBarMacros from "$lib/components/ResultBarMacros.svelte";
    import ResultBarKcals from "$lib/components/ResultBarKcals.svelte";
    import FoodListEntry from "$lib/components/FoodListEntry.svelte";
    import { createDate } from "$lib/dataStore.svelte.js";
    import EditFoodModal from "$lib/components/EditFoodModal.svelte";
    import type {FoodEntryDto} from "../../../api/food/loadFoodEntriesFromDateX/+server";

    let selectedFood: FoodEntryDto = $state({
        foodEntryId: 0,
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
    let foodEntries: FoodEntryDto[] = $state([]);
    let dayStats: DayStats = $state({
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0
    });
    let kcalGoal =  $state(0);
    let proteinGoal = $state(0);
    let carbohydrateGoal = $state(0);
    let fatsGoal = $state(0);
    type DayStats = {
        calories: number;
        protein: number;
        carbohydrates: number;
        fat: number;
    };

    const globalDate = createDate();

    let error = '';
    let loadingFoodEntries = $state(false);
    let loadingKcalGoal = $state(false);

    async function refetchPageInformation() {
        await LoadFoodEntriesFromDateX();
        await LoadKcalGoalFromDateX();
    }

    function open(food: any) {
        selectedFood = food;
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

    async function LoadFoodEntriesFromDateX() {
        try {
            loadingFoodEntries = true;
            const res = await fetch(`/api/food/loadFoodEntriesFromDateX?date=${encodeURIComponent(globalDate.date)}`);
            if (!res.ok) {
                throw new Error('failed to fetch food entries');
            }
            let resJson = await res.json();
            console.log(resJson.Entries);
            console.log(resJson);

            foodEntries = resJson.foodEntries;
            dayStats = resJson.dayStats;

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

<div class="pt-16 px-10 flex flex-col">
    <div class="grid h-full grid-cols-[4fr_10fr_5fr] gap-6 ">
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
            <div class="overflow-y-auto overflow-x-auto min-w-120 grid p-6 justify-items-center rounded-2xl text-xl border-[2px] border-card-border bg-card mb-6">
                <div class="w-full grid grid-rows-[70%_2px_30%]">
                    <div class="flex items-center justify-center pb-3">
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

                    <div class="w-full h-full px-3 lg:px-3 xl:px-6">
                        <div class="w-full bg-card-border h-full">
                        </div>
                    </div>


                    <div class="w-full grid grid-cols-3 px-3 lg:px-3 gap-16 xl:px-6">
                        <div class="grid grid-rows-3  pt-3 grid grid-rows-3 place-items-center">
                            <div class="flex w-full">Protein</div>
                            <ResultBarMacros value={dayStats.protein} max={220} />
                            <div class="flex w-full">{dayStats.protein}/{proteinGoal}</div>
                        </div>

                        <div class=" grid items-center pt-3 grid-rows-3 place-items-center">
                            <div class="flex w-full">Carbohydrates</div>
                            <ResultBarMacros value={dayStats.carbohydrates} max={400} />
                            <div class="flex w-full">{dayStats.carbohydrates}/{carbohydrateGoal}</div>
                        </div>

                        <div class="grid items-center pt-3 grid-rows-3 place-items-center">
                            <div class="flex w-full">Fats</div>
                            <ResultBarMacros value={dayStats.fat} max={80} />
                            <div class="flex w-full">{dayStats.fat}/{fatsGoal}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full"></div>

            <div class="w-full flex flex-col gap-4 justify-items-center">
                <div class="p-6 w-full rounded-2xl border-2 border border-neutral-400 justify-items-center">
                    <h3 class="font-medium mb-4">Logged Items</h3>
                    <!--                <p class="text-zinc-600 text-sm">Your input/list content goes here...</p>-->
                    <div class="overflow-y-auto w-full h-70 [scrollbar-gutter:stable]">
                        {#each foodEntries as foodEntry}
                            <FoodListEntry onClick={open}
                                           onDelete={refetchPageInformation}
                                           foodEntry={foodEntry}
                            />
                        {/each}
                        <div class="px-40">
                            <div class="cursor-pointer border-brand text-center py-3 border-2 rounded-2xl text-brand"> Add new Food +</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- col 3-->
        <div>
            <div class="flex w-full rounded-2xl">
                <span class="text-sm rounded-2xl w-full border-2 border border-neutral-400">Recommendations</span>
            </div>
        </div>

    </div>
</div>

<!--<div class="pt-16 px-10 flex flex-col">-->
<!--    <div class="grid h-full grid-cols-[4fr_10fr_5fr] gap-6 ">-->
<!--        <div class="w-full grid justify-items-center">-->
<!--            <div class="grid-rows-2 w-full">-->
<!--                <div class="text-sm text-zinc-400 flex">-->
<!--                    {convertNumberToDay(globalDate.date.getDay())}-->
<!--                </div>-->
<!--                <div class="flex text-2xl font-semibold text-white tracking-tight tabular-nums">-->
<!--                    {getDateNicelyFormatted(globalDate.date)}-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="flex w-full">-->
<!--                <Calendar/>-->
<!--            </div>-->
<!--        </div>-->

<!--        <div class="w-full h-full ">-->

<!--        </div>-->
<!--        <div class="grid h-full justify-items-center">-->
<!--            <div class="w-full rounded-2xl border-2 border border-neutral-400 grid grid-rows-[70%_30%]">-->
<!--                <div class="flex items-center justify-center">-->
<!--                    <div class="grid grid-cols-3 items-center place-items-center">-->
<!--                        <div class="grid grid-rows-2 items-center place-items-center">-->
<!--                            <div class="flex">Calories</div>-->
<!--                            <div class="flex">{kcalGoal}</div>-->
<!--                        </div>-->
<!--                        <ResultBarKcals value={dayStats.calories} max={kcalGoal}/>-->
<!--                        <div class="grid grid-rows-2 items-center place-items-center">-->
<!--                            <div class="flex">ate</div>-->
<!--                            <div class="flex">{dayStats.calories}</div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->

<!--                <div class="items-center justify-center grid grid-cols-3 gap-2">-->
<!--                    <div class="grid grid-rows-3 items-center place-items-center">-->
<!--                        <div class="flex">Protein</div>-->
<!--                        <ResultBarMacros value={dayStats.protein} max={220} />-->
<!--                        <div class="flex">{dayStats.protein}/{proteinGoal}</div>-->
<!--                    </div>-->

<!--                    <div class=" grid items-center grid-rows-3 place-items-center">-->
<!--                        <div class="flex">Carbohydrates</div>-->
<!--                        <ResultBarMacros value={dayStats.carbohydrates} max={400} />-->
<!--                        <div class="flex">{dayStats.carbohydrates}/{carbohydrateGoal}</div>-->
<!--                    </div>-->

<!--                    <div class="grid items-center grid-rows-3 place-items-center">-->
<!--                        <div class="flex">Fats</div>-->
<!--                        <ResultBarMacros value={dayStats.fat} max={80} />-->
<!--                        <div class="flex">{dayStats.fat}/{fatsGoal}</div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->

<!--        <div class="flex h-full rounded-2xl">-->
<!--            <span class="text-sm rounded-2xl w-full border-2 border border-neutral-400">Recommendations</span>-->
<!--        </div>-->
<!--    </div>-->

<!--    <div class="grid grid-cols-[4fr_8fr_5fr] gap-x-8 h-auto ">-->
<!--        <div class="w-full"></div>-->

<!--        <div class="w-full flex flex-col gap-4 justify-items-center">-->
<!--            <div class="p-6 w-full rounded-2xl border-2 border border-neutral-400 justify-items-center">-->
<!--                <h3 class="font-medium mb-4">Logged Items</h3>-->
<!--&lt;!&ndash;                <p class="text-zinc-600 text-sm">Your input/list content goes here...</p>&ndash;&gt;-->
<!--                <div class="overflow-y-auto w-full h-70 [scrollbar-gutter:stable]">-->
<!--                    {#each foodEntries as foodEntry}-->
<!--                        <FoodListEntry onClick={open}-->
<!--                                       onDelete={refetchPageInformation}-->
<!--                                       foodEntry={foodEntry}-->
<!--                        />-->
<!--                    {/each}-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="w-full">-->

<!--        </div>-->
<!--    </div>-->
<!--</div>-->

{#if showModal}
    <EditFoodModal onClose={handleClose} bind:selectedFood={selectedFood}  />
{/if}
