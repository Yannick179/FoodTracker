<script>
    import NavbarLayout from "$lib/components/NavbarLayout.svelte";

    const routesAndNamesFood = [
        { name: "Dashboard", route: "/workout/dashboard", markActive: false },
        { name: "Edit Workout", route: "/workout/editWorkout", markActive: false }, //change name and access so only coaches can access it

    ];
</script>

<NavbarLayout routesAndNames={routesAndNamesFood}></NavbarLayout>