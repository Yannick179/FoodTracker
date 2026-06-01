<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';

    let {
        name,
        protein,
        carbohydrates,
        fats,
        calories,
        amount,
        ...rest
    }: {
        name: string;
        protein: number;
        carbohydrates: number;
        fats: number;
        calories: number;
        amount: number;
            } & HTMLButtonAttributes = $props();
</script>

<button type="button"
        class="list-item-button"
        {...rest}>
    <span class="li-main">
        <span class="li-name">{name}</span>
        <span class="li-amount">{amount} g</span>
    </span>

    <span class="li-stats">
        <span class="li-stat">
            <span class="li-label">kcal</span>
            <span class="li-value">{calories}</span>
        </span>
        <span class="li-stat">
            <span class="li-label">PROT</span>
            <span class="li-value-prot">{protein}g</span>
        </span>
        <span class="li-stat">
            <span class="li-label">CARB</span>
            <span class="li-value-carb">{carbohydrates}g</span>
        </span>
        <span class="li-stat">
            <span class="li-label">FAT</span>
            <span class="li-value-fat">{fats}g</span>
        </span>
    </span>
</button>
