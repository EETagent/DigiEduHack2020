<script>
    export var main = false;
    export var black = false;
    export var heroic = false;
    export var disabled = false;
</script>

<div class="inline-block text-center"
    class:rounded-full={!heroic} class:px-5={!heroic} class:py-3={!heroic}
    class:rounded-lg={heroic} class:px-15={heroic} class:py-5={heroic}
    class:cursor-pointer={!disabled} class:cursor-not-allowed={disabled}
    class:bg-black={black}
    class:bg-gray-200={!black && (!main || disabled)} class:text-gray-700={(!black && !main) || disabled}
    class:text-white={(black || main) && !disabled} class:bg-blue-500={main && !disabled}
    on:click
    tabindex="0">
    <slot />
</div>