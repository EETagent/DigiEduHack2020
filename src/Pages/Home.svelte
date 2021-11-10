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
            error = "Wrong name or password";
        }
    }
</script>

<div class="p-4 max-w-150 m-auto">
    <h1 class="text-xl items-center justify-center align-text-red-500">Conwo</h1>
    <TextField placeholder="Name" bind:value={name} color={error ? "error" : ["Daniel Bulant", "Vojtěch Jungman"].includes(name) ? "blue" : "normal"} />
    <TextField placeholder="Password" password bind:value={password} color={error ? "error" : "normal"} />
    {#if error}
        <span class="text-red-500 py-4 inline-block">{error}</span>
    {/if}
    <div class="flex justify-between">
        <Button on:click={register} disabled>Register</Button>
        <Button on:click={login} main>Login</Button>
    </div>
</div>