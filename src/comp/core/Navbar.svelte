<script>
    import {PageId} from "$lib/page.ts"
    import {enumValues} from "$lib/common.ts"
    import PageButton from "./PageButton.svelte";
    import Content from "./Content.svelte"
    import {IconId} from "$lib/icon.ts";
    import ToggleButton from "./ToggleButton.svelte";
    import {themeIdStore, toggleThemeId} from "$lib/theme.ts";
    import {ButtonSize} from "$lib/icon.ts";
</script>

<nav class="parent">
    <Content>
        <div class="content">
            {#each enumValues(PageId) as id}
                <PageButton currentPageId={id}/>
            {/each}
            <ToggleButton iconId={IconId.Sun} toggleIconId={IconId.Moon} stateStore={themeIdStore}
                          onClick={toggleThemeId} style="margin-left: auto" size={ButtonSize.Medium}/>
        </div>
    </Content>
</nav>


<style>
    .parent {
        z-index: 3;
        background-color: var(--white);
        box-shadow: var(--shadow);
        transition-property: background-color, box-shadow;
        transition-duration: var(--transitionDuration);
    }

    .content {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 2px 0;
        gap: 12px;
    }
</style>