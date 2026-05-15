<script>
    import NavbarLayout from "$lib/components/NavbarLayout.svelte";

    const routesAndNamesFood = [
        { name: "Dashboard", route: "/workout/dashboard" },
        { name: "Training", route: "/workout/training" },
        // { name: "Tracker", route: "/food/trackFood" },
        // { name: "Goals", route: "/food/goals" },
        // { name: "Recipes", route: "food/recipes"}
    ];
</script>

<NavbarLayout routesAndNames={routesAndNamesFood}></NavbarLayout>