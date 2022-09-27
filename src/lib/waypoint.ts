import type {TreeType, TreeId} from "./category";
import {step} from "./category";

export type WaypointType = { x: number, y: number, id: TreeId, index: number }

export function calculateWaypoints(tree: TreeType, startTree: TreeType): Array<WaypointType> {
    let waypoints = new Array<WaypointType>()
    calculateNodeCountsRec(tree)
    calculateYsRec(tree, 0)
    // calculateSubIdsRec(tree)
    addWaypointsRec(tree, startTree, step, step, waypoints)
    console.log("total waypoints", waypoints.length)
    return waypoints
}

function calculateNodeCountsRec(tree: TreeType): number {
    let nodeCount = 1
    if (tree.deleted) nodeCount = 0
    else if (tree.children.length == 0 || tree.hidden) nodeCount = 1
    else tree.children.forEach(child => nodeCount += calculateNodeCountsRec(child))
    tree.store.nodeCount = nodeCount
    return nodeCount
}

function calculateSubIdsRec(tree: TreeType): Set<TreeId> {
    let subIds = new Set<TreeId>()
    if (tree.deleted) return subIds
    else if (tree.hidden || tree.children.length == 0) subIds.add(tree.id)
    else tree.children.forEach(child => calculateSubIdsRec(child).forEach(id => subIds.add(id)))
    tree.store.subIds = subIds
    return subIds
}

function calculateYsRec(tree: TreeType, y: number) {
    tree.store.y = y
    if (tree.deleted || tree.hidden) return
    let yOffset = 1
    tree.children.forEach(child => {
        calculateYsRec(child, y + yOffset)
        yOffset += child.store.nodeCount
    })
}

// function addWaypointsRec(tree: TreeType, startTree: TreeType, x: number, y: number, waypoints: Array<WaypointType>) {
//     let offset = 0
//     tree.children.forEach((child, index) => {
//         if (child.deleted || child.hidden) return
//         waypoints.push({
//             x: x + step,
//             y: y + step + offset,
//             id: tree.id,
//             index: index
//         })
//         addWaypointsRec(child, startTree, x + step, y + step + offset, waypoints)
//         offset += step * child.store.nodeCount
//     })
//
//     // const belowOffset = tree.store.y + tree.store.
//     waypoints.push({
//         x: x + step,
//         y: y + step + offset,
//         id: tree.id,
//         index: tree.children.length
//     })
// }

function addWaypointsRec(tree: TreeType, startTree: TreeType, x: number, y: number, waypoints: Array<WaypointType>) {
    if (tree.deleted || tree.hidden) return
    let offset = 0
    if (startTree.store.y < tree.store.y) {
        tree.children.forEach((child, index) => {
            waypoints.push({
                x: x + step,
                y: y + step * offset,
                id: tree.id,
                index: index
            })
            addWaypointsRec(child, startTree, x + step, y + step * offset, waypoints)
            offset += child.store.nodeCount
        })
        waypoints.push({
            x: x + step,
            y: y + step * (offset + 1),
            id: tree.id,
            index: tree.children.length
        })
        console.log(tree.children.length + 1, tree.name, "before")
    }
    else if (startTree.parentId == tree.id) {
        const waypointCount = waypoints.length
        tree.children.forEach((child, index) => {
            waypoints.push({
                x: x + step,
                y: y + step * (1 + offset),
                id: tree.id,
                index: index
            })
            addWaypointsRec(child, startTree, x + step, y + step * (1 + offset), waypoints)
            offset += child.store.nodeCount
        })
        console.log(tree.children.length, tree.name, "child")
    } else if (tree.store.subIds.has(startTree.id)) {
        const waypointCount = waypoints.length
        tree.children.forEach((child, index) => {
            if (startTree.store.y < child.store.y) {
                waypoints.push({
                    x: x + step,
                    y: y + step * offset,
                    id: tree.id,
                    index: index
                })
                addWaypointsRec(child, startTree, x + step, y + step * offset, waypoints)
                offset += child.store.nodeCount
            } else {
                waypoints.push({
                    x: x + step,
                    y: y + step * (1 + offset),
                    id: tree.id,
                    index: index
                })
                addWaypointsRec(child, startTree, x + step, y + step * (1 + offset), waypoints)
                offset += child.store.nodeCount
            }
        })
        waypoints.push({
            x: x + step,
            y: y + step * offset,
            id: tree.id,
            index: tree.children.length
        })
        console.log(tree.children.length + 1, tree.name, "descendent")
    } else {
        const waypointCount = waypoints.length
        tree.children.forEach((child, index) => {
            waypoints.push({
                x: x + step,
                y: y + step * (1 + offset),
                id: tree.id,
                index: index
            })
            addWaypointsRec(child, startTree, x + step, y + step * (1 + offset), waypoints)
            offset += child.store.nodeCount
        })
        waypoints.push({
            x: x + step,
            y: y + step * (1 + offset),
            id: tree.id,
            index: tree.children.length
        })
        console.log(tree.children.length + 1, tree.name, "after")
    }
}

export function closestWaypoint(x: number, y: number, waypoints: Array<WaypointType>): WaypointType {
    let waypoint = waypoints[0]
    let distanceSquared: number
    let minDistanceSquared = Infinity
    waypoints.forEach(w => {
        distanceSquared = (x - w.x) ** 2 + (y - w.y) ** 2
        if (distanceSquared < minDistanceSquared) {
            minDistanceSquared = distanceSquared
            waypoint = w
        }
    })
    return waypoint
}