import joi from 'joi'

export const createItemInputSchema = joi.object({
    name: joi.string().required(),
    length: joi.number().min(0).required(),
    width: joi.number().min(0).required(),
    height: joi.number().min(0).required(),
    isHazardous: joi.boolean().required(),
})
