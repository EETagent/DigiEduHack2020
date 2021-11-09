<script>
	import TextField from "../Components/TextField.svelte";
	import Button from "../Components/Button.svelte";
    import { user } from "../Stores/user";
	var name = "";
	var password = "";
    var error = "";

    function register() {
        alert("Registrace není možná")
    }

    function login() {
        if(
            (name === "Daniel Bulant" && password === "1234") ||
            (name === "Vojtěch Jungman" && password === "4321")
        ) {
           $user = name;
        } else {
            error = "Nesprávné jméno nebo heslo";
        }
    }
</script>

<h1 class="text-xl items-center justify-center align-text-red-500">Profesní síť</h1>
<TextField placeholder="Jméno" bind:value={name} color={error ? "error" : ["Daniel Bulant", "Vojtěch Jungman"].includes(name) ? "blue" : "normal"} />
<TextField placeholder="Heslo" type="password" bind:value={password} color={error ? "error" : "normal"} />
{#if error}
    <span class="text-red-500 py-4 inline-block">{error}</span>
{/if}
<div class="flex justify-between">
    <Button on:click={register} disabled>Registrovat se</Button>
    <Button on:click={login} main>Přihlásit se</Button>
</div>