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
    import {searchFoods} from "$lib/api/food";
    import {postMealLog} from "$lib/api/mealLog";

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

    function openFoodLog(foodLog: FoodLogDto) {
        let newFoodLog = $state.snapshot(foodLog);
        console.log(newFoodLog)
        selectedFoodLog = newFoodLog;
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

    async function handleFoodSearch(query: string = '') {
        foods = await searchFoods(query);
    }

    async function submitFoodModal(amount: number, food: Food) {
        let foodLogs = [{ foodId: food.id, amount: amount }];
        await postMealLog(foodLogs, globalDate.date);
        await handleFoodModalClose();

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

    async function deleteEntry(foodLogId: number) {
        const res = await fetch(`/api/calorie-tracker/food-logs/${foodLogId}`, {
            method: 'DELETE',
        });

        if (!res.ok) throw new Error('Failed to delete entry');
        await refetchPageInformation();
    }

    async function saveEditFoodModal() {
        console.log(selectedFoodLog.amount);
        if (selectedFoodLog.amount > 0) {
            const res = await fetch(`/api/calorie-tracker/food-logs/${selectedFoodLog.foodLogId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: selectedFoodLog.amount,
                })
            });

        if (!res.ok) throw new Error('Failed to update food log');
        showEditFoodModal = false;
        await refetchPageInformation();
        }
    }

    function onCancelEditFoodModal() {
        showEditFoodModal = false;
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
                        <span class="">{Math.trunc(dayStats.calories)}</span>
                        <span class="">/ {kcalGoal} kcal</span>
                    </div>
                    <div>
                        <ResultBarKcals value={dayStats.calories} max={kcalGoal}/>

                    </div>
                    <div class="grid grid-rows items-center place-items-center">
                        <h3>Calories Left</h3>
                        <span class="">{Math.trunc(Math.max(kcalGoal - dayStats.calories, 0))}</span>
                    </div>

                </div>
                <hr class="my-4 border-light-accent-darker1 rounded-2xl border-[1px]">
                <div class="w-full grid grid-cols-3 gap-16">
                    <div class="pt-3 place-items-center">
                        <h3 class="mb-1 flex text-lg w-full">Protein</h3>
                        <ResultBarMacros value={dayStats.protein} max={proteinGoal} />
                        <span class="flex text-base w-full">{Math.trunc(dayStats.protein)}/{proteinGoal}</span>
                    </div>

                    <div class="items-center pt-3 place-items-center">
                        <h3 class="mb-1 flex text-lg w-full">Carbohydrates</h3>
                        <ResultBarMacros value={dayStats.carbohydrates} max={carbohydrateGoal} />
                        <span class=" flex text-base w-full">{Math.trunc(dayStats.carbohydrates)}/{carbohydrateGoal}</span>
                    </div>

                    <div class="items-center pt-3 place-items-center">
                        <h3 class="mb-1 flex text-lg w-full">Fats</h3>
                        <ResultBarMacros value={dayStats.fat} max={fatsGoal} />
                        <span class="flex text-base w-full">{Math.trunc(dayStats.fat)}/{fatsGoal}</span>
                    </div>
                </div>
            </section>
        </div>

        <section class="shadow-container h-full min-h-0 flex flex-col">
            <h2 class="text-xl font-semibold mb-3">Logged Items</h2>
            <div class="flex-1 overflow-y-auto w-full min-h-0 [scrollbar-gutter:stable]">
                {#each mealLogs as mealLog}
                    {#each mealLog.foods as foodLog}
                        <FoodLogListEntry onClick={() => openFoodLog(foodLog)}
                                          onDelete={() => deleteEntry(foodLog.foodLogId)}
                                          name={foodLog.name} protein={foodLog.protein} calories={foodLog.calories} amount={foodLog.amount} fat={foodLog.fat} carbohydrates={foodLog.carbohydrates}/>
                    {/each}
                {/each}
            </div>
        </section>

    </div>

</div>


{#if showEditFoodModal}
    <EditFoodModal name={selectedFoodLog.name} bind:amount={selectedFoodLog.amount} foodId={selectedFoodLog.foodId}
            onSave={saveEditFoodModal} onCancel={onCancelEditFoodModal} onDelete={() => deleteEntry(selectedFoodLog.foodLogId)}/>
{/if}
{#if showFoodModal}
    <FoodModal onClose={handleFoodModalClose} submit={submitFoodModal} {selectedFood} />
{/if}
