import {writable} from "svelte/store";

export enum ThemeId { Light, Dark}

export const styles = {
    "white": ["#ffffff", "#27272d"],
    "accentTrans": ["#74798121", "#c7c7d216"],
    "accent": ["#edeeef", "#35353b"],
    "gray": ["#8e9898", "#85858f"],
    "black": ["#424242", "#d0d0d5"],
    "error": ["#ffc9c9", "#5e2929"],
    "success": ["#cbffc9", "#2b5e29"],
    "shadow": ["0 10px 15px -3px #0000001a, 0 4px 6px -4px #0000001a", "0 20px 25px -5px #00000033, 0 8px 10px -6px #00000033"],
    "transitionDuration": ["400ms", "400ms"]
};

export const themeIdStore = writable(ThemeId.Light)

export function initThemeId() {
    const storedThemeId = localStorage.getItem("themeId")
    if (storedThemeId) {
        themeIdStore.set(parseInt(storedThemeId))
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        themeIdStore.set(ThemeId.Dark)
        localStorage.themeId = ThemeId.Dark
    } else {
        themeIdStore.set(ThemeId.Light)
        localStorage.themeId = ThemeId.Light
    }
}

export function applyTheme(id: ThemeId): boolean {
    const root: HTMLElement | null = document.querySelector(":root")
    if (root == null) return false
    Object.entries(styles).forEach(([k, v]) => root.style.setProperty(`--${k}`, v[id]))
    document.documentElement.style.backgroundColor = styles.white[id]
    return true
}

export function toggleThemeId() {
    themeIdStore.update(i => {
        i = (i == ThemeId.Dark) ? ThemeId.Light : ThemeId.Dark
        localStorage.themeId = i
        return i
    })
}
