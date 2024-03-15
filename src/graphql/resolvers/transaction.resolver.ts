import { createTransactionInputSchema } from '../validation'
import { TansactionInput, TRANSACTION } from '../types'
import { GraphQLError } from 'graphql'
import { warehouseService, itemService, transactionService } from '../services'

export const transactionResolver = {
    Query: {
        async transactionsByWarehouseId(_: never, { id }: { id: number }) {
            return transactionService.getByWarehouseId(id)
        },
    },
    Mutation: {
        async createTransaction(_: never, { input }: TansactionInput) {
            const { error } = createTransactionInputSchema.validate(input)
            if (error) {
                throw new GraphQLError(error.message)
            }

            const { itemId, warehouseId, quantity } = input

            const item = await itemService.getById(itemId)
            if (!item) {
                throw new GraphQLError('Item not found')
            }

            const warehouse = await warehouseService.getById(warehouseId)
            if (!warehouse) {
                throw new GraphQLError('Warehouse not found')
            }

            if (input.type === TRANSACTION.Export) {
                const canBeExported = await warehouseService.canBeExported(
                    warehouseId,
                    itemId,
                    quantity
                )
                if (!canBeExported) {
                    throw new GraphQLError(
                        `Can not export more than available!`
                    )
                }
            }

            if (input.type === TRANSACTION.Import) {
                const requiredCapacity =
                    item.length * item.width * item.height * quantity

                const hasEnoughtCapacity =
                    await warehouseService.hasEnoughtCapacity(
                        warehouseId,
                        requiredCapacity
                    )

                if (!hasEnoughtCapacity) {
                    throw new GraphQLError(
                        `Required items cannot be stored in this warehouse due to insufficient capacity!`
                    )
                }
            }

            const hasNotAllowedItemType =
                await itemService.storedWithNotAllowedType(
                    warehouseId,
                    item.isHazardous
                )

            if (hasNotAllowedItemType) {
                throw new GraphQLError(
                    `Only items of type: ${item.isHazardous ? 'Non Hazardous' : 'Hazardous'} are allowed`
                )
            }

            return await transactionService.create(input)
        },
    },
}
