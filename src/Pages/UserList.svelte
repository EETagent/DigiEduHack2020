<script>
    import Button from "../Components/Button.svelte";
    import TextField from "../Components/TextField.svelte";
    import UserDrawer from "../Components/UserDrawer.svelte";
    import { user } from "../Stores/user";
    import { flip } from "svelte/animate";
    import { users, tags } from "../Stores/db";

    function filterTags() {
        var res = Object.fromEntries(Object.entries(tags).filter(
            ([key, tag]) => {
                if(!tag.dep) return true;
                return selectedTags.includes(tag.dep);
            }
        ));
        // selectedTags = selectedTags.filter(t => res[t]);
        return res;
    }

    var collapsed = true;
    var selected = null;

    function select(user) {
        selected = user;
        collapsed = false;
    }

    var selectedTags = [];
    var search = "";

    function toggle(tag) {
        if(selectedTags.includes(tag)) {
            selectedTags.splice(selectedTags.indexOf(tag), 1);
        } else {
            selectedTags.push(tag);
        }
        selectedTags = selectedTags;
    }

    function hasTags(user) {
        return selectedTags.every(t => user.tags.includes(t)) && user.name.includes(search);
    }
</script>

<div class="max-w-150 mx-auto">
    <div class="px-4">
        <TextField placeholder="Vyhledávání" bind:value={search} />
    </div>

    <div class="px-4">
        {#each Object.keys(filterTags(tags)) as tag (tag)}
            <span class="pr-1" animate:flip>
                <Button main={selectedTags.includes(tag)} on:click={() => toggle(tag)}>{tags[tag].name}</Button> 
            </span>
        {/each}
    </div>

    <ul class="pl-0 ml-0">
        {#each users.filter(hasTags, selectedTags, search) as user (user.name)}
            <li class="cursor-pointer flex items-center m-0 px-4 py-2" on:click={() => select(user)} animate:flip={{ duration: d => Math.sqrt(d) * 50 }}>
                <img src={user.avatar} alt="Avatar" class="rounded-full h-16">
                <div class="flex flex-col ml-4">
                    <h2 class="text-xl m-0">{user.name}</h2>
                    <span class="text-gray-800">{#each user.tags as tag}{tags[tag].name} &middot; {/each}{user.school}</span>
                </div>
            </li>
        {/each}
    </ul>
</div>

<UserDrawer bind:collapsed {selected} />