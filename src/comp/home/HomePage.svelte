<script lang="ts">
    import Content from "../core/Content.svelte";
    import {minutesText} from "../../lib/minute";
    import {themeIdStore, ThemeId} from "../../lib/theme";
</script>

<Content>
    <img class="background" class:fade={$themeIdStore === ThemeId.Dark} src="./wavesDark.webp">
    <img class="background" class:fade={$themeIdStore === ThemeId.Light} src="./wavesLight.webp">
    <div class="call">
        <span class="minutes">
        {$minutesText.minutes}
        </span>
        <span class="text first">
        {$minutesText.firstText}
        </span>
        <span class="text second">
        {$minutesText.secondText}
        </span>
    </div>
</Content>


<style>
    .background {
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        object-fit: cover;
        z-index: -1;
        opacity: 0;
        transition-property: filter, opacity;
        transition-duration: var(--transitionDuration);
    }

    .background.fade {
        z-index: -2;
        opacity: 1;
    }

    .call {
        height: 50%;
        display: grid;
        place-content: center;
        align-items: end;
        column-gap: 30px;
    }

    .minutes {
        height: 140px;
        line-height: 1;
        text-align: center;
        font-size: 160px;
        grid-area: 1 / 1 / span 2 / span 1;
    }

    .text {
        font-size: 30px;
        font-weight: bold;
    }

    .text.first {
        margin-top: 40px;
        grid-area: 1 / 2 / span 1 / span 1;
    }

    .text.second {
        grid-area: 2 / 2 / span 1 / span 1;
    }

    @media (max-width: 720px) {
        .call {
            justify-items: center;
        }

        .text.first {
            grid-area: 3 / 1 / span 1 / span 1;
        }

        .text.second {
            grid-area: 4 / 1 / span 1 / span 1;
        }
    }
</style>