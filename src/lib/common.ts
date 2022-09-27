export function enumValues(enumObject: any): number[] {
    let values = new Array<number>()
    let value: number
    Object.keys(enumObject).forEach((key) => {
        value = Number(enumObject[key])
        if (!isNaN(value)) {
            values.push(value)
        }
    })
    return values
}

export function enumLength(enumObject: any): number {
    return Object.keys(enumObject).length / 2
}

export function mod(n: number, m: number): number {
    return ((n % m) + m) % m;
}

export function titleCase(text: string): string {
    return text.replace(/\w+/g, t => t.charAt(0).toUpperCase() + t.slice(1))
}
