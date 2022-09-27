<script lang="ts">
    import type {NodeInfoType} from "./tree";
    import {selectedIdStore, setSelectedId} from "./tree";

    export let info: NodeInfoType
    let selectedId: string

    selectedIdStore.subscribe(s => {
        selectedId = s
    })
</script>


<div class="parent" class:selected={info.id === selectedId}
      on:click={() => setSelectedId(info.id)}>{info.name}</div>


<style>
    .parent {
        border-radius: 100px;
        height: 26px;
        padding: 2px 10px;
        margin: 1px 0;
        cursor: pointer;
        transition-property: background-color, outline-color;
        transition-duration: var(--transitionDuration);
    }

    .selected {
        font-weight: bold;
        background-color: var(--accentTrans);
    }

    .parent:hover {
        background-color: var(--accentTrans);
    }
</style>