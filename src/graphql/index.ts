import { readFileSync } from 'fs'
import path from 'path'
import {
    transactionResolver,
    warehouseResolver,
    itemResolver,
} from './resolvers'

const itemTypes = readFileSync(path.join(__dirname, './typeDefs/item.graphql'))
const warehouseTypes = readFileSync(
    path.join(__dirname, './typeDefs/warehouse.graphql')
)
const transactionTypes = readFileSync(
    path.join(__dirname, './typeDefs/transaction.graphql')
)

export const typeDefs = `
${itemTypes}
${warehouseTypes}
${transactionTypes}
`

export const resolvers = {
    Query: {
        ...itemResolver.Query,
        ...warehouseResolver.Query,
        ...transactionResolver.Query,
    },
    Mutation: {
        ...itemResolver.Mutation,
        ...warehouseResolver.Mutation,
        ...transactionResolver.Mutation,
    },
}
