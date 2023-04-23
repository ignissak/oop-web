<script lang="ts">
    import {goto} from "$app/navigation";

    let error: boolean | string = false;

    function onSubmit(event) {
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (data.password !== data.repeatPassword) {
            error = "Heslá sa nezhodujú.";
            return;
        }

        let response = window['ServiceManager'].getUserService().register(data.username, data.email, data.password);

        if (response) {
            goto('/');
        } else {
            error = "Nepodarilo sa registrovať.";
        }
    }
</script>

<main class="flex h-screen flex-col items-center justify-center">
    <h1 class="mb-8 text-4xl font-bold">City Guide Walks</h1>
    <form on:submit|preventDefault="{onSubmit}" autocomplete="off">
        <div class="mb-2">
            <label for="username" class="mb-2 block font-semibold">Používateľské meno</label>
            <input type="text" id="username" name="username" placeholder="johndoe"
                   autocomplete="off" required
                   class="w-64 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 placeholder-neutral-400"/>
        </div>
        <div class="mb-2">
            <label for="email" class="mb-2 block font-semibold">Emailová adresa</label>
            <input type="email" id="email" name="email" autocomplete="off" required
                   class="w-64 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 placeholder-neutral-400"/>
        </div>
        <div class="mb-2">
            <label for="password" class="mb-2 block font-semibold">Heslo</label>
            <input type="password" id="password" name="password" autocomplete="off" required
                   class="w-64 rounded-lg border {error === 'Heslá sa nezhodujú.' ? 'border-red-600' : 'border-neutral-700' } bg-neutral-800 px-3 py-1.5 placeholder-neutral-400"/>
        </div>
        <div class="mb-2">
            <label for="repeatPassword" class="mb-2 block font-semibold">Heslo znova</label>
            <input type="password" id="repeatPassword" name="repeatPassword" required
                   autocomplete="off"
                   class="w-64 rounded-lg border {error === 'Heslá sa nezhodujú.' ? 'border-red-600' : 'border-neutral-700' } bg-neutral-800 px-3 py-1.5 placeholder-neutral-400"/>
        </div>
        {#if error}
            <p class="text-red-600 mt-1">{error}</p>
        {/if}
        <button type="submit"
                class="mt-4 mb-1 w-full rounded-lg border border-neutral-600 bg-neutral-700 py-1.5 hover:bg-neutral-600">
            Registrovať
        </button>
        <p class="text-center">alebo</p>
        <a href="/login"
           class="mt-1 block w-full rounded-lg border border-neutral-600 py-1.5 hover:bg-neutral-600 text-center">Späť
            na prihlásenie</a>
    </form>
</main>
