<script>
    import Button from "../Components/Button.svelte";
    import TextField from "../Components/TextField.svelte";
    import { flip } from "svelte/animate";
    import { users, tags, projects, projectTags } from "../Stores/db";
import Drawer from "../Components/Drawer.svelte";

    var search = "";
    var selectedTags = [];

    function filterTags() {
        var res = Object.fromEntries(Object.entries(projectTags).filter(
            ([key, tag]) => {
                if(!tag.dep) return true;
                return selectedTags.includes(tag.dep);
            }
        ));
        // selectedTags = selectedTags.filter(t => res[t]);
        return res;
    }

    function toggle(tag) {
        if(selectedTags.includes(tag)) {
            selectedTags.splice(selectedTags.indexOf(tag), 1);
        } else {
            selectedTags.push(tag);
        }
        selectedTags = selectedTags;
    }

    function hasTags(project) {
        return selectedTags.every(t => project.tags.includes(t)) && project.name.includes(search);
    }

    var collapsed = true;
    var selected = null;

    function select(project) {
        selected = project;
        collapsed = false;
    }
</script>


<div class="max-w-150 mx-auto">
    <div class="px-4">
        <TextField placeholder="Vyhledávání" bind:value={search} />
    </div>

    <div class="px-4">
        {#each Object.keys(filterTags(projectTags)) as tag (tag)}
            <span class="pr-1" animate:flip>
                <Button main={selectedTags.includes(tag)} on:click={() => toggle(tag)}>{projectTags[tag]}</Button> 
            </span>
        {/each}
    </div>

    <ul class="pl-0 ml-0">
        {#each projects.filter(hasTags, selectedTags, search) as project (project.name)}
            <li class="cursor-pointer flex items-center m-0 px-4 py-2" on:click={() => select(project)} animate:flip={{ duration: d => Math.sqrt(d) * 50 }}>
                <div class="flex flex-col ml-4">
                    <h2 class="text-xl m-0">{project.name}</h2>
                    <span class="text-gray-800">{#each project.tags as tag}{projectTags[tag]} &middot; {/each}{project.authors.join(", ")} &middot {project.state}</span>
                </div>
            </li>
        {/each}
    </ul>
</div>


<Drawer bind:collapsed>
    {#if selected}
        <div class="m-5 pb-4 mt-0 flex flex-col items-center">
            <div class="flex flex-col ml-4">
                <h2 class="text-xl m-0 text-center">{selected.name}</h2>
                <span class="text-gray-800">&middot; {#each selected.tags as tag}{projectTags[tag]} &middot; {/each}</span>
            </div>

            <p>{selected.desc}</p>

            <ul>
                {#each selected.authors as author}
                    <li>
                        {author}
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</Drawer>