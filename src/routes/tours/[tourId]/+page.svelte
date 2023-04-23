<script lang="ts">
    import type {PageData} from './$types';
    import ContextButton from "../../../components/ContextButton.svelte";
    import PointDetail from "../../../components/PointDetail.svelte";
    import {derived, get, writable} from "svelte/store";

    export let data: PageData;
    const tourId = parseInt(data.tourId);

    // @ts-ignore
    let tour = ServiceManager.getTourService().getTour(tourId);

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

</script>

<main class="flex items-center flex-col py-8 mx-48">
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
        <img src="https://sacr3-files.s3-eu-west-1.amazonaws.com/_processed_/csm_TT.korzo_93c23fef75.jpg"
             class="my-4 aspect-auto max-h-64 w-full rounded-lg object-cover" alt="Trnava"/>
        <div class="mb-2 flex items-center justify-between gap-4">
            <h2>{tour['name']}</h2>
            <ContextButton tour={tour} status={relationship}/>
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
                                    class="cursor-pointer {chosenPoint['name'] === value['name'] ? 'stop-selected' : 'hover:text-neutral-100'}">
                                {$formatStopName(value)}
                            </button>
                        {/each}
                    </div>
                </aside>
                <PointDetail mapPoint={chosenPoint} visited={hasVisited(chosenPoint.name)} status={relationship}
                             ongoingTour={$ongoingData} on:update={handleUpdate}/>
            </section>
        </section>
        <div class="grid grid-cols-3 gap-6">
            <div>
                <h3>Hodnotenie</h3>
                {#if tour['averageRating'] === -1}
                    <p>Žiadne hodnotenie</p>
                {:else}
                    <p>{tour['averageRating']} z 5</p>
                {/if}
            </div>
            <div>
                <h3>Vytvoril</h3>
                <p>{tour['ownerUsername']}</p>
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
