<script lang="ts">
    import {goto} from "$app/navigation";
    let error = false;
    function onSubmit(event) {
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        let response = window['ServiceManager'].getUserService().login(data.username, data.password);

        if (response) {
            goto('/');
        } else {
            error = true;
        }
    }
</script>

<main class="h-screen flex flex-col items-center justify-center">
    <h1 class="mb-8 text-4xl font-bold">City Guide Walks</h1>
    <form on:submit|preventDefault={onSubmit} autocomplete="off">
        <div class="mb-2">
            <label for="username" class="block mb-2 font-semibold">Používateľské meno</label>
            <input type="text" id="username" name="username" placeholder="johndoe" autocomplete="off" required
                   class="bg-neutral-800 border {error ? 'border-red-600' : 'border-neutral-700'} rounded-lg py-1.5 px-3 placeholder-neutral-400 w-64"/>
        </div>
        <div class="mb-2">
            <label for="password" class="block mb-2 font-semibold">Heslo</label>
            <input type="password" id="password" name="password" autocomplete="off" required
                   class="bg-neutral-800 border {error ? 'border-red-600' : 'border-neutral-700'} rounded-lg py-1.5 px-3 placeholder-neutral-400 w-64"/>
        </div>
        {#if error}
            <p class="text-red-600 mt-1">Nesprávne prihlasovacie údaje!</p>
        {/if}
        <button type="submit" class="mt-4 mb-1 w-full rounded-lg border border-neutral-600 bg-neutral-700 py-1.5 hover:bg-neutral-600">Prihlásiť</button>
        <p class="text-center">alebo</p>
        <a href="/register" class="mt-1 block w-full rounded-lg border border-neutral-600 py-1.5 hover:bg-neutral-600 text-center">Registrácia</a>
    </form>
</main>