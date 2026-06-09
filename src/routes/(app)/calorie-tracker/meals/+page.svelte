<script lang="ts">
    import EditFoodModal from "$lib/components/EditFoodModal.svelte";
    import CustomSearch from "$lib/components/Icons/CustomSearch.svelte";
    import CustomBookmark from "$lib/components/Icons/CustomBookmark.svelte";
    import CustomMeal from "$lib/components/Icons/CustomMeal.svelte";
    import {Bookmark} from "lucide-svelte";
    import type {Food} from "../../../api/calorie-tracker/foods/+server";
    import {onMount} from "svelte";
    import FoodModal from "$lib/components/FoodModal.svelte";
    import SearchableList from "$lib/components/molecules/SearchableList.svelte";
    import {searchFoods} from "$lib/api/food";
    import FoodLogListEntry from "$lib/components/FoodLogListEntry.svelte";
    type MealFood = {
        protein: number,
        carbohydrates: number,
        fat: number,
        calories: number,
        amount: number,
        foodId: number,
        name: string,
    }

    type FoodTemplate = {
        foodId: number;
        amount: number;
    };

    let hasMeal: boolean = $state(false);
    let showFoodModal: boolean = $state(false);
    let showEditFoodModal: boolean = $state(false);
    let createsFirstMeal: boolean = $state(false);
    let query = $state("");
    let mealFoods: MealFood[] = $state([]);
    let searchedFoods: Food[] = $state([]);
    let mealName: string = $state("");
    let selectedFood: Food = $state({
        name: "",
        id: 0,
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0
    });

    let selectedMealFood: MealFood = $state({
        protein: 0,
        carbohydrates: 0,
        fat: 0,
        calories: 0,
        amount: 0,
        foodId: 0,
        name: "",
    })
    let selectedMealFoodDeepCopy: MealFood = $state({
        protein: 0,
        carbohydrates: 0,
        fat: 0,
        calories: 0,
        amount: 0,
        foodId: 0,
        name: "",
    })


    function onCreateFirstMeal() {
        createsFirstMeal = true;
    }

    function openFoodModal(food: Food) {
        selectedFood = food;
        showFoodModal = true;
    }

    function openEditFoodModal(food: MealFood) {
        selectedMealFoodDeepCopy = $state.snapshot(food);
        selectedMealFood = food;
        showEditFoodModal = true;
    }

    function handleFoodModalClose() {
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

    function deleteMealLogEntry(foodToDelete: MealFood) {
        mealFoods = mealFoods.filter(food => food !== foodToDelete);
    }

    function submit(amount: number, food: Food) {
        let mealFood: MealFood = {
            protein: food.protein / 100 * amount,
            carbohydrates: food.carbohydrates / 100 * amount,
            fat: food.fat / 100 * amount,
            calories: food.calories / 100 * amount,
            amount: amount,
            foodId: food.id,
            name: food.name,

        }
        mealFoods.push(mealFood);
        handleFoodModalClose();
    }

    function saveEditFoodModal() {
        //object stays the same but content changes
        let amountFactor = selectedMealFoodDeepCopy.amount / selectedMealFood.amount //amount cant be 0!
        selectedMealFood.amount *= amountFactor;
        selectedMealFood.calories *= amountFactor;
        selectedMealFood.protein *= amountFactor;
        selectedMealFood.carbohydrates *= amountFactor;
        selectedMealFood.fat *= amountFactor;

        showEditFoodModal = false;

    }

    function resetPage() {
         mealFoods = [];
         searchedFoods = [];
         mealName = "";
    }

    async function saveMealTemplate() {
        const foodTemplates: FoodTemplate[] = mealFoods.map(food => ({
            foodId: food.foodId,
            amount: food.amount
        }));
        try {
            const res = await fetch("/api/calorie-tracker/meal-templates", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    foodTemplates: foodTemplates,
                    mealName: mealName,
                })
            });
            resetPage();
        }
        catch (error) {
            console.log(error);
        }


    }

    async function handleFoodSearch(query: string = '') {
        searchedFoods = await searchFoods(query);
    }

    function onCancelEditFoodModal() {
        showEditFoodModal = false;
    }

    onMount(() => handleFoodSearch());
</script>


{#if hasMeal || createsFirstMeal}
<!--    <section class="w-full py-6 px-5 h-full">-->

<!--        <div class="w-full h-full grid grid-cols-[5fr_11fr_4fr] gap-5">-->
<!--            &lt;!&ndash; Search bar &ndash;&gt;-->
<!--            <div class="w-full h-full rounded-2xl border-[2px] border-light-accent-darker1 bg-card">-->
<!--                <input-->
<!--                        type="text"-->
<!--                        placeholder="Search..."-->
<!--                        oninput={(e) => handleSearch(e.currentTarget.value)}-->
<!--                        class="mt-1 w-full rounded-2xl border-2 border border-neutral-400 px-4 py-2 text-zinc-100-->
<!--				placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-600/40"-->
<!--                />-->
<!--                {#each searchedFoods as food}-->
<!--                    <button-->
<!--                            onclick={() => open(food)}-->
<!--                            class="cursor-pointer w-full text-left rounded-2xl border-2 border border-neutral-400 tansition-200-->
<!--						px-4 py-3 hover:bg-neutral-800 transition flex justify-between items-center"-->
<!--                    >-->
<!--                        <span class="text-zinc-100">{food.name}</span>-->
<!--                        <span class="text-zinc-500 text-sm">Add</span>-->
<!--                    </button>-->
<!--                {/each}-->
<!--            </div>-->

<!--            &lt;!&ndash; Meal &ndash;&gt;-->
<!--            <div class="w-full h-full rounded-2xl border-[2px] border-light-accent-darker1 bg-card">-->
<!--                <label class="text-xl font-semibold">Meal name-->
<!--                    <input-->
<!--                            type="text"-->
<!--                            bind:value={mealName}-->
<!--                            placeholder="Meal Name"-->
<!--                            class="mt-1 text-lg font-normal w-full rounded border-2 border-zinc-700 px-3 py-2.5 focus:border-brand focus:outline-none"/>-->
<!--                </label>-->
<!--                <table class="w-full">-->
<!--                    <thead>-->
<!--                        <tr>-->
<!--                            <th>Food</th>-->
<!--                            <th>Amount</th>-->
<!--                            <th>Calories</th>-->
<!--                            <th>Protein</th>-->
<!--                            <th>Carbohydrates</th>-->
<!--                            <th>Fat</th>-->
<!--                        </tr>-->
<!--                    </thead>-->
<!--                    <tbody>-->
<!--                        {#each mealFoods as food}-->
<!--                            <tr>-->
<!--                                <td>{food.name}</td>-->
<!--                                <td>{food.amount}</td>-->
<!--                                <td>{food.calories}</td>-->
<!--                                <td>{food.protein}</td>-->
<!--                                <td>{food.carbohydrates}</td>-->
<!--                                <td>{food.fat}</td>-->
<!--                            </tr>-->
<!--                        {/each}-->
<!--                    </tbody>-->
<!--                </table>-->
<!--                <button onclick={saveMealTemplate} class="cursor-pointer w-full text-left rounded-2xl bg-brand">-->
<!--                    Save meal template-->
<!--                </button>-->
<!--            </div>-->

<!--            &lt;!&ndash; Summary&ndash;&gt;-->
<!--            <div class="w-full h-full rounded-2xl border-[2px] border-light-accent-darker1 bg-card" ></div>-->
<!--        </div>-->
<!--    </section>-->

    <div class="w-full h-full bg-main-background p-8 flex flex-col min-h-0">
        <div class="w-full h-full grid grid-cols-[5fr_11fr_4fr] gap-5">
            <div class="invisible-container">
                <SearchableList onSelect={openFoodModal} onSearch={handleFoodSearch} items={searchedFoods} disabled={showFoodModal}/>
            </div>
            <div class="shadow-container">
                {#each mealFoods as food}
                    <FoodLogListEntry onClick={() => openEditFoodModal(food)}
                                      onDelete={() => deleteMealLogEntry(food)}
                                      protein={food.protein} fat={food.fat} carbohydrates={food.carbohydrates} amount={food.amount} calories={food.calories} name={food.name}/>
                {/each}
            </div>
            <div class="shadow-container"></div>

        </div>
    </div>

{:else}
    <section class="w-full py-12 px-16 h-full">
        <div class="w-full h-full rounded-2xl text-xl border-[2px] border-light-accent-darker1 bg-card">
            <div class="grid grid-rows-[80%_20%]] h-full">

                <div class="grid grid-cols-[7fr_2px_13fr] px-14 py-12">

                    <div class="pr-14">
                        <!--                    <div class="pb-10">LOGO</div>-->
                        <h2 class="text-4xl font-bold pb-5">Create Your Meals</h2>
                        <p class="pb-5 text-lg text-zinc-400">Search foods, build custom meals, and save your favorites for faster tracking everyday</p>
                        <div class="grid grid-rows-[1fr_1fr_1fr]">
                            <div class="pb-2 grid grid-cols-[auto_1fr] gap-5 items-center">
                                <CustomSearch size={60}></CustomSearch>
                                <div class="grid auto-rows-max">
                                    <h3 class="text-lg">Search Food</h3>
                                    <p class="text-base text-zinc-400 min-w-0">Our database contains thousands of custom prebuild Meals. Save time and Select a Meal that fits your needs.</p>
                                </div>
                            </div>
                            <div class="pb-2 grid grid-cols-[auto_1fr] gap-5 items-center">
                                <CustomMeal size={60}></CustomMeal>
                                <div class="grid auto-rows-max">
                                    <h3 class="text-lg">Build Custom Meals</h3>
                                    <p class="text-base text-zinc-400">Add foods, adjust portions and make it your own.</p>
                                </div>
                            </div>
                            <div class="pb-2 grid grid-cols-[auto_1fr] auto-cols-max gap-5 items-center">
                                <CustomBookmark size={60}></CustomBookmark>
                                <div class="grid auto-rows-max">
                                    <h3 class="text-lg">Save & Reuse</h3>
                                    <p class="text-base text-zinc-400">Save your meals and track them with one tap at any time.</p>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div class="h-full bg-light-accent-darker1">
                    </div>

                    <div class="pl-14 h-full w-full">
                        <div class="w-full h-full border-[2px] border-light-accent-darker1">IMAGE</div>
                    </div>

                </div>

                <div class="px-14 pb-12 flex items-center justify-center">
                    <button onclick={onCreateFirstMeal} class="cursor-pointer bg-brand py-3 px-15 rounded-2xl flex gap-4 items-center leading-none">
                        <Bookmark size={25} />
                        <span class="leading-none text-[20px]">Create your first meal</span>
                    </button>
                </div>
            </div>
        </div>
    </section>
{/if}


{#if showFoodModal}
    <FoodModal submit={submit} onClose={handleFoodModalClose} {selectedFood}  />
{/if}
{#if showEditFoodModal}
    <EditFoodModal onCancel={onCancelEditFoodModal}
                   onDelete={() => deleteMealLogEntry(selectedMealFood)}
                   onSave={saveEditFoodModal}
                   bind:amount={selectedMealFoodDeepCopy.amount}
                   name={selectedMealFoodDeepCopy.name}
                   foodId={selectedMealFoodDeepCopy.foodId} />
{/if}
