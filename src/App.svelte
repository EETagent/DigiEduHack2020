<script>
	import Home from "./Pages/Home.svelte";
	import { user } from "./Stores/user";
</script>

<main class="mx-4">
	{#if !$user}
		<Home />
	{:else}
		Vítejte {$user}.
	{/if}
</main>

<style>
	:global(body) {
		font-family: 'Roboto', sans-serif;
	}
</style>