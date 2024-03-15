export type WarehouseInput = {
    input: Omit<Warehouse, 'id' | 'remainingCapacity'>
}

export type Warehouse = {
    id: number
    name: string
    capacity: number
    remainingCapacity: number
}
