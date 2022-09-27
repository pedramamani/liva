import {writable} from "svelte/store";
import type {Writable} from "svelte/store";

export enum AlertId {
    Success, Error
}

export type AlertType = null | {
    id: AlertId
    text: string
}

export const alertStore: Writable<AlertType> = writable(null)
let timeoutId: NodeJS.Timeout

export function pushSuccess(text: string) {
    pushAlert({id: AlertId.Success, text: text})
}

export function pushError(text: string) {
    pushAlert({id: AlertId.Error, text: text})
}

function pushAlert(alert: AlertType) {
    clearTimeout(timeoutId)
    alertStore.set(alert)
    timeoutId = setTimeout(() => alertStore.set(null), 5000)
}
