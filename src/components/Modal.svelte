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
        <slot />
        <slot name="button" />
    </div>
</dialog>
