<script lang="ts">
    import {goto} from "$app/navigation";
    import ContextButton from "./ContextButton.svelte";
    import {fade} from 'svelte/transition';

    export let data;
    export let href;

    // TODO: Current user name

    // @ts-ignore
    let user = ServiceManager.getUserService().getCurrentUser();
    console.log(user);

    function logout() {
        // @ts-ignore
        ServiceManager.getUserService().logout();
        goto('/login');
    }

    function startTour(id) {
        console.log(`Enrolling tour with id: ${id}`);
        // @ts-ignore
        ServiceManager.getUserService().enrollTour(parseInt(id));
        goto(`/tours/${id}`);
    }
</script>

<main class="flex items-center h-screen flex-col py-8 mx-48">
    <h1>City Guide Walks</h1>
    <header class="mb-8 flex justify-between items-center w-full">
        <nav class="flex flex-row gap-4">
            <a href="/" class="nav-item {href === '/' ? 'selected' : ''}">
                Všetky výlety
            </a>
            <a href="/tours/ongoing" class="nav-item {href === '/tours/ongoing' ? 'selected' : ''}">
                Prebiehajúce výlety
            </a>
            <a href="/tours/finished" class="nav-item {href === '/tours/finished' ? 'selected' : ''}">
                Absolvované výlety
            </a>
        </nav>
        <div class="flex items-center gap-2">
            <h3>{user.username}</h3>
            <img src="{user.getGravatarUrl()}"
                 class="max-w-[32px] rounded-full">
            <button type="button" on:click|preventDefault={logout}>
                <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg" class="stroke-neutral-400 hover:stroke-neutral-100">
                    <path d="M12 12h7m0 0l-3 3m3-3l-3-3M19 6V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2v-1"
                          stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        </div>
    </header>
    <section class="flex flex-col gap-8 pb-8" id="tour-container">
        {#each [...data] as [tour, status], i}
            <div class="text-left flex flex-row gap-4" in:fade>
                <img src="{tour.image}" alt="{tour.name}" loading="lazy" class="w-80 max-w-xs rounded-lg aspect-auto object-cover shrink-0 bg-neutral-800">
                <!--<object data="{tour.image}" type="image/jpeg" class="max-w-xs h-60 w-80 rounded-lg aspect-auto object-cover basis-full shrink-0">
                    <div class="h-60 w-80 bg-neutral-800 animate-pulse rounded-lg"></div>
                </object>-->
                <div class="flex flex-col justify-between" data-sveltekit-preload-data="off">
                    <div>
                        <div class="flex justify-between items-center">
                            <a class="mb-1 h2" href="/tours/{tour.id}">{tour.name}</a>
                            {#if tour['averageRating'] !== -1}
                                <div class="flex items-center gap-2 stroke-yellow-400 text-yellow-400">
                                    <span>{tour['averageRating'] % 1 === 0 ? tour['averageRating'].toFixed(0) : tour['averageRating'].toFixed(2)}
                                        /5</span>
                                    <svg width="20px" height="20px" stroke-width="1.5" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.587 8.236l2.598-5.232a.911.911 0 011.63 0l2.598 5.232 5.808.844a.902.902 0 01.503 1.542l-4.202 4.07.992 5.75c.127.738-.653 1.3-1.32.952L12 18.678l-5.195 2.716c-.666.349-1.446-.214-1.319-.953l.992-5.75-4.202-4.07a.902.902 0 01.503-1.54l5.808-.845z"
                                              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </div>
                            {/if}
                        </div>
                        <p>{tour.description}</p>
                    </div>
                    <ContextButton tour={tour} status={status} />
                </div>
            </div>
        {/each}
    </section>
</main>