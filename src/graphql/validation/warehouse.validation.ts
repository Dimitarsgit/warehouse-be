import joi from 'joi'

export const createWarehouseInputSchema = joi.object({
    name: joi.string().required(),
    capacity: joi.number().min(0).required(),
})
