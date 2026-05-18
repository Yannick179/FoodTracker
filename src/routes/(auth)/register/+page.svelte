<script lang="ts">
    import {goto} from "$app/navigation";

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
            goto('/home');
        } else {
            const data = await res.json();
            console.error(data.error);
            error = data.error;
        }


        loading = false;
    }
</script>

<div class="min-h-screen flex items-center justify-center text-zinc-100 p-6">

    <div class="flex flex-col max-w-md p-6 space-y-5">

        <div>Logo</div>

        <!-- prebuilt google button for sign in-->
        <a class="gsi-material-button" href="/api/auth/google" >

            <div class="gsi-material-button-state"></div>
            <div class="gsi-material-button-content-wrapper">
                <div class="gsi-material-button-icon">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                </div>
                <span class="gsi-material-button-contents">Sign in with Google</span>
                <span style="display: none;">Sign in with Google</span>
            </div>
        </a>

        <button>

        </button>
        <div class="text-center text-zinc-300 text-xl font-semibold">
            or
        </div>

        <form on:submit|preventDefault={register} class="space-y-4">

            <div>
                <label class="text-xl font-semibold">Email address
                    <input
                            type="email"
                            bind:value={email}
                            required
                            placeholder="name@domain.com"
                            class="mt-1 text-xl font-normal w-full rounded border-2 border-zinc-700 px-4 py-3"/>
                </label>
            </div>

            <div>
                <label class="text-xl font-semibold">Password
                <input
                        type="password"
                        bind:value={password}
                        required
                        placeholder="password"
                        class="mt-1 text-xl font-normal w-full rounded border-2 border-zinc-700 px-4 py-3"/>
                </label>
            </div>

            <!-- Confirm -->
            <div>
                <label class="text-xl font-semibold">Confirm password
                    <input
                            type="password"
                            bind:value={confirmPassword}
                            required
                            placeholder="password"
                            class="mt-1 text-xl font-normal w-full rounded border-2 border-zinc-700 px-4 py-3"/>
                </label>

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
                    class="cursor-pointer w-full rounded-3xl font-semibold
				bg-white text-zinc-900 hover:bg-neutral-200  px-4 py-3 text-xl"
                    disabled={loading}>
                {loading ? 'Creating…' : 'Sign up'}
            </button>

        </form>

        <p class="text-xl text-zinc-500 text-center">
            Already have an account?
            <a href="/login" class="text-zinc-300 hover:underline">Sign in</a>
        </p>

    </div>
</div>