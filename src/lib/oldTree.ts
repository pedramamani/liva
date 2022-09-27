import {writable} from "svelte/store";

export type NodeType = { info: NodeInfoType, children: NodeType[] }
export type NodeInfoType = { name: string, id: string, isFavorite: boolean }
export type ParsedTreeType = { error: true, line: string, lineNumber: number } | { error: false, output: NodeType }
export let nodeInfos: Map<string, NodeInfoType>

export function parseTree(content: string): ParsedTreeType {
    const lineRegex = new RegExp(/^((?:    )*)([a-zA-Z][a-zA-Z0-9- ]*[a-zA-Z0-9])( \*)?$/)
    const lines: string[] = content.split(/\r?\n/)
    let line: string = lines[0]
    let lineNumber: number = 1
    let match: RegExpExecArray | null = lineRegex.exec(line)
    if (!match) return {error: true, line: line, lineNumber: lineNumber}
    let depth: number = match[1].length / 4
    if (depth !== 0) return {error: true, line: line, lineNumber: lineNumber}
    let name: string = match[2]
    let id: string = "00000"
    let isFavorite: boolean = match[3] != undefined
    let root: NodeType = {info: {name: name, id: id, isFavorite: isFavorite}, children: []}
    let lineage: NodeType[] = [root]
    nodeInfos = new Map<string, NodeInfoType>([[id, root.info]])
    if (isFavorite) toggleFavorite(id)
    let node: NodeType
    let popCount: number

    for (let line of lines.slice(1)) {
        lineNumber += 1
        match = lineRegex.exec(line)
        if (!match) return {error: true, line: line, lineNumber: lineNumber}
        depth = match[1].length / 4

        if (depth > lineage.length) return {error: true, line: line, lineNumber: lineNumber}
        name = match[2]
        id = generateNodeId(name)
        isFavorite = match[3] != undefined
        node = {info: {name: name, id: id, isFavorite: isFavorite}, children: []}
        popCount = lineage.length - depth
        for (let i = 0; i < popCount; i++) lineage.pop()
        // @ts-ignore
        lineage.at(-1).children.push(node)
        lineage.push(node)
        nodeInfos.set(id, node.info)
        if (isFavorite) toggleFavorite(id)
    }
    return {error: false, output: root}
}

function generateNodeId(name: string): string {
    let h: number = 0
    for (let i = 0; i < name.length; i++) h = 31 * h + name.charCodeAt(i)
    return (h % 1E6).toString()
}

export const selectedIdStore = writable("")

export function setSelectedId(id: string) {
    selectedIdStore.update(_ => id)
}

export const favoriteIdsStore = writable(new Set<string>)

export function toggleFavorite(id: string) {
    favoriteIdsStore.update(f => {
        if (!f.delete(id)) f.add(id)
        return f
    })
}
