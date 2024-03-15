import { itemService } from '../services'
import { ItemInput } from '../types'
import { createItemInputSchema } from '../validation'
import { GraphQLError } from 'graphql'

export const itemResolver = {
    Query: {
        async item(_: never, { id }: { id: number }) {
            return itemService.getById(id)
        },
        async items() {
            return await itemService.getAll()
        },
    },
    Mutation: {
        async createItem(_: never, { input }: ItemInput) {
            const { error } = createItemInputSchema.validate(input)
            if (error) {
                throw new GraphQLError(error.message)
            }

            return await itemService.create(input)
        },
    },
}
