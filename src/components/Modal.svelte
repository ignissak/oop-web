<script>
    export let showModal;
    let dialog;
    $: if (dialog && showModal) dialog.showModal();
</script>

<dialog
        bind:this={dialog}
        on:close={() => (showModal = false)}
        on:click|self={() => dialog.close()}
        class="border-0 rounded-lg p-8 bg-neutral-800 shadow-lg max-w-lg text-neutral-100 fill-neutral-100 stroke-neutral-100"
>
    <div
            on:click|stopPropagation
            class="flex flex-col justify-center items-center"
    >
        <slot/>
        <slot name="button"/>
    </div>
</dialog>

<style>
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
        from {
            transform: scale(0.5);
        }
        to {
            transform: scale(1);
        }
    }
    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>
