<script lang="ts">
    import CustomSearch from "$lib/components/Icons/CustomSearch.svelte";
    import CustomBookmark from "$lib/components/Icons/CustomBookmark.svelte";
    import CustomMeal from "$lib/components/Icons/CustomMeal.svelte";
    import {Bookmark} from "lucide-svelte";
    import type {Food} from "../../../api/food/searchFood/+server";
    import {onMount} from "svelte";
    import FoodModal from "$lib/components/FoodModal.svelte";
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
    let showModal: boolean = $state(false);
    let triesFirstMeal: boolean = $state(false);
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


    function onClick() {
        triesFirstMeal = true;
    }

    function open(food: Food) {
        selectedFood = food;
        showModal = true;
    }

    function handleClose() {
        showModal = false;

        selectedFood = {
            name: "",
            id: 0,
            calories: 0,
            protein: 0,
            carbohydrates: 0,
            fat: 0
        };
        // loadFoods();
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
        handleClose();
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
            const res = await fetch("/api/food/saveMealTemplate", {
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
            //pass
        }


    }

    async function loadFoods(q: string = '') {
        try {
            const url = q ? `/api/food/searchFood?q=${encodeURIComponent(q)}` : '/api/food/searchFood';
            const res = await fetch(url);
            if (!res.ok) throw new Error('Failed to fetch foods');
            searchedFoods = await res.json();
        } catch (err: any) {
            console.error("Error loading foods", err);
        }
    }

    function handleSearch(query: string): void {
        loadFoods(query);
    }

    onMount(() => loadFoods());
</script>


{#if hasMeal || triesFirstMeal}
    <section class="w-full py-6 px-5 h-full">

        <div class="w-full h-full grid grid-cols-[5fr_11fr_4fr] gap-5">
            <!-- Search bar -->
            <div class="w-full h-full rounded-2xl border-[2px] border-light-accent-darker1 bg-card">
                <input
                        type="text"
                        placeholder="Search..."
                        oninput={(e) => handleSearch(e.currentTarget.value)}
                        class="mt-1 w-full rounded-2xl border-2 border border-neutral-400 px-4 py-2 text-zinc-100
				placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-600/40"
                />
                {#each searchedFoods as food}
                    <button
                            onclick={() => open(food)}
                            class="cursor-pointer w-full text-left rounded-2xl border-2 border border-neutral-400 tansition-200
						px-4 py-3 hover:bg-neutral-800 transition flex justify-between items-center"
                    >
                        <span class="text-zinc-100">{food.name}</span>
                        <span class="text-zinc-500 text-sm">Add</span>
                    </button>
                {/each}
            </div>

            <!-- Meal -->
            <div class="w-full h-full rounded-2xl border-[2px] border-light-accent-darker1 bg-card">
                <label class="text-xl font-semibold">Meal name
                    <input
                            type="text"
                            bind:value={mealName}
                            placeholder="Meal Name"
                            class="mt-1 text-lg font-normal w-full rounded border-2 border-zinc-700 px-3 py-2.5 focus:border-brand focus:outline-none"/>
                </label>
                <table class="w-full">
                    <thead>
                        <tr>
                            <th>Food</th>
                            <th>Amount</th>
                            <th>Calories</th>
                            <th>Protein</th>
                            <th>Carbohydrates</th>
                            <th>Fat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each mealFoods as food}
                            <tr>
                                <td>{food.name}</td>
                                <td>{food.amount}</td>
                                <td>{food.calories}</td>
                                <td>{food.protein}</td>
                                <td>{food.carbohydrates}</td>
                                <td>{food.fat}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
                <button onclick={saveMealTemplate} class="cursor-pointer w-full text-left rounded-2xl bg-brand">
                    Save meal template
                </button>
            </div>

            <!-- Summary-->
            <div class="w-full h-full rounded-2xl border-[2px] border-light-accent-darker1 bg-card" ></div>
        </div>
    </section>
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
                    <button onclick={onClick} class="cursor-pointer bg-brand py-3 px-15 rounded-2xl flex gap-4 items-center leading-none">
                        <Bookmark size={25} />
                        <span class="leading-none text-[20px]">Create your first meal</span>
                    </button>
                </div>
            </div>
        </div>
    </section>
{/if}


{#if showModal}
    <FoodModal submit={submit} onClose={handleClose} {selectedFood}  />
{/if}
