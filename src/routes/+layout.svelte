<script>
    import "../app.css";
    import {goto} from "$app/navigation";

    let loggedIn = window['ServiceManager'].getUserService().isLoggedIn();
    if (!loggedIn) {
        goto("/login");
    }
</script>

<slot />