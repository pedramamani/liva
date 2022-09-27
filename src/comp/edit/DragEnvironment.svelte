<script lang="ts">
    import type {CategoryType, EditStateType, TreeType, TreeId} from "../../lib/category.ts"
    import {categories, CategoryId, EditStateId, step} from "../../lib/category.ts";
    import {onDestroy} from "svelte";
    import {pushError, pushSuccess} from "../../lib/alert.ts";
    import type {Writable} from "svelte/store";
    import type {WaypointType} from "../../lib/waypoint.ts";
    import {calculateWaypoints, closestWaypoint} from "../../lib/waypoint.ts";

    export let categoryId: CategoryId
    let category: Writable<CategoryType>
    let stateStore: Writable<EditStateType>
    let state: EditStateType
    let tree: TreeType
    let rootTree: TreeType
    let waypoints: Array<WaypointType>
    let initialWaypoint: WaypointType
    let lastWaypoint: WaypointType
    let treeStore: Writable<TreeType>
    let originX, originY, hoverX, hoverY, windowWidth, windowHeight: number
    let environmentElement: HTMLElement
    let moveMessage: string = null

    let unsubTree = () => {
    }
    let unsubState = () => {
    }
    let unsubRootTree = () => {
    }

    $: {
        category = categories.get(categoryId)
        stateStore = $category.editStateStore
        unsubState()
        unsubState = stateStore.subscribe(e => {
            state = e
            if (e.id === EditStateId.None) return
            treeStore = $category.treeStores.get(e.treeId)
            unsubTree()
            unsubTree = treeStore.subscribe(t => tree = t)
        })
    }
    $: {
        unsubRootTree()
        unsubRootTree = $category.treeStores.get($category.rootId).subscribe(t => rootTree = t)
    }
    onDestroy(() => {
        unsubRootTree()
        unsubTree()
        unsubState()
    })
    $: {
        if ((windowWidth || windowHeight) && environmentElement) {
            const rect = environmentElement.getBoundingClientRect()
            originX = rect.left
            originY = rect.top
        }
    }

    function beginDrag(event: MouseEvent) {
        if (state.id != EditStateId.Hover || event.button != 0) return
        hoverX = state.x
        hoverY = state.y
        stateStore.set({
            id: EditStateId.Drag,
            treeId: state.treeId,
            x: event.clientX - originX - hoverX,
            y: event.clientY - originY - hoverY
        })
        treeStore.update(t => {
            t.hidden = true
            return t
        })
        waypoints = calculateWaypoints(rootTree, tree)
        initialWaypoint = closestWaypoint(
            event.pageX - originX - hoverX + step / 2,
            event.pageY - originY - hoverY + step / 2,
            waypoints)
        // console.log(event)
        lastWaypoint = initialWaypoint
    }

    function moveToWaypoint(waypoint: WaypointType) {
        if (waypoint.id == lastWaypoint.id && waypoint.index == lastWaypoint.index) return
        if (waypoint.id == lastWaypoint.id) {
            $category.treeStores.get(waypoint.id).update(t => {
                t.children.splice(lastWaypoint.index, 1);
                t.children.splice(waypoint.index, 0, tree);
                moveMessage = `Rearranged "${tree.name}" under "${t.name}"`
                return t
            })
        } else {
            let lastName: string
            $category.treeStores.get(lastWaypoint.id).update(t => {
                t.children.splice(lastWaypoint.index, 1)
                lastName = t.name
                return t
            })
            $category.treeStores.get(waypoint.id).update(t => {
                t.children.splice(waypoint.index, 0, tree)
                moveMessage = `Moved "${tree.name}" from "${lastName}" to "${t.name}"`
                return t
            })
            treeStore.update(t => {
                t.parentId = waypoint.id
                return t
            })
        }
        lastWaypoint = waypoint
    }

    function drag(event: MouseEvent) {
        if (state.id != EditStateId.Drag) return

        moveToWaypoint(closestWaypoint(
            event.pageX - originX - hoverX + step / 2,
            event.pageY - originY - hoverY + step / 2,
            waypoints))

        stateStore.update(s => {
            s.x = event.pageX - originX - hoverX
            s.y = event.pageY - originY - hoverY
            return s
        })
    }

    function finishDrag(event: MouseEvent) {
        if (state.id != EditStateId.Drag) return
        treeStore.update(t => {
            t.hidden = false
            return t
        })
        stateStore.set({id: EditStateId.None, treeId: $category.rootId})
        if (moveMessage) {
            pushSuccess(moveMessage)
            moveMessage = null
        }
    }

    function cancelDrag(event: MouseEvent) {
        if (state.id != EditStateId.Drag) return
        moveToWaypoint(initialWaypoint)
        treeStore.update(t => {
            t.hidden = false
            return t
        })
        stateStore.set({id: EditStateId.None, treeId: $category.rootId})
        pushError("Drag cancelled since mouse left tree area")
    }
</script>


<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight}/>
<div class="parent" bind:this={environmentElement} on:mousedown={beginDrag} on:mousemove={drag} on:mouseup={finishDrag}
     on:mouseleave={cancelDrag}>
    {#if state.id === EditStateId.Drag}
        <div class="name" style="left: {state.x}px; top: {state.y}px;">
            {tree.name}
        </div>
        {#each waypoints as w}
            <div class="point" class:current={w === lastWaypoint} style="left: {w.x}px; top: {w.y}px;"></div>
        {/each}
    {/if}
    <slot/>
</div>


<style>
    .parent {
        position: relative;
        border-radius: 4px;
        padding: 17px;
        overflow: hidden;
        background-color: var(--accentTrans);
        transition: background-color var(--transitionDuration);
    }

    .point {
        position: absolute;
        background-color: red;
        width: 2px;
        height: 2px;
        margin-left: -1px;
        margin-top: -1px;
        z-index: 3;
    }

    .point.current {
        background-color: green;
        width: 4px;
        height: 4px;
        margin-left: -2px;
        margin-top: -2px;
        opacity: 70%;
    }

    .name {
        position: absolute;
        line-height: 20px;
        border-radius: 100px;
        height: 30px;
        padding: 6px 10px;
        font-size: 18px;
        z-index: 2;
        cursor: move;
        white-space: nowrap;
        backdrop-filter: blur(1px);
        background-color: var(--accentTrans);
        transition: background-color var(--transitionDuration);
    }
</style>
