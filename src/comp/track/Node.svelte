<script lang="ts">
    import type {NodeType} from "./tree";
    import NodeLabel from "./NodeLabel.svelte";
    import FavoriteButton from "./FavoriteButton.svelte";

    export let node: NodeType
    let isHovered: boolean = false
</script>


{#if !node || node && node.info.id === "00000"}
    <p class="title">Activity Tree</p>
{/if}
{#if node}
    <div class="parent" class:nonChild={node.children.length !== 0} class:nonRoot={node.info.id !== "00000"}>
        <div class="head" on:mouseover={()=> isHovered = true} on:mouseleave={()=> isHovered=false}>
            <NodeLabel info={node.info}/>
            <FavoriteButton id={node.info.id} isHovered={isHovered}/>
        </div>
        <div class="children">
            {#each node.children as child}
                <svelte:self node={child}/>
            {/each}
        </div>
    </div>
{:else}
    <p>
        Upload an activity tree to show it here.
    </p>
{/if}


<style>
    .title {
        font-size: 28px;
        font-weight: bold;
        padding: 46px 0 10px;
    }

    .parent {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: start;
    }

    .head {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1px;
    }

    .children {
        padding-left: 24px;
    }

    .nonChild::before {
        position: absolute;
        content: "";
        left: 13px;
        top: 27px;
        width: 1px;
        height: calc(100% - 42px);
        background-color: var(--gray);
        transition: background-color var(--transitionDuration);
    }

    .nonRoot::after {
        position: absolute;
        content: "";
        left: -11px;
        top: 13px;
        width: 11px;
        height: 1px;
        background-color: var(--gray);
        transition: background-color var(--transitionDuration);
    }
</style>