<script lang="ts">
    import {onMount} from "svelte";
    import type {PageType} from "../../lib/page.ts";
    import {PageId, pages, currentPageIdStore, setCurrentPageIdFunction} from "../../lib/page.ts";

    export let currentPageId: PageId
    const info: PageType = pages.get(currentPageId)
    let active: boolean = false

    onMount(() => {
        currentPageIdStore.subscribe(p => {
            active = currentPageId == p
        })
    })
</script>


<button class="parent" class:active={active} on:click={setCurrentPageIdFunction(currentPageId)}>
    {info.name}
</button>


<style>
    .parent {
        position: relative;
        height: 30px;
        border-radius: 100px;
        font-size: 18px;
        padding: 4px 8px 0;
        margin-bottom: 2px;
    }

    .parent:hover::after, .parent.active::after {
        position: absolute;
        content: "";
        height: 2px;
        left: 4px;
        right: 4px;
        bottom: -7px;
        background-color: var(--black);
        transition: background-color var(--transitionDuration);
    }

    .active::after {
        background-color: var(--gray) !important;
    }

    .parent.active:hover::after {
        transition: none;
    }
</style>