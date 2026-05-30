<script lang="ts">

    let {
        Text,
        onClick
    }: {
        Text: string;
        onClick: () => void;
    } = $props();

</script>

<button onclick={() => onClick()} class="secondary-button">{Text}</button>