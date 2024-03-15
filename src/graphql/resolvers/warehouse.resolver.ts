import { warehouseService } from '../services'
import { WarehouseInput } from '../types'
import { createWarehouseInputSchema } from '../validation'
import { GraphQLError } from 'graphql'

export const warehouseResolver = {
    Query: {
        async warehouse(_: never, { id }: { id: number }) {
            return await warehouseService.getById(id)
        },
        async warehouses() {
            return await warehouseService.getAll()
        },
    },
    Mutation: {
        async createWarehouse(_: never, { input }: WarehouseInput) {
            const { error } = createWarehouseInputSchema.validate(input)
            if (error) {
                throw new GraphQLError(error.message)
            }
            return await warehouseService.create(input)
        },
    },
}
