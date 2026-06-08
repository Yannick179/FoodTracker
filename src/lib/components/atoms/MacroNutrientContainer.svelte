<script lang="ts">
    let {
        header,
        text
    }: {
        header: string;

        //only accepts string as representation logic should be done before entering value to container
        text: string | number;
    } = $props();
</script>

<div class="macro-nutrient-container">
    <h4 class="macro-nutrient-header">{header}</h4>
    <span class="macro-nutrient-content">{text}</span>
</div>