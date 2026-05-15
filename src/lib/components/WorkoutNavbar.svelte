<script>
    import NavbarLayout from "$lib/components/NavbarLayout.svelte";

    const routesAndNamesFood = [
        { name: "Dashboard", route: "/workout/dashboard" },
        { name: "Edit Workout", route: "/workout/editWorkout" }, //change name and access so only coaches can access it

        // { name: "Tracker", route: "/food/trackFood" },
        // { name: "Goals", route: "/food/goals" },
        // { name: "Recipes", route: "food/recipes"}
    ];
</script>

<NavbarLayout routesAndNames={routesAndNamesFood}></NavbarLayout>