<script lang="ts">
    type Props = {
        value: string;
        autocompleteOptions: string[];
    };

    let { value, autocompleteOptions }: Props = $props();
    let suggestions: string[] = $state([]);
    let open = $state(false);

    function onInput() {
        const q = value.trim().toLowerCase();

        if (!q) {
            suggestions = [];
            return;
        }

        suggestions = autocompleteOptions.filter(o =>
            o.toLowerCase().startsWith(q)
        );
    }

    function select(item: string) {
        value = item;
        suggestions = [];
        open = false;
    }

    function handleFocus() {
        open = true;
        onInput();
    }

    function handleBlur() {
        // small delay so click works before closing
        setTimeout(() => {
            open = false;
        }, 100);
    }
</script>

<div class="relative w-full">
    <input
            type="text"
            bind:value
            oninput={onInput}
            onfocus={handleFocus}
            onblur={handleBlur}
            placeholder="Type exercise..."
            class="w-full p-1 outline-none bg-transparent"
    />

    {#if open && suggestions.length > 0}
        <ul class="absolute border w-full z-10 max-h-40 overflow-y-auto">
            {#each suggestions as s}
                <li class="w-full p-2 hover:bg-gray-200 bg-neutral-900 cursor-pointer">
                    <button
                            type="button"
                            class="w-full text-left"
                            onclick={() => select(s)}
                    >
                        {s}
                    </button>
                </li>
            {/each}
        </ul>
    {/if}
</div>