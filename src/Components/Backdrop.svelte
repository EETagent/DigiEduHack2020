<script>
    export var shown = false;
    export var blurBackground = false;
    export var darkenBackground = true;
    var shouldShow = false;
    $: {
        if(shown) {
            shouldShow = true;
        } else {
            setTimeout(() => {
                if(shown) return;
                shouldShow = false;
            }, 500);
        }
    }
</script>

<!-- The background -->
<div class="w-100vw h-100vh fixed top-0 left-0 transition duration-400 z-100" on:mousedown|self class:pointer-events-none={!shown} class:opacity-0={!shown} style="background: #00000033" class:backdrop-blur={blurBackground}>
    <!-- The drawer itself -->
    {#if shouldShow}
        <slot />
    {/if}
</div>

<style>
    .transition {
        transition-property: opacity;
    }
</style>