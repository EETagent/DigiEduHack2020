<script>
    export var value = "";
    export var type = "text";
    export var placeholder = "";
    export var hasFocus = false;
    export var color = "normal";
    export var icon = null;
    export var required = false;
    export var autocomplete = "";
    export var password = false;
    export var area = false;
    export var readonly = false;
    /** @type {HTMLInputElement}*/
    var field;
    /**
     * @param {HTMLTextAreaElement} node
     */
    function textAreaUpdate(node) {
        node.oninput = function onInput() {
            this.style.height = "auto";
            this.style.height = (this.scrollHeight) + "px";
        }
    }
</script>

<div class="w-full relative my-4" on:click={() => field.focus()}>
    <div class="absolute z-1 text-gray-500 pointer-events-none transition transition-all" class:!minified={value === "" && !hasFocus} class:minified={value !== "" || hasFocus}>{placeholder}</div>
    <div class="flex">
        {#if password}
            <input type="password"
                bind:this={field} bind:value={value}
                on:focus={() => hasFocus = true} on:blur={() => hasFocus = false}
                class="w-full h-6 border-transparent focus:border-transparent border-b-gray-300 focus:border-b-gray-400 p-0 outline-none"
                class:text-red-600={color === "error"} class:input-blue={color === "blue"}
                {required} {autocomplete} {readonly}>
        {:else if area}
            <textarea
                bind:this={field} bind:value={value}
                on:focus={() => hasFocus = true} on:blur={() => hasFocus = false}
                class="w-full h-6 border-transparent focus:border-transparent border-b-gray-300 focus:border-b-gray-400 p-0 outline-none resize-y min-h-6 overflow-y-hidden"
                class:text-red-600={color === "error"} class:input-blue={color === "blue"}
                use:textAreaUpdate
                {required} {autocomplete} {readonly}></textarea>
        {:else if type === "number"}
            <input type="number"
                bind:this={field} bind:value={value}
                on:focus={() => hasFocus = true} on:blur={() => hasFocus = false}
                class="w-full h-6 border-transparent focus:border-transparent border-b-gray-300 focus:border-b-gray-400 p-0 outline-none"
                class:text-red-600={color === "error"} class:input-blue={color === "blue"}
                {required} {autocomplete} {readonly}>
        {:else}
            <input type="text"
                bind:this={field} bind:value={value}
                on:focus={() => hasFocus = true} on:blur={() => hasFocus = false}
                class="w-full h-6 border-transparent focus:border-transparent border-b-gray-300 focus:border-b-gray-400 p-0 outline-none"
                class:text-red-600={color === "error"} class:input-blue={color === "blue"}
                {required} {autocomplete} {readonly}>
        {/if}
        {#if icon}
            <img src="/images/{icon}" alt="" class="icon">
        {/if}
    </div>
</div>

<style>
    .minified {
        @apply -top-4 text-sm;
    }
    .\!minified {
        @apply top-0;
    }
    div > div > .input-blue {
        @apply border-b-blue-400;
    }
</style>