<script>
    import Drawer from "../Components/Drawer.svelte";
    const users = [
        {
            avatar: "https://picsum.photos/id/152/256/256",
            name: "Daniel Bulant",
            desc: "Programátor",
            school: "SSPŠ 1.K"
        },
        {
            avatar: "https://picsum.photos/id/182/256/256",
            name: "Vojtěch Jungman",
            desc: "Programátor, PR man",
            school: "SSPŠ 3.K"
        }
    ];

    var collapsed = true;
    var selected = null;

    function select(user) {
        selected = user;
        collapsed = false;
    }
</script>

<h1 class="text-2xl pl-4">Seznam uživatelů</h1>
<ul class="pl-0 ml-0">
    {#each users as user}
        <li class="flex items-center hover:bg-gray-200 m-0 px-4 py-2" on:click={() => select(user)}>
            <img src={user.avatar} alt="Avatar" class="rounded-full h-16">
            <div class="flex flex-col ml-4">
                <h2 class="text-xl m-0">{user.name}</h2>
                <span class="text-gray-800">{user.desc} &middot; {user.school}</span>
            </div>
        </li>
    {/each}
</ul>

<Drawer bind:collapsed>
    {#if selected}
        <div class="m-5 mt-0 flex flex-col items-center">
            <img src={selected.avatar} alt="Avatar" class="rounded-full h-16">

            <div class="flex flex-col ml-4">
                <h2 class="text-xl m-0 text-center">{selected.name}</h2>
                <span class="text-gray-800">{selected.desc} &middot; {selected.school}</span>
            </div>
        </div>
    {/if}
</Drawer>