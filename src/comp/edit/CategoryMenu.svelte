<script lang="ts">
    import {categories, CategoryId, categoryId} from "../../lib/category.ts";
    import type {CategoryType} from "../../lib/category.ts";
    import {titleCase} from "../../lib/common.ts";
    import {IconId} from "../../lib/icon.ts";
    import {writable} from "svelte/store";
    import type {Writable} from "svelte/store";
    import {enumValues} from "../../lib/common.ts";
    import Icon from "../core/Icon.svelte";
    import {onDestroy, onMount} from "svelte";

    let category: Writable<CategoryType>
    let name: string
    let otherNames: Map<CategoryId, string>
    let menuElement: HTMLElement
    const menuOpen = writable(false)
    let unsubCategory = () => {}

    $: {
        category = categories.get($categoryId)
        unsubCategory()
        unsubCategory = category.subscribe(c => {
            name = titleCase(c.name)
        })
        otherNames = new Map<CategoryId, string>()
        enumValues(CategoryId).forEach((id) => {
            if (id === $categoryId) return
            category = categories.get(id)
            otherNames.set($category.id, titleCase($category.name))
        })
    }

    onMount(() => menuElement.tabIndex = 0)
    onDestroy(unsubCategory)

    function toggleDropdown() {
        menuOpen.update(d => !d)
    }
</script>


<div class="parent">
    <div class="menu" class:open={$menuOpen} on:blur={() => menuOpen.set(false)} bind:this={menuElement} on:click={toggleDropdown}>
        <div class="head" class:closed={!$menuOpen}>
            <span class="title bold">{name} Tree</span>
            <span class="icon">
            {#if $menuOpen}
                <Icon id={IconId.ChevronUp}/>
            {:else}
                <Icon id={IconId.ChevronDown}/>
            {/if}
        </span>
        </div>
        {#each [...otherNames] as [otherId, otherName]}
            <div class="head" on:click={() => categoryId.set(otherId)}>
                <span class="title">{otherName} Tree</span>
                <span class="icon"></span>
            </div>
        {/each}
    </div>
</div>


<style>
    .parent {
        position: relative;
        height: 50px;
        width: 100%;
    }

    .menu {
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        margin-right: auto;
        border-radius: 4px;
        height: 50px;
        gap: 1px;
        overflow: hidden;
        cursor: pointer;
        z-index: 3;
        background-color: var(--white);
        outline: 1px solid var(--black);
        transition-property: background-color, outline-color;
        transition-duration: var(--transitionDuration);
    }

    .menu.open {
        transition-property: height, box-shadow;
        box-shadow: var(--shadow);
        height: 152px;
    }

    .head {
        display: flex;
        flex-direction: row;
        align-items: center;
        white-space: nowrap;
        padding: 4px 14px;
        border-radius: 4px;
        transition: background-color var(--transitionDuration);
    }

    .head:hover {
        background-color: var(--accentTrans);
    }

    .title {
        padding-right: 20px;
        font-size: 28px;
    }

    .title.bold {
        font-weight: bold;
    }

    .icon {
        margin-left: auto;
        width: 28px;
    }
</style>
