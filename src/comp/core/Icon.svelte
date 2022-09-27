<script lang="ts">
    import {IconId} from "../../lib/icon";
    import {themeIdStore, ThemeId} from "../../lib/theme";

    export let id: IconId
</script>


{#if id === IconId.Moon}
    <svg class="parent" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21q-3.75 0-6.375-2.625T3 12q0-3.75 2.625-6.375T12 3q.35 0 .688.025.337.025.662.075-1.025.725-1.637 1.887Q11.1 6.15 11.1 7.5q0 2.25 1.575 3.825Q14.25 12.9 16.5 12.9q1.375 0 2.525-.613 1.15-.612 1.875-1.637.05.325.075.662Q21 11.65 21 12q0 3.75-2.625 6.375T12 21Z"/>
    </svg>
{:else if id === IconId.Sun}
    <svg class="parent" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 17q-2.075 0-3.537-1.463Q7 14.075 7 12t1.463-3.538Q9.925 7 12 7t3.538 1.462Q17 9.925 17 12q0 2.075-1.462 3.537Q14.075 17 12 17ZM2 13q-.425 0-.712-.288Q1 12.425 1 12t.288-.713Q1.575 11 2 11h2q.425 0 .713.287Q5 11.575 5 12t-.287.712Q4.425 13 4 13Zm18 0q-.425 0-.712-.288Q19 12.425 19 12t.288-.713Q19.575 11 20 11h2q.425 0 .712.287.288.288.288.713t-.288.712Q22.425 13 22 13Zm-8-8q-.425 0-.712-.288Q11 4.425 11 4V2q0-.425.288-.713Q11.575 1 12 1t.713.287Q13 1.575 13 2v2q0 .425-.287.712Q12.425 5 12 5Zm0 18q-.425 0-.712-.288Q11 22.425 11 22v-2q0-.425.288-.712Q11.575 19 12 19t.713.288Q13 19.575 13 20v2q0 .425-.287.712Q12.425 23 12 23ZM5.65 7.05 4.575 6q-.3-.275-.288-.7.013-.425.288-.725.3-.3.725-.3t.7.3L7.05 5.65q.275.3.275.7 0 .4-.275.7-.275.3-.687.287-.413-.012-.713-.287ZM18 19.425l-1.05-1.075q-.275-.3-.275-.712 0-.413.275-.688.275-.3.688-.287.412.012.712.287L19.425 18q.3.275.288.7-.013.425-.288.725-.3.3-.725.3t-.7-.3ZM16.95 7.05q-.3-.275-.287-.688.012-.412.287-.712L18 4.575q.275-.3.7-.288.425.013.725.288.3.3.3.725t-.3.7L18.35 7.05q-.3.275-.7.275-.4 0-.7-.275ZM4.575 19.425q-.3-.3-.3-.725t.3-.7l1.075-1.05q.3-.275.713-.275.412 0 .687.275.3.275.288.688-.013.412-.288.712L6 19.425q-.275.3-.7.287-.425-.012-.725-.287Z"/>
    </svg>
{:else if id === IconId.Star}
    <svg class="parent" viewBox="0 1 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m8.85 17.825 3.15-1.9 3.15 1.925-.825-3.6 2.775-2.4-3.65-.325-1.45-3.4-1.45 3.375-3.65.325 2.775 2.425Zm-1.525 2.1 1.25-5.325-4.125-3.55 5.425-.475L12 5.55l2.125 5.025 5.425.475-4.125 3.55 1.25 5.325L12 17.1ZM12 13.25Z"/>
    </svg>
{:else if id === IconId.SolidStar}
    <svg class="parent" viewBox="0 1 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m7.325 19.925 1.25-5.325-4.125-3.55 5.425-.475L12 5.55l2.125 5.025 5.425.475-4.125 3.55 1.25 5.325L12 17.1Z"/>
    </svg>
{:else if id === IconId.Plus}
    <svg class="parent" viewBox="2 2 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z"/>
    </svg>
{:else if id === IconId.Cross}
    <svg class="parent" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z"/>
    </svg>
{:else if id === IconId.Bin}
    <svg class="parent" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z"/>
    </svg>
{:else if id === IconId.Rename}
    <svg class="parent" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m10 21 4-4h8v4Zm-6-2h1.4l8.625-8.625-1.4-1.4L4 17.6ZM18.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM16.85 10.4 6.25 21H2v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z"/>
    </svg>
{:else if id === IconId.Logo}
    <img class="image" class:invert={$themeIdStore === ThemeId.Light} src="./logo.png"/>
{:else if id === IconId.ChevronLeft}
    <svg class="parent" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m14 18-6-6 6-6 1.4 1.4-4.6 4.6 4.6 4.6Z"/>
    </svg>
{:else if id === IconId.ChevronRight}
    <svg class="parent" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.4 18 8 16.6l4.6-4.6L8 7.4 9.4 6l6 6Z"/>
    </svg>
{:else if id === IconId.ChevronDown}
    <svg class="parent" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m12 15.375-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4Z"/>
    </svg>
{:else if id === IconId.ChevronUp}
    <svg class="parent" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m7.4 15.375-1.4-1.4 6-6 6 6-1.4 1.4-4.6-4.6Z"/>
    </svg>
{/if}


<style>
    .parent {
        fill: var(--black);
        transition: fill var(--transitionDuration);
    }

    .image {
        transition: filter var(--transitionDuration);
    }

    .invert {
        filter: invert(1);
    }
</style>