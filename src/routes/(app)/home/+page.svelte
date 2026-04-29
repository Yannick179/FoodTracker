<script lang="ts">
    import Calendar from '$lib/components/Calendar.svelte';
    import {onMount} from "svelte";
    import ResultBarMacros from "$lib/components/ResultBarMacros.svelte";
    import ResultsBarKcals from "$lib/components/ResultsBarKcals.svelte";
    import FoodListEntry from "$lib/components/FoodListEntry.svelte";
    import { createDate } from "$lib/dataStore.svelte.js";
    let { data } = $props();
    let foodEntries: any[] = $state([]);
    let dayStats: DayStats = $state({
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0
    });
    type DayStats = {
        calories: number;
        protein: number;
        carbohydrates: number;
        fat: number;
    };

    const globalDate = createDate();

    let error = '';
    let loadingFoodEntries = $state(false);

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

    async function LoadFoodEntriesFromDateX() {
        try {
            loadingFoodEntries = true;
            const res = await fetch(`/api/loadFoodEntriesFromDateX?date=${encodeURIComponent(globalDate.date)}`);
            if (!res.ok) {
                throw new Error('failed to fetch food entries');
            }
            let resJson = await res.json();
            console.log(globalDate.date);
            console.log("loaded food for homepage in LoadFoodEntriesFromDateX: " + JSON.stringify(resJson));

            foodEntries = resJson.foodEntries;
            dayStats = resJson.dayStats;

        } catch (err: any) {
            error = err.message;
        } finally {
            loadingFoodEntries = false;
        }
        console.log(loadingFoodEntries);
        console.log(dayStats);
    }

    onMount( async () => {
        await LoadFoodEntriesFromDateX();
    });

    $effect(() => {

        LoadFoodEntriesFromDateX();
    });
    $effect(() => {
        console.log("foodentries: " + foodEntries);
    });
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
                        {convertNumberToDay(globalDate.date.getDay())}
                    </div>

                    <div class="flex text-2xl font-semibold text-white tracking-tight tabular-nums">
                        {getDateNicelyFormatted(globalDate.date)}
                    </div>
                </div>

                <!-- Calender -->
                <div class="flex">
                    <Calendar/>

                </div>
            </div>

            <!-- col-2 -->
            <div class="grid  justify-items-center">
                <!-- Grid for the tracking -->
                <div class="w-150 h-90 bg-zinc-900 rounded-2xl grid grid-rows-[70%_30%] p-4">
                    <!-- Top (70%) -->
                    <div class="flex items-center justify-center">
                        <div class="grid grid-cols-3 items-center place-items-center">
                            <div class="grid grid-rows-2 items-center place-items-center">
                                <div class="flex">Calories</div>
                                <div class="flex">4000</div>
                            </div>
                            <ResultsBarKcals value={dayStats.calories} max={2220}/>
                            <div class="grid grid-rows-2 items-center place-items-center">
                                <div class="flex">ate</div>
                                <div class="flex">{dayStats.calories}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Bottom (30%) -->
                    <div class="items-center justify-center grid grid-cols-3 gap-2">

                        <!-- Protein -->
                        <div class="grid grid-rows-3 items-center place-items-center">
                            <div class="flex">Protein</div>
                            <ResultBarMacros value={dayStats.protein} max={220} />
                            <div class="flex">{dayStats.protein}/220</div>
                        </div>

                        <!-- Carbohydrates -->
                        <div class=" grid items-center grid-rows-3 place-items-center">
                            <div class="flex">Carbohydrates</div>
                            <ResultBarMacros value={dayStats.carbohydrates} max={400} />
                            <div class="flex">{dayStats.carbohydrates}/400</div>
                        </div>

                        <!-- Fats -->
                        <div class="grid items-center grid-rows-3 place-items-center">
                            <div class="flex">Fats</div>
                            <ResultBarMacros value={dayStats.fat} max={80} />
                            <div class="flex">{dayStats.fat}/80</div>
                        </div>

                    </div>
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


{#if data.user}
    <p>Logged in as {data.user.email}</p>
{:else}
    <p>Not logged in</p>
{/if}

{#if loadingFoodEntries}
    <p>Loading food entries...</p>
{:else}
    <div class="">
        {#each foodEntries as foodEntry}
            <FoodListEntry
                    name={foodEntry.name}
                    amount={foodEntry.amount}
                    calories={foodEntry.calories}
                    protein={foodEntry.protein}
                    carbohydrates={foodEntry.carbohydrates}
                    fats={foodEntry.fat}
            />
        {/each}
    </div>
{/if}
