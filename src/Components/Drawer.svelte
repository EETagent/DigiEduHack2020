<script>
    import Backdrop from "./Backdrop.svelte";
    import anime from "animejs";
    import { createEventDispatcher } from "svelte";
    export var collapsed = false;
    export var collapsable = true;
    export let toggleThreshold = 20;
    var container;
    var data = { bottom: -Infinity };
    var animation;
    const dispatch = createEventDispatcher();
    $: if(container) {
        if(collapsed) {
            dispatch("collapsed");
        } else {
            dispatch("uncollapsed");
        }
        handleChange();
    }
    function handleChange() {
        if(data.bottom < -container.clientHeight) data.bottom = -container.clientHeight;
        animation = anime({
            targets: data,
            bottom: collapsed ? -container.clientHeight : 0,
            easing: collapsed ? "easeOutSine" : "easeOutExpo",
            duration: 500,
            update: () => (data = data),
        });
    }
    var current;
    var start;
    var content;
    function getEventClientY(event) {
        return 'clientY' in event ? event.clientY : event.touches[0].clientY;
    };
    function handleTouchDown(e) {
        if(!collapsable) return;
        e.preventDefault();
        current = e;
        start = e;
        document.body.addEventListener("touchmove", handleTouchMove);
        document.body.addEventListener("touchend", handleTouchUp);
        document.body.addEventListener("mousemove", handleTouchMove);
        document.body.addEventListener("mouseup", handleTouchUp);
        animation.pause();
    }
    function handleTouchUp(e) {
        document.body.removeEventListener("touchmove", handleTouchMove);
        document.body.removeEventListener("touchend", handleTouchUp);
        document.body.removeEventListener("mousemove", handleTouchMove);
        document.body.removeEventListener("mouseup", handleTouchUp);
        const deltaY = getEventClientY(current) - getEventClientY(start);
        
        current = null;
        start = null;
        if(fromContent && deltaY > 0) {
            if(content.scrollTop > 0) return;
        }
        if(fromContent && deltaY < 0) {
            if(content.scrollTop < content.clientHeight - container.clientHeight) return;
        }
        if (deltaY > toggleThreshold && !collapsed) {
            collapsed = true;
        } else if (deltaY < -toggleThreshold && collapsed) {
            collapsed = false;
        } else {
            handleChange();
        }
        fromContent = false;
    }
    function handleTouchMove(e) {
        const deltaY = getEventClientY(e) - getEventClientY(current);
        if(fromContent && deltaY > 0) {
            if(content.scrollTop > 0) return;
        }
        if(fromContent && deltaY < 0) {
            if(content.scrollTop < content.clientHeight - container.clientHeight) return;
        }
        if (data.bottom - deltaY > -container.clientHeight && data.bottom - deltaY < 0) {
            current = e;
        }
        e.preventDefault();
        data.bottom = Math.max(Math.min(0, data.bottom - deltaY), -container.clientHeight);
    }
    var fromContent = false;
    function handleContentTouchDown(e) {
        fromContent = true;
        handleTouchDown(e);
    }
</script>

<Backdrop darkenBackground shown={!collapsed} on:mousedown={(e) => collapsable && (collapsed = true)}>
    <div class="flex max-h-full flex-col w-full absolute m-auto desktop:(max-w-700px left-1/2 transform -translate-x-1/2) shadow transition bg-white rounded-t" bind:this={container} style="bottom: {data.bottom}px; will-change: bottom; max-height: calc(100vh- 1rem);">
        <div
            on:mousedown={handleTouchDown}
            on:touchstart={handleTouchDown}
            class="flex-grow-0 cursor-pointer pointer-events-auto w-full h-9"
        >
            <slot name="handle">
                <div class="self-center flex-shrink-0 w-20 h-1 my-4 mx-auto bg-black rounded-full" />
            </slot>
        </div>

        <div on:mousedown={handleContentTouchDown} on:touchstart={handleContentTouchDown} class="flex-grow-1 overflow-auto" bind:this={content} style="max-height: calc(100vh - 2.25rem);">
            <slot />
        </div>
    </div>
</Backdrop>