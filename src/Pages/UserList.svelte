<script>
    import Drawer from "../Components/Drawer.svelte";
    import Button from "../Components/Button.svelte";
    import TextField from "../Components/TextField.svelte";
    import { user } from "../Stores/user";
    const users = [
        {
            avatar: "https://picsum.photos/id/152/256/256",
            name: "Daniel Bulant",
            school: "SSPŠ 1.K",
            extended: "Student Smíchovské Střední Průmyslové Školy, full-stack developer.",
            tags: ["developer", "fullstack", "web", "discord-bots"],
            instagram: "danbulant",
            discord: "TechmandanCZ"
        },
        {
            avatar: "https://picsum.photos/id/182/256/256",
            name: "Vojtěch Jungman",
            school: "SSPŠ 3.K",
            extended: "Prestiž",
            tags: ["developer", "backend", "PR"]
        }, {
            avatar: "https://picsum.photos/id/282/256/256",
            name: "Bruno Bartůněk",
            school: "SSPŠ 1.K",
            extended: "Arduino man",
            instagram: "bruno_bartunek",
            tags: ["developer", "arduino"]
        }
    ];

    var tags = {
        developer: {
            name: "Developer"
        },
        fullstack: {
            name: "Full-stack",
            dep: "developer"
        },
        frontend: {
            name: "Front-end",
            dep: "developer"
        },
        backend: {
            name: "Back-end",
            dep: "developer"
        },
        arduino: {
            name: "Arduino",
            dep: "developer"
        },
        web: {
            name: "Web",
            dep: "developer"
        },
        "discord-bots": {
            name: "Discord bots",
            dep: "developer"
        },
        PR: {
            name: "PR"
        },
        reklama: {
            name: "Ads",
            dep: "PR"
        },
        art: {
            name: "Art"
        },
        designer: {
            name: "Designer",
            dep: "art"
        },
        music: {
            name: "Music",
            dep: "art"
        },
        artist: {
            name: "Artist",
            dep: "art"
        }
    };

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

    function selectCurrent() {
        selected = users.find(t => t.name === $user);
        collapsed = false;
    }
</script>

<div class="flex items-center px-4 mb-2 shadow">
    <h1 class="text-2xl">Conwo</h1>
    <div class="flex-grow"></div>
    <small class="mr-1" on:click={selectCurrent}>{$user} &middot;</small>
    <small on:click={() => $user = null}>Log out</small>
</div>

<div class="max-w-150 mx-auto">
    <TextField placeholder="Vyhledávání" bind:value={search} />

    <div class="px-4">
        {#each Object.keys(filterTags(tags)) as tag (tag)}
        <span class="pr-1">
            <Button main={selectedTags.includes(tag)} on:click={() => toggle(tag)}>{tags[tag].name}</Button> 
        </span>
        {/each}
    </div>

    <ul class="pl-0 ml-0">
        {#each users.filter(hasTags, selectedTags, search) as user}
        <li class="flex items-center m-0 px-4 py-2" on:click={() => select(user)}>
            <img src={user.avatar} alt="Avatar" class="rounded-full h-16">
            <div class="flex flex-col ml-4">
                <h2 class="text-xl m-0">{user.name}</h2>
                <span class="text-gray-800">{#each user.tags as tag}{tags[tag].name} &middot; {/each}{user.school}</span>
            </div>
        </li>
        {/each}
    </ul>
</div>
    
<Drawer bind:collapsed>
    {#if selected}
        <div class="m-5 mt-0 flex flex-col items-center">
            <img src={selected.avatar} alt="Avatar" class="rounded-full h-16">

            <div class="flex flex-col ml-4">
                <h2 class="text-xl m-0 text-center">{selected.name}</h2>
                <span class="text-gray-800">{#each selected.tags as tag}{tags[tag].name} &middot; {/each}{selected.school}</span>
            </div>

            <div class="flex pt-2">
                {#if selected.instagram}
                    <div class="flex items-center px-1">
                        <img src="/images/instagram.png" alt="Instagram" class="h-4 pr-1">
                        <span><span class="text-gray-600">@</span>{selected.instagram}</span>
                    </div>
                {/if}
                {#if selected.discord}
                    <div class="flex items-center px-1">
                        <img src="/images/discord.png" alt="Discord" class="h-4 pr-1">
                        <span>{selected.discord}</span>
                    </div>
                {/if}
            </div>

            <p>{selected.extended}</p>
        </div>
    {/if}
</Drawer>