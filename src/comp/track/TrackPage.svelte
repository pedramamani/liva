<script lang="ts">
    import {parseTree} from "./tree.ts";
    import {pushError} from "../../lib/alert.ts";
    import type {NodeType, ParsedTreeType} from "./tree.ts";
    import {onMount} from "svelte";
    import FileUploadButton from "./FileUploadButton.svelte";
    import Node from "./Node.svelte";
    import Favorites from "./Favorites.svelte";
    import Content from "../core/Content.svelte";

    let rootNode: NodeType
    let fileReader: FileReader

    onMount(() => {
        fileReader = new FileReader()
        fileReader.addEventListener('load', (event) => {
            const result: ParsedTreeType = parseTree(event.target.result)
            if (result.error) {
                pushError(`Could not parse line ${result.lineNumber}: ${result.line}`)
            } else {
                rootNode = result.output
            }
        })
    })
</script>


<Content>
    <Favorites/>
    <Node node={rootNode}/>
    <FileUploadButton reader={fileReader}>Upload activity tree</FileUploadButton>
</Content>


<style>
</style>
