<script lang="ts">
    import Calendar from '$lib/components/Calendar.svelte';
    import {onMount} from "svelte";
    import ResultBarMacros from "$lib/components/ResultBarMacros.svelte";
    import ResultsBarKcals from "$lib/components/ResultsBarKcals.svelte";
    import FoodListEntry from "$lib/components/FoodListEntry.svelte";
    import { createDate } from "$lib/dataStore.svelte.js";
    import EditFoodModal from "$lib/components/EditFoodModal.svelte";
    let selectedFood = $state(null);
    let showModal = $state(false);
    let foodEntries: any[] = $state([]);
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

    function open(food: any) {
        selectedFood = food;
        showModal = true;
    }

    function handleClose() {
        showModal = false;
        selectedFood = null;
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
            console.log(resJson.foodEntries);
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
        await LoadFoodEntriesFromDateX();
        await LoadKcalGoalFromDateX();
    });

    $effect(() => {

        LoadFoodEntriesFromDateX();
    });
</script>

<div class="p-10 flex flex-col gap-y-8">
    <div class="grid h-96 grid-cols-[4fr_8fr_5fr] gap-x-8 ">
        <div class="grid justify-items-center">
            <div class="mb-6 grid-rows-2">
                <div class="text-sm text-zinc-400 mb-1 flex">
                    {convertNumberToDay(globalDate.date.getDay())}
                </div>
                <div class="flex text-2xl font-semibold text-white tracking-tight tabular-nums">
                    {getDateNicelyFormatted(globalDate.date)}
                </div>
            </div>
            <div class="flex">
                <Calendar/>
            </div>
        </div>

        <div class="grid h-96 justify-items-center">
            <div class="w-full rounded-2xl border-2 border border-neutral-400 grid grid-rows-[70%_30%]">
                <div class="flex items-center justify-center">
                    <div class="grid grid-cols-3 items-center place-items-center">
                        <div class="grid grid-rows-2 items-center place-items-center">
                            <div class="flex">Calories</div>
                            <div class="flex">{kcalGoal}</div>
                        </div>
                        <ResultsBarKcals value={dayStats.calories} max={kcalGoal}/>
                        <div class="grid grid-rows-2 items-center place-items-center">
                            <div class="flex">ate</div>
                            <div class="flex">{dayStats.calories}</div>
                        </div>
                    </div>
                </div>

                <div class="items-center justify-center grid grid-cols-3 gap-2">
                    <div class="grid grid-rows-3 items-center place-items-center">
                        <div class="flex">Protein</div>
                        <ResultBarMacros value={dayStats.protein} max={220} />
                        <div class="flex">{dayStats.protein}/{proteinGoal}</div>
                    </div>

                    <div class=" grid items-center grid-rows-3 place-items-center">
                        <div class="flex">Carbohydrates</div>
                        <ResultBarMacros value={dayStats.carbohydrates} max={400} />
                        <div class="flex">{dayStats.carbohydrates}/{carbohydrateGoal}</div>
                    </div>

                    <div class="grid items-center grid-rows-3 place-items-center">
                        <div class="flex">Fats</div>
                        <ResultBarMacros value={dayStats.fat} max={80} />
                        <div class="flex">{dayStats.fat}/{fatsGoal}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex h-96 rounded-2xl">
            <span class="text-sm rounded-2xl w-full border-2 border border-neutral-400">Recommendations</span>
        </div>
    </div>

    <div class="grid grid-cols-[4fr_8fr_5fr] gap-x-8 h-auto ">
        <div class="w-full"></div>

        <div class="w-full flex flex-col gap-4 justify-items-center">
            <div class="p-6 w-full rounded-2xl border-2 border border-neutral-400 justify-items-center">
                <h3 class="font-medium mb-4">Logged Items</h3>
<!--                <p class="text-zinc-600 text-sm">Your input/list content goes here...</p>-->
                <div class="overflow-y-auto w-full h-70 [scrollbar-gutter:stable]">
                    {#each foodEntries as foodEntry}
                        <FoodListEntry onClick={open}
                                       foodEntry={foodEntry}
                        />
                    {/each}
                </div>
            </div>
        </div>
        <div class="w-full">

        </div>
    </div>

</div>

{#if showModal}
    <EditFoodModal onClose={handleClose} selectedFood={selectedFood}  />
{/if}

<!--{#if data.user}-->
<!--    <p>Logged in as {data.user.email}</p>-->
<!--{:else}-->
<!--    <p>Not logged in</p>-->
<!--{/if}-->

<!--{#if data.user}-->
<!--    <p>Logged in as {data.user.email}</p>-->
<!--{:else}-->
<!--    <p>Not logged in</p>-->
<!--{/if}-->

<!--{#if loadingFoodEntries}-->
<!--    <p>Loading food entries...</p>-->
<!--{:else}-->
<!--    <div class="">-->
<!--        {#each foodEntries as foodEntry}-->
<!--            <FoodListEntry-->
<!--                    name={foodEntry.name}-->
<!--                    amount={foodEntry.amount}-->
<!--                    calories={foodEntry.calories}-->
<!--                    protein={foodEntry.protein}-->
<!--                    carbohydrates={foodEntry.carbohydrates}-->
<!--                    fats={foodEntry.fat}-->
<!--            />-->
<!--        {/each}-->
<!--    </div>-->
<!--{/if}-->
