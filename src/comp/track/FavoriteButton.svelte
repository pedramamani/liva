<script lang="ts">
    import {favoriteIdsStore, toggleFavorite} from "./tree";
    import {IconId} from "../../lib/common";
    import Icon from "../core/Icon.svelte";

    export let id: string
    export let isHovered: boolean = false
    export let style: string = ""
    let isFavorite: boolean = false

    favoriteIdsStore.subscribe(f => isFavorite = f.has(id))
</script>


<button class="parent" class:show={isHovered || isFavorite} on:click={() => toggleFavorite(id)} style={style} aria-label="toggle favorite">
    {#if isFavorite}
        <Icon id={IconId.SolidStar}/>
    {:else}
        <Icon id={IconId.Star}/>
    {/if}
</button>


<style>
    .parent {
        width: 26px;
        height: 26px;
        position: relative;
        border-radius: 100px;
        padding: 3px;
        opacity: 0;
        transition-property: background-color, outline-color, opacity;
        transition-duration: var(--transitionDuration);
    }

    .show {
        opacity: 1;
    }

    .parent:focus-visible {
        outline: 2px solid var(--black);
    }

    .parent:hover {
        background-color: var(--accentTrans);
    }
</style>