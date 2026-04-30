<script lang="ts">
    const apps = [
        {
            name: 'Food Tracker',
            description: 'Log meals, track calories, and visualize your nutrition.',
            icon: '🍎',
            href: '/food/home'
        },
        {
            name: 'Bodyweight Tracker',
            description: 'Monitor your weight progress over time with clean charts.',
            icon: '⚖️',
            href: '/bodyweight'
        },
        {
            name: 'Gym Program Creator',
            description: 'Build and manage custom workout programs easily.',
            icon: '🏋️',
            href: '/gym'
        }
    ];
</script>

<!--<div class="min-h-screen  bg-zinc-950  to-black text-white p-6">-->
<!--    <div class="max-w-5xl mx-auto">-->
<!--        <header class="mb-10">-->
<!--            <h1 class="text-4xl font-bold tracking-tight">Your Fitness Hub</h1>-->
<!--            <p class="text-zinc-400 mt-2">Everything you need to track and improve your health</p>-->
<!--        </header>-->

<!--        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">-->
<!--            {#each apps as app}-->
<!--                <a-->
<!--                        href={app.href}-->
<!--                        class="group block p-6 rounded-2xl bg-zinc-900/70 backdrop-blur border border-zinc-800 hover:border-zinc-700 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"-->
<!--                >-->
<!--                    <div class="flex items-center justify-between mb-4">-->
<!--                        <span class="text-3xl">{app.icon}</span>-->
<!--                        <span class="text-xs text-zinc-500 group-hover:text-zinc-300 transition">Open →</span>-->
<!--                    </div>-->

<!--                    <h2 class="text-xl font-semibold mb-2 group-hover:text-white">-->
<!--                        {app.name}-->
<!--                    </h2>-->

<!--                    <p class="text-sm text-zinc-400 leading-relaxed">-->
<!--                        {app.description}-->
<!--                    </p>-->
<!--                </a>-->
<!--            {/each}-->
<!--        </div>-->

<!--        <footer class="mt-16 text-center text-zinc-600 text-sm">-->
<!--            Build consistency. Track progress. Stay disciplined.-->
<!--        </footer>-->
<!--    </div>-->
<!--</div>-->


<div class=" bg-zinc-950 text-white p-6 flex flex-col items-center overflow-y-auto [scrollbar-gutter:stable]">
    <div class="w-full max-w-6xl">

        <header class="mb-12 mt-8 text-center">
            <h1 class="text-4xl font-bold tracking-tight">Your Insert Name</h1>
            <p class="text-zinc-400 mt-2">Everything you need to track and improve your health</p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each apps as app}
                <a
                        href={app.href}
                        class="group block p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-600 transition-all duration-200"
                >
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-4xl">{app.icon}</span>
                        <span class="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                            Open →
                        </span>
                    </div>

                    <h2 class="text-xl font-semibold mb-2">
                        {app.name}
                    </h2>

                    <p class="text-sm text-zinc-400 leading-relaxed">
                        {app.description}
                    </p>
                </a>
            {/each}
        </div>

        <footer class="mt-20 mb-10 text-center text-zinc-600 text-sm tracking-wide">
            Build consistency. Track progress. Stay disciplined.
        </footer>
    </div>
</div>