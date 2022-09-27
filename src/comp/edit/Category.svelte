<script lang="ts">
    import DragEnvironment from "./DragEnvironment.svelte";
    import {categories, CategoryId} from "../../lib/category.ts";
    import type {CategoryType, TreeType} from "../../lib/category.ts";
    import type {Writable} from "svelte/store";
    import Tree from "./Tree.svelte";

    export let id: CategoryId
    let category: Writable<CategoryType>
    let tree: TreeType

    $: category = categories.get(id)
</script>


<div class="parent">
    <DragEnvironment categoryId={id}>
        <Tree categoryId={id} treeId={$category.rootId}/>
    </DragEnvironment>
</div>


<style>
</style>
