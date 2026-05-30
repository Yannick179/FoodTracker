<script>
    import DateSelector from "$lib/components/organism/DateSelector.svelte";
    import Card from "$lib/components/organism/Card.svelte";
    import PrimaryButton from "$lib/components/atoms/PrimaryButton.svelte";
    import Modal from "$lib/components/organism/Modal.svelte";
</script>

<div class="items-center place-items-center pl-10">
    <DateSelector/>
    <Card>
        <PrimaryButton onClick={() => {}} Text="Submit" />
    </Card>
</div>

<DateSelector/>

<!--<Modal>-->
<!--    <span>text</span>-->
<!--    <div class="h-[400px] w-[400px]">wefw</div>-->
<!--</Modal>-->

