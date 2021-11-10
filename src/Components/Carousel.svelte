<script>
    import { tweened } from "svelte/motion";
    import { expoOut } from "svelte/easing";
    export let pageCount = 1;
    export let showDots = true;
    let scroller;
    let scrollerWidth;
    let contentWidth;
    let scrollX = 0;
    let mouseDown = false;
    export let currentPage = 0;
    export const onScroll = () => {
        scrollX = scroller.scrollLeft;
    };
    export const setCurrentPage = (i) => {
        applyNativeSnap = false;
        targetScrollLeft = i * scrollerWidth;
    };
    $: contentWidth = scrollerWidth * pageCount;
    $: scrollNormalized = scrollX / contentWidth;
    $: currentPage = Math.round(scrollNormalized / (1 / pageCount));
    let pos = { top: 0, left: 0, x: 0, y: 0 };
    let applyNativeSnap = true;
    let targetScrollLeft = 0;
    const mouseDownHandler = (e) => {
        applyNativeSnap = false;
        mouseDown = true;
        pos = {
            // The current scroll
            left: scroller.scrollLeft,
            top: scroller.scrollTop,
            // Get the current mouse position
            x: (e.targetTouches ? e.targetTouches[0] : e).clientX,
            y: (e.targetTouches ? e.targetTouches[0] : e).clientY,
        };
        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
        document.addEventListener("touchmove", mouseMoveHandler);
        document.addEventListener("touchend", mouseUpHandler);
        // e.preventDefault();
    };
    const mouseMoveHandler = (e) => {
        // How far the mouse has been moved
        const dx = (e.targetTouches ? e.targetTouches[0] : e).clientX - pos.x;
        targetScrollLeft = pos.left - dx;
    };
    const mouseUpHandler = (e) => {
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
        document.removeEventListener("touchmove", mouseMoveHandler);
        document.removeEventListener("touchend", mouseUpHandler);
        applyNativeSnap = false;
        mouseDown = false;
        targetScrollLeft = currentPage * scrollerWidth;
    };
    const tweenedScrollLeft = tweened(0, { duration: 200, easing: expoOut });
    $: tweenedScrollLeft.set(targetScrollLeft);
    $: if (scroller) scroller.scrollLeft = $tweenedScrollLeft;
    $: if (targetScrollLeft === $tweenedScrollLeft && !mouseDown) {
        applyNativeSnap = true;
    }
</script>

<div class="flex flex-col w-full flex-grow overflow-visible">
    <div
        class="flex flex-grow w-full overflow-hidden --hide-scrollbar --scroller"
        class:--smooth-snap={applyNativeSnap}
        bind:this={scroller}
        bind:clientWidth={scrollerWidth}
        on:scroll={onScroll}
        on:touchstart={mouseDownHandler}
        on:mousedown={mouseDownHandler}
    >
        <slot />
    </div>

    {#if showDots}
        <div
            class="flex items-center justify-center h-4 mt-2 space-x-2 transition-opacity duration-300 transform -translate-y-4"
            class:opacity-0={pageCount < 2}
        >
            {#each Array(pageCount) as _, i}
                <button
                    class="w-2 h-2 transition-all duration-200 bg-gray-400 rounded-full outline-none focus:outline-none"
                    class:--current-page-dot={currentPage === i}
                    on:click={() => setCurrentPage(i)}
                />
            {/each}
        </div>
    {/if}
</div>

<style>
    .--smooth-snap {
        scroll-behavior: smooth;
        scroll-snap-type: x mandatory;
        overscroll-behavior-x: contain;
    }
    .--scroller > :global(*) {
        flex-basis: 100%;
        flex-shrink: 0;
        flex-grow: 0;
        scroll-snap-align: center;
    }
    .--current-page-dot {
        background-color: #ff2d55;
        transform: scale(1.5);
    }
</style>