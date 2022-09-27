import {readable} from 'svelte/store';

export type minutesTextType = {
    minutes: number,
    firstText: string,
    secondText: string
}

function generateMinutesText(time: Date): minutesTextType {
    const remaining = 1440 - 60 * time.getHours() - time.getMinutes()
    if (remaining < 100) return {minutes: 1440, firstText: "minutes exist in a day", secondText: "take control of them"}
    else return {minutes: remaining, firstText: "minutes are left today", secondText: "take control of them"}
}

export const minutesText = readable(
    generateMinutesText(new Date()), () => {
        const interval = setInterval(() => generateMinutesText(new Date()), 1000)
        return () => clearInterval(interval)
    })
