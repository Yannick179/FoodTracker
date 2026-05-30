<script lang="ts">
    let { children } = $props();
</script>

<div class="modal-overlay">
    <div class="modal-card">
        {@render children()}

    </div>
</div>