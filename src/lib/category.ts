import {writable} from "svelte/store";
import type {Writable} from "svelte/store";

export enum CategoryId {Activity, Person, Location}

export enum EditStateId {Hover, Drag, Rename, None}

export type TreeId = string

export type CategoryType = {
    id: CategoryId, name: string, rootId: TreeId, treeStores: Map<TreeId, Writable<TreeType>>, editStateStore: Writable<EditStateType>
}
export type TreeType = { id: TreeId, parentId: TreeId | null, name: string, starred: boolean, hidden: boolean, deleted: boolean, children: Array<TreeType>, store: any }
export type BareTreeType = { name: string, children: Array<BareTreeType> }
export type EditStateType =
    { id: EditStateId.Hover, treeId: TreeId, x: number, y: number } |
    { id: EditStateId.Drag, treeId: TreeId, x: number, y: number } |
    { id: EditStateId.Rename, treeId: TreeId } |
    { id: EditStateId.None }

const timeOrigin = Date.now()
let pastIds = new Set<TreeId>()
export const nameCharacters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ- "
export const nameCharacterLimit = 30
export const nameRegex = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9- ]{0,28}[a-zA-Z0-9]$/)
export const categoryId = writable(CategoryId.Location)
export const step = 34

export function newId(): TreeId {
    const keyString = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let value = Math.floor(1E3 * (timeOrigin + performance.now() + Math.random()))
    let id = ""

    while (value != 0) {
        id = id.concat(keyString.at(value % keyString.length)!)
        value = Math.floor(value / keyString.length)
    }

    if (pastIds.has(id)) return newId()
    pastIds.add(id)
    return id
}

export const categories = new Map<CategoryId, Writable<CategoryType>>([
    [CategoryId.Activity, writable({
        id: CategoryId.Activity, name: "",
        rootId: "",
        treeStores: new Map<TreeId, Writable<TreeType>>(),
        editStateStore: writable({id: EditStateId.None})
    })],
    [CategoryId.Person, writable({
        id: CategoryId.Person,
        name: "",
        rootId: "",
        treeStores: new Map<TreeId, Writable<TreeType>>(),
        editStateStore: writable({id: EditStateId.None})
    })],
    [CategoryId.Location, writable({
        id: CategoryId.Location, name: "",
        rootId: "",
        treeStores: new Map<TreeId, Writable<TreeType>>(),
        editStateStore: writable({id: EditStateId.None})
    })]
])

function initCategory(id: CategoryId, tree: TreeType) {
    const category = categories.get(id)!
    let treeStores = new Map<TreeId, Writable<TreeType>>()
    initTreeStoresRec(tree, treeStores)
    category.update(c => {
        c.rootId = tree.id
        c.treeStores = treeStores
        return c
    })
    treeStores.get(tree.id)!.subscribe(t => category.update(c => {
        c.name = t.name
        return c
    }))
}

function initTreeStoresRec(tree: TreeType, treeStores: Map<TreeId, Writable<TreeType>>) {
    treeStores.set(tree.id, writable(tree))
    tree.children.forEach((child) => initTreeStoresRec(child, treeStores))
}

function generateTreeRec(bareTree: BareTreeType, parentId: TreeId | null): TreeType {
    const id = newId()
    const tree = buildTree({name: bareTree.name, children: new Array<TreeType>()}, id, parentId)
    bareTree.children.forEach(child => {
        tree.children.push(generateTreeRec(child, id))
    })
    return tree
}

export function buildTree(tree: BareTreeType, id: TreeId, parentId: TreeId | null) {
    return {
        id: id,
        parentId: parentId,
        name: tree.name,
        starred: false,
        hidden: false,
        deleted: false,
        children: new Array<TreeType>(),
        store: {}
    }
}

initCategory(CategoryId.Activity, generateTreeRec(
    {
        name: "Activity",
        children: [
            {
                name: "School", children: []
            },
            {
                name: "Work",
                children: [
                    {
                        name: "Research", children: []
                    },
                    {
                        name: "TA", children: []
                    },
                    {
                        name: "Tutor", children: []
                    }
                ]
            },
            {
                name: "Sustain", children: []
            },
            {
                name: "Entertain", children: []
            }
        ]
    }, null
))

initCategory(CategoryId.Person, generateTreeRec(
    {
        name: "Person",
        children: [
            {
                name: "Relative", children: []
            },
            {
                name: "Cousin", children: [
                    {
                        name: "Aunt", children: []
                    },
                    {
                        name: "Uncle", children: []
                    },
                    {
                        name: "Grandparent", children: []
                    }
                ]
            },
            {
                name: "Family", children: []
            },
            {
                name: "Friend", children: []
            }
        ]
    }, null
))

initCategory(CategoryId.Location, generateTreeRec(
    {
        name: "Location",
        children: [
            {
                name: "Home", children: []
            },
            {
                name: "Work", children: []
            }
        ]
    }, null
))
