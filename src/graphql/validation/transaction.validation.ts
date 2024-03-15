import joi from 'joi'
import { TRANSACTION } from '../types/transaction.types'

export const createTransactionInputSchema = joi.object({
    itemId: joi.number().required(),
    warehouseId: joi.number().required(),
    quantity: joi.number().required(),
    type: joi.string().valid(TRANSACTION.Export, TRANSACTION.Import).required(),
    datetime: joi.string(),
})
