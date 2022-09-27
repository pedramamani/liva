<script lang="ts">
    import {IconId} from "../../lib/icon";
    import Icon from "./Icon.svelte";
    import {ButtonSize} from "../../lib/icon";

    export let iconId: IconId
    export let hidden = false
    export let size = ButtonSize.Small
    export let onClick = () => {}
    export let hoverEffect = true
    export let style = ""
</script>


<button class="parent" class:hoverEffect class:hidden style="width: {size}px; height: {size}px; {style}" on:click={onClick}>
    <Icon id={iconId}/>
</button>


<style>
    .parent {
        position: relative;
        border-radius: 100px;
        padding: 6px;
        opacity: 1;
        transition-property: background-color, outline-color, opacity;
        transition-duration: var(--transitionDuration);
    }

    .parent.hidden {
        opacity: 0;
    }

    .hoverEffect:hover {
        background-color: var(--accentTrans);
    }
</style>