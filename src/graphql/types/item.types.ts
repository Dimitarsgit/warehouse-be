export type ItemInput = {
    input: Omit<Item, 'id'>
}

export type Item = {
    id: number
    name: string
    quantity: number
    isHazardous: boolean
    length: number
    width: number
    height: number
}
