<script lang="ts">
    import {onMount} from "svelte";

    export let reader: FileReader
    let selector: HTMLElement
    let parentElement: HTMLElement

    onMount(() => {
        selector.addEventListener('change', (event) => {
            const file = event.target.files[0];
            reader.readAsText(file);
        })
        parentElement.tabIndex = 0
    })
</script>


<label bind:this={parentElement} class="parent">
    <input class="fileInput" bind:this={selector} type="file" accept=".txt">
    <slot/>
</label>


<style>
    .fileInput {
        display: none;
    }

    .parent {
        border-radius: 100px;
        height: 32px;
        padding: 5px 10px;
        cursor: pointer;
        outline: var(--black) solid 1px;
        transition-property: outline-color, background-color;
        transition-duration: var(--transitionDuration);
    }

    .parent:hover {
        background-color: var(--accentTrans);
    }

    .parent:focus-visible {
        outline-width: 2px;
    }
</style>