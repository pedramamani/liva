<script lang="ts">
    import {favoriteIdsStore, nodeInfos} from "./tree";
    import FavoriteLabel from "./FavoriteLabel.svelte";

    let favoriteIds: string[]

    favoriteIdsStore.subscribe(f => {
        favoriteIds = [...f]
    })
</script>

<p class="title">Favorites</p>
{#if favoriteIds.length}
    <div class="parent">
        {#each favoriteIds as id}
            <FavoriteLabel info={nodeInfos.get(id)}/>
        {/each}
    </div>
{:else}
    <p class="placeholder">
        Add to your favorites to show them here.
    </p>
{/if}


<style>
    .title {
        font-size: 28px;
        font-weight: bold;
        padding: 46px 0 10px;
    }

    .parent {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 8px;
    }

    .placeholder {
        height: 26px;
    }
</style>