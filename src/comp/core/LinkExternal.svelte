<script lang="ts">
    export let href: string
    export let text: string
</script>

<a class="link" href={href} target="_blank" rel="noopener noreferrer">{text}</a>

<style>
    .link {
        border-radius: 100px;
        padding: 1px 6px 0 6px;
        margin: 0 -6px;
        -webkit-user-drag: none;
        text-decoration: underline;
        white-space: nowrap;
        transition: outline-color var(--transitionDuration);
    }
    .link:focus-visible {
        outline: 2px solid var(--black);
    }
</style>
