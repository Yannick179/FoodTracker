<script>
    let protein = $state(150);
    let carbohydrates = $state(250);
    let fats = $state(70);
    let calories = $derived(Math.trunc(protein * 4.1 + carbohydrates * 4.1 + fats * 9.1));

    async function handleSave() {
        try {
            const res = await fetch('/api/food/goals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    calories: calories,
                    protein: protein,
                    carbohydrates: carbohydrates,
                    fats: fats,
                })
            });
            console.log(res);
            if (res.ok) {
                alert(`Saved:
Calories: ${calories}
Protein: ${protein}g
Carbohydrates: ${carbohydrates}g
Fats: ${fats}g`);
            }
            else alert("Something went wrong");
        }
        catch (err) {
            //
        }
    }
</script>

<div class="min-h-screen p-10">
    <div class="max-w-3xl mx-auto space-y-6">

        <!-- Header -->
        <div>
            <h1 class="text-3xl font-semibold">Goals</h1>
            <p class="">Adjust your daily nutrition targets</p>
        </div>

        <div class="p-8 rounded-2xl border-2 border border-neutral-400">

<!--            <div>-->
<!--                <label class="block text-sm ">Calories (kcal)</label>-->
<!--                <input-->
<!--                        type="number"-->
<!--                        bind:value={calories}-->
<!--                        class="w-full border border-neutral-400 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"-->
<!--                />-->
<!--            </div>-->

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div>
                    <label class="block mb-1">Protein (g)</label>
                    <input
                            type="number"
                            bind:value={protein}
                            class="w-full border-2 border-neutral-400 rounded-xl px-4 py-2 focus:outline-none focus:border-neutral-100"
                    />
                </div>

                <div>
                    <label class="block mb-1">Carbohydrates (g)</label>
                    <input
                            type="number"
                            bind:value={carbohydrates}
                            class="w-full border-2 border-neutral-400 rounded-xl px-4 py-2 focus:outline-none focus:border-neutral-100"
                    />
                </div>

                <div>
                    <label class="block mb-1">Fats (g)</label>
                    <input
                            type="number"
                            bind:value={fats}
                            class="w-full border-2 border-neutral-400 rounded-xl px-4 py-2 focus:outline-none focus:border-neutral-100"
                    />
                </div>

            </div>

            <!-- Summary -->
            <div class="rounded-xl p-4 text-sm text-gray-300">
                <p>Total kcal from macros:</p>
                <p class="text-lg mt-1 font-medium">
                    {calories} kcal
                </p>
            </div>

            <div class="flex justify-end">
                <button
                        on:click={handleSave}
                        class=" hover:bg-blue-700 px-5 py-2 border-2 border-neutral-400 rounded-xl font-medium transition"
                >
                    Save Goals
                </button>
            </div>

        </div>
    </div>
</div>