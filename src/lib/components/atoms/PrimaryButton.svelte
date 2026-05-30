<script lang="ts">

    let {
        Text,
        onClick
    }: {
        Text: String;
        onClick: () => void;
    } = $props();

</script>

<button onclick={() => onClick()} class="primary-button">{Text}</button>