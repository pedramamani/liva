<script lang="ts">
    import {onDestroy} from "svelte";
    import type {CategoryType, TreeId, TreeType} from "../../lib/category.ts"
    import {CategoryId, categories} from "../../lib/category.ts";
    import TreeHead from "../edit/TreeHead.svelte"
    import type {Writable} from "svelte/store";

    export let categoryId: CategoryId
    export let treeId: TreeId
    let category: Writable<CategoryType>
    let tree: TreeType
    let unsubTreeStore = () => {}

    $: {
        category = categories.get(categoryId)
        unsubTreeStore()
        let treeStore = $category.treeStores.get(treeId)
        if (treeStore) unsubTreeStore = treeStore.subscribe(t => tree = t)
    }
    onDestroy(unsubTreeStore)
</script>


{#if tree && !tree.deleted}
    <div class="parent" class:nonChild={tree.children.length} class:nonRoot={tree.id !== $category.rootId}>
        <TreeHead categoryId={categoryId} treeId={treeId}/>
        {#if !tree.hidden}
            <div class="children">
                {#each tree.children as child}
                    <svelte:self categoryId={categoryId} treeId={child.id}/>
                {/each}
            </div>
        {/if}
    </div>
{/if}


<style>
    .parent {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: start;
    }

    .parent.nonChild::before {
        position: absolute;
        content: "";
        left: 17px;
        top: 32px;
        width: 1px;
        height: calc(100% - 48px);
        background-color: var(--black);
        transition: background-color var(--transitionDuration);
    }

    .parent.nonRoot::after {
        position: absolute;
        content: "";
        left: -17px;
        top: 17px;
        width: 17px;
        height: 1px;
        background-color: var(--black);
        transition: background-color var(--transitionDuration);
    }

    .children {
        padding-left: 34px;
    }
</style>
