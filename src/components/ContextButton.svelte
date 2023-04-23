<script lang="ts">
    import {goto} from "$app/navigation";

    export let tour;
    export let status;
    function startTour(id) {
        console.log(`Enrolling tour with id: ${id}`);
        // @ts-ignore
        ServiceManager.getUserService().enrollTour(parseInt(id));
        goto(`/tours/${id}`);
    }
</script>

{#if status === "NOT_STARTED"}
    <button type="button"
            on:click|preventDefault={() => startTour(tour.id)}
            class="action-button">
        <svg width="20px" height="20px" stroke-width="1.5" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M12.44 9.127l-1.408 5.635 4.93 6.339M10.328 18.284L8.215 21.1"
                  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M8.215 13.353c0-3.944 2.817-4.226 4.226-4.226h1.408c.235 1.174 1.268 3.663 3.522 4.226M13 7a2 2 0 100-4 2 2 0 000 4z"
                  stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round"></path>
        </svg>
        Začať výlet
    </button>
{:else if status === "IN_PROGRESS"}
    <a href="/tours/{tour.id}"
       class="action-button">
        <svg width="20px" height="20px" stroke-width="1.5" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2v4M12 18v4M22 12h-4M6 12H2M4.929 4.929l2.828 2.828M16.243 16.243l2.828 2.828M19.071 4.929l-2.828 2.828M7.757 16.243L4.93 19.07"
                  stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round"></path>
        </svg>
        Prebiehajúci výlet
    </a>
{:else if status === "FINISHED"}
    <a href="/tours/{tour.id}"
       class="action-button">
        <svg width="20px" height="20px" stroke-width="1.5" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M5 13l4 4L19 7" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round"></path>
        </svg>
        Dokončený výlet
    </a>
{:else if status === "UNAVAILABLE"}
    <a href="/tours/{tour.id}"
       class="action-button cursor-not-allowed ">
        <svg width="20px" height="20px" stroke-width="1.5" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M16 12h1.4a.6.6 0 01.6.6v6.8a.6.6 0 01-.6.6H6.6a.6.6 0 01-.6-.6v-6.8a.6.6 0 01.6-.6H8m8 0V8c0-1.333-.8-4-4-4S8 6.667 8 8v4m8 0H8"
                  stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round"></path>
        </svg>
        Nedostupné
    </a>
{/if}

