import {writable} from "svelte/store";

export enum PageId { Home, Edit, Track, Inspect }

export type PageType = { id: PageId, name: string }
export const pages = new Map<PageId, PageType>([
    [PageId.Home, {id: PageId.Home, name: "Home"}],
    [PageId.Edit, {id: PageId.Edit, name: "Organize"}],
    [PageId.Track, {id: PageId.Track, name: "Record"}],
    [PageId.Inspect, {id: PageId.Inspect, name: "Visualize"}]
])

export const currentPageIdStore = writable(PageId.Edit)

export function setCurrentPageIdFunction(id: PageId) {
    return () => currentPageIdStore.set(id)
}
