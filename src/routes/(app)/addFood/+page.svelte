<script lang="ts">
    let name = '';
    let calories: number = 0;
    let fats: number = 0;
    let protein: number = 0;
    let carbs: number = 0;

    let loading = false;
    let error = '';
    let success = false;

    function validate() {
        if (!name.trim()) {
            return 'Name is required';
        }

        const macros = [protein, carbs, fats];

        // check negatives for all numeric inputs
        const allValues = [calories, ...macros];
        for (const v of allValues) {
            if (v < 0) return 'Values cannot be negative';
        }

        if (calories > 900) {
            return 'Calories must be ≤ 900 kcal';
        }

        for (const v of macros) {
            if (v > 100) {
                return 'Protein, carbs, and fats must be ≤ 100g each';
            }
        }

        return '';
    }

    async function submitFood() {
        error = '';
        success = false;

        const validationError = validate();
        if (validationError) {
            error = validationError;
            return;
        }

        loading = true;

        const res = await fetch('/api/addFood', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                Calories: Number(calories),
                Protein: Number(protein),
                Carbohydrates: Number(carbs),
                Fat: Number(fats)
            })
        });

        if (!res.ok) {
            error = 'Failed to save meal';
        } else {
            success = true;
            name = '';
            calories = fats = protein = carbs = 0;
        }

        loading = false;
    }
</script>

<!-- Layout -->
<div class="min-h-screen flex items-center justify-center bg-zinc-800 text-zinc-100 p-6">

    <div class="w-full max-w-md rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl p-6 space-y-5">

        <!-- Header -->
        <div>
            <h1 class="text-lg">Add food</h1>
            <p class="text-xs text-zinc-500">Track macros per 100g</p>
        </div>

        <form on:submit|preventDefault={submitFood} class="space-y-4">

            <!-- Name -->
            <div>
                <label class="text-xs text-zinc-400">Food name</label>
                <input
                        class="mt-1 w-full rounded-xl bg-zinc-800/60 border border-zinc-700 px-3 py-2
					focus:outline-none focus:ring-2 focus:ring-zinc-500/40"
                        bind:value={name}
                        required
                />
            </div>

            <!-- Grid inputs -->
            <div class="grid grid-cols-2 gap-3">

                <div>
                    <label class="text-xs text-zinc-400">Calories</label>
                    <input type="number"
                           class="mt-1 w-full rounded-xl bg-zinc-800/60 border border-zinc-700 px-3 py-2"
                           bind:value={calories} />
                </div>

                <div>
                    <label class="text-xs text-zinc-400">Protein</label>
                    <input type="number"
                           class="mt-1 w-full rounded-xl bg-zinc-800/60 border border-zinc-700 px-3 py-2"
                           bind:value={protein} />
                </div>

                <div>
                    <label class="text-xs text-zinc-400">Carbs</label>
                    <input type="number"
                           class="mt-1 w-full rounded-xl bg-zinc-800/60 border border-zinc-700 px-3 py-2"
                           bind:value={carbs} />
                </div>

                <div>
                    <label class="text-xs text-zinc-400">Fats</label>
                    <input type="number"
                           class="mt-1 w-full rounded-xl bg-zinc-800/60 border border-zinc-700 px-3 py-2"
                           bind:value={fats} />
                </div>

            </div>

            <!-- Error / success -->
            {#if error}
                <p class="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-2">
                    {error}
                </p>
            {/if}

            {#if success}
                <p class="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2">
                    Meal saved ✔
                </p>
            {/if}

            <!-- Button -->
            <button
                    class="cursor-pointer w-full rounded-xl py-2 transition
				bg-white text-zinc-900 hover:bg-zinc-200 disabled:opacity-50"
                    disabled={loading}
            >
                {loading ? 'Saving…' : 'Add Meal'}
            </button>

        </form>
    </div>
</div>