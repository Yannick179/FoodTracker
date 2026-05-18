<script>

    import NavbarLayout from "$lib/components/NavbarLayout.svelte";

    export let routesAndNamesBodyweight = [
        { name: "Dashboard", route: "/bodyweight/dashboard", markActive: false },
        { name: "Weight", route: "/bodyweight/weight", markActive: false },
        { name: "Goals", route: "/bodyweight/goals", markActive: false },
        { name: "Settings", route: "/bodyweight/settings", markActive: false }
    ];

</script>


<NavbarLayout routesAndNames={routesAndNamesBodyweight} />