<script>
    import Drawer from "./Drawer.svelte";
    import { tags, projects, projectTags } from "../Stores/db";
    export var collapsed = true;

    export var selected;
</script>

<Drawer bind:collapsed>
    <div class="m-5 pb-4 mt-0 flex flex-col items-center">
        <img src={selected.avatar} alt="Avatar" class="rounded-full h-16">

        <div class="flex flex-col ml-4">
            <h2 class="text-xl m-0 text-center">{selected.name}</h2>
            <span class="text-gray-800">{#each selected.tags as tag}{tags[tag].name} &middot; {/each}{selected.school}</span>
        </div>

        <div class="flex pt-2">
            {#if selected.instagram}
                <div class="flex items-center px-1">
                    <img src="images/instagram.png" alt="Instagram" class="h-4 pr-1">
                    <span><span class="text-gray-600">@</span>{selected.instagram}</span>
                </div>
            {/if}
            {#if selected.discord}
                <div class="flex items-center px-1">
                    <img src="images/discord.png" alt="Discord" class="h-4 pr-1">
                    <span>{selected.discord}</span>
                </div>
            {/if}
        </div>

        <p>{selected.extended}</p>

        <ul>
            {#each projects.filter(p => p.authors.includes(selected.name)) as project (project.name)}
                <li>
                    <h3 class="p-0">{project.name}</h3>
                    <span>{project.authors.join(", ")}</span> &middot;
                    <span>{project.tags.map(t => projectTags[t]).join(", ")}</span>
                    {#if project.links && project.links.length}
                        <div>
                            <span>Links:</span>
                            <ul>
                                {#each project.links as link}
                                    <li><a href="{link}">{link}</a></li>
                                {/each}
                            </ul>
                        </div>
                    {/if}
                    <p>{project.desc}</p>
                </li>
            {/each}
        </ul>
    </div>
</Drawer>