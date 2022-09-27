<script lang="ts">
    import Content from "../core/Content.svelte";
    import Category from "../edit/Category.svelte";
    import CategoryMenu from "./CategoryMenu.svelte";
    import {categoryId} from "../../lib/category.ts";
</script>


<Content>
    <div class="parent">
        <CategoryMenu/>
        <Category id={$categoryId}/>
    </div>
</Content>


<style>
    .parent {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 40px 0;
    }
</style>
