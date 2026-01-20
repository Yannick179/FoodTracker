<script lang="ts">
    // let { inflate, deflate } = $props();

    export let selectedFood: any;
    let amount = 0;

    async function submit() {

        await fetch('/api/trackfood', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({foodid: selectedFood.id, amount: amount, userid: 1}) //to add: person.id or something
        });
        close();
    }
</script>

<div class="backdrop">
    <div class="modal">
        <h2>{selectedFood.name} per 100g</h2>
        <div>Calories: {selectedFood.calories}g</div>
        <div>Protein: {selectedFood.protein}g</div>
        <div>Carbohydrates: {selectedFood.carbs}g</div>
        <div>Fats: {selectedFood.fats}g</div>

        <label>
            Amount (g)
            <input type="number" bind:value={amount} required />
        </label>
        <button on:click={submit}>Enter</button>
        <button on:click={close}>Cancel</button>
    </div>
</div>

<!--<style>-->
<!--    .backdrop {-->
<!--        position: fixed;-->
<!--        inset: 0;-->
<!--        background: rgba(0,0,0,0.5);-->
<!--    }-->
<!--    .modal {-->
<!--        background: white;-->
<!--        padding: 1rem;-->
<!--        margin: 10% auto;-->
<!--        width: 300px;-->
<!--    }-->
<!--</style>-->
