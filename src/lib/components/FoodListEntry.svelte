<script lang="ts">
    export let name: string;
    export let amount: number;
    export let calories: number;
    export let protein: number;
    export let carbs: number;
    export let fats: number;
</script>

<div class="border rounded">
    <div class="font-medium">{name}</div>
    <div class="text-sm">
        <span>Calories: {calories}</span>
        <span>Amount: {amount}g</span>

    </div>

    <div class="text-sm">
        <span>P: {protein}g</span>
        <span> | C: {carbs}g</span>
        <span> | F: {fats}g</span>
    </div>
</div>