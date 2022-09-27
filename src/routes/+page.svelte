<script lang="ts">
    import {onMount} from "svelte";
    import {applyTheme, initThemeId, themeIdStore} from "../lib/theme.ts";
    import {currentPageIdStore, PageId} from "../lib/page.ts";
    import Navbar from "../comp/core/Navbar.svelte";
    import EditPage from "../comp/edit/EditPage.svelte";
    // import TrackPage from "../lib/track/TrackPage.svelte";
    import InspectPage from "../comp/inspect/InspectPage.svelte";
    import Alert from "../comp/core/Alert.svelte";
    import HomePage from "../comp/home/HomePage.svelte";

    let themeInitialized: boolean = false

    onMount(() => {
        initThemeId()
        themeInitialized = true
        themeIdStore.subscribe(applyTheme)
    })
</script>

{#if themeInitialized}
    <div class="parent">
        <Navbar/>
        {#if $currentPageIdStore === PageId.Home}
            <HomePage/>
        {:else if $currentPageIdStore === PageId.Edit}
            <EditPage/>
        {:else if $currentPageIdStore === PageId.Track}
<!--            <TrackPage/>-->
        {:else if $currentPageIdStore === PageId.Inspect}
            <InspectPage/>
        {/if}
        <Alert/>
    </div>
{/if}


<style>
    .parent {
        display: flex;
        flex-direction: column;
        position: fixed;
        width: 100vw;
        height: 100vh;
        overflow-x: hidden;
        overflow-y: overlay;
        font-family: "Font", Arial, sans-serif;
        color: var(--black);
        border-color: var(--gray);
        transition-property: color, border-color;
        transition-duration: var(--transitionDuration);
    }
</style>
