<script lang="ts">
    import {pushError, pushSuccess} from "../../lib/alert.ts";
    import type {CategoryType, EditStateType, TreeId, TreeType} from "../../lib/category.ts";
    import {
        categories,
        CategoryId,
        EditStateId,
        nameCharacterLimit,
        nameCharacters,
        nameRegex
    } from "../../lib/category.ts";
    import {onDestroy} from "svelte";
    import type {Writable} from "svelte/store";

    export let categoryId: CategoryId
    export let treeId: TreeId
    let category: Writable<CategoryType>
    let treeStore: Writable<TreeType>
    let tree: TreeType
    let editState: EditStateType
    let inputElement: HTMLInputElement

    let unsubEditStateStore = () => {
    }
    let unsubTreeStore = () => {
    }

    $: {
        category = categories.get(categoryId)
        treeStore = $category.treeStores.get(treeId)
        unsubTreeStore()
        unsubEditStateStore()
        unsubTreeStore = treeStore.subscribe(t => tree = t)
        unsubEditStateStore = $category.editStateStore.subscribe(e => {
            editState = e
            if (e.id == EditStateId.Rename && e.treeId == treeId) setTimeout(selectInputText, 0)
        })
    }
    onDestroy(() => {
        unsubEditStateStore()
        unsubTreeStore()
    })

    function updateHover(event: MouseEvent) {
        if (editState.id !== EditStateId.Rename && editState.id != EditStateId.Drag && treeId != $category.rootId) {
            $category.editStateStore.set({
                id: EditStateId.Hover,
                treeId: treeId,
                x: event.offsetX,
                y: event.offsetY
            })
        }
    }

    function clearHover() {
        if (editState.id !== EditStateId.Rename && editState.id != EditStateId.Drag && treeId != $category.rootId)
            $category.editStateStore.set({id: EditStateId.None})
    }

    function selectInputText() {
        inputElement.focus()
        const range = document.createRange()
        const selection = window.getSelection()
        range.selectNodeContents(inputElement)
        if (selection.rangeCount > 0) selection.removeAllRanges()
        selection.addRange(range)
    }

    function nothingSelected(): boolean {
        if (!window.getSelection().rangeCount) return
        return window.getSelection().getRangeAt(0).toString().length == 0
    }

    function inputText(): string {
        return inputElement.hasChildNodes() ? inputElement.childNodes[0].nodeValue : ""
    }

    function filterInput(event: InputEvent) {
        const characterLimit = tree.id == $category.rootId ? nameCharacterLimit - 4 : nameCharacterLimit
        if (event.inputType == "insertText") {
            if (!nameCharacters.includes(event.data))
                pushError("Only alphanumerics, space, and hyphen are allowed")
            else if (inputText().length >= characterLimit && nothingSelected())
                pushError(`${tree.id == $category.rootId ? "Tree name" : "Name"} cannot exceed ${characterLimit} characters`)
            else
                return
        } else if (event.inputType == "insertParagraph")
            rename()
        else if (event.inputType.startsWith("insert"))
            pushError("Cannot paste or insert content here")
        else if (event.inputType.startsWith("delete"))
            return
        else
            pushError("That key combination is not allowed")
        event.preventDefault()
    }

    function rename() {
        if (editState.id != EditStateId.Rename) return
        $category.editStateStore.set({id: EditStateId.None})
        let name = inputText()

        if (tree.name == name) return
        else if (nameRegex.test(name)) {
            pushSuccess(`Renamed "${tree.name}" to "${name}"`)
            treeStore.update(t => {
                t.name = name
                return t
            })
        } else if (inputElement.hasChildNodes()) {
            const node = inputElement.childNodes[0]
            if (node.nodeValue.length < 2) pushError("Name must be at least 2 characters long")
            else pushError("Name must start and end with an alphanumeric")
            node.nodeValue = tree.name
        } else {
            pushError("Name must be at least 2 characters long")
            inputElement.appendChild(document.createTextNode(tree.name))
        }
    }
</script>


<div class="parent" on:mouseenter={updateHover} on:mousemove={updateHover} on:mouseleave={clearHover}
     class:solid={editState.id !== EditStateId.Rename && editState.id !== EditStateId.Drag && treeId !== $category.rootId}
     class:hidden={tree.hidden} bind:this={inputElement}
     class:rename={editState.id === EditStateId.Rename && editState.treeId === treeId}
     contenteditable={editState.id === EditStateId.Rename} on:beforeinput={filterInput} on:blur={rename}>
    {tree.name}
</div>


<style>
    .parent {
        line-height: 20px;
        border-radius: 100px;
        height: 30px;
        padding: 6px 10px;
        font-size: 18px;
        outline-offset: -1px;
        baseline-shift: sub;
        cursor: default;
        transition-property: background-color, outline-color;
        transition-duration: var(--transitionDuration);
    }

    .parent.rename {
        cursor: text;
    }

    .parent.hidden {
        visibility: hidden;
    }

    .parent.solid {
        cursor: move;
    }

    .parent.solid:hover {
        background-color: var(--accentTrans);
    }

    .parent::selection {
        background-color: var(--accentTrans);
    }
</style>
