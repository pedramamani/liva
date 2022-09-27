<script lang="ts">
    import IconButton from "../core/IconButton.svelte";
    import TreeHeadLabel from "./TreeHeadLabel.svelte";
    import type {CategoryType, EditStateType, TreeId, TreeType} from "../../lib/category.ts";
    import {categories, CategoryId, EditStateId, newId, buildTree} from "../../lib/category.ts";
    import {IconId} from "../../lib/icon.ts";
    import {onDestroy} from "svelte";
    import {writable} from "svelte/store";
    import type {Writable} from "svelte/store";

    export let categoryId: CategoryId
    export let treeId: TreeId
    let category: Writable<CategoryType>
    let treeStore: Writable<TreeType>
    let editState: EditStateType
    let hovering = false
    let unsubEditStateStore = () => {}

    $: {
        category = categories.get(categoryId)
        treeStore = $category.treeStores.get(treeId)
        unsubEditStateStore()
        unsubEditStateStore = $category.editStateStore.subscribe(e => editState = e)
    }
    onDestroy(unsubEditStateStore)

    function delete_() {
        treeStore.update(t => {
            t.deleted = true
            return t
        })
    }

    function addChild() {
        const child = buildTree({name: `New ${$category.name}`, children: []}, newId(), treeId)
        $category.treeStores.set(child.id, writable(child))
        treeStore.update(t => {
            t.children.push(child)
            return t
        })
    }

    function rename() {
        $category.editStateStore.set({id: EditStateId.Rename, treeId: treeId})
    }
</script>


<div class="parent" on:mouseenter={() => hovering = true} on:mouseleave={() => hovering = false}>
    <TreeHeadLabel categoryId={categoryId} treeId={treeId}/>
    {#if editState.id !== EditStateId.Drag}
        <IconButton iconId={IconId.Rename} hidden={!hovering} onClick={rename}/>
        <IconButton iconId={IconId.Plus} hidden={!hovering} onClick={addChild}/>
        <IconButton iconId={IconId.Bin} hidden={!hovering || treeId === $category.rootId} onClick={delete_}/>
    {/if}
</div>


<style>
    .parent {
        display: flex;
        white-space: nowrap;
        height: 34px;
        flex-direction: row;
        gap: 4px;
        padding: 2px 0;
    }
</style>
