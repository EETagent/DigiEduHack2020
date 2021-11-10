<script>
    export var selected = "users";
</script>

<div class="flex justify-evenly shadow-2xl fixed bottom-0 left-0 w-100vw h-8">
    <div class="cursor-pointer py-1 px-4" class:underline={selected == "users"} on:click={() => selected = "users"}>Uživatelé</div>
    <div class="cursor-pointer py-1 px-4" class:underline={selected == "projects"} on:click={() => selected = "projects"}>Projekty</div>
</div>