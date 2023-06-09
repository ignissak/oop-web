<script lang="ts">
    import type {PageData} from './$types';
    import ContextButton from "../../../components/ContextButton.svelte";
    import PointDetail from "../../../components/PointDetail.svelte";
    import {derived, writable} from "svelte/store";
    import Modal from "../../../components/Modal.svelte";
    import { fade } from 'svelte/transition';
    import fadeScale from "../../../js/svelte-transitions-fade-scale";
    import {cubicInOut} from "svelte/easing";

    export let data: PageData;
    const tourId = parseInt(data.tourId);

    // @ts-ignore
    let tour = ServiceManager.getTourService().getTour(tourId);
    console.log(tour)

    // @ts-ignore
    let relationship = ServiceManager.getTourService().getUserTourRelationshipString(tourId);
    console.log(relationship)
    let ongoingData = writable(undefined);

    if (relationship == "IN_PROGRESS") {
        // @ts-ignore
        ongoingData.set(ServiceManager.getTourService().getOngoingTour(tourId))
        console.log($ongoingData);
    }

    let chosenPoint = tour['mapPoints'].get(0);
    console.log(chosenPoint)

    function hasVisited(pointName) {
        console.log("hasVisited: ", pointName);
        console.log($ongoingData);
        if (relationship == "IN_PROGRESS") {
            for (let i = 0; i < $ongoingData['visitedMapPoints'].length; i++) {
                console.log("Checking: ", $ongoingData['visitedMapPoints'].at(i)['name'])
                if ($ongoingData['visitedMapPoints'].at(i)['name'] == pointName) {
                    return true;
                }
            }
        }
        return false;
    }

    function goBack() {
        history.back();
    }

    function selectPoint(pointName) {
        console.log(pointName);
        for (let i = 0; i < tour['mapPoints'].size; i++) {
            console.log(tour['mapPoints'].get(i));
            if (tour['mapPoints'].get(i)['name'] == pointName) {
                chosenPoint = tour['mapPoints'].get(i);
                console.log("Choosing: ", chosenPoint);
            }
        }
    }

    function handleUpdate(ev) {
        console.log("HANDLING UPDATE");
        if (relationship == "IN_PROGRESS") {
            // @ts-ignore
            ongoingData.set(ServiceManager.getTourService().getOngoingTour(tourId));
            // @ts-ignore
            relationship = ServiceManager.getTourService().getUserTourRelationshipString(tourId);
            console.log($ongoingData);
        }
    }

    const formatStopName = derived(
        ongoingData,
        ($ongoingData) => (value) => {
            if (relationship == "FINISHED")
                return `${value['name']} ✓`;
            else if (relationship != "IN_PROGRESS")
                return `${value['name']}`;
            else
                return `${value['name']} ${$ongoingData['visitedMapPoints'].some(el => el.name === value['name']) ? '✓' : ''}`
        }
    )

    let isModalShown = false;
    let rating = 0;
    $: unselected = 5 - rating;

    function showModal() {
        // @ts-ignore
        rating = ServiceManager.getTourService().getRating(tourId);
        console.log(rating)
        isModalShown = true;
    }

    function saveRating(e) {
        // @ts-ignore
        ServiceManager.getTourService().rate(tourId, rating);
        // @ts-ignore
        tour = ServiceManager.getTourService().getTour(tourId);
        if (isModalShown) {
            isModalShown = false;
            e.target.parentElement?.parentElement?.close()
        }
    }

</script>

<Modal bind:showModal={isModalShown} >
    <h2 class="text-xl font-semibold mb-4">Hodnotenie výletu</h2>
    <div class="flex items-center gap-1">
        {#each Array(rating) as _, i}
            <button type="button" on:click|preventDefault={() => rating = i + 1}>
                <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        class="w-6 h-6"
                >
                    <path
                            fill-rule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clip-rule="evenodd"
                    />
                </svg>
            </button>
        {/each}
        {#each Array(unselected) as _, i}
            <button
                    type="button"
                    on:click|preventDefault={() => rating = rating + i + 1}
            >
                <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        class="w-6 h-6"
                >
                    <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                </svg>
            </button>
        {/each}
    </div>
    <button
            slot="button"
            class="rounded-lg mt-6 border border-neutral-600 hover:bg-neutral-600 py-1.5 px-3 w-full"
            on:click|preventDefault={(e) => saveRating(e)}
    >Uložiť
    </button>
</Modal>

<main class="flex items-center flex-col py-8 mx-48 {isModalShown ? 'opacity-25' : ''}" in:fade>
    <h1 class="mb-8 text-4xl font-bold">City Guide Walks</h1>
    <section class="w-full">
        <button type="button"
                on:click|preventDefault={goBack}
                class="flex items-center gap-2 stroke-neutral-400 text-neutral-400 hover:stroke-neutral-100 hover:text-neutral-100">
            <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12H3m0 0l8.5-8.5M3 12l8.5 8.5" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round"></path>
            </svg>
            Späť
        </button>
        <img src="{tour.image}"
             class="my-4 aspect-auto max-h-64 w-full rounded-lg object-cover" alt="Trnava"/>
        <div class="mb-2 flex items-center justify-between gap-4">
            <h2>{tour['name']}</h2>
            <div class="flex items-center gap-4">
                <ContextButton tour={tour} status={relationship}/>
                {#if relationship === "FINISHED"}
                    <button type="button" class="action-button" on:click|preventDefault={() => showModal()}>
                        <svg width="20px" height="20px" stroke-width="1.5" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.587 8.236l2.598-5.232a.911.911 0 011.63 0l2.598 5.232 5.808.844a.902.902 0 01.503 1.542l-4.202 4.07.992 5.75c.127.738-.653 1.3-1.32.952L12 18.678l-5.195 2.716c-.666.349-1.446-.214-1.319-.953l.992-5.75-4.202-4.07a.902.902 0 01.503-1.54l5.808-.845z"
                                  stroke-width="1.5" stroke-linecap="round"
                                  stroke-linejoin="round"></path>
                        </svg>
                        Ohodnotiť
                    </button>
                {/if}
            </div>
            <!-- <div class="badge">
              <svg width="20px" height="20px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2v4M12 18v4M22 12h-4M6 12H2M4.929 4.929l2.828 2.828M16.243 16.243l2.828 2.828M19.071 4.929l-2.828 2.828M7.757 16.243L4.93 19.07" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg
              >Prebiehajúci výlet
            </div> -->
        </div>
        <p class="mb-4 border-b border-neutral-800 pb-4">{tour['description']}</p>
        <section class="mb-4 border-b border-neutral-800 pb-4">
            <h3 class="mb-2">Zastávky</h3>
            <section class="flex justify-between gap-32">
                <aside class="grow basis-2/6">
                    <div class="text-neutral-400">
                        {#each [...tour['mapPoints']] as [key, value]}
                            <button type="button" on:click|preventDefault={() => selectPoint(value['name'])}
                                    class="cursor-pointer block text-left {chosenPoint['name'] === value['name'] ? 'stop-selected' : 'hover:text-neutral-100'}">
                                {$formatStopName(value)}
                            </button>
                        {/each}
                    </div>
                </aside>
                <PointDetail mapPoint={chosenPoint} visited={hasVisited(chosenPoint.name)} status={relationship}
                                 ongoingTour={$ongoingData} on:update={handleUpdate} />
            </section>
        </section>
        <div class="grid grid-cols-3 gap-6">
            <div>
                <h3>Hodnotenie</h3>
                {#if tour['averageRating'] === -1}
                    <p>Žiadne hodnotenie</p>
                {:else}
                    <p>{tour['averageRating'] % 1 === 0 ? tour['averageRating'].toFixed(0) : tour['averageRating'].toFixed(2)} z 5</p>
                {/if}
            </div>
            <div>
                <h3>Celkový počet zastávok</h3>
                <p>{tour['mapPoints'].size}</p>
            </div>
            <div>
                <h3>Približná dĺžka trvania</h3>
                <p>{tour['approximateLength']} minút</p>
            </div>
            <div>
                <h3>Typ</h3>
                {#if tour['isPaidOnly'] === true}
                    <p>Platený</p>
                {:else}
                    <p>Dostupný pre všetkých</p>
                {/if}
            </div>
        </div>
    </section>
</main>
