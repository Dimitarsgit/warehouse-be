export type TansactionInput = {
    input: Omit<Transaction, 'id'>
}

export enum TRANSACTION {
    Export = 'export',
    Import = 'import',
}

export type Transaction = {
    id: number
    type: TRANSACTION
    quantity: number
    datetime: Date
    warehouseId: number
    itemId: number
}
