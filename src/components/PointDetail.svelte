<script lang="ts">
    import {createEventDispatcher} from "svelte";

    export let ongoingTour;
    export let mapPoint;
    export let visited: boolean = false;
    export let status;
    const dispatch = createEventDispatcher();

    function markAsVisited() {
        visited = true;
        ongoingTour.checkMapPoint(mapPoint['name']);
        dispatch('update', {});
    }
</script>

<div class="flex basis-4/6 flex-col">
    <p class="mb-2">{mapPoint.description}</p>
    {#if mapPoint.image !== null}
        <img src="{mapPoint.image}" alt="{mapPoint.name}"
             class="mb-2 aspect-auto rounded-lg object-cover"/>
    {/if}
    <div class="flex items-center justify-between">
        <a href="http://maps.google.com/maps?z=12&t=m&q=loc:38.9419+-78.3020" target="_blank"
           class="text-neutral-400 hover:text-neutral-100">Zobraziť na mape ↗</a>
        {#if visited === true}
            <p class="cursor-not-allowed text-neutral-700">Označiť ako navštívené ✓</p>
        {:else if status === "IN_PROGRESS" && ongoingTour}
            <button type="button"
                    on:click|preventDefault={markAsVisited}
                    class="text-neutral-400 hover:text-neutral-100">Označiť ako navštívené ✓
            </button>
        {/if}
    </div>
</div>