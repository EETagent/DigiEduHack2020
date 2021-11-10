<script>
	import Home from "./Pages/Home.svelte";
	import UserList from "./Pages/UserList.svelte";
	import { user } from "./Stores/user";
</script>

<main>
	{#if !$user}
		<Home />
	{:else}
		<UserList />
	{/if}
</main>

<style>
	:global(body, document) {
		font-family: 'Roboto', sans-serif;
		margin: 0;
		padding: 0;
	}
</style>