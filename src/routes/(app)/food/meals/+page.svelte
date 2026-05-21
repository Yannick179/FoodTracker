<script lang="ts">
    let hasMeal: boolean = false;
</script>

<!--<div>-->
<!--    Hey, this is our meal Creation tool. You can search for foods, customize your own meals and save them so you dont have to track stuff you eat everyday manually.-->
<!--</div>-->
{#if hasMeal}

{:else}
    <div class="w-full py-12 px-16 h-full">
        <div class="h-full w-full rounded-2xl text-xl border-[2px] border-card-border bg-card">
            <div class="h-full w-full grid grid-cols-[35%_2px_65%] px-14 py-12 gap-14">

                <div class="h-full">
                    <div class="pb-10">LOGO</div>
                    <div class=" text-5xl font-bold pb-10">Create Your Meals</div>
                    <div class="pb-10 text-xl text-zinc-400">Search foods, build custom meals, and save your favorites for faster tracking everyday</div>
                    <div class="pb-10">Icon with Text</div>
                    <div class="pb-10">Icon with Text</div>
                    <div class="pb-10">Icon with Text</div>

                </div>

                <div class="h-full bg-card-border">
                </div>

                <div class="h-full"></div>

            </div>
        </div>
    </div>
{/if}

