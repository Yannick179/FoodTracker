<script lang="ts">
    let email = '';
    let password = '';
    let confirmPassword = '';

    let loading = false;
    let error = '';
    let success = false;

    function validate() {
        if (password.length < 10) return 'Password must be at least 10 characters';
        if (password !== confirmPassword) return 'Passwords do not match';
        return '';
    }

    async function register() {
        error = '';
        success = false;

        const validationError = validate();
        if (validationError) {
            error = validationError;
            return;
        }

        loading = true;

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });
        email = password = confirmPassword = '';


        if (res.ok) {
            window.location.href = '/Home';
        } else {
            const data = await res.json();
            console.error(data.error);
            error = data.error;
        }


        loading = false;
    }
</script>

<div class="min-h-screen flex items-center justify-center  text-zinc-100 p-6">

    <div class="w-full max-w-sm rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl p-6 space-y-5">

        <div>
            <h1 class="text-lg font-semibold">Create account</h1>
            <p class="text-xs text-zinc-500">Get started in seconds</p>
        </div>

        <form on:submit|preventDefault={register} class="space-y-4">

            <!-- Email -->
            <div>
                <label class="text-xs text-zinc-400">Email</label>
                <input
                        type="email"
                        bind:value={email}
                        required
                        class="mt-1 w-full rounded-xl bg-zinc-800/60 border border-zinc-700 px-3 py-2"
                />
            </div>

            <!-- Password -->
            <div>
                <label class="text-xs text-zinc-400">Password</label>
                <input
                        type="password"
                        bind:value={password}
                        required
                        class="mt-1 w-full rounded-xl bg-zinc-800/60 border border-zinc-700 px-3 py-2"
                />
            </div>

            <!-- Confirm -->
            <div>
                <label class="text-xs text-zinc-400">Confirm password</label>
                <input
                        type="password"
                        bind:value={confirmPassword}
                        required
                        class="mt-1 w-full rounded-xl bg-zinc-800/60 border border-zinc-700 px-3 py-2"
                />
            </div>

            {#if error}
                <p class="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-2">
                    {error}
                </p>
            {/if}

            {#if success}
                <p class="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2">
                    Account created ✔
                </p>
            {/if}

            <button
                    class="cursor-pointer w-full rounded-xl py-2 font-medium transition
				bg-white text-zinc-900 hover:bg-zinc-200 disabled:opacity-50"
                    disabled={loading}>
                {loading ? 'Creating…' : 'Sign up'}
            </button>

        </form>

        <p class="text-xs text-zinc-500 text-center">
            Already have an account?
            <a href="/login" class="text-zinc-300 hover:underline">Sign in</a>
        </p>

    </div>
</div>