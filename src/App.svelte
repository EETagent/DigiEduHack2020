<script>
	import Home from "./Pages/Home.svelte";
	import UserList from "./Pages/UserList.svelte";
	import UserDrawer from "./Components/UserDrawer.svelte";
	import { user } from "./Stores/user";
	import { users } from "./Stores/db";
	import Chooser from "./Components/Chooser.svelte";
	import ProjectList from "./Pages/ProjectList.svelte";
	import Carousel from "./Components/Carousel.svelte";

	var openUser = true;
	var page = "users";
	var setCurrentPage;

	$: {
		if(setCurrentPage) setCurrentPage(["users", "projects"].indexOf(page));
	}
</script>

<main class="select-none h-full flex flex-col" style="">
	{#if !$user}
		<Home />
	{:else}
		<div class="flex-0 flex items-center px-4 mb-2 shadow">
			<h1 class="text-2xl">Conwo</h1>
			<div class="flex-grow"></div>
			<small class="mr-1 cursor-pointer" on:click={() => openUser = false}>{$user} &middot;</small>
			<small class="cursor-pointer" on:click={() => $user = null}>Log out</small>
		</div>

		<Carousel pageCount={2} showDots={false} bind:setCurrentPage>
			<div class="h-full">
				<UserList />
			</div>
			<div class="h-full">
				<ProjectList />
			</div>
		</Carousel>
	{/if}
	{#if $user}
		<div class="h-8"></div>
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
		height: 100vh;
		width: 100vw;
	}
	:global(*) {
		-webkit-tap-highlight-color: transparent;
	}
</style>