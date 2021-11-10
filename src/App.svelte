<script>
	import Home from "./Pages/Home.svelte";
	import UserList from "./Pages/UserList.svelte";
	import UserDrawer from "./Components/UserDrawer.svelte";
	import { user } from "./Stores/user";
	import { users } from "./Stores/db";
import Chooser from "./Components/Chooser.svelte";
import ProjectList from "./Pages/ProjectList.svelte";

	var openUser = true;
	var page = "users";
</script>

<main class="select-none">
	{#if !$user}
		<Home />
	{:else}
		<div class="flex items-center px-4 mb-2 shadow">
			<h1 class="text-2xl">Conwo</h1>
			<div class="flex-grow"></div>
			<small class="mr-1 cursor-pointer" on:click={() => openUser = false}>{$user} &middot;</small>
			<small class="cursor-pointer" on:click={() => $user = null}>Log out</small>
		</div>

		{#if page === "users"}
			<UserList />
		{:else}
			<ProjectList />
		{/if}
	{/if}
</main>
	
{#if $user}
	<Chooser bind:selected={page} />
	<UserDrawer bind:collapsed={openUser} selected={users.find(t => t.name === $user)} />
{/if}

<style>
	:global(body, document) {
		font-family: 'Roboto', sans-serif;
		margin: 0;
		padding: 0;
	}
	:global(*) {
		-webkit-tap-highlight-color: transparent;
	}
</style>