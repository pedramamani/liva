<script lang="ts">
    import {IconId} from "../../lib/icon.ts";
    import Icon from "./Icon.svelte";
    import type {Writable} from "svelte/store";
    import {ButtonSize} from "../../lib/icon.ts";

    export let iconId: IconId
    export let toggleIconId: IconId
    export let stateStore: Writable<boolean>
    export let size = ButtonSize.Small
    export let onClick = () => {}
    export let hoverEffect = true
    export let style = ""
</script>


<button class="parent" class:hoverEffect style="width: {size}px; height: {size}px; {style}" on:click={onClick}>
    {#if $stateStore}
        <Icon id={toggleIconId}/>
    {:else}
        <Icon id={iconId}/>
    {/if}
</button>


<style>
    .parent {
        position: relative;
        border-radius: 100px;
        padding: 6px;
        transition-property: background-color, outline-color, opacity;
        transition-duration: var(--transitionDuration);
    }

    .hoverEffect:hover {
        background-color: var(--accentTrans);
    }
</style>