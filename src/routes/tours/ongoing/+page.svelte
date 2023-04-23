<script lang="ts">
    import TourList from "../../../components/TourList.svelte";

    let ongoingTours = window['ServiceManager'].getTourService().getOngoingTours();
    console.log(ongoingTours);
</script>

<TourList data={ongoingTours} href="/tours/ongoing"/>

<!--
<main class="flex items-center h-screen flex-col py-8 mx-48">
    <h1>City Guide Walks</h1>
    <header class="mb-8 flex justify-between items-center w-full">
        <nav class="flex flex-row gap-4">
            <a href="/" class="nav-item">
                Všetky výlety
            </a>
            <a href="/tours/ongoing" class="nav-item selected">
                Prebiehajúce výlety
            </a>
            <a href="/tours/finished" class="nav-item">
                Absolvované výlety
            </a>
        </nav>
        <div class="flex items-center gap-2">
            <h3>Jakub Bordáš</h3>
            <img src="http://gravatar.com/avatar/57373af31bf3e5b2d7278dd6378181db?s=32"
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
        {#each [...ongoingTours] as [tour, status]}
            <div class="text-left flex flex-row gap-4">
                <img src="{tour.image}"
                     class="max-w-xs rounded-lg aspect-auto object-cover" alt="Trnava">
                <div class="flex flex-col justify-between">
                    <div>
                        <div class="flex justify-between items-center">
                            <h2 class="mb-1">{tour.name}</h2>
                            {#if tour.averageRating !== -1}
                                <div class="flex items-center gap-2 stroke-yellow-400 text-yellow-400">
                                    <span>{tour.averageRating}/5</span>
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
                    {#if status === "NOT_STARTED"}
                        <button type="button"
                                class="mt-4 border-neutral-600 border rounded px-4 py-1.5 text-neutral-100 text-sm hover:bg-neutral-600 self-start"
                                on:click|preventDefault={() => startTour(tour.id)}>
                            Začať výlet
                        </button>
                    {:else if status === "IN_PROGRESS"}
                        <a href="tour/{tour.id}"
                           class="mt-4 border-neutral-600 border rounded px-4 py-1.5 text-neutral-100 text-sm hover:bg-neutral-600 self-start">
                            Prebiehajúci výlet
                        </a>
                    {:else if status === "FINISHED"}
                        <a href="tour/{tour.id}"
                           class="mt-4 border-neutral-600 border rounded px-4 py-1.5 text-neutral-100 text-sm hover:bg-neutral-600 self-start">
                            Dokončený výlet
                        </a>
                    {:else if status === "UNAVAILABLE"}
                        <button type="button"
                                class="mt-4 border-neutral-600 border rounded px-4 py-1.5 text-neutral-100 text-sm hover:bg-neutral-600 self-start cursor-not-allowed">
                            Nedostupné
                        </button>
                    {/if}
                </div>
            </div>
        {/each}
    </section>
</main>-->
